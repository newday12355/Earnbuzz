"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PaykeyError } from "@/components/paykey-error"

interface DataPlan {
  size: string
  price: number
  duration: string
}

export default function DataPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [paykey, setPaykey] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null)
  const [showPaykeyError, setShowPaykeyError] = useState(false)

  const CORRECT_PAYKEY = "MC-7474MOMODDT1I2PARFAGSGG"

  useEffect(() => {
    const storedUser = localStorage.getItem("momo-credit-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  const networks = ["Airtel", "MTN", "Glo", "9mobile"]

  const dataPlans: DataPlan[] = [
    { size: "100MB", price: 50, duration: "1 DAY" },
    { size: "300MB", price: 100, duration: "1 DAY" },
    { size: "500MB", price: 150, duration: "3 DAYS" },
    { size: "1GB", price: 300, duration: "7 DAYS" },
    { size: "2GB", price: 400, duration: "14 DAYS" },
    { size: "3GB", price: 500, duration: "30 DAYS" },
    { size: "5GB", price: 800, duration: "30 DAYS" },
    { size: "7GB", price: 1000, duration: "30 DAYS" },
    { size: "10GB", price: 1500, duration: "30 DAYS" },
    { size: "15GB", price: 2000, duration: "30 DAYS" },
    { size: "20GB", price: 2500, duration: "30 DAYS" },
    { size: "40GB", price: 4000, duration: "30 DAYS" },
  ]

  const addNotification = (title: string, message: string, type: "success" | "info" | "warning" = "success") => {
    const notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: Date.now(),
      read: false,
    }

    const existing = localStorage.getItem("momo-credit-notifications")
    const notifications = existing ? JSON.parse(existing) : []
    notifications.unshift(notification)
    localStorage.setItem("momo-credit-notifications", JSON.stringify(notifications))
  }

  const handleBuyData = () => {
    if (!selectedNetwork || !phoneNumber || !paykey || !selectedPlan) {
      alert("Please fill all required fields")
      return
    }

    if (paykey !== CORRECT_PAYKEY) {
      setShowPaykeyError(true)
      return
    }

    const storedTransactions = localStorage.getItem("momo-credit-transactions")
    const transactions = storedTransactions ? JSON.parse(storedTransactions) : []

    const newTransaction = {
      id: Date.now(),
      type: "debit",
      description: `Data Purchase - ${selectedNetwork} (${selectedPlan.size})`,
      amount: selectedPlan.price,
      date: new Date().toISOString(),
    }

    transactions.push(newTransaction)
    localStorage.setItem("momo-credit-transactions", JSON.stringify(transactions))

    const user = { ...userData }
    user.balance -= selectedPlan.price
    localStorage.setItem("momo-credit-user", JSON.stringify(user))

    addNotification(
      "Data Purchase Successful",
      `${selectedPlan.size} ${selectedNetwork} data sent to ${phoneNumber}`,
      "success",
    )

    alert("Data purchase successful!")
    router.push("/dashboard")
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen pb-6 bg-gray-50">
      <div className="flex items-center p-3 bg-white border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Data</span>
        </Link>
      </div>

      <div className="bg-green-600 text-white p-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">Enjoy </span>
          <span className="text-yellow-300 font-bold">Glo&apos;s</span>
          <span className="font-medium"> Amazing 5X Data Bonuses!</span>
        </div>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold px-4 py-1 h-7 rounded-full text-xs">
          GO
        </Button>
      </div>

      <div className="max-w-md mx-auto p-3 space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {networks.map((network) => (
            <button
              key={network}
              className={`p-2 rounded-lg border text-center text-sm ${
                selectedNetwork === network ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"
              }`}
              onClick={() => setSelectedNetwork(network)}
            >
              {network}
            </button>
          ))}
        </div>

        <Input
          type="tel"
          placeholder="Enter mobile number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-lg p-2.5 bg-white"
        />

        <div>
          <h3 className="font-medium mb-2 text-sm">Select Data Plan</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {dataPlans.map((plan, index) => (
              <button
                key={index}
                className={`p-2 rounded-lg border text-center text-xs ${
                  selectedPlan?.size === plan.size ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="font-bold text-xs">₦{plan.price}</div>
                <div className="text-xs text-gray-600 font-medium">{plan.size}</div>
                <div className="text-xs text-gray-500">{plan.duration}</div>
              </button>
            ))}
          </div>
        </div>

        <Input
          type="text"
          placeholder="Enter Paykey"
          value={paykey}
          onChange={(e) => setPaykey(e.target.value)}
          className="border rounded-lg p-2.5 bg-white"
        />

        <Button
          onClick={handleBuyData}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg"
          disabled={!selectedPlan || !selectedNetwork || !phoneNumber || !paykey}
        >
          Buy Data
        </Button>
      </div>

      {showPaykeyError && <PaykeyError onClose={() => setShowPaykeyError(false)} />}
    </div>
  )
}
