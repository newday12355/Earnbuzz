import { ArrowLeft, Send, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Support = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-3">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Support</h1>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">How can we help you?</h2>
        <p className="text-muted-foreground">Choose your preferred way to get support from our team</p>
      </div>

      {/* Support Options */}
      <div className="space-y-4">
        <div className="bg-card rounded-2xl p-4 border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Telegram Support</h3>
              <p className="text-sm text-muted-foreground mb-2">Get instant support through our Telegram channel</p>
              <p className="text-sm text-primary">fairmoney</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-2">Send us an email and we'll get back to you within 24 hours</p>
              <p className="text-sm text-primary">fairmoneysupport@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-2">Chat with our support team in real-time</p>
              <p className="text-sm text-primary">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;