import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginCarousel } from "@/components/LoginCarousel";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  // Check if user is already logged in and set initial tab
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      navigate("/dashboard");
    }
    
    // Set initial tab based on URL parameter
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [navigate, searchParams]);

  const extractNameFromEmail = (email: string) => {
    if (!email) return "User";
    
    // Get the part before @ symbol
    const username = email.split('@')[0];
    
    // Remove numbers and special characters, keep only letters
    const nameOnly = username.replace(/[^a-zA-Z]/g, '');
    
    // Split into words and capitalize first letter of each word
    const words = nameOnly.split(/(?=[A-Z])/).filter(word => word.length > 0);
    const capitalizedWords = words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    
    return capitalizedWords.join(' ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple delay to simulate processing
    setTimeout(() => {
      const extractedName = extractNameFromEmail(email);
      
      if (isSignUp) {
        // Store user data locally for create account
        const userData = {
          email,
          fullName: fullName || extractedName, // Use provided name or extracted name
          id: Date.now().toString()
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Account created successfully",
          description: `Welcome to FairMoney Pay, ${fullName || extractedName}!`
        });
      } else {
        // Store user data locally for login - use extracted name from email
        const userData = {
          email,
          fullName: extractedName, // Use extracted name from email
          id: Date.now().toString()
        };
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Top Carousel Section */}
        <div className="mb-6">
          <LoginCarousel />
        </div>

        {/* Login Form Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Tab Navigation */}
            <div className="flex">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  !isSignUp 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 ${
                  isSignUp 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div className="space-y-2">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-14 text-base border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 text-base border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 text-base border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white text-base font-medium rounded-xl transition-colors duration-200 shadow-lg" 
                  disabled={loading}
                >
                  {loading ? "Processing..." : isSignUp ? "CREATE ACCOUNT" : "LOGIN"}
                </Button>
              </form>
              
              {!isSignUp && (
                <div className="text-center mt-6">
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors duration-200">
                    Forgot password?
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;