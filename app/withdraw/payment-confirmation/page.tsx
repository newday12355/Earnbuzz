"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function PaymentConfirmationPage() {
  const router = useRouter()

  const handleRecheck = () => {
    // Simulate rechecking payment
    setTimeout(() => {
      router.push("/withdraw/payment-confirmation")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-semibold text-gray-800">Bank Transfer</h1>
          <button onClick={() => router.push("/dashboard")} className="text-red-600 text-sm font-medium">
            Cancel
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-center mb-6 mt-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">NGN 6,200</h2>
          <p className="text-center text-gray-600 text-sm mb-8">Proceed to your bank app to complete this Transfer</p>

          {/* Payment Not Confirmed Alert */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <span className="text-red-700 font-medium">Payment not confirmed</span>
          </div>

          {/* Large Warning Icon */}
          <div className="flex items-center justify-center mb-12">
            <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>

          {/* Support Section */}
          <div className="text-center mb-8">
            <p className="text-gray-700 mb-2">Need help? Contact support:</p>
            <a href="mailto:support@earnbuzz.com" className="text-blue-600 font-medium underline">
              here
            </a>
          </div>

          {/* Re-check Button */}
          <Button
            onClick={handleRecheck}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg"
          >
            Re-check
          </Button>
        </div>
      </div>
    </div>
  )
}
