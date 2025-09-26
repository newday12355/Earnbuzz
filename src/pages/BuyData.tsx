import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BuyData = () => {
  const { toast } = useToast();
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fairCode: ""
  });

  const networks = ["MTN", "Airtel", "Glo", "9mobile"];
  const dataPlans = [
    { size: "1GB", price: "₦300" },
    { size: "2GB", price: "₦600" },
    { size: "5GB", price: "₦1,500" },
    { size: "10GB", price: "₦3,000" }
  ];

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
        <h1 className="text-xl font-semibold text-foreground">Buy Data</h1>
      </div>

      <div className="bg-card rounded-2xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
          <Input
            type="text"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Select Network</label>
          <div className="grid grid-cols-2 gap-3">
            {networks.map((network) => (
              <button
                key={network}
                onClick={() => setSelectedNetwork(network)}
                className={`p-3 rounded-xl border text-center font-medium transition-colors ${
                  selectedNetwork === network
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                {network}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Select Data Plan</label>
          <div className="space-y-3">
            {dataPlans.map((plan) => (
              <button
                key={plan.size}
                onClick={() => setSelectedPlan(plan.size)}
                className={`w-full p-3 rounded-xl border text-center font-medium transition-colors ${
                  selectedPlan === plan.size
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                {plan.size} - {plan.price}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Fair Code</label>
          <Input
            type="text"
            name="fairCode"
            placeholder="Enter your faircode"
            value={formData.fairCode}
            onChange={handleInputChange}
            className="w-full"
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
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BuyData;