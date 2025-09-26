import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Shield, Award, TrendingUp, DollarSign, Gift, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    const currentBalance = localStorage.getItem('dashboardBalance');
    if (currentBalance) {
      setBalance(parseInt(currentBalance));
    }
    
    const bonusStatus = localStorage.getItem('bonusClaimed');
    setBonusClaimed(bonusStatus === 'true');
  }, []);

  if (!user) {
    return null;
  }

  const extractNameFromEmail = (email: string) => {
    if (!email) return "User";
    
    // Get the part before @ symbol
    const username = email.split('@')[0];
    
    // Remove numbers and special characters, keep only letters
    const nameOnly = username.replace(/[^a-zA-Z]/g, '');
    
    // Capitalize first letter and make rest lowercase
    return nameOnly.charAt(0).toUpperCase() + nameOnly.slice(1).toLowerCase();
  };

  const getUserInitials = (email: string) => {
    const name = extractNameFromEmail(email);
    return name.slice(0, 2).toUpperCase();
  };

  const memberSince = new Date(2024, 0, 1); // January 2024
  const daysSinceMember = Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24));
  const totalTransactions = bonusClaimed ? 1 : 0;
  const accountScore = bonusClaimed ? 85 : 50;

  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/more-options" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">Profile Information</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
            {getUserInitials(user.email)}
          </div>
          <h2 className="text-xl font-semibold text-foreground">{extractNameFromEmail(user.email).toUpperCase()}</h2>
          <span className="text-sm text-muted-foreground">
            {bonusClaimed ? "Active Member" : "New Member"}
          </span>
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">₦{balance.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Current Balance</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalTransactions}</div>
            <div className="text-xs text-muted-foreground">Total Transactions</div>
          </div>
        </div>

        {/* Enhanced Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-lg font-bold text-green-600">{accountScore}%</span>
            </div>
            <div className="text-xs text-muted-foreground">Account Score</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Activity className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-lg font-bold text-blue-600">{daysSinceMember}</span>
            </div>
            <div className="text-xs text-muted-foreground">Days Active</div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Email</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Phone</div>
              <div className="text-xs text-muted-foreground">{user.phone || '+234 XXX XXX XXXX'}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Member Since</div>
              <div className="text-xs text-muted-foreground">January 2024</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Account Status</div>
              <div className="text-xs text-green-600">
                {bonusClaimed ? "Active & Verified" : "Pending Verification"}
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white">
          Edit Profile
        </Button>
      </div>

      {/* Account Analysis */}
      <div className="bg-card rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Analysis</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-foreground">Financial Health</span>
            </div>
            <span className="text-sm font-bold text-green-600">
              {balance > 100000 ? "Excellent" : balance > 0 ? "Good" : "Getting Started"}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-foreground">Activity Level</span>
            </div>
            <span className="text-sm font-bold text-blue-600">
              {bonusClaimed ? "Active" : "New User"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-foreground">Trust Score</span>
            </div>
            <span className="text-sm font-bold text-purple-600">{accountScore}/100</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
        {bonusClaimed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Award className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-sm font-medium text-foreground">Welcome Bonus Claimed</div>
                <div className="text-xs text-muted-foreground">Successfully claimed ₦250,000 welcome bonus</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Gift className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-sm font-medium text-foreground">Account Activated</div>
                <div className="text-xs text-muted-foreground">Your account is now fully active</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Gift className="w-8 h-8 text-gray-400" />
            <div>
              <div className="text-sm font-medium text-foreground">Welcome Bonus Available</div>
              <div className="text-xs text-muted-foreground">Claim your ₦250,000 welcome bonus from dashboard</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;