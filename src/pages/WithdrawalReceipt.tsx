import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WithdrawalReceipt = () => {
  const location = useLocation();
  const withdrawalData = location.state?.withdrawalData;
  
  // Get current date and time
  const currentDate = new Date();
  const formatDate = currentDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  const formatTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  // Generate transaction reference
  const transactionRef = `FMP${Date.now().toString().slice(-8)}`;

  const handleShare = () => {
    const message = `💰 Withdrawal In Progress!\n\nAmount: ₦${withdrawalData?.amount?.toLocaleString()}\nBank: ${withdrawalData?.bankName}\nStatus: Pending\nRef: ${transactionRef}\n\nFairMoney Pay - Fast & Secure! 🚀`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Withdrawal Receipt',
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
      alert('Receipt details copied to clipboard!');
    }
  };

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
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Withdrawal Receipt</h1>
      </div>

      <div className="bg-card rounded-2xl p-6 space-y-6">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center relative">
            <Clock className="w-10 h-10 text-orange-600" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">Withdrawal In Progress</h2>
          <p className="text-muted-foreground text-sm">
            Your withdrawal request has been received and is being processed. You will receive your money shortly.
          </p>
        </div>

        {/* Transaction Receipt */}
        <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-4 space-y-4 border border-muted-foreground/10">
          <h3 className="text-lg font-semibold text-center text-foreground mb-4">Transaction Receipt</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-bold text-xl text-primary">₦{withdrawalData.amount?.toLocaleString()}.00</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Bank:</span>
              <span className="font-semibold text-foreground">{withdrawalData.bankName}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Account Number:</span>
              <span className="font-semibold text-foreground">{withdrawalData.accountNumber}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Account Name:</span>
              <span className="font-semibold text-foreground">{withdrawalData.accountName}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-semibold text-orange-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Pending
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Reference:</span>
              <span className="font-semibold text-foreground text-sm">{transactionRef}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-muted-foreground/10">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-semibold text-foreground">{formatDate}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-semibold text-foreground">{formatTime}</span>
            </div>
          </div>
        </div>

        {/* Processing Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 text-center">
            <strong>Processing Time:</strong> Your withdrawal will be processed within 24 hours. 
            You will receive an SMS notification once completed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={handleShare}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Receipt
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

export default WithdrawalReceipt;