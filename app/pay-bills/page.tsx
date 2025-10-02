"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Smartphone, Wifi } from "lucide-react"

export default function PayBillsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("momo-credit-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUserData(JSON.parse(storedUser))
  }, [router])

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  const billOptions = [
    {
      name: "Airtime",
      description: "Buy airtime for all networks",
      icon: Smartphone,
      emoji: "📱",
      link: "/airtime",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      hoverColor: "hover:bg-orange-100",
    },
    {
      name: "Data",
      description: "Purchase data bundles",
      icon: Wifi,
      emoji: "📶",
      link: "/data",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-100",
    },
  ]

  return (
    <div className="min-h-screen pb-6 bg-gradient-to-b from-[#fff5f0] to-[#fff0e6]">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Pay Bills</span>
        </Link>
      </div>

      {/* Welcome Section */}
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pay Your Bills</h1>
        <p className="text-gray-600 mb-6">Choose what you want to pay for</p>
      </div>

      {/* Bill Options */}
      <div className="px-4 space-y-4">
        {billOptions.map((option, index) => {
          const Icon = option.icon

          return (
            <Link key={index} href={option.link}>
              <div
                className={`${option.bgColor} ${option.borderColor} ${option.hoverColor} border-2 rounded-xl p-6 transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
              >
                <div className="flex items-center space-x-4">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center shadow-md`}
                  >
                    <span className="text-3xl">{option.emoji}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${option.color} mb-1`}>{option.name}</h3>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className={`${option.color}`}>
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
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Info Section */}
      <div className="px-4 mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-orange-100">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-orange-800 mb-2">💡 Quick Tips</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              • All transactions are processed instantly
              <br />• You earn cashback on every purchase
              <br />• 24/7 customer support available
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
