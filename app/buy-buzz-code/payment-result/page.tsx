"use client"

import { useRouter } from "next/navigation"
import { X, EyeOff } from "lucide-react"

export default function BuzzCodePaymentResult() {
  const router = useRouter()

  const handleTryAgain = () => {
    router.push("/buy-buzz-code/payment")
  }

  const handleGoHome = () => {
    localStorage.removeItem("buzzCodePurchase")
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-sm mx-auto text-center">
        <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="w-12 h-12 text-white stroke-[3]" />
        </div>

        <h1 className="text-2xl font-bold text-orange-500 mb-4">Transaction verification failed!</h1>

        <p className="text-gray-900 text-base mb-8 leading-relaxed">
          Your payment could not be completed. Reason:No Payment received from you/ invalid payment method.
        </p>

        <div className="space-y-4">
          <button
            disabled
            className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <span>Not Available</span>
            <EyeOff className="w-4 h-4" />
          </button>

          <button
            onClick={handleTryAgain}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Go to Dashboard
          </button>

          <div className="text-center mt-4">
            <a href="/support" className="text-sm text-blue-600 hover:text-blue-800 underline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
