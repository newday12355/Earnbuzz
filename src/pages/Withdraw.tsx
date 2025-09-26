import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Withdraw = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankName: "",
    accountName: "",
    amount: "",
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
        <h1 className="text-lg font-semibold text-foreground">Withdraw To Bank Account</h1>
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
          <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
          <Input
            type="text"
            name="bankName"
            placeholder="Select Bank"
            value={formData.bankName}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Account Name</label>
          <Input
            type="text"
            name="accountName"
            placeholder="Account Name"
            value={formData.accountName}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
          <Input
            type="text"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Fair Code</label>
          <Input
            type="text"
            name="fairCode"
            placeholder="Enter fair code"
            value={formData.fairCode}
            onChange={handleInputChange}
            className="w-full border border-input rounded-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="text-center py-4">
          <p className="text-lg font-semibold text-primary">Available Balance: ₦250,000.00</p>
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full"
          onClick={() => {
            // Check if all fields are filled
            if (!formData.accountNumber || !formData.bankName || !formData.accountName || !formData.amount || !formData.fairCode) {
              toast({
                title: "Incomplete Information",
                description: "Please fill in all required fields.",
                variant: "destructive"
              });
              return;
            }

            // Simulate fair code validation (you can add actual validation logic here)
            if (formData.fairCode.length < 6) {
              navigate('/buy-faircode');
              return;
            }

            // Navigate to success page with withdrawal data
            navigate('/withdrawal-success', {
              state: {
                withdrawalData: formData
              }
            });
          }}
        >
          Proceed
        </Button>

        <Button variant="ghost" className="w-full text-primary font-semibold py-3">
          Buy Fair Code
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;