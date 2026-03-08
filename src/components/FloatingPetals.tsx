import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const FloatingPetals = ({ count = 15, color }: { count?: number; color?: string }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const p: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 6,
      size: 8 + Math.random() * 14,
      rotation: Math.random() * 360,
    }));
    setPetals(p);
  }, [count]);

  const petalColor = color || 'hsl(340, 70%, 65%)';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-40"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size * 1.4,
            filter: 'blur(1px)',
          }}
          initial={{ y: -20, rotate: petal.rotation, opacity: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [petal.rotation, petal.rotation + 720],
            opacity: [0, 0.5, 0.5, 0],
            x: [0, Math.sin(petal.id) * 50, Math.cos(petal.id) * -30, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* SVG petal shape */}
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
      {/* Sparkle particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
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
      ))}
    </div>
  );
};
