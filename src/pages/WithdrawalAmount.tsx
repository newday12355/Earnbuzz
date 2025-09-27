import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const WithdrawalAmount = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(5000);

  useEffect(() => {
    const currentBalance = localStorage.getItem('dashboardBalance');
    if (currentBalance) {
      setBalance(parseInt(currentBalance));
    }
  }, []);

  const handleContinue = () => {
    if (!amount || parseInt(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive"
      });
      return;
    }

    const withdrawalAmount = parseInt(amount);
    
    if (withdrawalAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive"
      });
      return;
    }

    if (withdrawalAmount < 100000) {
      // Show referral requirement notification
      navigate('/referral-requirement', {
        state: { requestedAmount: withdrawalAmount }
      });
      return;
    }

    // Proceed to bank selection
    navigate('/withdraw-bank-selection', {
      state: { amount: withdrawalAmount }
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Withdraw Money</h1>
      </div>

      <div className="bg-card rounded-2xl p-4 space-y-6">
        {/* Balance Display */}
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
          <p className="text-3xl font-bold text-primary">₦{balance.toLocaleString()}.00</p>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            How much do you want to withdraw?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground font-semibold">₦</span>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="pl-8 text-lg font-semibold text-center"
            />
          </div>
        </div>

        {/* Minimum withdrawal notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-orange-800">
            <p className="font-medium mb-1">Withdrawal Requirements:</p>
            <p>• Minimum ₦100,000 for direct withdrawal</p>
            <p>• Below ₦100,000 requires 5 referrals to qualify</p>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {[100000, 250000, 500000].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              onClick={() => setAmount(quickAmount.toString())}
              disabled={quickAmount > balance}
              className="py-3"
            >
              ₦{quickAmount.toLocaleString()}
            </Button>
          ))}
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalAmount;