"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
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

  const handleTelegramSupport = () => {
    // Create Telegram URL with username
    const telegramUrl = `https://t.me/Earnbuzzsupport`

    // Open Telegram in a new tab
    window.open(telegramUrl, "_blank")
  }

  const handleTelegramChannel = () => {
    // Open Telegram channel in a new tab
    const telegramChannelUrl = "https://t.me/Earnbuzzcomunity"
    window.open(telegramChannelUrl, "_blank")
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
          <span className="font-medium">Support</span>
        </Link>
      </div>

      <div className="p-4 space-y-6">
        <h2 className="text-xl font-semibold">How can we help you?</h2>

        {/* Telegram Support Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-orange-600" />
              Telegram Support
            </CardTitle>
            <CardDescription>Chat with our support team on Telegram for quick assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleTelegramSupport}
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Support
            </Button>
            <p className="text-sm text-gray-500 mt-2">Contact @Earnbuzzsupport on Telegram for support and assistance.</p>
          </CardContent>
        </Card>

        {/* WhatsApp Channel Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              Telegram Channel
            </CardTitle>
            <CardDescription>Join our Telegram channel for updates and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleTelegramChannel}
              className="w-full bg-green-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Join Channel
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Stay updated with the latest news and announcements from EearnBuzz.
            </p>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-6">
          EarnBuzz Financial Services
          <br />
          EarnBuzz © 2025. All rights reserved.
        </div>
      </div>
    </div>
  )
}
