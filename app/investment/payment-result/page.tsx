"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const USD_TO_NGN_EXCHANGE_RATE = 1500 // Example exchange rate

export default function PaymentResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get("status")
  const amount = searchParams.get("amount") || "0" // Amount is now in Naira

  const isSuccess = status === "success"
  const message = isSuccess ? "Payment Received!" : "Payment Not Received"
  const icon = isSuccess ? (
    <CheckCircle className="h-20 w-20 text-green-500" />
  ) : (
    <XCircle className="h-20 w-20 text-red-500" />
  )
  const textColor = isSuccess ? "text-green-700" : "text-red-700"

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
      {/* Removed the inner box, content now directly in the full background */}
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <div className="mb-6">{icon}</div>
        <h1 className={`text-3xl font-bold mb-2 ${textColor}`}>{message}</h1>
        <p className="text-gray-600 text-lg mb-6">
          {isSuccess
            ? `Your investment of ${formatCurrencyNaira(Number.parseFloat(amount))} has been successfully processed.`
            : `We could not confirm your payment of ${formatCurrencyNaira(Number.parseFloat(amount))}.`}
        </p>

        {!isSuccess && (
          <div className="mb-6 text-gray-500 text-sm space-y-2">
            <p>Please ensure you transferred the exact amount and included your User ID in the description.</p>
            <p>If you believe this is an error, please try again or contact support.</p>
          </div>
        )}

        <div className="flex flex-col space-y-4 w-full">
          {!isSuccess && (
            <Button
              onClick={() => router.back()}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-5 w-5" /> Try Again
            </Button>
          )}
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
