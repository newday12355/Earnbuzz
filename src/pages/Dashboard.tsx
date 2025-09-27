import { useEffect, useState } from "react";
import { User, Eye, EyeOff, Shield, Users, Calculator, Wifi, Target, CreditCard, Banknote, UserPlus, MoreHorizontal, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { WelcomeNotification } from "@/components/WelcomeNotification";
import { PaymentNotification } from "@/components/PaymentNotification";
import { JoinGroupNotification } from "@/components/JoinGroupNotification";
import { LiveChat } from "@/components/LiveChat";
import { TransactionHistory } from "@/components/TransactionHistory";
import { BottomCarousel } from "@/components/BottomCarousel";
import { WithdrawalNotification } from "@/components/WithdrawalNotification";
import { ProfileUpload } from "@/components/ProfileUpload";
// Remove useAuth import as we'll use localStorage

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);
  const [showJoinGroupNotification, setShowJoinGroupNotification] = useState(false);
  const [showPaymentNotification, setShowPaymentNotification] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [balance, setBalance] = useState(5000);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [countdown, setCountdown] = useState(3540); // 59 minutes = 3540 seconds
  const [timerActive, setTimerActive] = useState(false);
  const [hasStartedClaiming, setHasStartedClaiming] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
      // Check if claiming was started and restore timer state
      const claimingStarted = localStorage.getItem('claimingStarted');
      const timerStartTime = localStorage.getItem('timerStartTime');
      const currentBalance = localStorage.getItem('dashboardBalance');
      
      if (currentBalance) {
        setBalance(parseInt(currentBalance));
      } else {
        setBalance(5000);
      }
      
      if (claimingStarted === 'true' && timerStartTime) {
        const startTime = parseInt(timerStartTime);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, 3540 - elapsed); // 59 minutes
        
        setHasStartedClaiming(true);
        setCountdown(remaining);
        
        if (remaining > 0) {
          setTimerActive(true);
        } else {
          setTimerActive(false);
          // Auto-claim bonus if timer expired
          setTimeout(() => {
            setBalance(prev => {
              const newBalance = prev + 1000;
              localStorage.setItem('dashboardBalance', newBalance.toString());
              return newBalance;
            });
            // Restart timer
            const newStartTime = Date.now();
            localStorage.setItem('timerStartTime', newStartTime.toString());
            setCountdown(3540);
            setTimerActive(true);
          }, 1000);
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      // Show welcome notification after 1 second for authenticated users
      const welcomeTimer = setTimeout(() => {
        setShowWelcomeNotification(true);
      }, 1000);

      // Show payment notification after 4 seconds (3 seconds after first notification)
      const paymentTimer = setTimeout(() => {
        setShowPaymentNotification(true);
      }, 4000);

      return () => {
        clearTimeout(welcomeTimer);
        clearTimeout(paymentTimer);
      };
    }
  }, [user]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            // Auto-add 1000 to balance and restart timer
            setTimeout(() => {
              setBalance(currentBalance => {
                const newBalance = currentBalance + 1000;
                localStorage.setItem('dashboardBalance', newBalance.toString());
                return newBalance;
              });
              // Restart timer immediately
              const newStartTime = Date.now();
              localStorage.setItem('timerStartTime', newStartTime.toString());
              setCountdown(3540); // Reset to 59 minutes
              setTimerActive(true);
            }, 1000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, countdown]);

  const services = [
    { icon: Users, label: "Support", bgClass: "bg-primary/10", route: "/support" },
    { icon: Calculator, label: "Groups", bgClass: "bg-primary/10", route: "groups" },
    { icon: Banknote, label: "Withdraw", bgClass: "bg-primary/10", route: "/withdrawal-amount" },
    { icon: CreditCard, label: "Airtime", bgClass: "bg-primary/10", route: "/buy-airtime" },
    { icon: Wifi, label: "Data", bgClass: "bg-primary/10", route: "/buy-data" },
    { icon: Target, label: "Betting", bgClass: "bg-primary/10", route: "/betting" },
    { icon: CreditCard, label: "TV", bgClass: "bg-primary/10", route: "/tv-recharge" },
    { icon: CreditCard, label: "Buy Faircode", bgClass: "bg-primary/10", route: "/buy-faircode" },
    { icon: Banknote, label: "Loan", bgClass: "bg-primary/10", route: "/loan" },
    { icon: UserPlus, label: "Invitation", bgClass: "bg-primary/10", route: "/invite-earn" },
    { icon: MoreHorizontal, label: "More", bgClass: "bg-primary/10", route: "/more-options" }
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 p-3 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pt-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{user.fullName}</h1>
            <p className="text-sm text-muted-foreground">How are you doing today?</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Headphones Icon */}
          <div className="w-8 h-8 flex items-center justify-center animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>
          
          {/* Scan Icon */}
          <div className="w-8 h-8 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.1s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
            </svg>
          </div>
          
          {/* Notification Bell with Transaction History */}
          <div className="relative">
            <button 
              className="w-8 h-8 flex items-center justify-center animate-bounce"
              style={{ animationDelay: '0.2s' }}
              onClick={() => setShowTransactionHistory(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              {bonusClaimed && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="fairmoney-gradient rounded-2xl p-4 text-white mb-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm opacity-90">Available Balance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 rounded-full p-1 relative">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                1
              </div>
            </div>
            {(timerActive && countdown > 0) || hasStartedClaiming && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {countdown > 3540 ? '59:00' : `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`}
              </div>
            )}
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              {showBalance ? (
                <Eye className="w-4 h-4 opacity-90" />
              ) : (
                <EyeOff className="w-4 h-4 opacity-90" />
              )}
            </button>
          </div>
        </div>
        
        <div className="text-3xl font-bold mb-4 text-center">
          {showBalance ? `₦${balance.toLocaleString()}.00` : "₦****"}
        </div>
        
        <Button 
          onClick={() => {
            if (!bonusClaimed && !isClaiming && !timerActive && countdown === 0) {
              setIsClaiming(true);
              // Play bonus claim sound
              const audio = new Audio('data:audio/wav;base64,UklGRvIBAABXQVZFZm10IAAAAAAQAAABAAAAQB8AAEAfAAABAAgAZGF0YQoAAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJYfH8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ1Mp+DyvmEcBzuP1vLNeSsFJofF8N2QQAoUXrTp3aFQEQ==');
              audio.play().catch(() => {}); // Ignore errors if audio can't play
              
              setTimeout(() => {
                setBalance(prev => prev + 1000);
                setBonusClaimed(true);
                setIsClaiming(false);
                // Store in localStorage so TransactionHistory can see it and persist until logout
                localStorage.setItem('dashboardBalance', (balance + 1000).toString());
                localStorage.setItem('bonusClaimed', 'true');
                // Add bonus to state for red dot notification
                setBonuses([{
                  id: 1,
                  description: "Welcome Bonus",
                  amount: 1000,
                  status: "Completed",
                  time: new Date().toLocaleString()
                }]);
                
                // Restart countdown after 3 seconds
                setTimeout(() => {
                  setBonusClaimed(false);
                  setCountdown(60);
                  setTimerActive(true);
                }, 3000);
              }, 2000);
            }
          }}
          disabled={bonusClaimed || isClaiming || timerActive || countdown > 0}
          className={`w-full font-semibold py-3 rounded-full ${
            bonusClaimed 
              ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
              : isClaiming
              ? "bg-yellow-500 text-white cursor-not-allowed"
              : (timerActive || countdown > 0)
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-white text-primary hover:bg-white/90"
          }`}
        >
          {bonusClaimed 
            ? "✅ Bonus Claimed" 
            : isClaiming 
            ? "⏳ Claiming..." 
            : (timerActive || countdown > 0)
            ? `⏰ Wait ${countdown}s`
            : "🎁 Claim Bonus 🎁"
          }
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {services.slice(0, 8).map((service, index) => (
          service.route === "groups" ? (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div 
                className={`w-12 h-12 rounded-full ${service.bgClass} flex items-center justify-center cursor-pointer`}
                onClick={() => setShowGroupModal(true)}
              >
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-center text-muted-foreground font-medium">
                {service.label}
              </span>
            </div>
          ) : (
            <Link key={index} to={service.route} className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 rounded-full ${service.bgClass} flex items-center justify-center`}>
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-center text-muted-foreground font-medium">
                {service.label}
              </span>
            </Link>
          )
        ))}
      </div>
      
      {/* Second Row Services */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {services.slice(8).map((service, index) => (
          <Link key={index + 8} to={service.route} className="flex flex-col items-center space-y-2">
            <div className={`w-12 h-12 rounded-full ${service.bgClass} flex items-center justify-center`}>
              <service.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-center text-muted-foreground font-medium">
              {service.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border">
        <div className="flex justify-around py-3">
          <Link to="/dashboard" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-primary rounded-sm"></div>
            <span className="text-xs text-primary font-medium">Home</span>
          </Link>
          <Link to="/buy-faircode" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-muted rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Cards</span>
          </Link>
          <Link to="/loan" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-muted rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Loans</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-muted rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Profile</span>
          </Link>
        </div>
      </div>
      
      {/* Claiming Bonus Notification */}
      {isClaiming && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-lg animate-pulse z-50">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium">Claiming bonus...</span>
          </div>
        </div>
      )}
      
      {/* Bottom Carousel */}
      <BottomCarousel />

      {/* Live Chat */}
      <LiveChat />

      {/* Withdrawal Notifications */}
      <WithdrawalNotification />

      {/* Notifications */}
        {showJoinGroupNotification && (
          <JoinGroupNotification
            onClose={() => setShowJoinGroupNotification(false)}
            onGetStarted={() => setShowJoinGroupNotification(false)}
          />
        )}

        {showWelcomeNotification && (
          <WelcomeNotification
            onClose={() => setShowWelcomeNotification(false)}
            onJoinCommunity={() => {
              setShowWelcomeNotification(false);
              setShowJoinGroupNotification(true);
            }}
          />
        )}

      {showPaymentNotification && (
        <PaymentNotification
          onClose={() => setShowPaymentNotification(false)}
          onStartPayments={() => setShowPaymentNotification(false)}
        />
      )}

      {/* Transaction History */}
      <TransactionHistory
        isOpen={showTransactionHistory}
        onClose={() => setShowTransactionHistory(false)}
      />

      {/* Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Join Our Community</h2>
              <button onClick={() => setShowGroupModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <a 
                href="https://chat.whatsapp.com/Ct9thGEQZUMAhy0Sqp23Hc?mode=ems_copy_c"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-full font-semibold transition-colors"
                onClick={() => setShowGroupModal(false)}
              >
                Join WhatsApp Group
              </a>
              <a 
                href="https://t.me/+Z93EW8PWHoQzNGU8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-full font-semibold transition-colors"
                onClick={() => setShowGroupModal(false)}
              >
                Join Telegram Group
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;