import { X, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JoinGroupNotificationProps {
  onClose: () => void;
  onGetStarted: () => void;
}

export const JoinGroupNotification = ({ onClose, onGetStarted }: JoinGroupNotificationProps) => {
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);

  const handleJoinGroup = () => {
    setHasJoinedGroup(true);
    // Open WhatsApp group
    window.open("https://chat.whatsapp.com/Ct9thGEQZUMAhy0Sqp23Hc?mode=ac_t", "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="fairmoney-gradient rounded-3xl p-8 text-white max-w-sm w-full relative animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          {/* Users Icon */}
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">
            Join Our Community!
          </h2>
          
          {/* Description */}
          <p className="text-sm opacity-90 mb-8 leading-relaxed">
            Join our WhatsApp group to get updates, tips, and connect with other users of FairMonie Pay.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleJoinGroup}
              className={`w-full font-semibold py-4 rounded-full text-lg transition-all ${
                hasJoinedGroup 
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              {hasJoinedGroup ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Joined Group!</span>
                </div>
              ) : (
                "Join WhatsApp Group"
              )}
            </Button>
            
            <Button
              onClick={hasJoinedGroup ? onGetStarted : () => {}}
              disabled={!hasJoinedGroup}
              className={`w-full font-semibold py-4 rounded-full text-lg transition-all ${
                hasJoinedGroup 
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              Get Started
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-white hover:bg-white/10 font-medium py-3 rounded-full"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};