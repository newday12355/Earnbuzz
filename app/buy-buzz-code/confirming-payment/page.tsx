"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"

export default function ConfirmingBuzzCodePayment() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          router.push("/buy-buzz-code/payment-result")
          return 100
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-8 bg-white shadow-sm rounded-sm animate-float"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            <div className="w-full h-1 bg-gray-200 mt-1"></div>
            <div className="w-3/4 h-0.5 bg-gray-200 mt-1 ml-1"></div>
            <div className="w-full h-0.5 bg-gray-200 mt-1"></div>
            <div className="w-2/3 h-0.5 bg-gray-200 mt-1 ml-1"></div>
          </div>
        ))}
      </div>

      <div className="text-center max-w-sm mx-auto p-6 relative z-10">
        <div className="mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <CreditCard className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirming Payment</h2>
          <p className="text-gray-600 text-sm">We're verifying your ₦6,250 payment for your buzz code purchase</p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>✓ Payment received</p>
          <p>✓ Verifying transaction</p>
          <p className={progress > 50 ? "text-orange-600" : ""}>{progress > 50 ? "✓" : "○"} Generating buzz code</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          50% {
            transform: translateY(-10vh) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}
