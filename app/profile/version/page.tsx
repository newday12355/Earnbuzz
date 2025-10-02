"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VersionPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const currentVersion = "1.0.0" // This would typically come from your build process or backend

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] pb-6">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="font-bold text-lg">App Version</div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto mt-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your App is Up to Date!</h2>
          <p className="text-gray-600 mb-4">
            You are currently running version <span className="font-semibold">{currentVersion}</span>.
          </p>
          <p className="text-sm text-gray-500">
            Enjoy the latest features and security enhancements. We'll notify you when new updates are available.
          </p>

          <div className="mt-6">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-3"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
