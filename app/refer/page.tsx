"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Copy, Share2, Gift, Users, Wallet } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils/referral"

interface UserData {
  id: string
  referral_code: string
  referral_count: number
  referral_balance: number
}

interface Referral {
  id: string
  name: string
  email: string
  created_at: string
}

export default function ReferPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("tivexx-user")
    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)
    fetchUserData(user.id || user.userId)
    fetchReferrals(user.id || user.userId)
  }, [router])

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/${userId}`)
      const data = await response.json()
      if (data.success) {
        setUserData(data.user)
      }
    } catch (error) {
      console.error("[v0] Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReferrals = async (userId: string) => {
    try {
      const response = await fetch(`/api/referrals/${userId}`)
      const data = await response.json()
      if (data.success) {
        setReferrals(data.referrals)
      }
    } catch (error) {
      console.error("[v0] Error fetching referrals:", error)
    }
  }

  const referralLink = userData
    ? `https://tivexx9ja.vercel.app/register?ref=${userData.referral_code}`
    : "https://tivexx9ja.vercel.app/register"

  const referralCode = userData?.referral_code || "Loading..."

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsAppShare = () => {
    const message = `Hey! 👋\n\nJoin me on Tivexx and start earning money today! 💰\n\nUse my referral code: ${referralCode}\n\nSign up here: ${referralLink}\n\n🎁 Get bonus rewards when you join!`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-orange-500/50 mr-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Refer & Earn</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <Gift className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-2">Earn ₦500</h2>
          <p className="text-orange-100">For every friend you refer!</p>
        </div>
      </div>

      {/* How it Works */}
      <div className="px-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-orange-100">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Share2 className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Share Your Link</h4>
              <p className="text-sm text-gray-600">Share your unique referral link with friends and family</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-orange-100">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">They Sign Up</h4>
              <p className="text-sm text-gray-600">Your friends register using your referral code</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm border border-orange-100">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Wallet className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Earn Rewards</h4>
              <p className="text-sm text-gray-600">Get ₦500 credited to your account instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div className="px-6 mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Referral Code</h3>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm text-orange-100 mb-2">Your Code</p>
          <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <span className="text-2xl font-bold tracking-wider">{referralCode}</span>
            <Button onClick={handleCopy} variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Copy className="h-5 w-5" />
            </Button>
          </div>
          {copied && <p className="text-sm text-yellow-300 mt-2 text-center">Copied to clipboard!</p>}
        </div>

        {/* Referral Link */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-orange-100">
          <p className="text-sm text-gray-600 mb-2">Your Referral Link</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200"
            />
            <Button
              onClick={handleCopy}
              variant="outline"
              size="icon"
              className="flex-shrink-0 border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Share on WhatsApp Button */}
      <div className="px-6 mt-6">
        <Button
          onClick={handleWhatsAppShare}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-xl text-lg font-semibold shadow-lg flex items-center justify-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Share on WhatsApp
        </Button>
      </div>

      <div className="px-6 mt-8 mb-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Your Referral Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-orange-600">{userData?.referral_count || 0}</p>
              <p className="text-sm text-gray-600 mt-1">Total Referrals</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-3xl font-bold text-green-600">
                {userData ? formatCurrency(userData.referral_balance) : "₦0"}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Earned</p>
            </div>
          </div>
        </div>

        {referrals.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Referrals</h3>
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{referral.name}</p>
                    <p className="text-xs text-gray-500">{referral.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">+₦500</p>
                    <p className="text-xs text-gray-500">{new Date(referral.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
