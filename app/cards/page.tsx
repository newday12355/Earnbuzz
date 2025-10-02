"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CardsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Cards</h1>
          <div className="w-9"></div>
        </div>

        <div className="relative w-full h-48 mb-8">
          {/* Back Card */}
          <div
            className="absolute w-full h-full rounded-xl shadow-lg top-3 -left-3 z-10"
            style={{
              background: "linear-gradient(135deg, #00697a, #001a30)",
              color: "white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="text-lg font-bold tracking-wider">EARNBUZZ</div>
          </div>

          {/* Front Card */}
          <div
            className="absolute w-full h-full rounded-xl shadow-lg z-20"
            style={{
              background: "linear-gradient(135deg, #6b1fb4, #0b1530)",
              color: "white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="text-lg font-bold tracking-wider">EARNBUZZ</div>
            <div className="text-sm tracking-widest">**** **** **** 1234</div>
          </div>
        </div>

        {/* Card Features */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Get your instant prepaid debit card</h2>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-sm">
              <span className="text-green-600 font-bold mr-3">✔</span>
              Faster international payments
            </li>
            <li className="flex items-center text-sm">
              <span className="text-green-600 font-bold mr-3">✔</span>
              Globally accepted
            </li>
            <li className="flex items-center text-sm">
              <span className="text-green-600 font-bold mr-3">✔</span>
              Works on all your favourite stores
            </li>
            <li className="flex items-center text-sm">
              <span className="text-green-600 font-bold mr-3">✔</span>
              Heavily secure
            </li>
          </ul>

          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Create my virtual card
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">Card Features Coming Soon!</DialogTitle>
                <DialogDescription className="text-center pt-4">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We're working hard to bring you amazing card features. Stay tuned for updates!
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-orange-700 text-sm font-medium">Expected Launch: Coming Soon</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
