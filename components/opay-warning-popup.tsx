"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OpayWarningPopupProps {
  onClose: () => void
}

export function OpayWarningPopup({ onClose }: OpayWarningPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Important Notice</h3>
            <p className="text-gray-600 text-sm mb-4">
              Please do not use Opay bank for payments. We are currently experiencing issues with Opay transfers. Use
              other banks like Palmpay, Moniepoint, Kuda, Access Bank, First Bank, etc.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onClose} className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
          ok, continue
        </Button>
      </div>
    </div>
  )
}
