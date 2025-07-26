import MainLayout from "../components/layout/MainLayout";
import TradeHistory from "../components/TradeHistory";

export default function TradeHistoryPage() {
  return (
    <div className="p-2 py-1 w-full overflow-auto">
      <h1 className="text-2xl font-bold mb-6"></h1>
      <TradeHistory />
    </div>
  );
}
