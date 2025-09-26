import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const WithdrawalConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const withdrawalData = location.state?.withdrawalData;
  const [countdown, setCountdown] = useState(6);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsProcessing(false);
          clearInterval(timer);
          // Navigate to receipt page
          setTimeout(() => {
            navigate('/withdrawal-receipt', {
              state: { withdrawalData }
            });
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, withdrawalData]);

  if (!withdrawalData) {
    return (
      <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No withdrawal data found</p>
          <Link to="/dashboard">
            <Button className="mt-4">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/withdraw-bank-selection" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Processing Withdrawal</h1>
      </div>

      <div className="bg-card rounded-2xl p-6 text-center space-y-6">
        {/* Processing Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{countdown}</span>
            </div>
          </div>
        </div>

        {/* Processing Message */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Processing Your Withdrawal</h2>
          <p className="text-muted-foreground">
            Please wait while we process your withdrawal request. This usually takes a few seconds.
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount:</span>
            <span className="font-semibold text-primary">₦{withdrawalData.amount?.toLocaleString()}.00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Bank:</span>
            <span className="font-semibold text-foreground">{withdrawalData.bankName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Account:</span>
            <span className="font-semibold text-foreground">
              {withdrawalData.accountNumber?.replace(/(\d{3})(\d{4})(\d{3})/, '$1****$3')}
            </span>
          </div>
        </div>

        {/* Processing Status */}
        <div className="text-sm text-muted-foreground">
          {isProcessing ? (
            <p>🔄 Processing withdrawal in {countdown} seconds...</p>
          ) : (
            <p>✅ Processing complete! Redirecting to receipt...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalConfirmation;