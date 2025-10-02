"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { XCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PaymentData {
  amount: number
}

export default function PaymentResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount") || "0"

  const message = "Payment Not Received"
  const icon = <XCircle className="h-20 w-20 text-red-500" />
  const textColor = "text-red-700"

  useEffect(() => {
    // Clear form data as the payment process is concluded (failed)
    localStorage.removeItem("momo-credit-momo-number-form")
    // Ensure hasMomoNumber is not set to true on failure
    const storedUser = localStorage.getItem("momo-credit-user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.hasMomoNumber) {
        // If it was somehow set, revert it, or ensure it's false
        user.hasMomoNumber = false
        localStorage.setItem("momo-credit-user", JSON.stringify(user))
      }
    }
  }, [])

  const handleBackToDash = () => {
    router.push("/dashboard")
  }

  const formatCurrencyNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] p-4 flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <div className="mb-6">{icon}</div>
        <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>{message}</h1>
        <p className="text-gray-600 text-lg mb-6">
          We could not confirm your payment of {formatCurrencyNaira(Number.parseFloat(amount))} for the MOMO Number.
        </p>

        <div className="mb-6 text-gray-500 text-sm space-y-2">
          <p>Please ensure you transferred the exact amount and included your User ID in the description.</p>
          <p>If you believe this is an error, please try again or contact support.</p>
        </div>

        <div className="flex flex-col space-y-4 w-full">
          <Button
            onClick={() => router.back()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-5 w-5" /> Try Again
          </Button>
          <Link href="/dashboard" className="w-full">
            <Button
              variant="outline"
              className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 font-semibold py-2 rounded-lg transition-colors duration-300 bg-transparent"
            >
              Go to Dashboard
            </Button>
          </Link>
          <Button
            onClick={() => router.push("/support")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
