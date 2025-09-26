import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const LoanApplication = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bank: "",
    loanAmount: "",
    fairCode: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Apply for Loan</h1>
      </div>

      <div className="bg-card rounded-2xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Account Number</label>
          <Input
            type="text"
            name="accountNumber"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Account Name</label>
          <Input
            type="text"
            name="accountName"
            placeholder="Enter account name"
            value={formData.accountName}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select Bank</label>
          <Input
            type="text"
            name="bank"
            placeholder="Select your bank"
            value={formData.bank}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Enter Loan Amount</label>
          <Input
            type="text"
            name="loanAmount"
            placeholder="Enter loan amount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Fair Code</label>
          <Input
            type="text"
            name="fairCode"
            placeholder="Enter your faircode"
            value={formData.fairCode}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full mt-6"
          onClick={() => {
            toast({
              title: "Wrong Fair Code",
              description: "Please purchase a valid Fair Code from the Buy Fair Code page.",
              variant: "destructive"
            });
          }}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default LoanApplication;