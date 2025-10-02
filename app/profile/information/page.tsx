"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Mail, Award, CheckCircle, LogOut, Copy } from "lucide-react" // Added Copy
import { Button } from "@/components/ui/button"
import { LogoutConfirmation } from "@/components/logout-confirmation"
import { useToast } from "@/hooks/use-toast" // Import useToast

interface UserData {
  name: string
  email: string
  balance: number
  weeklyRewards: number
  hasMomoNumber: boolean
  profilePicture?: string
  level?: string
  userId: string // Added userId
}

export default function ProfileInformationPage() {
  const router = useRouter()
  const { toast } = useToast() // Initialize useToast
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("momo-credit-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    // Set default level if not present
    if (!user.level) {
      user.level = "Basic"
    }
    // Ensure userId is present, if not, generate a placeholder (should be set on registration)
    if (!user.userId) {
      user.userId = `MC${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      localStorage.setItem("momo-credit-user", JSON.stringify(user))
    }

    setUserData(user)
  }, [router])

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true)
  }

  const handleLogoutConfirm = () => {
    localStorage.removeItem("momo-credit-user")
    router.push("/login")
  }

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false)
  }

  const handleCopyUserId = () => {
    if (userData?.userId) {
      navigator.clipboard.writeText(userData.userId)
      toast({
        title: "Copied!",
        description: "User ID copied to clipboard.",
      })
    }
  }

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] pb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="font-bold text-lg">Profile Information</div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-md mx-auto mt-6 px-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500 mb-2">
            {userData.profilePicture ? (
              <img
                src={userData.profilePicture || "/placeholder.svg"}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-orange-100 flex items-center justify-center">
                <User className="h-12 w-12 text-orange-500" />
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
        </div>

        {/* User Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Account Information</h3>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{userData.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-800">{userData.email}</p>
              </div>
            </div>

            {/* Account Level */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Level</p>
                <p className="font-medium text-gray-800">{userData.level || "Basic"}</p>
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mt-1">
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
                  className="h-5 w-5 text-gray-600"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">User ID</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">{userData.userId}</p>
                  <Button variant="ghost" size="icon" onClick={handleCopyUserId} className="h-8 w-8">
                    <Copy className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <p className="font-medium text-gray-800">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full rounded-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center gap-2 mt-6 bg-transparent"
          onClick={handleLogoutClick}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && <LogoutConfirmation onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />}
    </div>
  )
}
