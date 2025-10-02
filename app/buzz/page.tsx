"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Zap, Clock, CheckCircle } from "lucide-react"

export default function BuzzPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="flex items-center text-gray-600">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Buzz Cards</h1>
          <div className="w-12" />
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Active Buzz Code Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Active Buzz Code</h3>
                <p className="text-orange-100 text-sm">Ready for transactions</p>
              </div>
            </div>
            <CheckCircle className="w-6 h-6 text-green-300" />
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-orange-100 mb-1">Code ID</div>
            <div className="font-mono text-lg font-bold">BZ-2024-8901</div>
          </div>
        </div>

        {/* Purchase New Code Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <div className="flex items-center mb-4">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Purchase New Code</h3>
              <p className="text-gray-600 text-sm">Get additional buzz codes</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Price per code:</span>
            <span className="text-xl font-bold text-orange-600">₦6,250</span>
          </div>
          <button
            onClick={() => router.push("/buy-buzz-code")}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Buy New Buzz Code
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Withdrawal</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">₦15,000</div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Airtime Purchase</div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">₦2,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
