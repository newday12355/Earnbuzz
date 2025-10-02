"use client"

import { ArrowLeft, TrendingUp, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { WithdrawalNotification } from "@/components/withdrawal-notification"

export default function TopEarnersPage() {
  const router = useRouter()
  const [showWithdrawalNotification, setShowWithdrawalNotification] = useState(false)

  const [totalWithdrawals, setTotalWithdrawals] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("totalWithdrawals")
      return saved ? Number.parseInt(saved) : 28750000
    }
    return 28750000
  })

  const [totalUsers, setTotalUsers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("totalUsers")
      return saved ? Number.parseInt(saved) : 3240
    }
    return 3240
  })

  useEffect(() => {
    localStorage.setItem("totalWithdrawals", totalWithdrawals.toString())
  }, [totalWithdrawals])

  useEffect(() => {
    localStorage.setItem("totalUsers", totalUsers.toString())
  }, [totalUsers])

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setShowWithdrawalNotification(true)
      setTotalWithdrawals((prev) => prev + Math.floor(Math.random() * 100000) + 80000)
      setTotalUsers((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 8000)

    return () => {
      clearInterval(notificationInterval)
    }
  }, [])

  const handleCloseWithdrawalNotification = useCallback(() => {
    setShowWithdrawalNotification(false)
  }, [])

  const topEarners = [
    { name: "Chinedu Okafor", amount: "₦195,000", date: "Jan 8, 2025", ethnicity: "Igbo" },
    { name: "Fatima Abdullahi", amount: "₦188,000", date: "Jan 8, 2025", ethnicity: "Hausa" },
    { name: "Adebayo Ogundimu", amount: "₦182,000", date: "Jan 7, 2025", ethnicity: "Yoruba" },
    { name: "Emeka Nwachukwu", amount: "₦178,000", date: "Jan 7, 2025", ethnicity: "Igbo" },
    { name: "Aisha Mohammed", amount: "₦174,000", date: "Jan 6, 2025", ethnicity: "Hausa" },
    { name: "Folake Adeyemi", amount: "₦169,000", date: "Jan 6, 2025", ethnicity: "Yoruba" },
    { name: "Ikechukwu Okwu", amount: "₦165,000", date: "Jan 5, 2025", ethnicity: "Igbo" },
    { name: "Zainab Usman", amount: "₦162,000", date: "Jan 5, 2025", ethnicity: "Hausa" },
    { name: "Olumide Babatunde", amount: "₦158,000", date: "Jan 4, 2025", ethnicity: "Yoruba" },
    { name: "Chioma Eze", amount: "₦155,000", date: "Jan 4, 2025", ethnicity: "Igbo" },
    { name: "Ibrahim Garba", amount: "₦152,000", date: "Jan 3, 2025", ethnicity: "Hausa" },
    { name: "Temitope Akinola", amount: "₦148,000", date: "Jan 3, 2025", ethnicity: "Yoruba" },
    { name: "Nneka Okonkwo", amount: "₦145,000", date: "Jan 2, 2025", ethnicity: "Igbo" },
    { name: "Maryam Aliyu", amount: "₦142,000", date: "Jan 2, 2025", ethnicity: "Hausa" },
    { name: "Kehinde Oladele", amount: "₦138,000", date: "Jan 1, 2025", ethnicity: "Yoruba" },
    { name: "Obioma Nwosu", amount: "₦135,000", date: "Jan 1, 2025", ethnicity: "Igbo" },
    { name: "Yusuf Hassan", amount: "₦132,000", date: "Dec 31, 2024", ethnicity: "Hausa" },
    { name: "Bukola Adebisi", amount: "₦128,000", date: "Dec 31, 2024", ethnicity: "Yoruba" },
    { name: "Chukwuma Obi", amount: "₦125,000", date: "Dec 30, 2024", ethnicity: "Igbo" },
    { name: "Hafsat Bello", amount: "₦122,000", date: "Dec 30, 2024", ethnicity: "Hausa" },
    { name: "Kelechi Anyanwu", amount: "₦118,000", date: "Dec 29, 2024", ethnicity: "Igbo" },
    { name: "Amina Suleiman", amount: "₦115,000", date: "Dec 29, 2024", ethnicity: "Hausa" },
    { name: "Babatunde Ogundipe", amount: "₦112,000", date: "Dec 28, 2024", ethnicity: "Yoruba" },
    { name: "Ngozi Okoro", amount: "₦109,000", date: "Dec 28, 2024", ethnicity: "Igbo" },
    { name: "Usman Danjuma", amount: "₦106,000", date: "Dec 27, 2024", ethnicity: "Hausa" },
    { name: "Titilayo Adebayo", amount: "₦103,000", date: "Dec 27, 2024", ethnicity: "Yoruba" },
    { name: "Chukwuemeka Ibe", amount: "₦200,000", date: "Dec 26, 2024", ethnicity: "Igbo" },
    { name: "Salamatu Ibrahim", amount: "₦197,000", date: "Dec 26, 2024", ethnicity: "Hausa" },
    { name: "Oluwaseun Ajayi", amount: "₦194,000", date: "Dec 25, 2024", ethnicity: "Yoruba" },
    { name: "Chinonso Okafor", amount: "₦191,000", date: "Dec 25, 2024", ethnicity: "Igbo" },
    { name: "Hadiza Musa", amount: "₦187,000", date: "Dec 24, 2024", ethnicity: "Hausa" },
    { name: "Adunni Ogunleye", amount: "₦184,000", date: "Dec 24, 2024", ethnicity: "Yoruba" },
    { name: "Ifeanyi Nnamdi", amount: "₦181,000", date: "Dec 23, 2024", ethnicity: "Igbo" },
    { name: "Rakiya Abdullahi", amount: "₦178,500", date: "Dec 23, 2024", ethnicity: "Hausa" },
    { name: "Segun Oladapo", amount: "₦175,500", date: "Dec 22, 2024", ethnicity: "Yoruba" },
    { name: "Chiamaka Nnaji", amount: "₦172,500", date: "Dec 22, 2024", ethnicity: "Igbo" },
    { name: "Aliyu Shehu", amount: "₦169,500", date: "Dec 21, 2024", ethnicity: "Hausa" },
    { name: "Funmilayo Adeyemi", amount: "₦166,500", date: "Dec 21, 2024", ethnicity: "Yoruba" },
    { name: "Obinna Okwu", amount: "₦163,500", date: "Dec 20, 2024", ethnicity: "Igbo" },
    { name: "Khadija Garba", amount: "₦160,500", date: "Dec 20, 2024", ethnicity: "Hausa" },
    { name: "Tunde Adebayo", amount: "₦157,500", date: "Dec 19, 2024", ethnicity: "Yoruba" },
    { name: "Chinwe Okafor", amount: "₦154,500", date: "Dec 19, 2024", ethnicity: "Igbo" },
    { name: "Aminu Hassan", amount: "₦151,500", date: "Dec 18, 2024", ethnicity: "Hausa" },
    { name: "Bisi Adeyemi", amount: "₦148,500", date: "Dec 18, 2024", ethnicity: "Yoruba" },
    { name: "Emeka Okonkwo", amount: "₦145,500", date: "Dec 17, 2024", ethnicity: "Igbo" },
    { name: "Zara Mohammed", amount: "₦142,500", date: "Dec 17, 2024", ethnicity: "Hausa" },
    { name: "Wale Ogundipe", amount: "₦139,500", date: "Dec 16, 2024", ethnicity: "Yoruba" },
    { name: "Nkem Eze", amount: "₦136,500", date: "Dec 16, 2024", ethnicity: "Igbo" },
    { name: "Sani Garba", amount: "₦133,500", date: "Dec 15, 2024", ethnicity: "Hausa" },
    { name: "Yemi Akinola", amount: "₦130,500", date: "Dec 15, 2024", ethnicity: "Yoruba" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {showWithdrawalNotification && <WithdrawalNotification onClose={handleCloseWithdrawalNotification} />}

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Top Earners</h1>
          <div className="w-9"></div>
        </div>

        {/* User Counter Card */}

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 mb-6 text-white">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-semibold">Total Withdrawals This Month</span>
          </div>
          <div className="text-2xl font-bold">₦{totalWithdrawals.toLocaleString()}</div>
          <div className="text-sm opacity-90">From {Math.floor(totalWithdrawals / 120000)} successful withdrawals</div>
        </div>

        {/* Top Earners List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Withdrawals</h2>
            <p className="text-sm text-gray-500">Users who have successfully withdrawn</p>
          </div>

          <div className="divide-y divide-gray-100">
            {topEarners.map((earner, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                    {earner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{earner.name}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {earner.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{earner.amount}</div>
                  <div className="text-xs text-gray-500">#{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            Join thousands of users earning daily with Earn Buzz!
            <br />
            <span className="font-semibold">Start earning today!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
