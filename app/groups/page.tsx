"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GroupsPage() {
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

  const handleJoinTelegram = () => {
    window.open("https://t.me/realtechrt", "_blank")
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen pb-6 bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Support & Community</span>
        </Link>
      </div>

      <div className="p-4 space-y-6">
        {/* Telegram Channel */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Join Our Community</h3>
              <p className="text-sm text-gray-600">Get updates and connect with other users</p>
            </div>
          </div>
          <Button
            onClick={handleJoinTelegram}
            className="w-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center gap-2 rounded-full"
          >
            <Send className="h-5 w-5" />
            Join Telegram Channel
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-orange-800">Need Help?</h3>
              <p className="text-sm text-orange-600">Find answers to common questions</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-orange-100 p-4">
            <Link href="/help" className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Frequently Asked Questions</h4>
                <p className="text-sm text-gray-600">Get help with common issues and questions</p>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
