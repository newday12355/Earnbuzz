import { X, Clock, Gift, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface TransactionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionHistory = ({ isOpen, onClose }: TransactionHistoryProps) => {
  const [bonuses, setBonuses] = useState([]);

  // Listen for bonus claims from localStorage
  useEffect(() => {
    const checkBonusClaimed = () => {
      const balance = localStorage.getItem('dashboardBalance');
      if (balance && parseInt(balance) >= 250000) {
        setBonuses([{
          id: 1,
          amount: 250000,
          description: "Welcome Bonus",
          time: new Date().toLocaleString(),
          status: "claimed"
        }]);
      }
    };

    checkBonusClaimed();
    // Check every second for updates
    const interval = setInterval(checkBonusClaimed, 1000);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden animate-in slide-in-from-top-4 duration-300 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">History</h2>
          <button
            onClick={onClose}
            className="hover:bg-muted rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Title - Only Bonuses */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-center">Bonus History</h3>
        </div>

        {/* Content - Only Bonuses */}
        <div className="max-h-80 overflow-y-auto">
          <div className="space-y-4">
            {bonuses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bonus history yet</p>
              </div>
            ) : (
              bonuses.map((bonus) => (
                <div key={bonus.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-2xl">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{bonus.description}</p>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{bonus.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">
                      +₦{bonus.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      bonus.status === "claimed" 
                        ? "text-green-600 bg-green-100" 
                        : "text-yellow-600 bg-yellow-100"
                    }`}>
                      {bonus.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};