import React, { useEffect, useRef, useState } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Negative for reverse direction
  className?: string;
}

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.1, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate only when in view or near view to optimize
      if (rect.top < windowHeight && rect.bottom > 0) {
        const distanceFromCenter = rect.top - windowHeight / 2;
        setOffset(distanceFromCenter * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)`, transition: 'transform 0.1s ease-out' }}>
      {children}
    </div>
  );
};

export default Parallax;