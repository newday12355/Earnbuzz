import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Support from "./pages/Support";
import LoanApplication from "./pages/LoanApplication";
import TVRecharge from "./pages/TVRecharge";
import BuyData from "./pages/BuyData";
import Betting from "./pages/Betting";
import Withdraw from "./pages/Withdraw";
import WithdrawalSuccess from "./pages/WithdrawalSuccess";
import PaymentNotConfirmed from "./pages/PaymentNotConfirmed";
import FaircodePaymentSuccess from "./pages/FaircodePaymentSuccess";
import BuyAirtime from "./pages/BuyAirtime";
import InviteEarn from "./pages/InviteEarn";
import MoreOptions from "./pages/MoreOptions";
import Profile from "./pages/Profile";
import About from "./pages/About";
import UpgradeAccount from "./pages/UpgradeAccount";
import JoinCommunity from "./pages/JoinCommunity";
import BuyFaircode from "./pages/BuyFaircode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/loan" element={<LoanApplication />} />
          <Route path="/tv-recharge" element={<TVRecharge />} />
          <Route path="/buy-data" element={<BuyData />} />
          <Route path="/betting" element={<Betting />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/withdrawal-success" element={<WithdrawalSuccess />} />
          <Route path="/payment-not-confirmed" element={<PaymentNotConfirmed />} />
          <Route path="/faircode-payment-success" element={<FaircodePaymentSuccess />} />
          <Route path="/buy-airtime" element={<BuyAirtime />} />
          <Route path="/invite-earn" element={<InviteEarn />} />
          <Route path="/more-options" element={<MoreOptions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/upgrade-account" element={<UpgradeAccount />} />
          <Route path="/join-community" element={<JoinCommunity />} />
          <Route path="/buy-faircode" element={<BuyFaircode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
