"use client"

import { useState } from "react"
import { X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WelcomePopupProps {
  userName: string
  onClose: () => void
}

export function WelcomePopup({ userName, onClose }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Gift className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Welcome!</h3>
              <p className="text-sm text-gray-600">Hi {userName}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🎉</div>
          <h4 className="font-semibold text-lg mb-2">Welcome to Earn Buzz!</h4>
          <p className="text-gray-600 text-sm">
            You've received a welcome bonus! Start exploring our features and earn more rewards.
          </p>
        </div>

        <div className="space-y-3">
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-orange-600">💰</span>
              <span className="text-sm font-medium">Welcome Bonus Added</span>
            </div>
          </div>

          <Button onClick={handleClose} className="w-full bg-orange-600 hover:bg-orange-700">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
