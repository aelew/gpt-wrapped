'use client';

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface NumberTickerProps {
  value: number;
  className?: string;
  direction?: 'up' | 'down';
  delay?: number; // in seconds
}

export function NumberTicker({
  value,
  className,
  direction = 'up',
  delay = 0
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    isInView &&
      setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on('change', (latest: number) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(
            Math.round(latest)
          );
        }
      }),
    [springValue]
  );

  return (
    <span className={cn('inline-block tabular-nums', className)} ref={ref}>
      0
    </span>
  );
}
