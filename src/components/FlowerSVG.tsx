import { motion } from 'framer-motion';
import type { FlowerType, FlowerColor, LeafStyle } from '@/types/bloom';

const colorMap: Record<FlowerColor, { petal: string; center: string }> = {
  rose: { petal: '#e8729a', center: '#f5c542' },
  lavender: { petal: '#b07ed6', center: '#f0d860' },
  mint: { petal: '#6ec9a8', center: '#f5e066' },
  peach: { petal: '#f0a67a', center: '#f5d260' },
  sky: { petal: '#6aade0', center: '#f5e870' },
  gold: { petal: '#e8c84a', center: '#e07a3a' },
};

interface FlowerSVGProps {
  type: FlowerType;
  color: FlowerColor;
  leafStyle: LeafStyle;
  size?: number;
  animate?: boolean;
}

export const FlowerSVG = ({ type, color, leafStyle, size = 120, animate = false }: FlowerSVGProps) => {
  const c = colorMap[color];
  const petalCount = type === 'daisy' ? 10 : type === 'sunflower' ? 14 : type === 'cherry-blossom' ? 5 : type === 'lily' ? 6 : type === 'tulip' ? 3 : 8;
  const petalWidth = type === 'tulip' ? 18 : type === 'daisy' ? 8 : 12;
  const petalHeight = type === 'tulip' ? 30 : type === 'sunflower' ? 22 : 20;

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { scale: 0, rotate: -30, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    transition: { duration: 1.2, ease: 'easeOut' },
  } : {};

  return (
    <Wrapper {...wrapperProps as any} style={{ width: size, height: size + 40 }} className="relative">
      <svg viewBox="0 0 100 140" width={size} height={size + 40}>
        {/* Stem */}
        <path d={`M50 60 Q48 90 50 130`} stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
        
        {/* Leaves */}
        {leafStyle !== 'none' && (
          <>
            <path
              d={leafStyle === 'round'
                ? 'M50 85 Q35 75 30 85 Q35 95 50 90'
                : leafStyle === 'pointed'
                ? 'M50 85 L28 72 Q35 88 50 90'
                : 'M50 85 Q32 78 28 85 Q35 92 50 90'}
              fill="#5aad6a"
              opacity={0.85}
            />
            <path
              d={leafStyle === 'round'
                ? 'M50 100 Q65 90 70 100 Q65 110 50 105'
                : leafStyle === 'pointed'
                ? 'M50 100 L72 87 Q65 103 50 105'
                : 'M50 100 Q68 93 72 100 Q65 107 50 105'}
              fill="#5aad6a"
              opacity={0.85}
            />
          </>
        )}

        {/* Glow */}
        <defs>
          <radialGradient id={`glow-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.petal} stopOpacity="0.4" />
            <stop offset="100%" stopColor={c.petal} stopOpacity="0" />
          </radialGradient>
          <filter id="petal-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>
        </defs>
        <circle cx="50" cy="45" r="30" fill={`url(#glow-${color})`} />

        {/* Petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (360 / petalCount) * i;
          return (
            <ellipse
              key={i}
              cx="50"
              cy={45 - petalHeight / 2}
              rx={petalWidth / 2}
              ry={petalHeight / 2}
              fill={c.petal}
              opacity={0.85}
              transform={`rotate(${angle} 50 45)`}
              filter="url(#petal-blur)"
            />
          );
        })}

        {/* Center */}
        <circle cx="50" cy="45" r={type === 'sunflower' ? 10 : 7} fill={c.center} />
        <circle cx="50" cy="45" r={type === 'sunflower' ? 10 : 7} fill="none" stroke={c.center} strokeWidth="1" opacity="0.5" />
      </svg>
    </Wrapper>
  );
};
