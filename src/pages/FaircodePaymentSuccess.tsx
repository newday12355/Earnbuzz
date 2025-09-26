import { ArrowLeft, CheckCircle, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FaircodePaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fairCode] = useState("98867830"); // Generated fair code

  const copyFairCode = () => {
    navigator.clipboard.writeText(fairCode);
    toast({
      title: "Fair Code Copied",
      description: "Fair code has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <h1 className="text-xl font-semibold text-white">Payment Successful</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 mx-4 mt-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center relative">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Confirmed!</h2>
          <p className="text-gray-600 text-base mb-6">
            Your payment has been confirmed successfully. Here is your Fair Code:
          </p>
        </div>

        {/* Fair Code Display */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Your Fair Code</p>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl font-bold text-green-600 tracking-wider">{fairCode}</span>
              <button 
                onClick={copyFairCode}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm">
            Save this code safely. You will need it for future transactions.
          </p>
        </div>

        {/* Done Button */}
        <Button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full text-lg"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default FaircodePaymentSuccess;