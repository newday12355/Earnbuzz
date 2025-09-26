import { useState, useEffect } from "react";

export const BottomCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    "/src/assets/cbn-logo.jpeg",
    "/lovable-uploads/3a36162b-5f60-487d-989b-359d67cd1c0f.png",
    "/lovable-uploads/26c9dfb2-f522-417a-84ea-f18765dc02a8.png", 
    "/lovable-uploads/1333d6cb-a85c-4067-90ff-bc2f31355a49.png",
    "/lovable-uploads/2b69c3cf-5af0-485e-b853-2130be4c6ef4.png",
    "/lovable-uploads/49c8ac71-8b88-4aae-a816-ca4ea00a79ad.png",
    "/lovable-uploads/8450be7e-ad4b-447a-ac75-ebb36d2774e0.png",
    "/lovable-uploads/cec5ec8c-8d5a-40aa-afed-5bcd5f760c6c.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-40 mb-4 overflow-hidden rounded-2xl shadow-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0">
            <img
              src={banner}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log(`Failed to load image: ${banner}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-110" : "bg-white/60"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};