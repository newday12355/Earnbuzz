import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen fairmoney-gradient flex items-center justify-center p-4">
      <div className="text-center max-w-xs mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="w-8 h-8 bg-primary-foreground rounded mr-2"></div>
          <div className="w-6 h-6 bg-primary-foreground/80 rounded mr-2"></div>
          <div className="w-4 h-4 bg-primary-foreground/60 rounded"></div>
        </div>
        <h1 className="text-4xl font-bold mb-3 text-primary-foreground">FairMoney</h1>
        <p className="text-lg text-primary-foreground/90 mb-6">Rebuilding Africa's money story</p>
        
        <div className="space-y-3">
          <Link to="/login?tab=login">
            <button className="btn-primary w-full text-base py-3">Get Started</button>
          </Link>
          <Link to="/login?tab=signup">
            <button className="btn-secondary w-full text-base py-3 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
