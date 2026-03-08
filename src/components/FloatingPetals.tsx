import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  color: string;
}

const petalColors = [
  'hsl(340, 70%, 65%)',
  'hsl(280, 50%, 70%)',
  'hsl(330, 60%, 75%)',
  'hsl(20, 70%, 70%)',
  'hsl(200, 60%, 65%)',
];

export const FloatingPetals = ({ count = 15 }: { count?: number }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const p: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 5 + Math.random() * 6,
      size: 8 + Math.random() * 14,
      rotation: Math.random() * 360,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));
    setPetals(p);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${petal.x}%`,
            width: petal.size,
            height: petal.size * 1.4,
            background: petal.color,
            borderRadius: '50% 0 50% 50%',
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
        />
      ))}
      {/* Sparkle particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            width: 3,
            height: 3,
            background: 'hsl(45, 80%, 80%)',
            boxShadow: '0 0 6px hsl(45, 80%, 80%)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};
