import React, { useId, memo } from 'react';
import TechCircles from './TechCircles';

interface TechBackgroundProps {
  variant?: 'grid' | 'dots' | 'circuit' | 'circles';
  className?: string;
  color?: string; // Optional color override
  /** Permite apagar animaciones sutiles (por ej. en mobile o si hay lag) */
  animated?: boolean;
}

const TechBackground: React.FC<TechBackgroundProps> = memo(({
  variant = 'grid',
  className = '',
  color,
  animated = true,
}) => {
  const patternId = useId();

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {variant === 'grid' && (
        <div className="absolute inset-0 opacity-[0.1] text-brand-tech [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={patternId}
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={color || 'currentColor'}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>
      )}

      {variant === 'dots' && (
        <div className="absolute inset-0 opacity-[0.15] text-brand-tech [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={patternId}
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill={color || 'currentColor'} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        </div>
      )}

      {variant === 'circuit' && (
        <>
          {/* SVG Circuit Pattern */}
          <div className="absolute inset-0 opacity-[0.2] text-brand-tech [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id={patternId}
                  x="0"
                  y="0"
                  width="300"
                  height="300"
                  patternUnits="userSpaceOnUse"
                >
                  {/* Circuit Lines */}
                  <path
                    d="M40 0 V 40 H 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <circle cx="80" cy="40" r="2" fill="currentColor" />

                  <path
                    d="M260 300 V 260 H 220"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <circle cx="220" cy="260" r="2" fill="currentColor" />

                  <path
                    d="M0 150 H 60 L 80 170"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <path
                    d="M300 150 H 240 L 220 130"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.6"
                  />

                  {/* Chip/Node */}
                  <rect
                    x="130"
                    y="130"
                    width="40"
                    height="40"
                    rx="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <path
                    d="M150 130 V 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <path
                    d="M150 170 V 200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <path
                    d="M130 150 H 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <path
                    d="M170 150 H 200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />

                  {/* Random decorative dots and lines */}
                  <circle
                    cx="100"
                    cy="100"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.5"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="1.5"
                    fill="currentColor"
                    opacity="0.5"
                  />
                  <path
                    d="M280 20 L 300 40"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <circle cx="280" cy="20" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${patternId})`} />
            </svg>
          </div>

          {/* Animated Gradient Lines (solo si animated = true) */}
          {animated && (
            <>
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-40 motion-safe:animate-pulse" />
              <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-tech to-transparent opacity-40 motion-safe:animate-pulse delay-700" />
              <div className="absolute top-0 left-1/3 h-full w-px bg-gradient-to-b from-transparent via-brand-primary to-transparent opacity-30 motion-safe:animate-pulse delay-300" />
              <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-brand-tech to-transparent opacity-30 motion-safe:animate-pulse delay-1000" />
            </>
          )}
        </>
      )}

      {variant === 'circles' && <TechCircles />}

      {/* Soft gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-transparent to-brand-dark/95" />
    </div>
  );
});

TechBackground.displayName = 'TechBackground';

export default TechBackground;
