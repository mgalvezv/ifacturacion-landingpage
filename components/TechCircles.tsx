// src/components/TechCircles.tsx
import React from 'react';

const TechCircles: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <style>{`
        .tech-circle-group {
          transform-origin: 450px 450px;
          will-change: transform;
        }

        /* Animaciones un poco más lentas para bajar carga */
        .spin-cw-slow {
          animation: spin 80s linear infinite;
        }
        .spin-ccw-medium {
          animation: spin 65s linear infinite reverse;
        }
        .spin-cw-fast {
          animation: spin 50s linear infinite;
        }
        .spin-ccw-slow {
          animation: spin 100s linear infinite reverse;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Respeto a usuarios con reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .spin-cw-slow,
          .spin-ccw-medium,
          .spin-cw-fast,
          .spin-ccw-slow {
            animation: none;
          }
        }
      `}</style>

      <svg
        version="1.1"
        viewBox="0 0 900 900"
        className="w-full h-full max-w-[1200px] max-h-[1200px] opacity-20"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="orange-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="orange-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Group 4 */}
        <g className="tech-circle-group spin-ccw-slow">
          <path fill="url(#orange-gradient-1)" d="M740.248 437.58l101.731-3.4c1.53 153.69-80.501 309.86-226.892 373.82l-42.59-94.04c108.24-47.29 168.891-162.75 167.751-276.38z"/>
          <path fill="url(#orange-gradient-2)" d="M595.957 502.66l106.421 40.9c-40.73 111.67-148.231 197.78-303.883 166.3l22.59-111.5c89.561 18.12 151.431-31.43 174.872-95.7z"/>
          <path fill="url(#orange-gradient-1)" d="M470.895 488.22l11.73 25.04a66.912 66.912 0 01-23.94 5.8l-2.65-27.24a41.756 41.756 0 0014.86-3.6z"/>
          <path fill="url(#orange-gradient-2)" d="M666.177 231.28l25.13-25.3c34.63 33.09 59.441 72.66 75.091 115.37l-33.01 13.2c-14-38.22-36.2-73.65-67.211-103.27z"/>
          <path fill="url(#orange-gradient-1)" d="M487.105 272.37l12.99-64.12c81.431 16.47 135.751 59.91 166.192 114.39l-57.581 33.43c-22.27-39.86-62.02-71.64-121.601-83.7z"/>
          <path fill="url(#orange-gradient-2)" d="M222.983 512.68l-105.101 27.94c-31.81-137.71 21.83-295.73 140.991-375.65l60.251 91.55c-81.251 54.49-117.832 162.26-96.141 256.16z"/>
          <path fill="url(#orange-gradient-1)" d="M373.314 411.55l-72.471-39.84c24.49-47.64 70.181-83.85 132.651-86.89l7.28 82.54c-31.769 1.55-55 19.97-67.46 44.19z"/>
        </g>

        {/* Group 3 */}
        <g className="tech-circle-group spin-cw-medium">
          <path fill="url(#orange-gradient-2)" d="M641.477 628.09l57.701 54.99c-68.821 76.68-174.472 121.38-309.193 95.81l14.39-77.33c103.311 19.61 184.321-14.67 237.102-73.47z"/>
          <path fill="url(#orange-gradient-1)" d="M585.336 341.89l86.321-68.03c73.331 92.63 71.581 228.21 11.06 326.23l-90.661-59.99c36.771-59.56 37.841-141.93-6.72-198.21z"/>
          <path fill="url(#orange-gradient-2)" d="M526.686 488.44l72.471 39.84c-24.49 47.64-70.181 83.85-132.651 86.89l-7.28-82.54c31.769-1.54 55.01-19.96 67.46-44.19z"/>
          <path fill="url(#orange-gradient-1)" d="M496.225 443.47l93.271-7.85c2.84 49.79-19.5 101.54-61.741 129.3l-51.481-79.66c13.651-8.98 20.871-25.7 19.951-41.79z"/>
          <path fill="url(#orange-gradient-2)" d="M159.752 462.42l-101.731 3.4C56.491 312.13 138.512 155.96 284.913 92l42.59 94.04c-108.23 47.29-168.871 162.75-167.751 276.38z"/>
          <path fill="url(#orange-gradient-1)" d="M304.054 397.34l-106.421-40.9c40.73-111.67 148.232-197.78 303.883-166.3l-22.58 111.5c-89.572-18.12-151.442 31.43-174.882 95.7z"/>
          <path fill="url(#orange-gradient-2)" d="M429.115 411.78l-11.73-25.04a66.912 66.912 0 0123.94-5.8l2.65 27.24a41.756 41.756 0 00-14.86 3.6z"/>
        </g>

        {/* Group 2 */}
        <g className="tech-circle-group spin-ccw-medium">
          <path fill="url(#orange-gradient-1)" d="M677.027 387.32l105.101-27.94c31.81 137.71-21.83 295.73-140.991 375.65l-60.251-91.54c81.251-54.5 117.832-162.27 96.141-256.17z"/>
          <path fill="url(#orange-gradient-2)" d="M591.526 471.97l75.181 13.31c-11.52 63.96-48.48 123.42-106.311 155.77l-38.01-67.78c37.61-21.04 61.65-59.7 69.14-101.3z"/>
          <path fill="url(#orange-gradient-1)" d="M489.385 401.9l75.091-90.26c66.401 51.93 76.361 144.5 42.57 215.02l-103.431-52.89c11.291-23.57 7.961-54.51-14.23-71.87z"/>
          <path fill="url(#orange-gradient-2)" d="M258.533 271.91l-57.701-54.99c68.821-76.68 174.472-121.38 309.193-95.81l-14.39 77.33c-103.311-19.61-184.331 14.67-237.102 73.47z"/>
          <path fill="url(#orange-gradient-1)" d="M314.674 558.11l-86.321 68.03c-73.331-92.63-71.581-228.21-11.06-326.23l90.661 59.99c-36.771 59.56-37.841 141.93 6.72 198.21z"/>
          <path fill="url(#orange-gradient-2)" d="M403.785 456.53l-93.271 7.85c-2.84-49.79 19.49-101.54 61.741-129.3l51.481 79.66c-13.651 8.98-20.871 25.7-19.951 41.79z"/>
          <path fill="url(#orange-gradient-1)" d="M233.823 668.71l-25.13 25.3c-34.63-33.09-59.441-72.66-75.091-115.37l33.01-13.2c14.01 38.23 36.211 73.66 67.211 103.27z"/>
        </g>

        {/* Group 1 */}
        <g className="tech-circle-group spin-cw-fast">
          <path fill="url(#orange-gradient-2)" d="M658.387 526.66l49.32 18.96c-19.28 52.85-53.201 100.1-99.881 132.39l-30.08-44.46c37.691-26.07 65.081-64.22 80.641-106.89z"/>
          <path fill="url(#orange-gradient-1)" d="M578.326 441.58l56.061-2.49c.8 39.64-10.31 79.77-31.83 112.95l-46.3-32.16c14.919-23.01 22.619-50.82 22.069-78.3z"/>
          <path fill="url(#orange-gradient-2)" d="M241.623 373.34l-49.321-18.96c19.28-52.86 53.201-100.11 99.881-132.39l30.08 44.46c-37.69 26.07-65.08 64.22-80.64 106.89z"/>
          <path fill="url(#orange-gradient-1)" d="M308.484 428.03l-75.181-13.31c11.52-63.96 48.48-123.42 106.301-155.77l38.01 67.78c-37.6 21.04-61.64 59.7-69.13 101.3z"/>
          <path fill="url(#orange-gradient-2)" d="M321.684 458.42l-56.061 2.49c-.8-39.64 10.31-79.77 31.82-112.94l46.3 32.17c-14.909 22.99-22.609 50.8-22.059 78.28z"/>
          <path fill="url(#orange-gradient-1)" d="M410.625 498.1l-75.091 90.26c-66.401-51.93-76.361-144.5-42.57-215.02l103.431 52.89c-11.291 23.57-7.961 54.51 14.23 71.87z"/>
          <path fill="url(#orange-gradient-2)" d="M412.905 627.63l-12.99 64.12c-81.431-16.47-135.751-59.91-166.192-114.39l57.581-33.42c22.27 39.85 62.01 71.63 121.601 83.69z"/>
        </g>
      </svg>
    </div>
  );
};

export default TechCircles;
