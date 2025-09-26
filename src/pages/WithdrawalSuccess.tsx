import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface WithdrawalData {
  amount: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const WithdrawalSuccess = () => {
  const location = useLocation();
  const withdrawalData = location.state?.withdrawalData as WithdrawalData;
  
  // Get current date in the format shown in the image
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  // Mask account number for security (show first 3 and last 3 digits)
  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 6) return accountNumber;
    const start = accountNumber.substring(0, 3);
    const end = accountNumber.substring(accountNumber.length - 3);
    return `${start}****${end}`;
  };

  const handleShareSuccess = () => {
    const message = `🎉 Withdrawal Successful! I just withdrew ₦${withdrawalData?.amount || '0'} from FairMoney Pay to my ${withdrawalData?.bankName || 'bank'} account. Join me on FairMoney Pay for seamless transactions! https://fairmoney-pay2025ltds.netlify.app/`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Withdrawal Successful!',
        text: message,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(message);
      alert('Success story copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8 pt-2">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Withdrawal Successful</h1>
      </div>

      <div className="bg-card rounded-2xl p-6 space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-green-600 mb-3">Withdrawal Successful!</h2>
          <p className="text-muted-foreground text-sm">
            Your withdrawal has been processed successfully. Here are your transaction details:
          </p>
        </div>

        {/* Transaction Receipt */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-4">
          <h3 className="text-lg font-semibold text-center text-foreground mb-4">Transaction Receipt</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold text-green-600">₦{withdrawalData?.amount || '0'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Bank:</span>
              <span className="font-semibold text-foreground">{withdrawalData?.bankName || 'N/A'}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Account:</span>
              <span className="font-semibold text-foreground">
                {withdrawalData?.accountNumber ? maskAccountNumber(withdrawalData.accountNumber) : 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold text-green-600">Completed</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold text-foreground">{currentDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={handleShareSuccess}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full"
          >
            Share Success Story
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

export default WithdrawalSuccess;