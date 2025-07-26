import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import joblib

# Baca file CSV
df = pd.read_csv("XAUUSD_D1_2025.csv", sep=";")

# Konversi koma ke titik jika ada
for col in ["Open", "High", "Low", "Close"]:
    df[col] = df[col].astype(str).str.replace(",", ".").astype(float)

df["Volume"] = pd.to_numeric(df["Volume"], errors="coerce")
df = df.dropna()

# Kali 1000
df[["Open", "High", "Low", "Close"]] *= 1000

# Siapkan data
dataset = df[["Open", "High", "Low", "Close", "Volume"]].values
X, y = [], []

for i in range(5, len(dataset)):
    X.append(dataset[i-5:i])
    y.append(dataset[i][3])  # Close sebagai target

X = np.array(X)
y = np.array(y).reshape(-1, 1)

# Normalisasi
x_scaler = MinMaxScaler()
X_scaled = x_scaler.fit_transform(X.reshape(-1, 5)).reshape(X.shape)

y_scaler = MinMaxScaler()
y_scaled = y_scaler.fit_transform(y)

# Simpan hasil preprocessing
np.save("X.npy", X_scaled)
np.save("y.npy", y_scaled)
joblib.dump(x_scaler, "x_scaler.pkl")
joblib.dump(y_scaler, "y_scaler.pkl")
print("✅ Preprocessing selesai")
