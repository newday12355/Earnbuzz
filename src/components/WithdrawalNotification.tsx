"use client"

import { useState, useEffect, useRef } from "react"
import { X, ArrowDownLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface Notification {
  id: string
  name: string
  amount: number
  source: "signup" | "referral" | "loan" | "spin"
}

export function WithdrawalNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const usedNamesRef = useRef<Set<string>>(new Set())
  const pathname = usePathname()
  const shouldShowNotifications = pathname === "/" || pathname === "/dashboard"

  const nigerianNames = {
    igbo: ["Chinedu","Adaora","Emeka","Ngozi","Chioma","Obinna","Amara"],
    hausa: ["Abdullahi","Aisha","Ibrahim","Fatima","Musa","Zainab","Usman"],
    yoruba: ["Adebayo","Folake","Olumide","Bukola","Babatunde","Yetunde"],
    middlebelt: ["Daniel","Grace","Samuel","Joy","David","Faith"],
    southsouth: ["Ekaette","Udeme","Ime","Aniekan","Emem","Uduak"],
    general: ["Ahmed","Fatimah","Rasheed","Kemi","Tolu","Bola","Kunle"]
  }

  const getRandomName = () => {
    const allNames = Object.values(nigerianNames).flat()
    if (allNames.length === 0) return "User"

    const unused = allNames.filter(name => !usedNamesRef.current.has(name))
    const available = unused.length > 0 ? unused : allNames

    const selected = available[Math.floor(Math.random() * available.length)]
    usedNamesRef.current.add(selected)
    return selected
  }

  const loanAmounts = [
    200000,210000,220000,230000,240000,250000,260000,270000,280000,290000,
    300000,400000,450000,500000,550000,600000,650000,700000,750000,800000,
    850000,900000,950000,1000000
  ]
  const referralAmounts = [
    100000,110000,120000,130000,140000,150000,160000,170000
  ]
  const spinAmounts = [
    100000,120000,150000,180000,200000,250000,300000 // ✅ all 100k+
  ]
  const SIGNUP_AMOUNT = 1800000 // ✅ fixed at 1.8M

  // pick source with 20% chance for spin
  const getSourceAndAmount = () => {
    const random = Math.random()
    if (random < 0.2) {
      return { source: "spin" as const, amount: spinAmounts[Math.floor(Math.random() * spinAmounts.length)] }
    }

    const sources: ("signup" | "referral" | "loan")[] = ["signup", "referral", "loan"]
    const source = sources[Math.floor(Math.random() * sources.length)]

    if (source === "signup") return { source, amount: SIGNUP_AMOUNT }
    if (source === "referral") return { source, amount: referralAmounts[Math.floor(Math.random() * referralAmounts.length)] }
    return { source, amount: loanAmounts[Math.floor(Math.random() * loanAmounts.length)] }
  }

  const DISPLAY_MS = 7000 // show each notification for 7s
  const INITIAL_DELAY_MS = 3000 // first one at 3s

  const createNotification = () => {
    const name = getRandomName()
    const { source, amount } = getSourceAndAmount()

    const notification: Notification = {
      id: Date.now().toString(),
      name,
      amount,
      source
    }

    setNotifications([notification]) // Only one at a time

    setTimeout(() => {
      setNotifications([])
    }, DISPLAY_MS)
  }

  useEffect(() => {
    if (!shouldShowNotifications) {
      setNotifications([])
      return
    }

    const first = setTimeout(createNotification, INITIAL_DELAY_MS)

    let timeoutId: NodeJS.Timeout
    const scheduleNext = () => {
      const nextDelay = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000 // random 10–20s
      timeoutId = setTimeout(() => {
        createNotification()
        scheduleNext()
      }, nextDelay)
    }

    scheduleNext()

    return () => {
      clearTimeout(first)
      clearTimeout(timeoutId)
    }
  }, [shouldShowNotifications])

  const removeNotification = () => setNotifications([])

  const getSourceLabel = (source: Notification["source"]) => {
    if (source === "signup") return "from signup bonus 💰"
    if (source === "loan") return "from loan 💰"
    if (source === "spin") return "from Spin & Win 🎡"
    return "from referral 🫂"
  }

  if (!shouldShowNotifications) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      {notifications.map(notification => (
        <Card
          key={notification.id}
          className="p-4 bg-white border border-purple-200 shadow-lg animate-in slide-in-from-right-full duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {notification.name} just withdrew
                </p>
                <p className="text-lg font-bold text-purple-600">
                  ₦{notification.amount.toLocaleString()}
                </p>
                <p className="text-xs font-semibold text-gray-800">
                  {getSourceLabel(notification.source)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
              onClick={removeNotification}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default WithdrawalNotifications