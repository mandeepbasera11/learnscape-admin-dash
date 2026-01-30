import { useState, useEffect, useCallback, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  maxOffset?: number;
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.3, direction = 'up', maxOffset = 100 } = options;
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = viewportCenter - elementCenter;
    
    // Calculate offset based on scroll position
    let newOffset = distanceFromCenter * speed;
    
    // Clamp the offset
    newOffset = Math.max(-maxOffset, Math.min(maxOffset, newOffset));
    
    if (direction === 'down') {
      newOffset = -newOffset;
    }
    
    setOffset(newOffset);
  }, [ref, speed, direction, maxOffset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return offset;
}

export function useMouseParallax(speed: number = 0.02) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const x = (e.clientX - centerX) * speed;
      const y = (e.clientY - centerY) * speed;
      
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [speed]);

  return position;
}
