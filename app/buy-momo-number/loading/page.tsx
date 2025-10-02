"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to payment page after 2 seconds
    const timer = setTimeout(() => {
      router.push("/buy-momo-number/payment")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin mb-6">
        <Loader2 className="h-16 w-16 text-orange-600" />
      </div>
      <h2 className="text-xl font-semibold text-center mb-2">Preparing Payment</h2>
      <p className="text-gray-500 text-center">Please wait while we set up your payment...</p>
    </div>
  )
}
