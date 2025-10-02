"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp } from "lucide-react"

const USD_TO_NGN_EXCHANGE_RATE = 1500 // Example exchange rate

export default function InvestmentPage() {
  const investmentPlans = [
    { id: "plan-20", amountUSD: 20, description: "Start your investment journey with a small step." },
    { id: "plan-35", amountUSD: 35, description: "Grow your savings with a moderate investment." },
    { id: "plan-50", amountUSD: 50, description: "Accelerate your returns with a solid investment." },
    { id: "plan-100", amountUSD: 100, description: "Maximize your potential with a significant investment." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-700 mb-2">Invest with Earn Buzz</h1>
        <p className="text-gray-600">Choose a plan that suits your financial goals.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {investmentPlans.map((plan) => (
          <Card
            key={plan.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="bg-orange-500 text-white p-4 flex flex-row items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="h-6 w-6" />${plan.amountUSD} Plan
              </CardTitle>
              <TrendingUp className="h-8 w-8" />
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> High potential returns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> Secure and transparent
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> Flexible terms
                </li>
              </ul>
              <Link href={`/investment/payment-method?plan=${plan.amountUSD}`}>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300">
                  Invest Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>&copy; 2024 Earn Buzz. All rights reserved.</p>
      </footer>
    </div>
  )
}
