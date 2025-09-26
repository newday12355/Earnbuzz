import { ArrowLeft, Shield, Smartphone, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/more-options" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">About FairMoney</h1>
      </div>

      {/* Logo and Title */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
          F
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">FairMoney Pay</h2>
        <p className="text-muted-foreground">Your trusted financial companion</p>
      </div>

      {/* Description */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <p className="text-foreground leading-relaxed mb-4">
          FairMoney is Nigeria's leading digital financial services platform, designed to provide seamless, 
          secure, and affordable financial solutions for everyone. We believe in making financial services 
          accessible to all Nigerians, regardless of their background or location.
        </p>
        
        <p className="text-foreground leading-relaxed">
          With our innovative mobile app, you can access loans, make payments, buy airtime and data, 
          pay bills, and much more - all from the comfort of your smartphone. Our mission is to 
          democratize financial services and empower millions of Nigerians to achieve their financial goals.
        </p>
      </div>

      {/* Features */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">What We Offer</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Secure Transactions</h4>
              <p className="text-sm text-muted-foreground">Bank-grade security for all your financial transactions</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Smartphone className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Mobile Convenience</h4>
              <p className="text-sm text-muted-foreground">Access all services anytime, anywhere from your phone</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Users className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Community Support</h4>
              <p className="text-sm text-muted-foreground">Join our growing community of satisfied users</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Zap className="w-6 h-6 text-primary mt-1" />
            <div>
              <h4 className="font-medium text-foreground">Instant Services</h4>
              <p className="text-sm text-muted-foreground">Lightning-fast processing for all your needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Get in Touch</h3>
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">Email: support@fairmoney.io</p>
          <p className="text-muted-foreground">Phone: +234 700 FAIRMONEY</p>
          <p className="text-muted-foreground">Website: www.fairmoney.io</p>
        </div>
      </div>
    </div>
  );
};

export default About;