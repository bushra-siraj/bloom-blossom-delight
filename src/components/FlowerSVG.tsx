import { motion } from 'framer-motion';
import type { FlowerType, FlowerColor, LeafStyle, BouquetSize } from '@/types/bloom';

const colorMap: Record<FlowerColor, { petal: string; center: string; petalDark: string }> = {
  rose: { petal: '#e8729a', center: '#f5c542', petalDark: '#c45a7a' },
  lavender: { petal: '#b07ed6', center: '#f0d860', petalDark: '#8a5eb0' },
  mint: { petal: '#6ec9a8', center: '#f5e066', petalDark: '#4ea888' },
  peach: { petal: '#f0a67a', center: '#f5d260', petalDark: '#d08a5a' },
  sky: { petal: '#6aade0', center: '#f5e870', petalDark: '#4a8dc0' },
  gold: { petal: '#e8c84a', center: '#e07a3a', petalDark: '#c8a82a' },
};

interface FlowerSVGProps {
  type: FlowerType;
  color: FlowerColor;
  leafStyle: LeafStyle;
  size?: number;
  animate?: boolean;
  bouquetSize?: BouquetSize;
  customPetalColor?: string;
}

const SingleFlower = ({ type, c, leafStyle, customColor }: { 
  type: FlowerType; 
  c: { petal: string; center: string; petalDark: string }; 
  leafStyle: LeafStyle;
  customColor?: string;
}) => {
  const petal = customColor || c.petal;
  const petalDark = customColor ? adjustColor(customColor, -20) : c.petalDark;

  switch (type) {
    case 'rose':
      return (
        <g>
          {/* Stem */}
          <path d="M50 62 Q48 85 50 120" stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
          {renderLeaves(leafStyle)}
          {/* Outer petals */}
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(-20 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(20 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(60 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(-60 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(90 50 48)" />
          {/* Middle petals */}
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(15 50 46)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(-30 50 46)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(60 50 46)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(-75 50 46)" />
          {/* Inner petals - spiral effect */}
          <ellipse cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform="rotate(10 50 45)" />
          <ellipse cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform="rotate(80 50 45)" />
          <ellipse cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform="rotate(-40 50 45)" />
          {/* Center spiral */}
          <circle cx="50" cy="46" r="4" fill={petalDark} />
          <path d="M48 46 Q50 43 52 46 Q50 49 48 46" fill={petal} opacity="0.8" />
        </g>
      );

    case 'sunflower':
      return (
        <g>
          <path d="M50 62 Q48 85 50 120" stroke="#4a8c5c" strokeWidth="3" fill="none" />
          {renderLeaves(leafStyle)}
          {/* Outer petals - long yellow */}
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="30" rx="5" ry="16" fill={petal} transform={`rotate(${(360/16)*i} 50 48)`} />
          ))}
          {/* Inner petals */}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={`inner-${i}`} cx="50" cy="35" rx="4" ry="11" fill={petalDark} opacity="0.7" transform={`rotate(${(360/12)*i + 15} 50 48)`} />
          ))}
          {/* Large brown center */}
          <circle cx="50" cy="48" r="12" fill="#6B4226" />
          <circle cx="50" cy="48" r="10" fill="#8B5E3C" />
          {/* Seed pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={`seed-${i}`} cx={50 + Math.cos(i*0.8)*5} cy={48 + Math.sin(i*0.8)*5} r="1.2" fill="#4A2E16" opacity="0.6" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={`seed2-${i}`} cx={50 + Math.cos(i*1.1)*3} cy={48 + Math.sin(i*1.1)*3} r="0.8" fill="#4A2E16" opacity="0.5" />
          ))}
        </g>
      );

    case 'cherry-blossom':
      return (
        <g>
          <path d="M50 58 Q48 80 50 120" stroke="#7a5c5c" strokeWidth="2" fill="none" />
          {renderLeaves(leafStyle)}
          {/* Soft pink petals */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (360/5) * i - 90;
            const rad = (angle * Math.PI) / 180;
            return (
              <g key={i} transform={`rotate(${(360/5)*i} 50 44)`}>
                <ellipse cx="50" cy="30" rx="9" ry="14" fill={petal} opacity="0.8" />
                <ellipse cx="50" cy="32" rx="6" ry="10" fill="white" opacity="0.2" />
                {/* Notch at top */}
                <circle cx="50" cy="22" r="2" fill="white" opacity="0.15" />
              </g>
            );
          })}
          {/* Center */}
          <circle cx="50" cy="44" r="5" fill="#FFE4E8" />
          {/* Stamen */}
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (360/5) * i;
            const rad = (angle * Math.PI) / 180;
            const ex = 50 + Math.cos(rad) * 4;
            const ey = 44 + Math.sin(rad) * 4;
            return <circle key={`s-${i}`} cx={ex} cy={ey} r="1" fill={c.center} />;
          })}
        </g>
      );

    case 'tulip':
      return (
        <g>
          <path d="M50 56 Q48 80 50 120" stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
          {renderLeaves(leafStyle)}
          {/* Outer petals - closed elegant cup */}
          <path d={`M36 56 Q34 36 42 26 Q46 22 50 20 Q54 22 58 26 Q66 36 64 56 Q50 60 36 56Z`} fill={petal} />
          {/* Inner shadow */}
          <path d={`M40 54 Q38 38 44 28 Q48 24 50 22 Q52 24 56 28 Q62 38 60 54 Q50 58 40 54Z`} fill={petalDark} opacity="0.4" />
          {/* Left petal overlap */}
          <path d={`M36 56 Q34 40 44 28 Q46 32 48 38 Q44 48 36 56Z`} fill={petal} opacity="0.8" />
          {/* Right petal overlap */}
          <path d={`M64 56 Q66 40 56 28 Q54 32 52 38 Q56 48 64 56Z`} fill={petal} opacity="0.8" />
          {/* Highlight */}
          <path d={`M46 30 Q48 26 50 24 Q48 30 46 38Z`} fill="white" opacity="0.2" />
        </g>
      );

    case 'daisy':
      return (
        <g>
          <path d="M50 58 Q48 80 50 120" stroke="#4a8c5c" strokeWidth="2" fill="none" />
          {renderLeaves(leafStyle)}
          {/* Thin white petals */}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="32" rx="3.5" ry="14" fill="white" opacity="0.9" transform={`rotate(${(360/14)*i} 50 46)`} />
          ))}
          {/* Petal shadows */}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={`s-${i}`} cx="50" cy="34" rx="2.5" ry="10" fill="#E8E8E0" opacity="0.3" transform={`rotate(${(360/14)*i + 5} 50 46)`} />
          ))}
          {/* Yellow center */}
          <circle cx="50" cy="46" r="8" fill="#F5D44A" />
          <circle cx="50" cy="46" r="6" fill="#EDCA38" />
          {/* Center texture */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={`c-${i}`} cx={50 + Math.cos(i)*3} cy={46 + Math.sin(i)*3} r="0.8" fill="#D4B032" opacity="0.5" />
          ))}
        </g>
      );

    case 'lily':
      return (
        <g>
          <path d="M50 60 Q48 85 50 120" stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
          {renderLeaves(leafStyle)}
          {/* 6 elegant curved petals */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360/6)*i} 50 46)`}>
              <path d="M50 46 Q44 30 46 20 Q50 16 54 20 Q56 30 50 46Z" fill={petal} opacity="0.85" />
              <path d="M50 46 Q46 32 48 22 Q50 19 52 22 Q54 32 50 46Z" fill={petalDark} opacity="0.3" />
            </g>
          ))}
          {/* Center */}
          <circle cx="50" cy="46" r="5" fill={c.center} opacity="0.8" />
          {/* Stamens */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (360/6) * i;
            const rad = (angle * Math.PI) / 180;
            return (
              <g key={`st-${i}`}>
                <line x1="50" y1="46" x2={50 + Math.cos(rad)*8} y2={46 + Math.sin(rad)*8} stroke="#8a7a4a" strokeWidth="0.8" />
                <circle cx={50 + Math.cos(rad)*8} cy={46 + Math.sin(rad)*8} r="1.2" fill="#c8a830" />
              </g>
            );
          })}
        </g>
      );
  }
};

function renderLeaves(leafStyle: LeafStyle) {
  if (leafStyle === 'none') return null;
  return (
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
      {/* Leaf veins */}
      <path d="M50 87 Q40 82 34 85" stroke="#4a9a5a" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M50 102 Q60 96 66 100" stroke="#4a9a5a" strokeWidth="0.5" fill="none" opacity="0.5" />
    </>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xFF) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xFF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xFF) + amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export const FlowerSVG = ({ type, color, leafStyle, size = 120, animate = false, bouquetSize = 'single', customPetalColor }: FlowerSVGProps) => {
  const c = colorMap[color];
  const flowerCount = bouquetSize === 'large' ? 5 : bouquetSize === 'small' ? 3 : 1;

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { scale: 0, rotate: -30, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    transition: { duration: 1.2, ease: 'easeOut' },
  } : {};

  if (flowerCount === 1) {
    return (
      <Wrapper {...wrapperProps as any} style={{ width: size, height: size + 40 }} className="relative">
        <svg viewBox="0 0 100 140" width={size} height={size + 40}>
          <defs>
            <radialGradient id={`glow-${color}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={customPetalColor || c.petal} stopOpacity="0.3" />
              <stop offset="100%" stopColor={customPetalColor || c.petal} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="45" r="28" fill={`url(#glow-${color})`} />
          <SingleFlower type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />
        </svg>
      </Wrapper>
    );
  }

  // Bouquet layout
  const offsets = flowerCount === 3
    ? [{ x: -20, y: 5, s: 0.8 }, { x: 0, y: -5, s: 1 }, { x: 20, y: 5, s: 0.8 }]
    : [{ x: -28, y: 8, s: 0.65 }, { x: -14, y: 0, s: 0.8 }, { x: 0, y: -5, s: 1 }, { x: 14, y: 0, s: 0.8 }, { x: 28, y: 8, s: 0.65 }];

  const bouquetWidth = flowerCount === 3 ? size * 1.6 : size * 2;
  const bouquetHeight = size + 50;

  return (
    <Wrapper {...wrapperProps as any} style={{ width: bouquetWidth, height: bouquetHeight }} className="relative">
      <svg viewBox="-40 -10 180 160" width={bouquetWidth} height={bouquetHeight}>
        <defs>
          <radialGradient id={`glow-bouquet-${color}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={customPetalColor || c.petal} stopOpacity="0.2" />
            <stop offset="100%" stopColor={customPetalColor || c.petal} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Bouquet wrap */}
        <path d="M30 100 Q50 85 70 100 L75 130 Q50 135 25 130Z" fill="#E8D5B8" opacity="0.6" />
        <path d="M32 102 Q50 88 68 102 L72 128 Q50 132 28 128Z" fill="#F0E0C8" opacity="0.4" />
        {/* Ribbon */}
        <path d="M45 110 Q50 115 55 110" stroke="#FF8FAB" strokeWidth="2" fill="none" />
        <path d="M42 112 Q38 120 35 124" stroke="#FF8FAB" strokeWidth="1.5" fill="none" />
        <path d="M58 112 Q62 120 65 124" stroke="#FF8FAB" strokeWidth="1.5" fill="none" />
        {offsets.map((off, i) => (
          <g key={i} transform={`translate(${off.x} ${off.y}) scale(${off.s})`}>
            <circle cx="50" cy="45" r="25" fill={`url(#glow-bouquet-${color})`} />
            <SingleFlower type={type} c={c} leafStyle={i === Math.floor(flowerCount/2) ? leafStyle : 'none'} customColor={customPetalColor} />
          </g>
        ))}
      </svg>
    </Wrapper>
  );
};
