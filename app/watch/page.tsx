"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Script from "next/script"

export default function WatchPage() {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Watch</span>
        </Link>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium mb-3">How to Earn with Earn Buzz</h2>

        {/* Vimeo Video Player */}
        <div className="mb-2">
          <div style={{ padding: "222.22% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/1068789479?h=054a5d43cc&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="How to Earn with Earn Buzz"
            ></iframe>
          </div>
          <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
        </div>
      </div>
    </div>
  )
}
