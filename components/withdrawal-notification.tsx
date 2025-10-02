"use client"

import { useEffect, useState } from "react"
import { CheckCircle, X } from "lucide-react"

interface WithdrawalNotificationProps {
  onClose: () => void
}

export function WithdrawalNotification({ onClose }: WithdrawalNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [notificationData, setNotificationData] = useState<{
    name: string
    amount: string
  } | null>(null)

  const nigerianNames = [
    "Chinedu Okafor",
    "Fatima Abdullahi",
    "Adebayo Ogundimu",
    "Emeka Nwachukwu",
    "Aisha Mohammed",
    "Folake Adeyemi",
    "Ikechukwu Okwu",
    "Zainab Usman",
    "Olumide Babatunde",
    "Chioma Eze",
    "Ibrahim Garba",
    "Temitope Akinola",
    "Nneka Okonkwo",
    "Maryam Aliyu",
    "Kehinde Oladele",
    "Obioma Nwosu",
    "Yusuf Hassan",
    "Bukola Adebisi",
    "Chukwuma Obi",
    "Hafsat Bello",
    "Kelechi Anyanwu",
    "Amina Suleiman",
    "Babatunde Ogundipe",
    "Ngozi Okoro",
    "Usman Danjuma",
    "Titilayo Adebayo",
    "Chukwuemeka Ibe",
    "Salamatu Ibrahim",
    "Oluwaseun Ajayi",
    "Chinonso Okafor",
    "Hadiza Musa",
    "Adunni Ogunleye",
    "Ifeanyi Nnamdi",
    "Rakiya Abdullahi",
    "Segun Oladapo",
    "Chiamaka Nnaji",
    "Aliyu Shehu",
    "Funmilayo Adeyemi",
    "Obinna Okwu",
    "Khadija Garba",
  ]

  const withdrawalAmounts = [
    "₦125,000",
    "₦132,500",
    "₦148,200",
    "₦163,000",
    "₦186,800",
    "₦174,400",
    "₦195,500",
    "₦138,700",
    "₦205,300",
    "₦127,600",
    "₦156,900",
    "₦182,400",
    "₦143,800",
    "₦216,200",
    "₦174,700",
    "₦129,300",
    "₦198,900",
    "₦165,600",
    "₦221,400",
    "₦134,800",
    "₦189,200",
    "₦152,700",
    "₦207,500",
    "₦178,300",
    "₦135,600",
    "₦193,800",
    "₦167,400",
    "₦224,900",
    "₦141,200",
    "₦199,700",
    "₦183,500",
    "₦128,900",
    "₦202,300",
    "₦175,800",
    "₦229,100",
    "₦146,500",
    "₦191,200",
    "₦168,700",
    "₦215,400",
    "₦157,300",
  ]

  useEffect(() => {
    // Generate random notification data
    const randomName = nigerianNames[Math.floor(Math.random() * nigerianNames.length)]
    const randomAmount = withdrawalAmounts[Math.floor(Math.random() * withdrawalAmounts.length)]

    setNotificationData({ name: randomName, amount: randomAmount })

    // Show notification with animation
    setTimeout(() => setIsVisible(true), 100)

    // Auto hide after 4 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for animation to complete
    }, 4000)

    return () => clearTimeout(hideTimer)
  }, [onClose])

  if (!notificationData) return null

  return (
    <div
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mx-auto max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Withdrawal Successful!</div>
              <div className="text-xs text-gray-600 mt-1">
                <span className="font-medium">{notificationData.name}</span> just withdrew{" "}
                <span className="font-semibold text-green-600">{notificationData.amount}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(onClose, 300)
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
