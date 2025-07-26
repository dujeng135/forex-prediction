import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // ✅ Tambahkan ini

export default function UpgradePage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    const username = localStorage.getItem("username");
    try {
      const res = await axios.post("http://localhost:5000/api/create-transaction", { username });
      const snapToken = res.data.token;

      console.log("✅ Snap Token:", snapToken);

      window.snap.pay(snapToken, {
        onSuccess: async function () {
          toast.success("🎉 Selamat! Upgrade berhasil.");
          setStatus("Upgrade berhasil!");
          await axios.post("http://localhost:5000/api/upgrade-vvip", { username });
          localStorage.setItem("vvip", "true");
          window.location.reload();
        },
        onPending: function () {
          toast("⏳ Menunggu pembayaran selesai...");
        },
        onError: function () {
          toast.error("❌ Pembayaran gagal.");
        },
        onClose: function () {
          toast("⚠️ Transaksi dibatalkan.");
        },
      });

    } catch (err) {
      console.error("Gagal create transaction:", err);
    }
  };

  // ✅ Ambil data user lokal
  const user = {
    role: localStorage.getItem("role"),
    isVVIP: localStorage.getItem("vvip") === "true",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000000] text-white px-4">
      <Card className="w-full max-w-md bg-[#1e1e2f] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">💎 Upgrade ke VVIP</CardTitle>
        </CardHeader>
        <br />
        <CardContent className="space-y-5">
          <p className="text-base text-gray-300">
            🚀 Tingkatkan akunmu ke status <span className="text-yellow-400 font-semibold">VVIP</span> untuk mendapatkan akses sinyal trading eksklusif setiap hari, masuk ke channel bot Telegram otomatis, dan manfaat premium lainnya.
          </p>

          <p className="text-sm text-gray-400">
            Kami bekerja sama dengan broker resmi terpercaya:
            <br />
            <a
              href="https://one.exnesstrack.org/a/zqf7muj4kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 underline"
            >
              🔗 Exness - Daftar Sekarang
            </a>
          </p>

          <Button
            className="w-full bg-yellow-400 text-black hover:bg-yellow-300 transition font-semibold rounded-xl"
            onClick={handleUpgrade}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Upgrade Sekarang 🔓"}
          </Button>

          {/* ✅ Tombol promo khusus user non-VVIP */}
          {user.role === "user" && !user.isVVIP && (
            <Link to="/promo-vvip">
              <Button variant="secondary" className="w-full mt-2">
                 Lihat Detail Promo
              </Button>
            </Link>
          )}

          {status && (
            <p
              className={`text-center text-sm font-medium ${
                status.includes("berhasil") ? "text-green-400" : "text-red-400"
              }`}
            >
              {status}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
