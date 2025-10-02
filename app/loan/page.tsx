"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Landmark, User2, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// List of Nigerian banks (same as withdraw page)
const NIGERIAN_BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank",
  "Keystone Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  "Jaiz Bank",
  "Providus Bank",
  "Titan Trust Bank",
  "Globus Bank",
  "SunTrust Bank",
  "Parallex Bank",
  "Premium Trust Bank",
  "Optimus Bank",
  "PalmPay",
  "Kuda Bank",
  "VFD Microfinance Bank",
  "Moniepoint Microfinance Bank",
  "Opay Digital Services",
  "Palmpay",
  "Rubies Microfinance Bank",
  "Sparkle Microfinance Bank",
  "TAJ Bank",
  "TCF Microfinance Bank",
  "Titan Trust Bank",
  "VFD Microfinance Bank",
  "Zenith Bank",
  "Abbey Mortgage Bank",
  "Above Only Microfinance Bank",
  "Accion Microfinance Bank",
  "Ahmadu Bello University Microfinance Bank",
  "Airtel Smartcash PSB",
  "Alphakapital Microfinance Bank",
  "Amju Unique Microfinance Bank",
  "CEMCS Microfinance Bank",
  "Coronation Merchant Bank",
  "Ekondo Microfinance Bank",
  "Eyowo",
  "Fairmoney Microfinance Bank",
  "Firmus Microfinance Bank",
  "FSDH Merchant Bank",
  "Gateway Mortgage Bank",
  "Goodnews Microfinance Bank",
  "Greenwich Merchant Bank",
  "Hackman Microfinance Bank",
  "Hasal Microfinance Bank",
  "HopePSB",
  "Ibile Microfinance Bank",
  "Infinity Microfinance Bank",
  "Lagos Building Investment Company",
  "Links Microfinance Bank",
  "Living Trust Mortgage Bank",
  "Lotus Bank",
  "Mayfair Microfinance Bank",
  "Mint Microfinance Bank",
  "MTN MOMO PSB",
  "NPF Microfinance Bank",
  "Paga",
  "Page Financials",
  "Parkway-ReadyCash",
  "PayCom",
]

export default function LoanPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loanAmount, setLoanAmount] = useState("")
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bank, setBank] = useState("Access Bank")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("EarnBuzz-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setAccountNumber(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const amount = Number(loanAmount)
    if (isNaN(amount) || amount < 100000) {
      setError("Loan amount must be at least ₦100,000.")
      return
    }

    if (!accountName || !accountNumber || !bank) {
      setError("Please fill in all bank details.")
      return
    }

    if (accountNumber.length !== 10) {
      setError("Account number must be 10 digits.")
      return
    }

    setIsLoading(true)

    const loanFee = amount * 0.06 // 6% of loan amount

    // Store loan details for the payment page
    localStorage.setItem(
      "momo-credit-loan-data",
      JSON.stringify({
        loanAmount: amount,
        loanFee: loanFee,
        accountName,
        accountNumber,
        bank,
      }),
    )

    // Simulate processing time before redirecting to fee instruction page
    setTimeout(() => {
      router.push("/loan/loading")
    }, 1000) // Short delay before loading page
  }

  const formatCurrency = (amount: number) => {
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
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] pb-6 px-4">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white -mx-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quick Loan</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-purple-600 text-white p-6 text-center -mx-4">
        <h1 className="text-2xl font-bold mb-2">Quick Loan</h1>
        <p className="text-purple-100">Get instant loans up to ₦50,000</p>
      </div>

      {/* Loan Application Form - Removed outer box */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Loan Application</h2>

        {/* Loan Amount */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₦)</label>
          <Input
            type="number"
            placeholder="Minimum: ₦100,000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
            className="border rounded-lg p-3"
          />
          {Number(loanAmount) > 0 && Number(loanAmount) < 100000 && (
            <p className="text-xs text-red-500 mt-1">Minimum loan amount is ₦100,000</p>
          )}
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-md font-semibold text-gray-800 mb-3">Your Bank Details for Payout</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <User2 className="h-4 w-4 text-gray-500" /> Account Name
              </label>
              <Input
                type="text"
                placeholder="Enter Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-500" /> Account Number
              </label>
              <Input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Account Number (10 digits)"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              {accountNumber.length > 0 && accountNumber.length < 10 && (
                <p className="text-xs text-red-500 mt-1">Account number must be 10 digits</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-gray-500" /> Bank
              </label>
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-600 appearance-none bg-gray-50"
              >
                {NIGERIAN_BANKS.map((bankName) => (
                  <option key={bankName} value={bankName}>
                    {bankName}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-orange-600"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-red-500 mr-2 mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-lg"
          disabled={
            isLoading ||
            !loanAmount ||
            Number(loanAmount) < 100000 ||
            !accountName ||
            !accountNumber ||
            accountNumber.length !== 10 ||
            !bank
          }
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Processing...</span>
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>

      {/* Features - Removed outer box */}
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
