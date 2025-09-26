import { useState } from "react";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BuyAirtime = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [fairCode, setFairCode] = useState("");

  const networks = ["MTN", "Airtel", "Glo", "9mobile"];

  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Buy Airtime</h1>
      </div>

      {/* Form Card */}
      <div className="bg-card rounded-2xl p-6 space-y-6">
        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Network Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select Network</label>
          <div className="grid grid-cols-2 gap-3">
            {networks.map((network) => (
              <button
                key={network}
                onClick={() => setSelectedNetwork(network)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedNetwork === network
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted bg-muted/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                {network}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Amount</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Fair Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Fair Code</label>
          <Input
            type="text"
            placeholder="Enter your faircode"
            value={fairCode}
            onChange={(e) => setFairCode(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full"
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

export default BuyAirtime;