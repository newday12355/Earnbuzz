"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WithdrawPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [referralCount, setReferralCount] = useState(0)
  const [balance, setBalance] = useState(5000)

  useEffect(() => {
    const storedUser = localStorage.getItem("earnbuzz-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    setUserData(user)
    setBalance(user.balance || 5000)

    // Fetch referral count
    fetchReferralCount(user.id || user.userId)
  }, [router])

  const fetchReferralCount = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/${userId}`)
      const data = await response.json()
      if (data.success) {
        setReferralCount(data.user.referral_count || 0)
      }
    } catch (error) {
      console.error("[v0] Error fetching referral count:", error)
    }
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

  const setQuickAmount = (value: number) => {
    setAmount(value.toString())
  }

  const handleCashout = () => {
    if (referralCount >= 5 && balance >= 100000) {
      router.push("/withdraw/select-bank")
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-gray-800">Withdraw Funds</h1>
      </div>

      <div className="p-6 max-w-md mx-auto">
        {/* Available Balance */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-2">Available Balance</p>
          <h2 className="text-4xl font-bold text-red-600">{formatCurrency(balance)}</h2>
        </div>

        {/* Enter Amount */}
        <div className="mb-6">
          <label className="text-gray-800 font-semibold text-lg mb-3 block">Enter Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">₦</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-4 text-2xl font-medium text-gray-700 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[5000, 10000, 20000, 50000].map((value) => (
              <button
                key={value}
                onClick={() => setQuickAmount(value)}
                className="py-2 px-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ₦{value.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Withdrawal Requirements */}
        <div className="bg-purple-50 rounded-2xl p-6 mb-6">
          <h3 className="text-purple-700 font-bold text-lg mb-4">Withdrawal Requirements:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">●</span>
              </div>
              <span className="text-purple-900">
                Minimum balance: <span className="font-semibold">₦100,000</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">●</span>
              </div>
              <span className="text-purple-900">Refer 5 friends to unlock withdrawals</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">●</span>
              </div>
              <span className="text-purple-900">Each friend must complete registration</span>
            </li>
          </ul>
        </div>

        {/* Referrals Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 font-medium">Referrals Progress</span>
            <span className="text-2xl font-bold text-gray-800">{referralCount}/5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${(referralCount / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Cashout Button */}
        <Button
          onClick={handleCashout}
          disabled={referralCount < 5 || balance < 100000}
          className={`w-full py-6 rounded-xl text-lg font-semibold transition-all ${
            referralCount >= 5 && balance >= 100000
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {referralCount < 5
            ? `Refer ${5 - referralCount} more to unlock`
            : balance < 100000
              ? "Insufficient Balance"
              : "CASHOUT"}
        </Button>

        {/* Start Referring Button */}
        <Link href="/refer" className="block mt-4">
          <Button className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg font-semibold flex items-center justify-center gap-2">
            <Share2 className="h-5 w-5" />
            Start Referring Friends
          </Button>
        </Link>
      </div>
    </div>
  )
}
