"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoanFeeInstructionPage() {
  const router = useRouter()
  const [loanData, setLoanData] = useState<any>(null)

  useEffect(() => {
    const storedLoanData = localStorage.getItem("momo-credit-loan-data")
    if (!storedLoanData) {
      router.push("/loan")
      return
    }
    setLoanData(JSON.parse(storedLoanData))
  }, [router])

  if (!loanData) {
    return <div className="p-6 text-center">Loading...</div>
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

  const handleContinueToPay = () => {
    router.push("/loan/payment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] pb-6 px-4">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white -mx-4">
        <Link href="/loan" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Loan Fee Details</span>
        </Link>
      </div>

      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Your Loan Details</h1>
        <p className="text-gray-600 mb-6">Please review the details before proceeding to payment.</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Loan Amount:</span>
          <span className="text-xl font-bold text-purple-600">{formatCurrencyNaira(loanData.loanAmount)}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-gray-700 font-medium">Processing Fee (6%):</span>
          <span className="text-xl font-bold text-orange-600">{formatCurrencyNaira(loanData.loanFee)}</span>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">Important Information</h3>
            <p className="text-blue-700 text-xs leading-relaxed">
              This is a one-time processing fee for your loan. You **will not** be required to repay the loan amount
              itself. Your loan will be disbursed to your provided bank account after this fee is confirmed.
            </p>
          </div>
        </div>

        <Button
          onClick={handleContinueToPay}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-lg"
        >
          Continue to Pay Fee
        </Button>
      </div>

      {/* Features */}
      <div className="mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Why Choose Our Loans?</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Instant approval within minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">No collateral required</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Flexible repayment terms</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm">Build your credit score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
