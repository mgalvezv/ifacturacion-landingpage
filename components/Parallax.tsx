import React, { useEffect, useRef, useState } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Negative for reverse direction
  className?: string;
}

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.1, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
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
        setOffset(distanceFromCenter * speed);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          updateOffset();
        });
        ticking = true;
      }
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
    };
  }, [speed]);

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ 
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;