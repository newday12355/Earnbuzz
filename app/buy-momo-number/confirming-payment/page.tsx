"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Clock, CreditCard } from "lucide-react"

export default function ConfirmingPaymentPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Verifying payment details...",
    "Confirming transaction...",
    "Processing MOMO Number...",
    "Finalizing purchase...",
  ]

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1.25 // Complete in 8 seconds
      })
    }, 100)

    // Step animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)

    // Change the redirect timeout to point to success page:
    const timer = setTimeout(() => {
      router.push("/buy-momo-number/payment-result?status=failed&amount=7100")
    }, 8000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(timer)
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Payment Confirmation</h1>
            <p className="text-sm text-gray-500">Processing your MOMO Number purchase</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Animated Circle */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-orange-200 flex items-center justify-center relative overflow-hidden">
            {/* Animated background */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300"
              style={{
                clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`,
              }}
            />

            {/* Icon */}
            <div className="relative z-10">
              {progress < 100 ? (
                <Clock className="h-12 w-12 text-orange-600 animate-pulse" />
              ) : (
                <CheckCircle className="h-12 w-12 text-white animate-bounce" />
              )}
            </div>
          </div>

          {/* Progress Ring */}
          <svg className="absolute inset-0 w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-orange-200"
            />
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
              className="text-orange-500 transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Progress Text */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {progress < 100 ? "Confirming Payment" : "Payment Confirmed!"}
          </h2>
          <p className="text-gray-600 animate-pulse">{steps[currentStep]}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-white rounded-lg p-4 shadow-sm border w-full max-w-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Amount</span>
            <span className="font-semibold">₦7,100</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Service</span>
            <span className="font-semibold">MOMO Number</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <span className={`font-semibold ${progress < 100 ? "text-orange-600" : "text-green-600"}`}>
              {progress < 100 ? "Processing..." : "Confirmed"}
            </span>
          </div>
        </div>

        {/* Loading Dots */}
        {progress < 100 && (
          <div className="flex space-x-1 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-sm text-gray-500">Please do not close this page while we process your payment</p>
        <p className="text-xs text-gray-400 mt-1">Momo Credit Financial Services</p>
      </div>
    </div>
  )
}
