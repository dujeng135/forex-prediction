# predict.py – versi bersih & stabil
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from pymongo import MongoClient
from telegram import Bot

import numpy as np, pandas as pd, joblib, datetime, asyncio, os, traceback

app = Flask(__name__)
CORS(app)

# === Model & Scaler -----------------------------------------------------------------
model    = load_model("lstm_model.h5", compile=False)
x_scaler = joblib.load("x_scaler.pkl")
y_scaler = joblib.load("y_scaler.pkl")

# === MongoDB ------------------------------------------------------------------------
client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
coll   = client["lstm_forex"]["predictions"]

# === Telegram -----------------------------------------------------------------------
BOT_TOKEN = os.getenv("BOT_TOKEN", "8147…II")   # ← simpan asli di .env
CHAT_ID   = os.getenv("CHAT_ID",  "5604708801")
bot       = Bot(token=BOT_TOKEN)

async def tg_send(text: str):
    """Kirim pesan Telegram secara async."""
    try:
        await bot.send_message(chat_id=CHAT_ID, text=text, parse_mode="Markdown")
    except Exception as err:
        print(f"[❌ Telegram ERROR] {err}")

# ====================================================================================
@app.route("/api/lstm/predict", methods=["POST"])
def predict():
    try:
        # ---------- 1. Ambil & Validasi input ---------------------------------------
        data = request.json or {}
        user = np.array([
            data.get("open"), data.get("high"),
            data.get("low"),  data.get("close"),
            data.get("volume")
        ], dtype=float)

        if np.isnan(user).any():
            return jsonify({"error": "Data tidak lengkap"}), 400

        scale_1000 = user[:4].mean() < 10_000
        if scale_1000:
            user[:4] *= 1_000

        # ---------- 2. Siapkan window 5 hari ----------------------------------------
        df = pd.read_csv("XAUUSD_D1_2025.csv", sep=";").dropna()
        df[["Open","High","Low","Close"]] = df[["Open","High","Low","Close"]].astype(float) * 1_000
        last4 = df[["Open","High","Low","Close","Volume"]].tail(4).values

        full  = np.vstack([last4, user])
        scaled= x_scaler.transform(pd.DataFrame(
            full, columns=["Open","High","Low","Close","Volume"]
        ))
        X = scaled.reshape(1, 5, 5)

        # ---------- 3. Prediksi ------------------------------------------------------
        pred_scaled = model.predict(X)
        pred_price  = y_scaler.inverse_transform(pred_scaled)[0][0]
        if scale_1000:
            pred_price /= 1_000

        actual      = user[3] / (1_000 if scale_1000 else 1)
        diff        = pred_price - actual
        signal      = "BUY" if diff > 0 else "SELL"
        err_pct     = abs(diff) / actual * 100
        confidence  = round(max(70, 85 - err_pct), 2)

        # ---------- 4. Simpan ke Mongo ----------------------------------------------
        coll.insert_one({
            "ts"         : datetime.datetime.utcnow(),
            "input"      : data,
            "predicted"  : float(pred_price),
            "signal"     : signal,
            "confidence" : float(confidence)
        })

        # ---------- 5. Kirim Telegram (skip kalau header manual‑test) ---------------
        if not request.headers.get("X-Manual-Test"):
            msg = (
                "📢 *LSTM Trading Signal Alert*\n\n"
                f"📅 {datetime.datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n"
                f"🔁 *{signal}*  —  *XAUUSD*\n"
                f"💰 Prediksi: *${pred_price:,.2f}*\n"
                f"🎯 TP: *${pred_price + 30:,.2f}*\n"
                f"🛑 SL: *${pred_price - 30:,.2f}*\n"
                f"✅ Confidence: *{confidence}%*\n"
                "_Powered by LSTM‑AI D1_"
            )
            loop = asyncio.new_event_loop()
            loop.run_until_complete(tg_send(msg))
            loop.close()

        # ---------- 6. Response ------------------------------------------------------
        return jsonify({
            "signal"     : signal,
            "price"      : float(pred_price),
            "confidence" : float(confidence)
        })

    except Exception as e:
        print("🔥 ERROR predict():", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ====================================================================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
