import { ArrowLeft, CreditCard, Copy, Upload, X, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const BuyFaircode = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      return {
        fullName: parsedUser.fullName || "",
        email: parsedUser.email || ""
      };
    }
    return {
      fullName: "",
      email: ""
    };
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProceedToPayment = () => {
    if (formData.fullName && formData.email) {
      setCurrentStep(2);
      // After 2 seconds, move to payment details
      setTimeout(() => {
        setCurrentStep(3);
        // Show modal and speak notice 2 seconds after bank transfer page shows
        setTimeout(() => {
          setShowConfirmationModal(true);
          speakNoticeInstructions();
        }, 2000);
      }, 2000);
    }
  };

  const handleMakePayment = () => {
    // Stay on bank transfer page for 10 minutes (600000ms) or until user clicks "I have paid"
    // This does nothing until user clicks "I have paid"
  };

  const handleContinuePayment = () => {
    // Stop any ongoing speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    // Just close the modal and stay on bank transfer page (step 3)
    setShowConfirmationModal(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const speakNoticeInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Before you make this transfer, please note: Transfer only the exact amount. Do not transfer an incorrect amount. Do not dispute any transactions made to our account. It can cause restrictions and other impacts. Avoid using Opay bank for your payment. This can lead to delays in verifying your payment."
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  // Remove the useEffect that speaks bank details

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 p-4 max-w-4xl mx-auto">
        <div className="flex items-center mb-6 pt-2">
          <Link to="/dashboard" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">Buy Faircode</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 mx-auto max-w-md mt-6 h-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Faircode Purchase</h2>
            <div className="text-3xl font-bold text-green-600 mb-2">₦5,500</div>
            <p className="text-base text-gray-600">One-time purchase</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Full Name *</label>
              <Input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border-2 border-green-200 focus:border-green-500 py-3 text-base"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Email Address *</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-2 border-green-200 focus:border-green-500 py-3 text-base"
              />
            </div>

            <Button 
              onClick={handleProceedToPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mt-6 text-base"
              disabled={!formData.fullName || !formData.email}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 mx-4 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-green-600 mb-2">Processing...</h2>
          <p className="text-green-500">Preparing payment account details</p>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 p-4 max-w-4xl mx-auto">
        <div className="flex items-center mb-4 pt-2">
          <ArrowLeft className="w-6 h-6 text-white" onClick={() => setCurrentStep(1)} />
          <h1 className="text-lg font-semibold text-white ml-4">Make Payment</h1>
        </div>

        <div className="bg-white rounded-2xl p-6 mx-auto max-w-2xl mt-6 h-auto">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-green-600 mb-1">Make Payment</h2>
            <p className="text-sm text-green-500">Transfer to the account below</p>
          </div>

          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-600">Account Number</p>
                <p className="font-bold text-lg">8102562883</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard("8102562883")}
                className="text-green-600"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-3">
              <div className="bg-gray-50 p-3 rounded-lg flex-1">
                <p className="text-xs text-gray-600">Bank</p>
                <p className="font-bold text-sm">MOMO PSB</p>
              </div>
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg flex-1 text-center">
                <p className="text-xs text-gray-600">Amount</p>
                <p className="text-lg font-bold text-green-600">₦5,500</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Account Name</p>
              <p className="font-bold text-sm">Veronica Chisom Benjamin</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-green-300 rounded-lg p-3 mt-4">
            <div className="flex items-center space-x-2 mb-2">
              <Upload className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Upload payment screenshot *</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="receipt-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setReceiptUploaded(true);
                  toast({
                    title: "Receipt Uploaded Successfully",
                    description: "Your payment receipt has been uploaded.",
                  });
                }
              }}
            />
            <label htmlFor="receipt-upload">
              <Button variant="outline" className={`w-full cursor-pointer py-2 ${receiptUploaded ? 'border-green-500 bg-green-50 text-green-700' : 'border-green-300 text-green-600 hover:bg-green-50'}`} asChild>
                <span>
                  {receiptUploaded ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Receipt Uploaded
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose image
                    </>
                  )}
                </span>
              </Button>
            </label>
            <p className="text-xs text-gray-500 mt-1">Upload your payment receipt for fast verification.</p>
          </div>

          <Button 
            onClick={() => {
              setShowConfirmationModal(false);
              setCurrentStep(4);
              setIsConfirming(true);
              
              // Simulate payment confirmation process (5 seconds)
              setTimeout(() => {
                setIsConfirming(false);
                // Navigate to payment not confirmed page
                navigate('/payment-not-confirmed');
              }, 5000);
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-full mt-4"
          >
            I have paid
          </Button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-4 mx-4 max-w-md w-full h-auto">
              <div className="flex justify-between items-start mb-3">
                <div></div>
                <button onClick={() => setShowConfirmationModal(false)}>
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">Pay NGN 5,500.00</h2>
                <p className="text-sm text-gray-600 mb-3">Before you make this transfer</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-600">Transfer only the exact amount</p>
                    <p className="text-xs text-gray-600">Do not transfer an incorrect amount.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-600">Do not dispute any transactions made to our account</p>
                    <p className="text-xs text-gray-600">It can cause restrictions and other impacts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-600">Avoid using Opay bank for your payment</p>
                    <p className="text-xs text-gray-600">This can lead to delays in verifying your payment.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
                <p className="text-xs text-gray-700">I understand these instructions.</p>
              </div>

              <Button 
                onClick={handleContinuePayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-full"
              >
                Continue Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentStep === 4 && isConfirming) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 mx-4 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
          <h2 className="text-xl font-bold text-green-600 mb-2">Confirming...</h2>
          <p className="text-green-500">Confirming your payment please wait..</p>
        </div>
      </div>
    );
  }

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-500 to-red-600 p-4 max-w-md mx-auto">
        <div className="flex items-center mb-6 pt-2">
          <ArrowLeft className="w-6 h-6 text-white" onClick={() => navigate('/dashboard')} />
          <h1 className="text-xl font-semibold text-white ml-4">Payment Status</h1>
        </div>

        <div className="bg-white rounded-2xl p-8 mx-4 mt-16 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">!</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-red-500 mb-4">Payment Not Confirmed</h2>
          <p className="text-gray-600 mb-8">
            Payment not confirmed. Please don't dispute any transfer to us. Contact support instead.
          </p>

          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-2"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default BuyFaircode;