"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BuyBuzzCodePage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both your full name and email address.",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    localStorage.setItem(
      "buzzCodePurchase",
      JSON.stringify({
        fullName,
        email,
        timestamp: Date.now(),
      }),
    )

    router.push("/buy-buzz-code/loading")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-3">
          <button onClick={() => router.back()} className="flex items-center text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          <h1 className="text-base font-semibold text-gray-900">Buy Buzz Code</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-3 max-w-sm mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 mb-4 text-white">
          <div className="flex items-center mb-2">
            <div className="bg-white/20 rounded-full p-2 mr-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm">About Buzz Codes</h3>
          </div>
          <p className="text-xs text-orange-100 leading-relaxed">
            Unlock withdrawals and purchases with Buzz Codes. One-time payment of ₦6,250 for unlimited transactions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Buzz Code Price:</span>
              <span className="text-lg font-bold text-orange-600">₦6,250</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  )
}
