import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const LoginCarousel = () => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  const images = [
    "/lovable-uploads/22f1c3be-5fc4-4617-8396-55d3e4eb1197.png",
    "/lovable-uploads/a1a346ba-0d73-475a-894b-7674608f2a06.png",
    "/lovable-uploads/e982be07-d4a8-4ea8-81b7-39e06cc37516.png",
    "/lovable-uploads/cd5dffdd-88df-4585-8541-9c15f3a196ad.png",
    "/lovable-uploads/a38f072a-2d13-4a8d-884a-ed1de414e4c6.png",
    "/lovable-uploads/1f2a6f6a-8261-4158-a189-707d1f9233ee.png",
    "/lovable-uploads/a4a61319-a412-4084-aec6-a3f2cfcbacb5.png",
  ];

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => api?.off("select", onSelect);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (current === images.length - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, current, images.length]);

  return (
    <div className="w-full">
      {/* Enhanced FairMoney Design Writing */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
          <div className="w-2 h-2 bg-white/80 rounded-full mr-2 animate-pulse delay-150"></div>
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-300"></div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wider relative">
          <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-lg">
            FairMoney
          </span>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </h1>
        <p className="text-white/90 text-sm font-medium tracking-wide">Rebuilding Africa's money story</p>
        <div className="flex justify-center mt-3 space-x-1">
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-40 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={`FairMoney Promo ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};