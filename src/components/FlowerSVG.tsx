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

/* ── Single flower head (no stem) centered at 50,46 ── */
const FlowerHead = ({ type, c, customColor }: {
  type: FlowerType;
  c: { petal: string; center: string; petalDark: string };
  customColor?: string;
}) => {
  const petal = customColor || c.petal;
  const petalDark = customColor ? adjustColor(customColor, -20) : c.petalDark;

  switch (type) {
    case 'rose':
      return (
        <g>
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(-20 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(20 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(60 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(-60 50 48)" />
          <ellipse cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.7" transform="rotate(90 50 48)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(15 50 46)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(-30 50 46)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(60 50 46)" />
          <ellipse cx="50" cy="46" rx="11" ry="8" fill={petal} transform="rotate(-75 50 46)" />
          <ellipse cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform="rotate(10 50 45)" />
          <ellipse cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform="rotate(80 50 45)" />
          <ellipse cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform="rotate(-40 50 45)" />
          <circle cx="50" cy="46" r="4" fill={petalDark} />
          <path d="M48 46 Q50 43 52 46 Q50 49 48 46" fill={petal} opacity="0.8" />
        </g>
      );
    case 'sunflower':
      return (
        <g>
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="30" rx="5" ry="16" fill={petal} transform={`rotate(${(360 / 16) * i} 50 48)`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={`i${i}`} cx="50" cy="35" rx="4" ry="11" fill={petalDark} opacity="0.7" transform={`rotate(${(360 / 12) * i + 15} 50 48)`} />
          ))}
          <circle cx="50" cy="48" r="12" fill="#6B4226" />
          <circle cx="50" cy="48" r="10" fill="#8B5E3C" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={`s${i}`} cx={50 + Math.cos(i * 0.8) * 5} cy={48 + Math.sin(i * 0.8) * 5} r="1.2" fill="#4A2E16" opacity="0.6" />
          ))}
        </g>
      );
    case 'cherry-blossom':
      return (
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 5) * i} 50 44)`}>
              <ellipse cx="50" cy="30" rx="9" ry="14" fill={petal} opacity="0.8" />
              <ellipse cx="50" cy="32" rx="6" ry="10" fill="white" opacity="0.2" />
              <circle cx="50" cy="22" r="2" fill="white" opacity="0.15" />
            </g>
          ))}
          <circle cx="50" cy="44" r="5" fill="#FFE4E8" />
          {Array.from({ length: 5 }).map((_, i) => {
            const rad = ((360 / 5) * i * Math.PI) / 180;
            return <circle key={`s${i}`} cx={50 + Math.cos(rad) * 4} cy={44 + Math.sin(rad) * 4} r="1" fill={c.center} />;
          })}
        </g>
      );
    case 'tulip':
      return (
        <g>
          <path d={`M36 56 Q34 36 42 26 Q46 22 50 20 Q54 22 58 26 Q66 36 64 56 Q50 60 36 56Z`} fill={petal} />
          <path d={`M40 54 Q38 38 44 28 Q48 24 50 22 Q52 24 56 28 Q62 38 60 54 Q50 58 40 54Z`} fill={petalDark} opacity="0.4" />
          <path d={`M36 56 Q34 40 44 28 Q46 32 48 38 Q44 48 36 56Z`} fill={petal} opacity="0.8" />
          <path d={`M64 56 Q66 40 56 28 Q54 32 52 38 Q56 48 64 56Z`} fill={petal} opacity="0.8" />
          <path d={`M46 30 Q48 26 50 24 Q48 30 46 38Z`} fill="white" opacity="0.2" />
        </g>
      );
    case 'daisy':
      return (
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="32" rx="3.5" ry="14" fill="white" opacity="0.9" transform={`rotate(${(360 / 14) * i} 50 46)`} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={`s${i}`} cx="50" cy="34" rx="2.5" ry="10" fill="#E8E8E0" opacity="0.3" transform={`rotate(${(360 / 14) * i + 5} 50 46)`} />
          ))}
          <circle cx="50" cy="46" r="8" fill="#F5D44A" />
          <circle cx="50" cy="46" r="6" fill="#EDCA38" />
        </g>
      );
    case 'lily':
      return (
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 6) * i} 50 46)`}>
              <path d="M50 46 Q44 30 46 20 Q50 16 54 20 Q56 30 50 46Z" fill={petal} opacity="0.85" />
              <path d="M50 46 Q46 32 48 22 Q50 19 52 22 Q54 32 50 46Z" fill={petalDark} opacity="0.3" />
            </g>
          ))}
          <circle cx="50" cy="46" r="5" fill={c.center} opacity="0.8" />
          {Array.from({ length: 6 }).map((_, i) => {
            const rad = ((360 / 6) * i * Math.PI) / 180;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="46" x2={50 + Math.cos(rad) * 8} y2={46 + Math.sin(rad) * 8} stroke="#8a7a4a" strokeWidth="0.8" />
                <circle cx={50 + Math.cos(rad) * 8} cy={46 + Math.sin(rad) * 8} r="1.2" fill="#c8a830" />
              </g>
            );
          })}
        </g>
      );
  }
};

/* ── Leaf shapes ── */
function renderLeaf(leafStyle: LeafStyle, x: number, y: number, flipX: boolean, scale = 1) {
  if (leafStyle === 'none') return null;
  const sx = flipX ? -scale : scale;
  const d = leafStyle === 'round'
    ? 'M0 0 Q-12 -10 -8 -20 Q0 -18 0 0 Z'
    : leafStyle === 'pointed'
    ? 'M0 0 L-16 -14 Q-6 -18 0 0 Z'
    : 'M0 0 Q-14 -8 -10 -20 Q-2 -16 0 0 Z';

  return (
    <g transform={`translate(${x},${y}) scale(${sx},${scale})`}>
      <path d={d} fill="#5aad6a" opacity="0.85" />
      <path d={d.replace(/-20/g, '-14').replace(/-16/g, '-10')} fill="#4a9a5a" opacity="0.3" />
      {/* Vein */}
      <line x1="0" y1="0" x2={flipX ? 8 : -8} y2="-12" stroke="#4a9a5a" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

/* ── Bouquet compositions ── */

/*
  Classic bouquet structure:
       🌸          (back row: 2 flowers, slightly behind)
     🌸   🌸      (middle row: 2 flowers)  
       🌸          (front center: 1 flower, overlapping)
  
  With leaves, stems gathered, and ribbon tie.
*/

const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* Stem */}
    <path d="M50 62 Q48 85 50 120" stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
    {/* Leaves on stem */}
    {renderLeaf(leafStyle, 48, 85, false)}
    {renderLeaf(leafStyle, 52, 100, true)}
    {/* Flower head */}
    <FlowerHead type={type} c={c} customColor={customColor} />
  </g>
);

const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* Stems converging */}
    <path d="M35 55 Q42 80 50 105" stroke="#4a8c5c" strokeWidth="2" fill="none" />
    <path d="M50 50 Q50 78 50 105" stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
    <path d="M65 55 Q58 80 50 105" stroke="#4a8c5c" strokeWidth="2" fill="none" />

    {/* Large leaves behind bouquet */}
    {renderLeaf(leafStyle, 30, 72, false, 1.3)}
    {renderLeaf(leafStyle, 70, 72, true, 1.3)}
    {renderLeaf(leafStyle, 38, 85, false, 1)}
    {renderLeaf(leafStyle, 62, 85, true, 1)}

    {/* Ribbon tie */}
    <ellipse cx="50" cy="98" rx="10" ry="4" fill="#FF8FAB" opacity="0.8" />
    <path d="M44 98 Q50 104 56 98" stroke="#FF6B8A" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M42 100 Q36 108 33 114" stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M58 100 Q64 108 67 114" stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Ribbon ends */}
    <path d="M33 114 Q30 116 28 114" stroke="#FF8FAB" strokeWidth="1.5" fill="none" />
    <path d="M67 114 Q70 116 72 114" stroke="#FF8FAB" strokeWidth="1.5" fill="none" />

    {/* Back row: 2 flowers (slightly up and apart, smaller) */}
    <g transform="translate(-15, 4) scale(0.75)" opacity="0.9">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>
    <g transform="translate(15, 4) scale(0.75)" opacity="0.9">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>

    {/* Front center: main flower (largest, on top) */}
    <g transform="translate(0, 2) scale(0.9)">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>
  </g>
);

const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* Stems converging to center */}
    <path d="M25 52 Q38 78 50 105" stroke="#4a8c5c" strokeWidth="1.8" fill="none" />
    <path d="M38 48 Q44 76 50 105" stroke="#4a8c5c" strokeWidth="2" fill="none" />
    <path d="M50 45 Q50 75 50 105" stroke="#4a8c5c" strokeWidth="2.5" fill="none" />
    <path d="M62 48 Q56 76 50 105" stroke="#4a8c5c" strokeWidth="2" fill="none" />
    <path d="M75 52 Q62 78 50 105" stroke="#4a8c5c" strokeWidth="1.8" fill="none" />

    {/* Large backdrop leaves */}
    {renderLeaf(leafStyle, 22, 65, false, 1.5)}
    {renderLeaf(leafStyle, 78, 65, true, 1.5)}
    {renderLeaf(leafStyle, 30, 80, false, 1.2)}
    {renderLeaf(leafStyle, 70, 80, true, 1.2)}
    {renderLeaf(leafStyle, 40, 90, false, 0.9)}
    {renderLeaf(leafStyle, 60, 90, true, 0.9)}

    {/* Wrapping paper / tissue */}
    <path d="M28 90 Q50 82 72 90 L78 115 Q50 120 22 115Z" fill="#F0E0C8" opacity="0.4" />
    <path d="M30 92 Q50 84 70 92 L75 113 Q50 118 25 113Z" fill="#F5EADC" opacity="0.35" />

    {/* Ribbon tie */}
    <ellipse cx="50" cy="102" rx="14" ry="5" fill="#FF8FAB" opacity="0.85" />
    <path d="M41 102 Q50 110 59 102" stroke="#FF6B8A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M38 104 Q30 114 26 120" stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M62 104 Q70 114 74 120" stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Ribbon bow loops */}
    <path d="M41 100 Q34 94 38 98 Q36 92 41 100Z" fill="#FF8FAB" opacity="0.6" />
    <path d="M59 100 Q66 94 62 98 Q64 92 59 100Z" fill="#FF8FAB" opacity="0.6" />

    {/* Back row: 2 flowers */}
    <g transform="translate(-22, 6) scale(0.62)" opacity="0.85">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>
    <g transform="translate(22, 6) scale(0.62)" opacity="0.85">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>

    {/* Middle row: 2 flowers */}
    <g transform="translate(-12, 0) scale(0.78)" opacity="0.92">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>
    <g transform="translate(12, 0) scale(0.78)" opacity="0.92">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>

    {/* Front center: hero flower */}
    <g transform="translate(0, -2) scale(0.88)">
      <FlowerHead type={type} c={c} customColor={customColor} />
    </g>
  </g>
);

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xFF) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xFF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xFF) + amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export const FlowerSVG = ({ type, color, leafStyle, size = 120, animate = false, bouquetSize = 'single', customPetalColor }: FlowerSVGProps) => {
  const c = colorMap[color];

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { scale: 0, rotate: -20, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    transition: { duration: 1.2, ease: 'easeOut' },
  } : {};

  const vb = bouquetSize === 'large' ? '-5 -10 110 140'
    : bouquetSize === 'small' ? '5 -5 90 130'
    : '0 0 100 130';

  const w = bouquetSize === 'large' ? size * 1.8 : bouquetSize === 'small' ? size * 1.4 : size;
  const h = bouquetSize === 'large' ? size * 1.6 : bouquetSize === 'small' ? size * 1.3 : size + 20;

  return (
    <Wrapper {...wrapperProps as any} style={{ width: w, height: h }} className="relative flex items-center justify-center">
      <svg viewBox={vb} width={w} height={h}>
        <defs>
          <radialGradient id={`glow-${color}-${bouquetSize}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={customPetalColor || c.petal} stopOpacity="0.25" />
            <stop offset="100%" stopColor={customPetalColor || c.petal} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r={bouquetSize === 'large' ? 50 : 30} fill={`url(#glow-${color}-${bouquetSize})`} />
        {bouquetSize === 'single' && (
          <BouquetSingle type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />
        )}
        {bouquetSize === 'small' && (
          <BouquetSmall type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />
        )}
        {bouquetSize === 'large' && (
          <BouquetLarge type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />
        )}
      </svg>
    </Wrapper>
  );
};
