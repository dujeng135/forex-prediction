import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";  
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import LSTMModelPage from "./pages/LSTMModelPage";
import TradeHistoryPage from "./pages/TradeHistoryPage";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";  
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UpgradePage from "./pages/UpgradePage"; // ⬅ import di atas
import { isUserVVIP } from "./utils/isVVIP"; // ✅ import dulu
import RegisterPage from "./pages/RegisterPage"; // tambahkan ini
import AdminVerifyPage from "./pages/AdminVerifyPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // ⬅ import dulu
import ResetPasswordPage from "./pages/ResetPasswordPage";
import GeminiChat from "./components/GeminiChat";
import SignalsPage from "./pages/SignalsPage";
import SettingsPage from "./pages/SettingsPage"; // pastikeun path bener
import TelegramBotPage from "./pages/TelegramBotPage";
import LiveFeedPage from "./pages/LiveFeedPage";
import { Toaster } from "sonner";
import PromoVVIP from "./pages/PromoVVIP"; 





function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isPublicPath = [
    "/login",
    "/register",
    "/forgot-password",
    "/admin-verify",
  ].includes(location.pathname) || location.pathname.startsWith("/reset-password");

  if (!token && !isPublicPath) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function AppLayout() {
  const location = useLocation();
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/admin-verify",
  ].includes(location.pathname) || location.pathname.startsWith("/reset-password");
  
  const ProtectedRoute = ({ element, requiredVVIP }) => {
    const isVVIP = localStorage.getItem("vvip") === "true";
  
    if (requiredVVIP && !isVVIP) {
      return <Navigate to="/upgrade" />;
    }
  
    return element;
  };

  return (
    <div className="flex bg-[#000000] min-h-screen font-futuristic text-white">
      {/* ✅ Tampilkan sidebar hanya kalau bukan halaman login */}
      {!isAuthPage && <Sidebar />}
      <div
  className={
    isAuthPage
      ? "w-full"
      : location.pathname === "/"
      ? "ml-64 w-full p-6 pt-0 pb-6 bg-[#000000]"  // ✅ scroll window hanya di dashboard
      : "ml-64 w-full p-6 overflow-hidden h-screen bg-[#000000]" // ❌ jangan scroll window di halaman lain
  }
>
<Toaster richColors position="top-center" />

      <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/" element={<DashboardPage />} />
  <Route
    path="/lstm-model"
    element={isUserVVIP() ? <LSTMModelPage /> : <UpgradePage />}
  />
  <Route
    path="/history"
    element={isUserVVIP() ? <TradeHistoryPage /> : <UpgradePage />}
  />
  <Route
    path="/news"
    element={isUserVVIP() ? <NewsPage /> : <UpgradePage />}
  />
   <Route 
   path="/signals" 
   element={isUserVVIP() ? <SignalsPage /> : <UpgradePage /> }
   />
   <Route
    path="/telegram-bot" 
    element={isUserVVIP() ? <TelegramBotPage /> : <UpgradePage /> } 
    />

  <Route path="/upgrade" element={<UpgradePage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/admin-verify" element={<AdminVerifyPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  <Route path="/reset-password/:userId" element={<ResetPasswordPage />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/live-feed" element={<LiveFeedPage />} />
  <Route path="/promo-vvip" element={<PromoVVIP />} />

  
</Routes>
<GeminiChat />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    </Router>
  );
}


export default App;

