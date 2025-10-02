"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function WithdrawLoadingPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if withdrawal data exists
    const withdrawalData = localStorage.getItem("earnbuzz-withdrawal-data")

    if (!withdrawalData) {
      router.push("/withdraw")
      return
    }

    // Add transaction to history
    const storedTransactions = localStorage.getItem("earnbuzz-transactions")
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : []
    const withdrawData = JSON.parse(withdrawalData)

    const newTransaction = {
      id: Date.now(),
      type: "debit",
      description: `Withdrawal to ${withdrawData.bank} (${withdrawData.accountNumber})`,
      amount: withdrawData.amount,
      date: new Date().toISOString(),
    }

    transactions.push(newTransaction)
    localStorage.setItem("earnbuzz-transactions", JSON.stringify(transactions))

    const storedUser = localStorage.getItem("earnbuzz-user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      user.balance -= withdrawData.amount
      localStorage.setItem("earnbuzz-user", JSON.stringify(user))
    }

    // Redirect to result page after 7 seconds
    const timer = setTimeout(() => {
      router.push("/withdraw/result")
    }, 7000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-orange-600 text-white p-4">
        <h1 className="text-xl font-bold">Processing Withdrawal</h1>
      </div>

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="animate-spin mb-6">
          <Loader2 className="h-16 w-16 text-orange-600" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Processing Your Withdrawal</h2>
        <p className="text-gray-500 text-center">Please wait while we process your transaction...</p>

        <div className="w-full max-w-md mt-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-600 animate-progress"
              style={{
                animation: "progress 7s linear forwards",
              }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 text-center">
        <p className="text-gray-700 font-medium">EarnBuzz Financial Services LTD</p>
      </div>
    </div>
  )
}
