import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  driftX: number;
  driftBack: number;
}

export const FloatingPetals = ({ count = 15, color }: { count?: number; color?: string }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const generatedRef = useRef(false);

  useEffect(() => {
    if (generatedRef.current) return;
    generatedRef.current = true;

    // Evenly distribute petals across the width with slight jitter
    const p: Petal[] = Array.from({ length: count }, (_, i) => {
      const segment = 100 / count;
      const baseX = segment * i + segment * 0.5;
      const jitter = (Math.random() - 0.5) * segment * 0.8;
      return {
        id: i,
        x: Math.max(2, Math.min(98, baseX + jitter)),
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 5,
        size: 8 + Math.random() * 12,
        rotation: Math.random() * 360,
        driftX: (Math.random() - 0.5) * 60,
        driftBack: (Math.random() - 0.5) * 30,
      };
    });
    setPetals(p);
  }, [count]);

  const petalColor = color || 'hsl(340, 70%, 65%)';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size * 1.4,
            opacity: 0,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [petal.rotation, petal.rotation + 360 + Math.random() * 360],
            opacity: [0, 0.45, 0.45, 0],
            x: [0, petal.driftX, petal.driftBack, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 20 28" width={petal.size} height={petal.size * 1.4}>
            <path
              d="M10 0 Q0 8 2 18 Q6 28 10 26 Q14 28 18 18 Q20 8 10 0Z"
              fill={petalColor}
              opacity="0.7"
            />
            <path
              d="M10 2 Q5 10 8 20"
              stroke={petalColor}
              strokeWidth="0.5"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
      {/* Sparkle particles - distributed evenly */}
      {Array.from({ length: 6 }).map((_, i) => {
        const segment = 80 / 6;
        return (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${10 + segment * i + segment * 0.5}%`,
              top: `${15 + (i * 13) % 65}%`,
              width: 3,
              height: 3,
              background: color || 'hsl(45, 80%, 80%)',
              boxShadow: `0 0 6px ${color || 'hsl(45, 80%, 80%)'}`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.7,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
};
