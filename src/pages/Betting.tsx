import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Betting = () => {
  const { toast } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    amount: "",
    fairCode: ""
  });

  const platforms = ["SportyBet", "Bet9ja", "1xBet", "BetKing"];

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
        <h1 className="text-xl font-semibold text-foreground">Betting</h1>
      </div>

      <div className="bg-card rounded-2xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
          <Input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full"
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
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Select Betting Platform</label>
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`p-3 rounded-xl border text-center font-medium transition-colors ${
                  selectedPlatform === platform
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                {platform}
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

export default Betting;