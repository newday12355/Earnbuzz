"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { useState } from "react"

const banks = [
  { name: "Palmpay", logo: "🟣", selected: false, status: "fast" },
  { name: "Opay", logo: "🟢", selected: false, status: "fast" },
  { name: "Access Bank", logo: "🔵", selected: false, status: "normal" },
  { name: "Moniepoint", logo: "🟡", selected: false, status: "fast" },
]

export default function SelectBank() {
  const router = useRouter()
  const [selectedBank, setSelectedBank] = useState("")

  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName)
    // Store selected bank and redirect back to payment
    localStorage.setItem("selectedBank", bankName)
    router.push("/buy-buzz-code/payment")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Select Bank</h1>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-6">Choose your preferred bank for payment</p>

          <div className="space-y-3">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className={`flex items-center p-4 border rounded ${bank.selected ? "bg-blue-100" : ""}`}
                onClick={() => handleBankSelect(bank.name)}
              >
                <span className="mr-4">{bank.logo}</span>
                <span className="flex-1">{bank.name}</span>
                <span className="text-sm text-gray-500">{bank.status}</span>
                {bank.selected && (
                  <button className="ml-4">
                    <Check className="w-6 h-6" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
