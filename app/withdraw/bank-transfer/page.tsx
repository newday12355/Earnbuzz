"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function BankTransferPage() {
  const router = useRouter()
  const [copied, setCopied] = useState<string | null>(null)

  const bankDetails = {
    accountName: "Vincent Deborah",
    bank: "Moniepoint",
    amount: "5000",
    accountNumber: "6832468961",
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const handlePaymentConfirm = () => {
    router.push("/withdraw/payment-confirmation")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-lg font-semibold text-gray-800">Bank Transfer</h1>
          <button onClick={() => router.push("/withdraw")} className="text-red-600 text-sm font-medium">
            Cancel
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2">NGN {bankDetails.amount}</h2>
          <p className="text-center text-gray-600 text-sm mb-6">Proceed to your bank app to complete this Transfer</p>

          {/* Bank Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Amount</span>
              <button
                onClick={() => copyToClipboard(bankDetails.amount, "amount")}
                className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium"
              >
                {copied === "amount" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="text-lg font-bold">NGN {bankDetails.amount}</div>

            <div className="flex justify-between items-center pt-3 border-t">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center text-white text-xs">
                  12
                </div>
                <span className="text-gray-600 text-sm">Account Number</span>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountNumber, "account")}
                className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium"
              >
                {copied === "account" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="text-lg font-bold">{bankDetails.accountNumber}</div>

            <div className="flex items-center gap-2 pt-3 border-t">
              <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center text-xs">🏦</div>
              <span className="text-gray-600 text-sm">Bank Name</span>
            </div>
            <div className="text-base font-semibold">{bankDetails.bank}</div>

            <div className="flex items-center gap-2 pt-3 border-t">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                i
              </div>
              <span className="text-gray-600 text-sm">Account Name</span>
            </div>
            <div className="text-base font-semibold">{bankDetails.accountName}</div>

            <div className="text-xs text-gray-600 mt-4 leading-relaxed pt-3 border-t">
              Transfer the exact amount to the account above. This is a verification payment to process your withdrawal
              request.
            </div>

            <Button
              onClick={handlePaymentConfirm}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium mt-4"
            >
              I have made payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
