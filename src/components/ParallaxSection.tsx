import { useRef, ReactNode } from 'react';
import { useParallax, useMouseParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  enableMouse?: boolean;
  mouseSpeed?: number;
}

export function ParallaxSection({
  children,
  className,
  speed = 0.3,
  direction = 'up',
  enableMouse = false,
  mouseSpeed = 0.02
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollOffset = useParallax(ref, { speed, direction });
  const mousePosition = useMouseParallax(enableMouse ? mouseSpeed : 0);

  const transform = enableMouse
    ? `translateY(${scrollOffset}px) translate(${mousePosition.x}px, ${mousePosition.y}px)`
    : `translateY(${scrollOffset}px)`;

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div
        style={{
          transform,
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ParallaxBackgroundProps {
  className?: string;
  speed?: number;
  children?: ReactNode;
}

export function ParallaxBackground({
  className,
  speed = 0.15,
  children
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const offset = useParallax(ref, { speed, maxOffset: 50 });

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <div
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
          height: '120%',
          width: '100%',
          position: 'absolute',
          top: '-10%'
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  speed = 0.5,
  delay = 0
}: FloatingElementProps) {
  const mousePosition = useMouseParallax(speed * 0.03);

  return (
    <div
      className={cn('pointer-events-none', className)}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        transition: `transform 0.3s ease-out ${delay}s`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
