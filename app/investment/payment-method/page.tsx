"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BanknoteIcon as Bank, CreditCard, Bitcoin, ArrowLeft } from "lucide-react"

export default function PaymentMethodPage() {
  const searchParams = useSearchParams()
  const planAmountUSD = searchParams.get("plan") || "N/A"

  const paymentMethods = [
    { name: "Bank Transfer", icon: Bank, link: `/investment/bank-transfer?plan=${planAmountUSD}` },
    { name: "PayPal", icon: CreditCard, link: "#", disabled: true },
    { name: "Crypto", icon: Bitcoin, link: "#", disabled: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-6">
          <Link href="/investment">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-orange-700">Select Payment Method</h1>
        </div>
        <p className="text-gray-600 mb-6 text-center">
          You are investing <span className="font-bold text-orange-700">${planAmountUSD}</span>. Please choose your
          preferred payment method.
        </p>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${method.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Link href={method.link} passHref>
                <Button
                  variant="ghost"
                  className="w-full h-auto p-4 flex items-center justify-start gap-4 text-lg font-medium text-gray-800"
                  disabled={method.disabled}
                >
                  <method.icon className="h-7 w-7 text-orange-600" />
                  {method.name}
                  {method.disabled && <span className="ml-auto text-sm text-gray-500">(Coming Soon)</span>}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">Your investment will be processed securely.</p>
      </div>
    </div>
  )
}
