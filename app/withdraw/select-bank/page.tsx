"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const NIGERIAN_BANKS = [
  { name: "Access Bank", code: "044", icon: "🏦" },
  { name: "Citibank", code: "023", icon: "🏦" },
  { name: "Ecobank Nigeria", code: "050", icon: "🏦" },
  { name: "Fidelity Bank", code: "070", icon: "🏦" },
  { name: "First Bank of Nigeria", code: "011", icon: "🏦" },
  { name: "First City Monument Bank", code: "214", icon: "🏦" },
  { name: "Globus Bank", code: "00103", icon: "🏦" },
  { name: "Guaranty Trust Bank", code: "058", icon: "🏦" },
  { name: "Heritage Bank", code: "030", icon: "🏦" },
  { name: "Keystone Bank", code: "082", icon: "🏦" },
  { name: "Kuda Bank", code: "50211", icon: "🏦" },
  { name: "Moniepoint", code: "50515", icon: "🏦" },
  { name: "Opay", code: "999992", icon: "🏦" },
  { name: "Palmpay", code: "999991", icon: "🏦" },
  { name: "Polaris Bank", code: "076", icon: "🏦" },
  { name: "Providus Bank", code: "101", icon: "🏦" },
  { name: "Stanbic IBTC Bank", code: "221", icon: "🏦" },
  { name: "Standard Chartered Bank", code: "068", icon: "🏦" },
  { name: "Sterling Bank", code: "232", icon: "🏦" },
  { name: "Union Bank of Nigeria", code: "032", icon: "🏦" },
  { name: "United Bank for Africa", code: "033", icon: "🏦" },
  { name: "Unity Bank", code: "215", icon: "🏦" },
  { name: "Wema Bank", code: "035", icon: "🏦" },
  { name: "Zenith Bank", code: "057", icon: "🏦" },
].sort((a, b) => a.name.localeCompare(b.name))

export default function SelectBankPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBank, setSelectedBank] = useState<string | null>(null)

  const filteredBanks = NIGERIAN_BANKS.filter((bank) => bank.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleProceed = () => {
    if (selectedBank) {
      localStorage.setItem("selectedBank", selectedBank)
      router.push("/withdraw/receipt")
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b sticky top-0 z-10">
        <Link href="/withdraw">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold text-gray-800">Select Bank</h1>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Bank List */}
        <div className="space-y-2 mb-20">
          {filteredBanks.map((bank) => (
            <button
              key={bank.code}
              onClick={() => setSelectedBank(bank.name)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                selectedBank === bank.name
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-purple-300"
              }`}
            >
              <span className="text-2xl">{bank.icon}</span>
              <span className="font-medium text-gray-800">{bank.name}</span>
              {selectedBank === bank.name && (
                <div className="ml-auto w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button
            onClick={handleProceed}
            disabled={!selectedBank}
            className={`w-full max-w-md mx-auto py-6 rounded-xl text-lg font-semibold ${
              selectedBank
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  )
}
