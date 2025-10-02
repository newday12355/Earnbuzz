"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function BuyBuzzCodeLoading() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/buy-buzz-code/payment")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Request</h2>
        <p className="text-gray-600">Please wait while we prepare your buzz code purchase...</p>
      </div>
    </div>
  )
}
