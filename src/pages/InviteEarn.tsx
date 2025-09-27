import { ArrowLeft, Gift, Copy, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const InviteEarn = () => {
  const { toast } = useToast();
  const referralLink = "https://fairmoney-pay2025ltds.netlify.app/?ref=USER123"; // Example user ID or code

  // State for tracking referrals
  const [referrals, setReferrals] = useState(0);
  const perReferral = 5000;

  // Load saved referrals from localStorage (or API if available)
  useEffect(() => {
    const savedReferrals = parseInt(localStorage.getItem("referralCount") || "0", 10);
    setReferrals(savedReferrals);
  }, []);

  // Simulate a successful referral (for testing)
  const addReferral = () => {
    const newCount = referrals + 1;
    setReferrals(newCount);
    localStorage.setItem("referralCount", newCount.toString());
    toast({
      description: `🎉 New referral added! Total: ${newCount}`,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      description: "Referral link copied to clipboard!",
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Join FairMoney and start earning! Use my referral link: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Invite & Earn</h1>
      </div>

      {/* Earnings Card */}
      <div className="fairmoney-gradient rounded-2xl p-6 text-white mb-6">
        <div className="flex flex-col items-center space-y-4">
          <Gift className="w-12 h-12" />
          <div className="text-center">
            <div className="text-3xl font-bold">₦{referrals * perReferral}</div>
            <div className="text-sm opacity-90">Total Earnings</div>
          </div>
          <div className="flex justify-between w-full text-center">
            <div>
              <div className="text-2xl font-bold">{referrals}</div>
              <div className="text-sm opacity-90">Referrals</div>
            </div>
            <div>
              <div className="text-2xl font-bold">₦{perReferral.toLocaleString()}</div>
              <div className="text-sm opacity-90">Per Referral</div>
            </div>
          </div>
          <div className="text-sm mt-2">
            🎯 Target: <span className="font-bold">5 Referrals</span> or more
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">How it Works</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              1
            </div>
            <span className="text-sm text-muted-foreground">Share your referral link with friends</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              2
            </div>
            <span className="text-sm text-muted-foreground">They sign up using your link</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              3
            </div>
            <span className="text-sm text-muted-foreground">
              You earn ₦{perReferral.toLocaleString()} for each successful referral automatically
            </span>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Referral Link</h2>
        <div className="flex space-x-2 mb-4">
          <Input value={referralLink} readOnly className="flex-1" />
          <Button onClick={copyToClipboard} size="icon" variant="outline">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        <Button onClick={shareOnWhatsApp} className="w-full bg-primary hover:bg-primary/90 text-white">
          <Share className="w-4 h-4 mr-2" />
          Share on WhatsApp
        </Button>
      </div>

      {/* Simulate referral button (testing only, remove in production) */}
      <Button onClick={addReferral} className="w-full mt-4" variant="secondary">
        ➕ Simulate Referral (Test Only)
      </Button>
    </div>
  );
};

export default InviteEarn;