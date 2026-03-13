import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className = '' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [tick, setTick] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      setTick(true);
      // Animate counting up/down
      const start = prevValue.current;
      const end = value;
      const diff = Math.abs(end - start);
      const steps = Math.min(diff, 20);
      const stepTime = Math.max(30, 400 / steps);
      let current = 0;

      const interval = setInterval(() => {
        current++;
        const progress = current / steps;
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setDisplayValue(Math.round(start + (end - start) * eased));
        if (current >= steps) {
          clearInterval(interval);
          setDisplayValue(end);
          setTimeout(() => setTick(false), 300);
        }
      }, stepTime);

      prevValue.current = value;
      return () => clearInterval(interval);
    }
  }, [value]);

  return (
    <motion.span
      className={className}
      animate={tick ? {
        scale: [1, 1.25, 1],
        color: ['hsl(330, 60%, 65%)', 'hsl(330, 80%, 75%)', 'hsl(330, 60%, 65%)'],
      } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
}
