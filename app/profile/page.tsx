"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Camera, LogOut, User, Bell, BellOff, Info, HelpCircle, Key, GitBranch } from "lucide-react" // Added Key, GitBranch
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { LogoutConfirmation } from "@/components/logout-confirmation"
import { requestNotificationPermission, showLocalNotification } from "@/services/notification-service"

interface UserData {
  name: string
  email: string
  balance: number
  weeklyRewards: number
  hasMomoNumber: boolean
  profilePicture?: string
  level?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

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

    setUserData(user)

    // Check notification permission
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }
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

  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreviewImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfilePicture = () => {
    if (previewImage && userData) {
      const updatedUser = {
        ...userData,
        profilePicture: previewImage,
      }
      localStorage.setItem("momo-credit-user", JSON.stringify(updatedUser))
      setUserData(updatedUser)
      setPreviewImage(null)
    }
  }

  const handleCancelProfilePicture = () => {
    setPreviewImage(null)
  }

  const handleToggleNotifications = useCallback(async () => {
    if (!notificationsEnabled) {
      // Request permission
      const permission = await requestNotificationPermission()
      if (permission === "granted") {
        setNotificationsEnabled(true)
        localStorage.setItem("momo-credit-notification-permission", "granted")

        // Show a test notification
        showLocalNotification("Notifications Enabled", {
          body: "You will now receive updates about new features and important information.",
        })
      }
    } else {
      // We can't programmatically revoke permission, so just inform the user
      alert("To disable notifications, please change the permission in your browser settings.")
    }
  }, [notificationsEnabled])

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] pb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="font-bold text-lg">Profile</div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-md mx-auto mt-6 px-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer mb-2 border-2 border-orange-500"
            onClick={handleProfilePictureClick}
          >
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
            <div className="absolute bottom-0 right-0 bg-orange-600 rounded-full p-1.5">
              <Camera className="h-4 w-4 text-white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          <p className="text-sm text-gray-500">Tap to change profile picture</p>
        </div>

        {/* Preview and Save Controls */}
        {previewImage && (
          <div className="mb-8 bg-white p-4 rounded-xl shadow">
            <h3 className="font-medium mb-3">Preview</h3>
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500">
                <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleCancelProfilePicture} className="rounded-full bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSaveProfilePicture} className="bg-orange-600 hover:bg-orange-700 rounded-full">
                Save Picture
              </Button>
            </div>
          </div>
        )}

        {/* Menu Options */}
        <div className="space-y-4">
          {/* Profile Information */}
          <Link href="/profile/information">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Profile Information</p>
                  <p className="text-sm text-gray-500">View and edit your profile details</p>
                </div>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </Link>

          {/* Change Password */}
          <Link href="/profile/change-password">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </Link>

          {/* Help & Support */}
          <Link href="/support">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <HelpCircle className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium">Help & Support</p>
                  <p className="text-sm text-gray-500">Get help with using Momo Credit</p>
                </div>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </Link>

          {/* About */}
          <Link href="/about">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">About</p>
                  <p className="text-sm text-gray-500">Learn more about Momo Credit</p>
                </div>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </Link>

          {/* Version */}
          <Link href="/profile/version">
            <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <GitBranch className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">App Version</p>
                  <p className="text-sm text-gray-500">Check for updates</p>
                </div>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </Link>

          {/* Notification Settings */}
          {"Notification" in window && (
            <div className="bg-white rounded-xl shadow p-5 mb-6">
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {notificationsEnabled ? (
                    <Bell className="h-5 w-5 text-orange-600" />
                  ) : (
                    <BellOff className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">
                      {notificationsEnabled
                        ? "You'll receive notifications about new features and updates"
                        : "Enable to receive important updates"}
                    </p>
                  </div>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={handleToggleNotifications} />
              </div>
            </div>
          )}

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
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && <LogoutConfirmation onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />}
    </div>
  )
}
