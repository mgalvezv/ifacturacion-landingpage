import React, { useEffect, useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Negative for reverse direction
  className?: string;
}

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.1, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;

    if (prefersReducedMotion || isSmallScreen || speed === 0) {
      if (ref.current) {
        ref.current.style.transform = 'translate3d(0, 0, 0)';
        ref.current.style.willChange = 'auto';
      }
      return;
    }

    let ticking = false;

    const updateOffset = () => {
      if (!ref.current) {
        ticking = false;
        return;
      }
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate only when in view or near view to optimize
      if (rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5) {
        const distanceFromCenter = rect.top - windowHeight / 2;
        ref.current.style.transform = `translate3d(0, ${distanceFromCenter * speed}px, 0)`;
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        if (ref.current) {
          ref.current.style.willChange = 'transform';
        }
        rafId.current = requestAnimationFrame(() => {
          updateOffset();
        });
        ticking = true;
      }

      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
      }
      idleTimer.current = window.setTimeout(() => {
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      }, 180);
    };

    // Initial calculation
    updateOffset();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
      }
    };
  }, [speed]);

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {children}
    </div>
  );
};

export default Parallax;
