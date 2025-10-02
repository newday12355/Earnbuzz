"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Share2, WheatIcon as Whatsapp } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function SharePage() {
  const shareLink = "https://momo-credit.netlify.app/"
  const shareMessage =
    "Earn Buzz: Your ultimate financial companion! Manage money, buy airtime/data, get quick loans, and invest with ease. Download now!"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Link Copied!",
      description: "The app link has been copied to your clipboard.",
    })
  }

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage + " " + shareLink)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fff5f0] to-[#fff0e6] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-700">Share Earn Buzz</CardTitle>
          <CardDescription className="text-gray-600">
            Spread the word about Earn Buzz with your friends and family!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="share-link" className="text-sm font-medium text-gray-700">
              Shareable Link
            </label>
            <div className="flex items-center space-x-2">
              <Input id="share-link" type="text" value={shareLink} readOnly className="flex-grow" />
              <Button onClick={handleCopyLink} variant="outline" size="icon" aria-label="Copy link">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Button onClick={handleShareWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white">
              <Whatsapp className="h-5 w-5 mr-2" />
              Share to WhatsApp
            </Button>
            {navigator.share && (
              <Button
                onClick={() => navigator.share({ title: "Earn Buzz App", text: shareMessage, url: shareLink })}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share via Other Apps
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <Link href="/dashboard" className="mt-6">
        <Button variant="outline" className="text-orange-700 border-orange-700 hover:bg-orange-50 bg-transparent">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  )
}
