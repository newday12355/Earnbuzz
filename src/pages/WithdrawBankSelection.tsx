import { ArrowLeft, Check } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const WithdrawBankSelection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount || 0;
  
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    accountName: ""
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const banks = [
    "Access Bank", "Citibank", "Ecobank", "Fidelity Bank", "First Bank of Nigeria",
    "First City Monument Bank", "Globus Bank", "Guaranty Trust Bank",
    "Heritage Bank", "Jaiz Bank", "Keystone Bank", "Kuda Bank", "Moniepoint", "Opay",
    "Palmpay", "Polaris Bank", "Providus Bank", "Stanbic IBTC Bank", 
    "Standard Chartered", "Sterling Bank", "SunTrust Bank", "Titan Trust Bank",
    "Union Bank", "United Bank for Africa", "Unity Bank", "VFD Microfinance Bank",
    "Wema Bank", "Zenith Bank"
  ].sort();

  const handleAccountNumberChange = (value: string) => {
    setFormData(prev => ({ ...prev, accountNumber: value }));
    setIsVerified(false);
    setFormData(prev => ({ ...prev, accountName: "" }));
    
    if (value.length === 10 && formData.bankName) {
      verifyAccount(value, formData.bankName);
    }
  };

  const handleBankChange = (value: string) => {
    setFormData(prev => ({ ...prev, bankName: value }));
    setIsVerified(false);
    setFormData(prev => ({ ...prev, accountName: "" }));
    
    if (formData.accountNumber.length === 10) {
      verifyAccount(formData.accountNumber, value);
    }
  };

  const verifyAccount = (accountNumber: string, bankName: string) => {
    if (accountNumber.length !== 10 || !bankName) return;
    
    setIsVerifying(true);
    
    // Simulate account verification
    setTimeout(() => {
      const mockNames = [
        "JOHN SMITH DOE", "MARY JANE JOHNSON", "DAVID MICHAEL BROWN", 
        "SARAH ELIZABETH DAVIS", "JAMES ROBERT WILSON", "LISA MARIE ANDERSON"
      ];
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      
      setFormData(prev => ({ ...prev, accountName: randomName }));
      setIsVerified(true);
      setIsVerifying(false);
    }, 2000);
  };

  const handleCashout = () => {
    if (!formData.accountNumber || !formData.bankName || !isVerified) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields and verify your account.",
        variant: "destructive"
      });
      return;
    }

    // Navigate to confirmation page
    navigate('/withdrawal-confirmation', {
      state: {
        withdrawalData: {
          ...formData,
          amount: amount
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/withdrawal-amount" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg font-semibold text-foreground">Bank Details</h1>
      </div>

      <div className="bg-card rounded-2xl p-4 space-y-4">
        {/* Amount Display */}
        <div className="text-center py-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">Withdrawal Amount</p>
          <p className="text-2xl font-bold text-primary">₦{amount.toLocaleString()}.00</p>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Account Number</label>
          <Input
            type="text"
            placeholder="Enter 10-digit account number"
            value={formData.accountNumber}
            onChange={(e) => handleAccountNumberChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full"
            maxLength={10}
          />
        </div>

        {/* Bank Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select Bank</label>
          <Select onValueChange={handleBankChange} value={formData.bankName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose your bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Account Name Display */}
        {(formData.accountNumber.length === 10 && formData.bankName) && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Account Name</label>
            <div className="relative">
              <Input
                type="text"
                value={isVerifying ? "Verifying..." : formData.accountName}
                disabled
                className="w-full bg-muted/50"
              />
              {isVerified && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>
            {isVerified && (
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <Check className="w-3 h-3 mr-1" />
                Account verified successfully
              </p>
            )}
          </div>
        )}

        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full mt-6"
          onClick={handleCashout}
          disabled={!isVerified || isVerifying}
        >
          {isVerifying ? "Verifying Account..." : "Cashout"}
        </Button>
      </div>
    </div>
  );
};

export default WithdrawBankSelection;