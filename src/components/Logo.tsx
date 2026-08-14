import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showWordmark?: boolean;
  className?: string;
  animate?: boolean;
}

export const LogoSymbol: React.FC<{ size?: string; className?: string; interactive?: boolean }> = ({
  size = 'w-10 h-10',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${size} ${className}`}>
      {/* Ambient Violet Glow */}
      <div className="absolute inset-0 bg-[#7C3AED] opacity-20 blur-xl rounded-full scale-125 pointer-events-none" />

      {/* SVG Precision Monogram: Three Prisms Converging into 'A' */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(124,58,237,0.35)] relative z-10"
      >
        <defs>
          {/* Violet Gradient for Left Apex Blade */}
          <linearGradient id="amigoBlade1" x1="20" y1="80" x2="50" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="60%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>

          {/* Electric Violet Gradient for Right Apex Blade */}
          <linearGradient id="amigoBlade2" x1="80" y1="80" x2="50" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2E1065" />
            <stop offset="50%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>

          {/* Core Central Bridge */}
          <linearGradient id="amigoCore" x1="32" y1="58" x2="68" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Dynamic Glow Filter */}
          <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Triangle Shield / Silhouette */}
        <path
          d="M50 14L84 82H66L50 50L34 82H16L50 14Z"
          fill="url(#amigoBlade1)"
          className="transition-all duration-300"
        />

        {/* Right Counter facet with depth */}
        <path
          d="M50 14L84 82H64L50 54V14Z"
          fill="url(#amigoBlade2)"
          opacity="0.9"
        />

        {/* Inner Apex Inverted Prism (The "Three Minds" convergence void) */}
        <path
          d="M50 28L63 60H37L50 28Z"
          fill="#0A0A0A"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Central Core Catalyst Spark (The "One Build" nexus) */}
        <polygon
          points="50,42 55,52 50,56 45,52"
          fill="url(#amigoCore)"
          filter="url(#coreGlow)"
        />

        {/* Subtle Horizontal Tech Coordinate Beam */}
        <line
          x1="26"
          y1="64"
          x2="74"
          y2="64"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          strokeDasharray="2 2"
        />
      </svg>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { symbol: 'w-7 h-7', text: 'text-base', spacing: 'gap-2.5' },
    md: { symbol: 'w-9 h-9', text: 'text-xl', spacing: 'gap-3' },
    lg: { symbol: 'w-12 h-12', text: 'text-2xl', spacing: 'gap-3.5' },
    xl: { symbol: 'w-16 h-16', text: 'text-3xl', spacing: 'gap-4' },
    hero: { symbol: 'w-24 h-24 md:w-32 md:h-32', text: 'text-4xl md:text-5xl', spacing: 'gap-5' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${currentSize.spacing} group select-none ${className}`}>
      <LogoSymbol size={currentSize.symbol} />
      
      {showWordmark && (
        <div className="flex flex-col">
          <div className={`font-display font-extrabold tracking-[-0.04em] uppercase leading-none ${currentSize.text} text-[#F9FAFC] flex items-center`}>
            <span>AMIGO</span>
            <span className="text-[#8B5CF6] transition-colors duration-300 group-hover:text-[#A78BFA]">WORKS</span>
          </div>
          {size === 'hero' && (
            <span className="text-xs md:text-sm font-mono-code text-[#9CA3AF] tracking-[0.25em] uppercase mt-1">
              THREE MINDS. ONE BUILD.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
