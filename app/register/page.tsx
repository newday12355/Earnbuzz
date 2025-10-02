"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [referralCode, setReferralCode] = useState("")

  useEffect(() => {
    const refCode = searchParams.get("ref")
    if (refCode) {
      setReferralCode(refCode)
    }
  }, [searchParams])

  const handleWhatsAppSupport = () => {
    const phoneNumber = "2349059089490"
    const message = encodeURIComponent("hello, am from Tivexx.")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          referralCode: referralCode || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        balance: 5000,
        userId: data.user.referral_code,
        hasMomoNumber: false,
        level: "Basic",
        referralCode: data.user.referral_code,
      }

      localStorage.setItem("tivexx-user", JSON.stringify(userData))
      localStorage.removeItem("tivexx-welcome-popup-shown")

      // Redirect straight to welcome page
      router.push("/welcome")
    } catch (error: any) {
      console.error("[v0] Registration error:", error)
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          <div className="animate-fade-in">
            <Logo className="w-64 mb-4" />
          </div>

          <h1
            className="text-2xl font-semibold text-center text-white animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Register to continue
          </h1>

          {referralCode && (
            <Alert className="bg-green-50 border-green-200 animate-fade-in">
              <AlertDescription className="text-green-800 text-center">
                🎉 You're signing up with referral code: <strong>{referralCode}</strong>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 animate-fade-in">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="w-full space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-14 rounded-full bg-white/90 px-6 border border-purple-300"
              />

              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 rounded-full bg-white/90 px-6 border border-purple-300"
              />

              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 rounded-full bg-white/90 px-6 border border-purple-300"
              />

              <Input
                type="text"
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="h-14 rounded-full bg-white/90 px-6 border border-purple-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-lg"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-orange-300">
            <Link href="/login" className="hover:text-orange-200">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </div>

      <div className="fixed bottom-6 left-6">
        <button
          onClick={handleWhatsAppSupport}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Contact WhatsApp Support"
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </button>
      </div>
    </div>
  )
}
