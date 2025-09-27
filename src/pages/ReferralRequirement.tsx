import { ArrowLeft, Users, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ReferralRequirement = () => {
  const location = useLocation();
  const requestedAmount = location.state?.requestedAmount || 0;

  const handleRefer = () => {
    const message = `🎉 Join me on FairMoney Pay and start earning! Get your bonus when you sign up: https://fairmoney-pay2025ltds.netlify.app/`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join FairMoney Pay!',
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
      alert('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/withdrawal-amount" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Referral Required</h1>
      </div>

      <div className="bg-card rounded-2xl p-6 space-y-6">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
            <Users className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-foreground">Almost There!</h2>
          <p className="text-muted-foreground">
            To withdraw <span className="font-bold text-primary">₦{requestedAmount.toLocaleString()}</span>, 
            you need to refer 5 people to FairMoney Pay. Minimum withdrawal amount is ₦100,000.
          </p>
        </div>

        {/* Requirements Box */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-800 mb-3">Referral Requirements:</h3>
          <div className="space-y-2 text-sm text-orange-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span>Refer 5 friends to FairMoney Pay</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span>Each friend must complete registration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span>Unlock withdrawal of any amount below ₦100,000</span>
            </div>
          </div>
        </div>

        {/* Current Progress */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Referrals Progress</span>
            <span className="text-sm font-semibold text-foreground">0/5</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "0%" }}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleRefer}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-full"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Start Referring Friends
          </Button>
          
          <Link to="/dashboard">
            <Button 
              variant="outline"
              className="w-full border-2 border-muted-foreground/20 text-foreground font-semibold py-3 rounded-full hover:bg-muted/50"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReferralRequirement;