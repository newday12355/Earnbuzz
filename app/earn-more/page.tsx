"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function EarnMorePage() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Earn More</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <div className="max-w-md space-y-6">
          {/* BluePay Pro Title */}
          <h1 className="text-3xl font-bold text-orange-800">BluePay Pro</h1>

          {/* 3-line message */}
          <div className="space-y-2 text-gray-600">
            <p>Take your earnings to the next level with BluePay Pro.</p>
            <p>Access exclusive features and higher earning opportunities.</p>
            <p>Join thousands of users already maximizing their income.</p>
          </div>

          {/* Sign up button */}
          <a
            href="https://bluepay-pro.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Sign Up Now
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
