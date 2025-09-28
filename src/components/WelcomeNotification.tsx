"use client";

import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface TutorialModalProps {
  onComplete: () => void;
}

export default function TutorialModal({ onComplete }: TutorialModalProps) {
  const [user, setUser] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyCompleted = localStorage.getItem("earnbuzz_completed");
    if (!alreadyCompleted) {
      setShow(true);
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleJoinCommunity = () => {
    window.open("https://t.me/+xv4Yy124AGRhNWU8", "_blank");
    localStorage.setItem("earnbuzz_joined", "true");
  };

  const handleClose = () => {
    localStorage.setItem("earnbuzz_completed", "true");
    setShow(false);
    onComplete();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="fairmoney-gradient rounded-3xl p-8 text-white max-w-sm w-full relative animate-in slide-in-from-bottom-4 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Gift Icon */}
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">Welcome to FairMonie Pay!</h2>

          {/* Greeting */}
          <p className="text-lg mb-4">
            Hello{" "}
            <span className="font-bold">
              {user?.fullName?.toUpperCase() || "USER"}
            </span>{" "}
            👋
          </p>

          {/* Description */}
          <p className="text-sm opacity-90 mb-8 leading-relaxed">
            Welcome to FairMonie Pay! Join our community to get updates and
            start earning with FairMonie Pay.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleJoinCommunity}
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-4 rounded-full text-lg"
            >
              Join Community
            </Button>
            <Button
              onClick={handleClose}
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
}