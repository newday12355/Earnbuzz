"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PromoItem {
  id: number
  title: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  bgColor: string
}

const promoItems: PromoItem[] = [
  {
    id: 1,
    title: "Transact & Win Big!",
    description: "Complete transactions and stand a chance to win amazing prizes",
    image: "/images/promo-transact-win.png",
    buttonText: "Start Now",
    buttonLink: "/airtime",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
  },
  {
    id: 2,
    title: "Game Day Special",
    description: "Get bonus rewards on all your weekend transactions",
    image: "/images/promo-game-day.png",
    buttonText: "Play Now",
    buttonLink: "/watch",
    bgColor: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: "Weekly Winners",
    description: "Join our weekly contest and win cash prizes up to ₦50,000",
    image: "/images/promo-winners.png",
    buttonText: "Join Contest",
    buttonLink: "/earn-more",
    bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
  },
]

interface PromoCarouselProps {
  className?: string
}

export function PromoCarousel({ className = "" }: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoItems.length)
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + promoItems.length) % promoItems.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promoItems.length)
  }

  const currentPromo = promoItems[currentIndex]

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-lg ${className}`}>
      <div className={`${currentPromo.bgColor} text-white p-6 min-h-[180px] flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold mb-2">{currentPromo.title}</h3>
            <p className="text-sm opacity-90 mb-4">{currentPromo.description}</p>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-gray-800 hover:bg-gray-100 font-medium"
              onClick={() => (window.location.href = currentPromo.buttonLink)}
            >
              {currentPromo.buttonText}
            </Button>
          </div>
          <div className="flex-shrink-0">
            <img
              src={currentPromo.image || "/placeholder.svg"}
              alt={currentPromo.title}
              className="w-20 h-20 object-cover rounded-lg opacity-80"
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between items-center mt-4">
          <Button variant="ghost" size="icon" onClick={goToPrevious} className="h-8 w-8 text-white hover:bg-white/20">
            <ChevronLeft size={16} />
          </Button>

          {/* Dots indicator */}
          <div className="flex space-x-2">
            {promoItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={goToNext} className="h-8 w-8 text-white hover:bg-white/20">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
