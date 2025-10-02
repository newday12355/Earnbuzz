"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [newUserData, setNewUserData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const refCode = searchParams.get("ref")
    if (refCode) {
      setReferralCode(refCode)
    }
  }, [searchParams])

  const handleWhatsAppSupport = () => {
    const phoneNumber = "2349059089490"
    const message = encodeURIComponent("hello, am from momo credit.")
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

      // Store user data in localStorage for the app
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        balance: 180000,
        userId: data.user.referral_code,
        hasMomoNumber: false,
        level: "Basic",
        referralCode: data.user.referral_code,
      }

      localStorage.setItem("earnbuzz-user", JSON.stringify(userData))
      localStorage.removeItem("earnbuzz-welcome-popup-shown")

      // Show success screen with referral code
      setNewUserData(data.user)
      setRegistrationSuccess(true)
    } catch (error: any) {
      console.error("[v0] Registration error:", error)
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyReferralCode = () => {
    if (newUserData?.referral_code) {
      navigator.clipboard.writeText(newUserData.referral_code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCopyReferralLink = () => {
    if (newUserData?.referral_code) {
      const link = `https://earnbuzz.netlify.app/register?ref=${newUserData.referral_code}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (registrationSuccess && newUserData) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white p-6">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to EarnBuzz!</h1>
            <p className="text-gray-600">Your account has been created successfully</p>
          </div>

          <Card className="w-full bg-white shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="text-center">Your Referral Code</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Share this code to earn rewards</p>
                <div className="text-3xl font-bold text-green-600 tracking-wider mb-3">{newUserData.referral_code}</div>
                <Button
                  onClick={handleCopyReferralCode}
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy Code"}
                </Button>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-2">Your Referral Link:</p>
                <div className="bg-white rounded px-3 py-2 text-xs text-gray-600 break-all mb-2">
                  https://earnbuzz.netlify.app/register?ref={newUserData.referral_code}
                </div>
                <Button
                  onClick={handleCopyReferralLink}
                  variant="outline"
                  size="sm"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  <Copy className="h-3 w-3 mr-2" />
                  Copy Link
                </Button>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-sm text-orange-800 font-semibold">🎁 Earn ₦500 for every friend you refer!</p>
              </div>

              <Button
                onClick={() => router.push("/welcome")}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fff5f0] relative">
      {/* Main content container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          <div className="animate-fade-in">
            <Logo className="w-64 mb-4" />
          </div>

          <h1 className="text-2xl font-semibold text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
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
                className="h-14 rounded-full bg-white px-6 border border-gray-200"
              />

              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 rounded-full bg-white px-6 border border-gray-200"
              />

              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 rounded-full bg-white px-6 border border-gray-200"
              />

              <Input
                type="text"
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                className="h-14 rounded-full bg-white px-6 border border-gray-200"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-full bg-black hover:bg-gray-800 text-white text-lg"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-orange-600">
            <Link href="/login">Already have an account? Login</Link>
          </p>
        </div>
      </div>

      {/* WhatsApp button fixed to bottom left */}
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
