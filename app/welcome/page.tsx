"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const router = useRouter()
  const [displayText, setDisplayText] = useState("")
  const fullText = "Earn Buzz"
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Typing animation - made slower (changed from 200ms to 400ms)
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, fullText])

  useEffect(() => {
    // Redirect to dashboard after 8 seconds (increased from 6 to account for slower typing)
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 8000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700">
      <div className="text-center">
        {/* App name with typing animation */}
        <h1 className="text-6xl font-bold text-white mb-8 font-mono">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-orange-100 mb-8 animate-fade-in" style={{ animationDelay: "3s" }}>
          Financial Services
        </p>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 animate-fade-in" style={{ animationDelay: "4s" }}>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  )
}
