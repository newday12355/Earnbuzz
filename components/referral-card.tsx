"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Users, Wallet, Gift } from "lucide-react"
import { useState, useEffect } from "react"
import { formatCurrency } from "@/lib/utils/referral"
import { useToast } from "@/hooks/use-toast"

interface ReferralCardProps {
  userId: string
}

interface UserData {
  referral_code: string
  referral_count: number
  referral_balance: number
}

export function ReferralCard({ userId }: ReferralCardProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchUserData()
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchUserData, 5000)
    return () => clearInterval(interval)
  }, [userId])

  const fetchUserData = async () => {
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

  const copyReferralCode = () => {
    if (userData?.referral_code) {
      navigator.clipboard.writeText(userData.referral_code)
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      })
    }
  }

  const copyReferralLink = () => {
    if (userData?.referral_code) {
      const link = `https://earnbuzz.netlify.app/register?ref=${userData.referral_code}`
      navigator.clipboard.writeText(link)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-green-200 rounded w-1/2"></div>
            <div className="h-12 bg-green-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Gift className="h-5 w-5" />
          Referral Rewards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Referral Balance */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Wallet className="h-4 w-4" />
            Referral Balance
          </div>
          <div className="text-3xl font-bold text-green-600">
            {userData ? formatCurrency(userData.referral_balance) : "₦0"}
          </div>
        </div>

        {/* People Referred */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Users className="h-4 w-4" />
            People Referred
          </div>
          <div className="text-3xl font-bold text-green-600">{userData?.referral_count || 0}</div>
        </div>

        {/* Referral Code */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-2">Your Referral Code</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-100 rounded px-3 py-2 font-mono text-lg font-bold text-green-700">
              {userData?.referral_code || "Loading..."}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={copyReferralCode}
              className="border-green-300 hover:bg-green-50 bg-transparent"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={copyReferralLink} className="w-full mt-3 bg-green-600 hover:bg-green-700">
            Copy Referral Link
          </Button>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-600 bg-white rounded-lg p-3">
          <p className="font-semibold mb-1">How it works:</p>
          <p>Earn ₦500 for each friend who signs up using your referral code!</p>
        </div>
      </CardContent>
    </Card>
  )
}
