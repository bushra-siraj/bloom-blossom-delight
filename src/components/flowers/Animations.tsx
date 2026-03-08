import { motion } from 'framer-motion';
import React from 'react';

/** Elastic bloom animation wrapper */
export const AnimatedFlower = ({ children, delay = 0, cx, cy }: {
  children: React.ReactNode; delay?: number; cx: number; cy: number;
}) => (
  <motion.g
    style={{ originX: `${cx}px`, originY: `${cy}px` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      delay,
      duration: 0.9,
      type: 'spring',
      stiffness: 180,
      damping: 12,
    }}
  >
    {children}
  </motion.g>
);

/** Floating petal particles that drift after bloom */
export const FloatingPetalParticles = ({ color, count = 4, delay = 0.8 }: {
  color: string; count?: number; delay?: number;
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const startX = 25 + Math.random() * 50;
      const startY = 15 + Math.random() * 35;
      const drift = (Math.random() - 0.5) * 35;
      return (
        <motion.ellipse
          key={`fp-${i}`}
          cx={startX} cy={startY}
          rx={2 + Math.random() * 2.5} ry={1.5 + Math.random() * 1.5}
          fill={color} opacity="0"
          animate={{
            cx: [startX, startX + drift, startX + drift * 1.5],
            cy: [startY, startY + 35, startY + 70],
            opacity: [0, 0.5, 0],
            rotate: [0, 200 + Math.random() * 160],
          }}
          transition={{
            delay: delay + i * 0.3,
            duration: 3.5 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      );
    })}
  </>
);

/** Swaying ribbon tails */
export const SwayingRibbon = ({ x, y, side }: { x: number; y: number; side: 'left' | 'right' }) => {
  const endX = side === 'left' ? x - 14 : x + 14;
  const endY = y + 24;
  const cp1x = side === 'left' ? x - 7 : x + 7;
  const cp1y = y + 12;

  return (
    <motion.path
      d={`M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`}
      stroke="#CC3355" strokeWidth="2.2" fill="none" strokeLinecap="round"
      animate={{
        d: [
          `M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`,
          `M${x} ${y} Q${cp1x + (side === 'left' ? -4 : 4)} ${cp1y + 3} ${endX + (side === 'left' ? -3 : 3)} ${endY}`,
          `M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`,
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
  );
};
