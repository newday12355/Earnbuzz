import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JoinCommunity = () => {
  const handleTelegramJoin = () => {
    window.open("https://t.me/+Z93EW8PWHoQzNGU8", "_blank");
  };

  const handleWhatsAppJoin = () => {
    window.open("https://chat.whatsapp.com/Ct9thGEQZUMAhy0Sqp23Hc?mode=ems_copy_c", "_blank");
  };

  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Join Our Community</h1>
      </div>

      {/* Description */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground">
          Join our community to get updates, tips, and start earning with FairMonie Pay!
        </p>
      </div>

      {/* Telegram Channel */}
      <div className="bg-card rounded-2xl p-6 mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Send className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Telegram Channel</h3>
            <p className="text-sm text-muted-foreground">
              Join our Telegram community for updates and exclusive content
            </p>
          </div>
        </div>
        <Button 
          onClick={handleTelegramJoin}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Join Telegram Channel
        </Button>
      </div>

      {/* WhatsApp Group */}
      <div className="bg-card rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">WhatsApp Group</h3>
            <p className="text-sm text-muted-foreground">
              Connect with our WhatsApp community for instant updates
            </p>
          </div>
        </div>
        <Button 
          onClick={handleWhatsAppJoin}
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
        >
          Join WhatsApp Group
        </Button>
      </div>
    </div>
  );
};

export default JoinCommunity;