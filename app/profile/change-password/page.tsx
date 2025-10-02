"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Key, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("momo-credit-user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUserData(JSON.parse(storedUser))
  }, [router])

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)

    // Simulate API call or local storage update
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem("momo-credit-registered-users") || "[]")
      const currentUserEmail = userData?.email

      const userIndex = registeredUsers.findIndex((u: any) => u.email === currentUserEmail)

      if (userIndex === -1) {
        setMessage({ type: "error", text: "User not found. Please log in again." })
        setIsLoading(false)
        return
      }

      // Basic validation
      if (currentPassword !== registeredUsers[userIndex].password) {
        setMessage({ type: "error", text: "Current password is incorrect." })
        setIsLoading(false)
        return
      }

      if (newPassword.length < 6) {
        setMessage({ type: "error", text: "New password must be at least 6 characters long." })
        setIsLoading(false)
        return
      }

      if (newPassword !== confirmNewPassword) {
        setMessage({ type: "error", text: "New passwords do not match." })
        setIsLoading(false)
        return
      }

      // Update password in registered users
      registeredUsers[userIndex].password = newPassword
      localStorage.setItem("momo-credit-registered-users", JSON.stringify(registeredUsers))

      setMessage({ type: "success", text: "Password changed successfully!" })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
      setIsLoading(false)
    }, 1500)
  }

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
          <div className="font-bold text-lg">Change Password</div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto mt-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Update Your Password</h2>

          {message && (
            <Alert
              variant={message.type === "success" ? "default" : "destructive"}
              className={`mb-4 ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}
            >
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <Label htmlFor="current-password" className="flex items-center gap-2 text-gray-700 mb-2">
                <Lock className="h-4 w-4" /> Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="h-12 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="new-password" className="flex items-center gap-2 text-gray-700 mb-2">
                <Key className="h-4 w-4" /> New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-12 text-base"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirm-new-password" className="flex items-center gap-2 text-gray-700 mb-2">
                <Key className="h-4 w-4" /> Confirm New Password
              </Label>
              <Input
                id="confirm-new-password"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-12 text-base"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
