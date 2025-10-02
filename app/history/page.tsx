"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowDown, ArrowUp, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HistoryPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("momo-credit-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    setUserData(user)

    // Get stored transactions or create initial welcome bonus
    const storedTransactions = localStorage.getItem("momo-credit-transactions")

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    } else {
      // Create initial welcome bonus transaction
      const initialTransaction = {
        id: 1,
        type: "credit",
        description: "Welcome Bonus",
        amount: user.balance,
        date: new Date().toISOString(),
      }

      localStorage.setItem("momo-credit-transactions", JSON.stringify([initialTransaction]))
      setTransactions([initialTransaction])
    }
  }, [router])

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleClearHistory = () => {
    setShowConfirmClear(true)
  }

  const confirmClearHistory = () => {
    // Keep only the initial welcome bonus transaction
    const initialTransaction = transactions.find((t) => t.description === "Welcome Bonus") || transactions[0]
    const newTransactions = [initialTransaction]

    localStorage.setItem("momo-credit-transactions", JSON.stringify(newTransactions))
    setTransactions(newTransactions)
    setShowConfirmClear(false)
  }

  const cancelClearHistory = () => {
    setShowConfirmClear(false)
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Transaction History</span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleClearHistory}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold mb-4">Your Transactions</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No transactions yet</div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDown className={`h-5 w-5 text-green-600`} />
                    ) : (
                      <ArrowUp className={`h-5 w-5 text-red-600`} />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{transaction.description}</div>
                    <div className="text-xs text-gray-500">{formatDate(transaction.date)}</div>
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-2">Clear History</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to clear your transaction history? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={cancelClearHistory}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmClearHistory}>
                Clear History
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
