interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Main logo text */}
        <div className="text-4xl font-bold text-orange-600 tracking-tight">EarnBuzz</div>

        {/* Tagline */}
        <div className="text-sm text-gray-600 text-center mt-1 font-medium">Financial Services</div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>
    </div>
  )
}
