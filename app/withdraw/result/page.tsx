"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WithdrawalData {
  accountName: string
  accountNumber: string
  bank: string
  amount: number
}

export default function WithdrawResultPage() {
  const router = useRouter()
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalData | null>(null)

  useEffect(() => {
    // Check if withdrawal data exists
    const storedWithdrawalData = localStorage.getItem("momo-credit-withdrawal-data")

    if (!storedWithdrawalData) {
      router.push("/withdraw")
      return
    }

    setWithdrawalData(JSON.parse(storedWithdrawalData))
  }, [router])

  useEffect(() => {
    // Play success sound when the page loads
    const audio = new Audio("/sounds/withdrawal-success.wav")
    audio.play().catch((error) => {
      console.error("Error playing audio:", error)
    })
  }, [])

  const handleBackToDash = () => {
    // Clear withdrawal data
    localStorage.removeItem("momo-credit-withdrawal-data")
    router.push("/dashboard")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  if (!withdrawalData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      {/* Success Icon */}
      <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-white" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Withdrawal Successful!</h2>

      <p className="text-center mb-8 max-w-md">
        Your withdrawal request has been processed successfully. The funds will be credited to your account within 24
        hours.
      </p>

      {/* Transaction Details */}
      <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="font-semibold mb-3">Transaction Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">{formatCurrency(withdrawalData.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bank:</span>
            <span className="font-medium">{withdrawalData.bank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Number:</span>
            <span className="font-medium">{withdrawalData.accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Name:</span>
            <span className="font-medium">{withdrawalData.accountName}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button onClick={handleBackToDash} className="w-full max-w-md bg-orange-600 hover:bg-orange-700">
        Back to Dashboard
      </Button>
    </div>
  )
}
