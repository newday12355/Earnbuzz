import { useEffect, useState } from "react";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";
import promo3 from "@/assets/promo-3.jpg";
import promo4 from "@/assets/promo-4.jpg";
import promo5 from "@/assets/promo-5.jpg";
import promo6 from "@/assets/promo-6.jpg";
import promo7 from "@/assets/promo-7.jpg";
import promo8 from "@/assets/promo-8.jpg";

const promoSlides = [
  {
    image: promo1,
    title: "Celebrate Your Success",
    subtitle: "Get cash rewards with FairMoney"
  },
  {
    image: promo2,
    title: "FairMoney Microfinance Bank", 
    subtitle: "Your trusted financial partner"
  },
  {
    image: promo3,
    title: "Fair Bank for All",
    subtitle: "Airtime, loans, zero fees & more"
  },
  {
    image: promo4,
    title: "Mobile Banking",
    subtitle: "Access your account anywhere"
  },
  {
    image: promo5,
    title: "Loans Made Easy",
    subtitle: "Quick loans from ₦1,500 to ₦1,000,000"
  },
  {
    image: promo6,
    title: "Financial Freedom",
    subtitle: "With FairMoney you've got the finance"
  },
  {
    image: promo7,
    title: "Mobile Banking",
    subtitle: "Banking made simple and secure"
  },
  {
    image: promo8,
    title: "Easy Payments",
    subtitle: "Transfer, recharge and pay bills easily"
  }
];

export const PromoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 mb-8 overflow-hidden rounded-2xl shadow-lg">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promoSlides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide min-w-full h-full flex items-center justify-center relative"
            style={{ 
              backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.9)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="text-center text-white px-6">
              <h3 className="text-lg font-bold mb-2">{slide.title}</h3>
              <p className="text-sm opacity-90">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};