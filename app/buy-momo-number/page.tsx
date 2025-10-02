"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BuyMomoNumberPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [whatsappNumber, setWhatsappNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("momo-credit-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    setUserData(user)

    // Pre-fill name if available
    if (user.fullName) {
      setFullName(user.fullName)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!whatsappNumber || !fullName) {
      alert("Please fill in all fields")
      return
    }

    // Validate WhatsApp number (basic validation)
    if (whatsappNumber.length < 10) {
      alert("Please enter a valid WhatsApp number")
      return
    }

    setIsLoading(true)

    // Store form data for payment page
    localStorage.setItem(
      "momo-credit-momo-number-form",
      JSON.stringify({
        whatsappNumber,
        fullName,
      }),
    )

    // Navigate to payment page
    setTimeout(() => {
      router.push("/buy-momo-number/payment")
    }, 1000)
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-orange-600 text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-semibold">Buy MOMO Number</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price Display */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-orange-600 mb-2">₦7,100</div>
          <p className="text-gray-600">One-time payment for your MOMO Number</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4" />
              WhatsApp Number
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="e.g. 08012345678"
              className="h-12 text-base"
              required
            />
            <p className="text-sm text-gray-500">We'll send your MOMO Number details to this WhatsApp number</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </Button>
        </form>

        {/* Info */}
        <div className="mt-8 p-4 bg-orange-50 rounded-lg">
          <h3 className="font-medium text-orange-800 mb-2">What you get:</h3>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Unique MOMO Number for receiving payments</li>
            <li>• Instant notifications via WhatsApp</li>
            <li>• Easy sharing with friends and family</li>
            <li>• Lifetime access to your number</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
