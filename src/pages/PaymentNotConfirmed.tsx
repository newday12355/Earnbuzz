import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentNotConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-auto text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-red-500 mb-6">
          Payment Not Confirmed
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-base mb-8 leading-relaxed">
          Payment not confirmed. Please don't dispute any transfer to us. Contact support instead.
        </p>

        {/* Go Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 rounded-lg"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PaymentNotConfirmed;