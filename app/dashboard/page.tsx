"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard, History, Home, Bell, User, Trophy, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardImageCarousel } from "@/components/dashboard-image-carousel"
import { WithdrawalNotification } from "@/components/withdrawal-notification"
import { ReferralCard } from "@/components/referral-card"
import { useToast } from "@/hooks/use-toast"

interface UserData {
  name: string
  email: string
  balance: number
  userId: string
  hasMomoNumber: boolean
  profilePicture?: string
  id?: string // Added id field
}

interface MenuItem {
  name: string
  icon?: React.ElementType
  emoji?: string
  link?: string
  external?: boolean
  action?: () => void
  color: string
  bgColor: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [showBalance, setShowBalance] = useState(true)
  const [showWithdrawalNotification, setShowWithdrawalNotification] = useState(false)
  const [balance, setBalance] = useState(5000)
  const [timeRemaining, setTimeRemaining] = useState(300)
  const [canClaim, setCanClaim] = useState(false)
  const [isCounting, setIsCounting] = useState(true)

  const handleCloseWithdrawalNotification = useCallback(() => {
    setShowWithdrawalNotification(false)
  }, [])

  useEffect(() => {
    if (!isCounting) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setCanClaim(true)
          setIsCounting(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isCounting])

  const handleClaim = () => {
    if (canClaim) {
      setBalance((prev) => prev + 1000)
      setCanClaim(false)
      setTimeRemaining(300)
      setIsCounting(true)

      toast({
        title: "Reward Claimed! 🎉",
        description: "₦1,000 has been added to your balance",
        duration: 3000,
      })

      if (userData) {
        const updatedUser = { ...userData, balance: balance + 1000 }
        localStorage.setItem("tivexx-user", JSON.stringify(updatedUser))
        setUserData(updatedUser)
      }
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("tivexx-user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)

    if (typeof user.balance !== "number") {
      user.balance = 5000
    }

    if (!user.userId) {
      user.userId = `TX${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }
    localStorage.setItem("tivexx-user", JSON.stringify(user))

    setUserData(user)
    setBalance(user.balance)

    const notificationInterval = setInterval(() => {
      setShowWithdrawalNotification(true)
    }, 10000)

    return () => {
      clearInterval(notificationInterval)
    }
  }, [router])

  const formatCurrency = (amount: number) => {
    if (!showBalance) return "••••••••"

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const menuItems: MenuItem[] = [
    { name: "Buy Paykey", icon: CreditCard, link: "/buy-paykey", color: "text-orange-600", bgColor: "" },
    { name: "Loan", emoji: "💳", link: "/loan", color: "text-purple-600", bgColor: "" },
    { name: "Pay Bills", emoji: "💰", link: "/pay-bills", color: "text-green-600", bgColor: "" },
    { name: "Investment", emoji: "📈", link: "/investment", color: "text-violet-600", bgColor: "" },
    { name: "Earn More", emoji: "🎁", link: "/earn-more", color: "text-yellow-600", bgColor: "" },
    { name: "Refer & Earn", icon: Gift, link: "/refer", color: "text-pink-600", bgColor: "" },
    {
      name: "Channel",
      emoji: "✈️",
      link: "https://t.me/Tivexxcommunity",
      external: true,
      color: "text-blue-500",
      bgColor: "",
    },
    { name: "Support", emoji: "💬", link: "/support", color: "text-teal-600", bgColor: "" },
    { name: "Top Earners", icon: Trophy, link: "/top-earners", color: "text-yellow-600", bgColor: "" },
  ]

  const dashboardImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-31%20at%2001.13.54_e9100662.jpg-FQVXkkCU0cMzvDsLmVAdDc1C5Pbklm.jpeg", // Winner of ₦10k airtime giveaway - Patience Igwe
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-31%20at%2001.21.56_29382a5d.jpg-R6hYLFSJWIqudf14Kjq7b0Isprxzmr.jpeg", // Game Day at NASDEC Complex Lusaka
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-31%20at%2001.09.20_21a52974.jpg-eR0w5XTgfVotPzC1aMZWNNOnOZHEeW.jpeg", // Transact & Win promotion
  ]

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fff5f0] to-[#fff0e6]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-4 bg-gradient-to-b from-[#fff5f0] to-[#fff0e6]">
      {showWithdrawalNotification && <WithdrawalNotification onClose={handleCloseWithdrawalNotification} />}

      <div className="text-white rounded-xl p-5 bg-gradient-to-br from-gray-900 via-green-900 to-black shadow-md border-0 px-5 py-2.5 mx-2.5 mt-8 mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden">
              {userData?.profilePicture ? (
                <img
                  src={userData.profilePicture || "/placeholder.svg"}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-semibold text-xl text-orange-700">{userData?.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="font-medium text-lg">
                Hi, {userData?.name.split(" ")[0]} <span className="ml-1">👋</span>
              </div>
              <div className="text-sm text-gray-200">Welcome back!</div>
            </div>
          </div>
          <Link href="/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full bg-orange-600 hover:bg-orange-500"
            >
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </Link>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-200 mb-1">Your Balance</div>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">{formatCurrency(balance)}</div>
            <button
              className="text-gray-200 hover:text-white transition-colors"
              onClick={() => setShowBalance(!showBalance)}
              aria-label="Toggle balance visibility"
            >
              {showBalance ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="2" y1="21" x2="22" y2="3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <div className="text-sm text-orange-200 mt-1">
            <span className="font-medium">User ID:</span> {userData?.userId}
          </div>
        </div>

        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-300" />
              <span className="text-sm font-medium">Next Reward</span>
            </div>
            <span className="text-lg font-bold text-green-300">{formatTime(timeRemaining)}</span>
          </div>
          <Button
            onClick={handleClaim}
            disabled={!canClaim}
            className={`w-full ${
              canClaim ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2`}
          >
            <Gift className="h-5 w-5" />
            {canClaim ? "Claim ₦1,000" : `Wait ${formatTime(timeRemaining)}`}
          </Button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link href="/history" className="flex-1 mr-2">
            <Button className="w-full hover:bg-orange-500 rounded-full py-3 h-auto flex items-center justify-center gap-2 text-slate-700 bg-slate-100">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <History className="h-4 w-4 text-orange-700" />
              </div>
              <span>History</span>
            </Button>
          </Link>
          <Link href="/withdraw" className="flex-1 ml-2">
            <Button className="w-full hover:bg-orange-500 rounded-full py-3 h-auto flex items-center justify-center gap-2 text-slate-700 bg-slate-100">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </div>
              <span>Transfer</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 p-2 mt-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon

          if (item.action) {
            return (
              <button key={index} onClick={item.action} className="focus:outline-none">
                <div className="flex flex-col items-center justify-center p-1 transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-10 h-10 flex items-center justify-center mb-1 ${item.color} drop-shadow-md animate-pulse-slow rounded-lg`}
                  >
                    {item.emoji ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      Icon && <Icon size={22} strokeWidth={1.5} className="animate-fade-in" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
                </div>
              </button>
            )
          }

          if (item.external) {
            return (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                <div className="flex flex-col items-center justify-center p-1 transition-all duration-300 transform hover:-translate-y-1">
                  <div
                    className={`w-10 h-10 flex items-center justify-center mb-1 ${item.color} drop-shadow-md animate-pulse-slow rounded-lg`}
                  >
                    {item.emoji ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      Icon && <Icon size={22} strokeWidth={1.5} className="animate-fade-in" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
                </div>
              </a>
            )
          }

          return (
            <Link key={index} href={item.link || "#"} className="focus:outline-none">
              <div className="flex flex-col items-center justify-center p-1 transition-all duration-300 transform hover:-translate-y-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center mb-1 ${item.color} drop-shadow-md animate-pulse-slow rounded-lg`}
                >
                  {item.emoji ? (
                    <span className="text-2xl">{item.emoji}</span>
                  ) : (
                    Icon && <Icon size={22} strokeWidth={1.5} className="animate-fade-in" />
                  )}
                </div>
                <span className="text-xs font-medium text-center text-gray-700">{item.name}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-6">
        <DashboardImageCarousel images={dashboardImages} />
      </div>

      {userData && (
        <div className="px-4 mt-6">
          <ReferralCard userId={userData.id || userData.userId} />
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-16 max-w-md mx-auto z-50">
        <Link href="/dashboard" className="flex flex-col items-center text-orange-600">
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link href="/cards" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <CreditCard className="h-6 w-6" />
          <span className="text-xs font-medium">Buzz</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-600 hover:text-orange-600">
          <User className="h-6 w-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </div>
    </div>
  )
}
