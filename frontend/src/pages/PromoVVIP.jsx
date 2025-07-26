import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";


export default function PromoVVIPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-12 flex flex-col items-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400 drop-shadow-md">
          Jadilah Member <span className="text-white">VVIP</span> dan Dapatkan Akses Premium!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Dengan menjadi VVIP, kamu akan mendapatkan sinyal trading eksklusif setiap hari, akses penuh ke sistem kami, serta masuk ke channel Telegram privat. Didukung oleh broker terpercaya Exness.
        </p>

        <ul className="text-left space-y-4 mb-10">
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-400" />
            Akses sinyal trading <span className="font-semibold text-yellow-400">setiap hari</span>
          </li>
          <li className="flex items-center gap-3">
            <Star className="text-yellow-400" />
            Channel Telegram khusus member VVIP
          </li>
          <li className="flex items-center gap-3">
            <TrendingUp className="text-blue-400" />
            Rekomendasi sinyal akurat berbasis <span className="font-semibold">AI LSTM</span>
          </li>
          <li className="flex items-center gap-3">
            <ShieldCheck className="text-cyan-400" />
            Transaksi aman via Midtrans & broker terpercaya
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/upgrade">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-lg">
              Upgrade ke VVIP Sekarang
            </Button>
          </Link>
          <Link
            href="https://one.exnesstrack.org/a/zqf7muj4kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl shadow-lg">
              Daftar via Broker Exness
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
