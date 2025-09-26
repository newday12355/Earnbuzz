import { ArrowLeft, Crown, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UpgradeAccount = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/more-options" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Upgrade Account</h1>
      </div>

      {/* Premium Card */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Premium Account</h2>
        <p className="text-center opacity-90 text-sm">Unlock exclusive features and higher limits</p>
      </div>

      {/* Benefits */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Premium Benefits</h3>
        <div className="space-y-3">
          {[
            "Higher transaction limits",
            "Priority customer support",
            "Exclusive investment opportunities",
            "Reduced transaction fees",
            "Advanced analytics dashboard",
            "Premium referral bonuses"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Plan</h3>
        
        {/* Monthly Plan */}
        <div className="border-2 border-muted rounded-lg p-4 mb-3">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-foreground">Monthly Premium</h4>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">₦2,500</div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Perfect for getting started with premium features</p>
        </div>

        {/* Yearly Plan */}
        <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-medium text-foreground">Yearly Premium</h4>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-primary font-medium">Most Popular</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">₦25,000</div>
              <div className="text-xs text-muted-foreground">per year</div>
              <div className="text-xs text-green-600">Save 17%</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Best value with 2 months free</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Number:</span>
            <span className="font-medium text-foreground">8102562883</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-medium text-foreground">MOMO PSB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Name:</span>
            <span className="font-medium text-foreground">Veronica Chisom Benjamin</span>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 rounded-full">
        <Crown className="w-4 h-4 mr-2" />
        Upgrade to Premium
      </Button>
    </div>
  );
};

export default UpgradeAccount;