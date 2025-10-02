"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"

export default function AboutPage() {
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
    <div className="min-h-screen pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">About</span>
        </Link>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-center mb-6">
          <Logo className="w-64 hover:scale-110 transition-transform duration-300" />
        </div>

        <h2 className="text-2xl font-bold text-center text-orange-800">About Earn Buzz</h2>

        <div className="space-y-4 text-gray-700">
          <p>
            Earn Buzz is a leading financial services platform that provides users with convenient access to digital
            transactions, airtime and data purchases, and fund withdrawals.
          </p>

          <p>
            Our mission is to make financial services accessible to everyone, with a user-friendly interface and
            reliable service.
          </p>

          <p>With Earn Buzz, you can:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Purchase airtime and data for all major networks</li>
            <li>Transfer funds to any bank account</li>
            <li>Track your transaction history</li>
            <li>Earn rewards and cashback on transactions</li>
            <li>Get 24/7 customer support</li>
          </ul>

          <p>
            Earn Buzz was founded in 2023 and has quickly grown to become a trusted platform for digital financial
            services.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-700">
            <br />
            Phone: +44 7851 850678
            <br />
            Address: 33 Financial Street, Lagos, Nigeria
          </p>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">Earn Buzz © 2023. All rights reserved.</div>
      </div>
    </div>
  )
}
