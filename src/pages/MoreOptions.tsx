import { ArrowLeft, User, Info, Download, Play, CreditCard, Crown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MoreOptions = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    // Clear all user data from localStorage including bonus status
    localStorage.removeItem('user');
    localStorage.removeItem('bonusClaimed');
    localStorage.removeItem('dashboardBalance');
    navigate("/login");
  };

  const menuItems = [
    { icon: User, label: "Profile Information", route: "/profile", bgClass: "bg-primary/20" },
    { icon: Info, label: "About", route: "/about", bgClass: "bg-primary/20" },
    { icon: Download, label: "Download App", route: "https://median.co/share/krmenrl#apk", bgClass: "bg-primary/20", isExternal: true },
    { icon: Play, label: "Watch Tutorial", route: "https://youtube.com/@fairmoniepaysupport?si=LRFx7C7yjzTtHCdp", bgClass: "bg-primary/20", isExternal: true },
    { icon: CreditCard, label: "Buy Faircode", route: "/buy-faircode", bgClass: "bg-primary/20" },
    { icon: Crown, label: "Upgrade Account", route: "/upgrade-account", bgClass: "bg-yellow-100" },
    { icon: LogOut, label: "Log Out", route: "/login", bgClass: "bg-red-100", isLogout: true }
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <Link to="/dashboard" className="mr-4">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-xl font-semibold text-foreground">More Options</h1>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          item.isLogout ? (
            <button
              key={index}
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 bg-card p-4 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${item.bgClass} flex items-center justify-center`}>
                <item.icon className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-foreground font-medium">{item.label}</span>
            </button>
          ) : item.isExternal ? (
            <a
              key={index}
              href={item.route}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 bg-card p-4 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${item.bgClass} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${
                  item.label === "Upgrade Account" ? "text-yellow-600" : "text-primary"
                }`} />
              </div>
              <span className="text-foreground font-medium">{item.label}</span>
            </a>
          ) : (
            <Link
              key={index}
              to={item.route}
              className="flex items-center space-x-4 bg-card p-4 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${item.bgClass} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${
                  item.label === "Upgrade Account" ? "text-yellow-600" : "text-primary"
                }`} />
              </div>
              <span className="text-foreground font-medium">{item.label}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default MoreOptions;