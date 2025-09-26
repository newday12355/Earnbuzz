import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface WithdrawalData {
  name: string;
  amount: string;
  time: string;
}

export const WithdrawalNotification = () => {
  const [currentNotification, setCurrentNotification] = useState<WithdrawalData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const withdrawals: WithdrawalData[] = [
    { name: "John Adebayo", amount: "₦150,000", time: "2 mins ago" },
    { name: "Sarah Okafor", amount: "₦200,000", time: "5 mins ago" },
    { name: "David Emeka", amount: "₦100,000", time: "8 mins ago" },
    { name: "Grace Amina", amount: "₦250,000", time: "12 mins ago" },
    { name: "Michael Tunde", amount: "₦180,000", time: "15 mins ago" },
    { name: "Blessing Kemi", amount: "₦220,000", time: "18 mins ago" },
    { name: "Ibrahim Hassan", amount: "₦130,000", time: "22 mins ago" },
    { name: "Chioma Nkem", amount: "₦190,000", time: "25 mins ago" },
  ];

  useEffect(() => {
    let notificationIndex = 0;

    const showNotification = () => {
      setCurrentNotification(withdrawals[notificationIndex]);
      setIsVisible(true);

      // Hide after 2 seconds
      setTimeout(() => {
        setIsVisible(false);
        
        // Show next notification after 2 seconds
        setTimeout(() => {
          notificationIndex = (notificationIndex + 1) % withdrawals.length;
          showNotification();
        }, 2000);
      }, 2000);
    };

    // Start showing notifications after 3 seconds
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-80">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{currentNotification.name}</p>
          <p className="text-xs opacity-90">
            Successfully withdrew {currentNotification.amount} • {currentNotification.time}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-green-600 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};