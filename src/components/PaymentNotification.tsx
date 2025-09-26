import { X, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentNotificationProps {
  onClose: () => void;
  onStartPayments: () => void;
}

export const PaymentNotification = ({ onClose, onStartPayments }: PaymentNotificationProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-3xl p-6 max-w-sm w-full relative animate-in slide-in-from-bottom-4 duration-300 shadow-xl">
        {/* Header Bar */}
        <div className="fairmoney-gradient rounded-full p-3 mb-6 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Payment Now Fast!</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-center">
          {/* Title */}
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Lightning Fast Payments!</span>
          </h2>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Great news! Our payment system has been upgraded. Your payments will now be processed and verified much faster than before.
          </p>
          
          {/* What's New Section */}
          <div className="bg-muted/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">What's New:</span>
            </div>
            
            <div className="space-y-2 text-left text-sm text-muted-foreground">
              <div>• Instant payment verification</div>
              <div>• Faster processing times</div>
              <div>• Real-time payment updates</div>
              <div>• Improved payment reliability</div>
            </div>
          </div>
          
          {/* Action Button */}
          <Button
            onClick={onStartPayments}
            className="w-full btn-primary text-lg mb-4"
          >
            Start Making Payments
          </Button>
          
          {/* Footer Message */}
          <p className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
            <span>Make your payments now and experience the speed!</span>
            <span>🚀</span>
          </p>
        </div>
      </div>
    </div>
  );
};