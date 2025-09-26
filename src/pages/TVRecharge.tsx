import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TVRecharge = () => {
  const { toast } = useToast();
  const [selectedTVType, setSelectedTVType] = useState("");
  const [formData, setFormData] = useState({
    iucNumber: "",
    amount: "",
    fairCode: ""
  });

  const tvTypes = ["DSTV", "GOTV", "Startimes", "MYTV"];

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
        <h1 className="text-xl font-semibold text-foreground">TV Recharge</h1>
      </div>

      <div className="bg-card rounded-2xl p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Select TV Type</label>
          <div className="grid grid-cols-2 gap-3">
            {tvTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedTVType(type)}
                className={`p-3 rounded-xl border text-center font-medium transition-colors ${
                  selectedTVType === type
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">IUC Number</label>
          <Input
            type="text"
            name="iucNumber"
            placeholder="Enter your IUC number"
            value={formData.iucNumber}
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
          <label className="block text-sm font-medium text-foreground mb-2">Fair Code</label>
          <Input
            type="text"
            name="fairCode"
            placeholder="Enter your faircode (e.g., F-245698)"
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

export default TVRecharge;