"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "success" | "info" | "warning"
  title: string
  message: string
  timestamp: number
  read: boolean
}

export default function NotificationsPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("momo-credit-user")
    if (!storedUser) {
      router.push("/login")
      return
    }
    setUserData(JSON.parse(storedUser))

    // Load notifications
    loadNotifications()

    // Set up interval to clean old notifications
    const cleanupInterval = setInterval(cleanOldNotifications, 60000) // Check every minute

    return () => clearInterval(cleanupInterval)
  }, [router])

  const loadNotifications = () => {
    const stored = localStorage.getItem("momo-credit-notifications")
    if (stored) {
      const allNotifications = JSON.parse(stored)
      // Filter out notifications older than 1 hour
      const oneHourAgo = Date.now() - 60 * 60 * 1000
      const validNotifications = allNotifications.filter((n: Notification) => n.timestamp > oneHourAgo)
      setNotifications(validNotifications.sort((a: Notification, b: Notification) => b.timestamp - a.timestamp))

      // Update localStorage if we filtered any out
      if (validNotifications.length !== allNotifications.length) {
        localStorage.setItem("momo-credit-notifications", JSON.stringify(validNotifications))
      }
    }
  }

  const cleanOldNotifications = () => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const validNotifications = notifications.filter((n) => n.timestamp > oneHourAgo)

    if (validNotifications.length !== notifications.length) {
      setNotifications(validNotifications)
      localStorage.setItem("momo-credit-notifications", JSON.stringify(validNotifications))
    }
  }

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updated)
    localStorage.setItem("momo-credit-notifications", JSON.stringify(updated))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    localStorage.setItem("momo-credit-notifications", JSON.stringify([]))
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return new Date(timestamp).toLocaleDateString()
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen pb-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Notifications</h1>
              {unreadCount > 0 && <p className="text-sm text-gray-500">{unreadCount} unread</p>}
            </div>
          </div>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllNotifications}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Notifications will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg p-4 shadow-sm border-l-4 cursor-pointer transition-all ${
                  notification.read
                    ? "border-l-gray-200 opacity-75"
                    : notification.type === "success"
                      ? "border-l-green-500"
                      : notification.type === "warning"
                        ? "border-l-orange-500"
                        : "border-l-blue-500"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className={`font-medium ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTime(notification.timestamp)}
                        </span>
                        {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Auto-clear notice */}
        {notifications.length > 0 && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-blue-800">Notifications automatically clear after 1 hour</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
