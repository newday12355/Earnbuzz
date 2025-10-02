"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardImageCarouselProps {
  images: string[]
  interval?: number // Auto-advance interval in ms
}

export function DashboardImageCarousel({ images, interval = 5000 }: DashboardImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg mx-2.5">
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`Dashboard promo ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 text-white bg-black/30 hover:bg-black/50 rounded-full z-10"
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-white bg-black/30 hover:bg-black/50 rounded-full z-10"
        >
          <ChevronRight size={16} />
        </Button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
