"use client"

import { useEffect, useCallback } from "react"
import { registerServiceWorker, showLocalNotification } from "@/services/notification-service"

export function NotificationManager() {
  const checkForNewFeatures = useCallback(() => {
    // This would typically fetch from an API
    // For demo purposes, we're checking localStorage
    const lastFeatureVersion = localStorage.getItem("momo-credit-last-feature-version") || "0"
    const currentFeatureVersion = "1" // This would come from your backend

    if (lastFeatureVersion !== currentFeatureVersion) {
      // There are new features to notify about
      const newFeatures = [
        {
          title: "New Feature: Profile Management",
          body: "You can now customize your profile picture and manage your account details.",
          url: "/profile",
        },
        {
          title: "Enhanced Dashboard",
          body: "Check out our beautiful new dashboard with improved navigation.",
          url: "/dashboard",
        },
      ]

      // Show notification for the first new feature
      if (newFeatures.length > 0) {
        showLocalNotification(newFeatures[0].title, {
          body: newFeatures[0].body,
          data: { url: newFeatures[0].url },
        })

        // Update the feature version in localStorage
        localStorage.setItem("momo-credit-last-feature-version", currentFeatureVersion)
      }
    }
  }, [])

  useEffect(() => {
    // Check if notifications are enabled
    if ("Notification" in window && Notification.permission === "granted") {
      // Register service worker
      registerServiceWorker().then(() => {
        // Check for new features to notify about
        checkForNewFeatures()
      })
    }
  }, [checkForNewFeatures])

  // This component doesn't render anything visible
  return null
}
