import { motion } from 'framer-motion';
import type { FlowerType, FlowerColor, LeafStyle, BouquetSize } from '@/types/bloom';

/* ── Vibrant, high-contrast color map ── */
const colorMap: Record<FlowerColor, { petal: string; center: string; petalDark: string }> = {
  rose:     { petal: '#FF4D8A', center: '#FFD700', petalDark: '#D4266E' },
  lavender: { petal: '#C466FF', center: '#FFE44D', petalDark: '#9B33DD' },
  mint:     { petal: '#33E8A0', center: '#FFF066', petalDark: '#1CB87A' },
  peach:    { petal: '#FF8F5C', center: '#FFDD44', petalDark: '#E06A30' },
  sky:      { petal: '#42B8FF', center: '#FFF280', petalDark: '#1A8FDD' },
  gold:     { petal: '#FFD633', center: '#FF6B33', petalDark: '#DDB200' },
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

/* ── Single flower head centered at 50,46 ── */
const FlowerHead = ({ type, c, customColor }: {
  type: FlowerType;
  c: { petal: string; center: string; petalDark: string };
  customColor?: string;
}) => {
  const petal = customColor || c.petal;
  const petalDark = customColor ? adjustColor(customColor, -30) : c.petalDark;

  switch (type) {
    case 'rose':
      return (
        <g>
          {[-20, 20, 60, -60, 90].map((r, i) => (
            <ellipse key={i} cx="50" cy="48" rx="16" ry="12" fill={petal} opacity="0.75" transform={`rotate(${r} 50 48)`} />
          ))}
          {[15, -30, 60, -75].map((r, i) => (
            <ellipse key={`m${i}`} cx="50" cy="46" rx="11" ry="8" fill={petal} transform={`rotate(${r} 50 46)`} />
          ))}
          {[10, 80, -40].map((r, i) => (
            <ellipse key={`d${i}`} cx="50" cy="45" rx="7" ry="5" fill={petalDark} transform={`rotate(${r} 50 45)`} />
          ))}
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
          <circle cx="50" cy="48" r="12" fill="#5A3215" />
          <circle cx="50" cy="48" r="10" fill="#7A4E2C" />
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={`s${i}`} cx={50 + Math.cos(i * 0.8) * 5} cy={48 + Math.sin(i * 0.8) * 5} r="1.2" fill="#3A1E0A" opacity="0.6" />
          ))}
        </g>
      );
    case 'cherry-blossom':
      return (
        <g>
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 5) * i} 50 44)`}>
              <ellipse cx="50" cy="30" rx="9" ry="14" fill={petal} opacity="0.85" />
              <ellipse cx="50" cy="32" rx="6" ry="10" fill="white" opacity="0.18" />
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
          <path d="M36 56 Q34 36 42 26 Q46 22 50 20 Q54 22 58 26 Q66 36 64 56 Q50 60 36 56Z" fill={petal} />
          <path d="M40 54 Q38 38 44 28 Q48 24 50 22 Q52 24 56 28 Q62 38 60 54 Q50 58 40 54Z" fill={petalDark} opacity="0.4" />
          <path d="M36 56 Q34 40 44 28 Q46 32 48 38 Q44 48 36 56Z" fill={petal} opacity="0.85" />
          <path d="M64 56 Q66 40 56 28 Q54 32 52 38 Q56 48 64 56Z" fill={petal} opacity="0.85" />
          <path d="M46 30 Q48 26 50 24 Q48 30 46 38Z" fill="white" opacity="0.2" />
        </g>
      );
    case 'daisy':
      return (
        <g>
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="32" rx="3.5" ry="14" fill="white" opacity="0.92" transform={`rotate(${(360 / 14) * i} 50 46)`} />
          ))}
          <circle cx="50" cy="46" r="8" fill="#FFD633" />
          <circle cx="50" cy="46" r="6" fill="#EDCA38" />
        </g>
      );
    case 'lily':
      return (
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 6) * i} 50 46)`}>
              <path d="M50 46 Q44 30 46 20 Q50 16 54 20 Q56 30 50 46Z" fill={petal} opacity="0.88" />
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
      <path d={d} fill="#3DB85C" opacity="0.9" />
      <path d={d.replace(/-20/g, '-14').replace(/-16/g, '-10')} fill="#2E9648" opacity="0.35" />
      <line x1="0" y1="0" x2={flipX ? 8 : -8} y2="-12" stroke="#2E9648" strokeWidth="0.5" opacity="0.5" />
    </g>
  );
}

/* ── Animated flower wrapper for bloom effect ── */
const AnimatedFlower = ({ children, delay = 0, cx, cy }: {
  children: React.ReactNode; delay?: number; cx: number; cy: number;
}) => (
  <motion.g
    style={{ originX: `${cx}px`, originY: `${cy}px` }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      delay,
      duration: 0.8,
      type: 'spring',
      stiffness: 180,
      damping: 12,
    }}
  >
    {children}
  </motion.g>
);

/* ── Single flower (no bouquet) ── */
const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    <path d="M50 62 Q48 85 50 120" stroke="#3A7A4C" strokeWidth="2.5" fill="none" />
    {renderLeaf(leafStyle, 48, 85, false)}
    {renderLeaf(leafStyle, 52, 100, true)}
    <AnimatedFlower delay={0.1} cx={50} cy={46}>
      <FlowerHead type={type} c={c} customColor={customColor} />
    </AnimatedFlower>
  </g>
);

/* ── 3-flower ribbon wrap bouquet ── */
const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* S-curved stems converging to ribbon point */}
    <path d="M30 48 C36 68 44 88 50 108" stroke="#3A7A4C" strokeWidth="1.8" fill="none" />
    <path d="M50 42 C50 66 50 86 50 108" stroke="#3A7A4C" strokeWidth="2.2" fill="none" />
    <path d="M70 48 C64 68 56 88 50 108" stroke="#3A7A4C" strokeWidth="1.8" fill="none" />

    {/* Leaves behind flowers */}
    {renderLeaf(leafStyle, 22, 66, false, 1.4)}
    {renderLeaf(leafStyle, 78, 66, true, 1.4)}
    {renderLeaf(leafStyle, 32, 80, false, 1.1)}
    {renderLeaf(leafStyle, 68, 80, true, 1.1)}

    {/* Ribbon wrap — tight cinched style */}
    <path d="M38 96 Q50 90 62 96 L64 112 Q50 116 36 112Z" fill="#FF8FAB" opacity="0.7" />
    <path d="M40 98 Q50 92 60 98 L62 110 Q50 114 38 110Z" fill="#FFB0C8" opacity="0.5" />
    {/* Ribbon bow */}
    <ellipse cx="50" cy="100" rx="10" ry="3.5" fill="#FF6B8A" opacity="0.9" />
    <path d="M43 100 Q50 107 57 100" stroke="#E05A78" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="100" r="2" fill="#E05A78" />
    {/* Tails */}
    <path d="M41 102 Q34 112 30 118" stroke="#FF8FAB" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M59 102 Q66 112 70 118" stroke="#FF8FAB" strokeWidth="1.8" fill="none" strokeLinecap="round" />

    {/* Back row — 2 flowers at 75% */}
    <AnimatedFlower delay={0.15} cx={36} cy={50}>
      <g transform="translate(-16, 4) scale(0.72) rotate(-12 50 46)" opacity="0.85">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.25} cx={64} cy={50}>
      <g transform="translate(16, 4) scale(0.72) rotate(10 50 46)" opacity="0.85">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* Hero flower — front center */}
    <AnimatedFlower delay={0.4} cx={50} cy={46}>
      <g transform="translate(0, -2) scale(0.9) rotate(-3 50 46)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
  </g>
);

/* ── 5-flower tissue wrap bouquet ── */
const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => {
  const rotations = [-14, 11, -8, 13, -2];

  return (
    <g>
      <defs>
        <filter id="shadow-back" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#00000020" />
        </filter>
        <filter id="shadow-mid" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000030" />
        </filter>
        <filter id="shadow-hero" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#00000040" />
        </filter>
      </defs>

      {/* S-curved stems converging at 50,112 */}
      <path d="M18 48 C26 66 38 88 50 112" stroke="#3A7A4C" strokeWidth="1.4" fill="none" />
      <path d="M32 42 C38 62 44 84 50 112" stroke="#3A7A4C" strokeWidth="1.7" fill="none" />
      <path d="M50 36 C50 60 50 88 50 112" stroke="#3A7A4C" strokeWidth="2" fill="none" />
      <path d="M68 42 C62 62 56 84 50 112" stroke="#3A7A4C" strokeWidth="1.7" fill="none" />
      <path d="M82 48 C74 66 62 88 50 112" stroke="#3A7A4C" strokeWidth="1.4" fill="none" />

      {/* Backdrop leaves */}
      {renderLeaf(leafStyle, 12, 56, false, 1.8)}
      {renderLeaf(leafStyle, 88, 56, true, 1.8)}
      {renderLeaf(leafStyle, 22, 72, false, 1.4)}
      {renderLeaf(leafStyle, 78, 72, true, 1.4)}
      {renderLeaf(leafStyle, 34, 86, false, 1)}
      {renderLeaf(leafStyle, 66, 86, true, 1)}

      {/* === LAYER 1: Back row — 2 flowers at 60% === */}
      <AnimatedFlower delay={0.1} cx={32} cy={56}>
        <g transform={`translate(-20, 10) scale(0.6) rotate(${rotations[0]} 50 46)`} opacity="0.78" filter="url(#shadow-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.2} cx={68} cy={56}>
        <g transform={`translate(20, 10) scale(0.6) rotate(${rotations[1]} 50 46)`} opacity="0.78" filter="url(#shadow-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === LAYER 2: Middle row — 2 flowers at 78% === */}
      <AnimatedFlower delay={0.3} cx={38} cy={46}>
        <g transform={`translate(-13, 0) scale(0.78) rotate(${rotations[2]} 50 46)`} opacity="0.92" filter="url(#shadow-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.4} cx={62} cy={46}>
        <g transform={`translate(13, 0) scale(0.78) rotate(${rotations[3]} 50 46)`} opacity="0.92" filter="url(#shadow-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* Tissue wrapping — wide flared organic shape */}
      <path
        d="M6 86 C2 78 12 66 26 60 Q50 52 74 60 C88 66 98 78 94 86 L98 120 Q90 130 74 132 Q50 136 26 132 Q10 130 2 120Z"
        fill="#F5EADC" opacity="0.45"
      />
      <path
        d="M12 84 C8 76 16 64 30 58 Q50 50 70 58 C84 64 92 76 88 84 L92 118 Q86 126 70 128 Q50 132 30 128 Q14 126 8 118Z"
        fill="#FFF8F0" opacity="0.35"
      />
      {/* Tissue fold accents */}
      <path d="M18 76 Q50 62 82 76" stroke="#E8D5C0" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M14 84 Q50 68 86 84" stroke="#E8D5C0" strokeWidth="0.6" fill="none" opacity="0.35" />

      {/* Ribbon bow — on top of wrapping */}
      <ellipse cx="50" cy="108" rx="16" ry="6" fill="#FF6B8A" opacity="0.92" />
      <path d="M38 108 Q50 117 62 108" stroke="#E05068" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Bow loops */}
      <path d="M38 106 Q28 96 32 100 Q26 90 38 106Z" fill="#FF8FAB" opacity="0.75" />
      <path d="M62 106 Q72 96 68 100 Q74 90 62 106Z" fill="#FF8FAB" opacity="0.75" />
      <circle cx="50" cy="107" r="2.8" fill="#E05068" opacity="0.85" />
      {/* Tails */}
      <path d="M34 110 C26 120 22 126 20 132" stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M66 110 C74 120 78 126 80 132" stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* === LAYER 3: Hero flower — front center, largest === */}
      <AnimatedFlower delay={0.55} cx={50} cy={38}>
        <g transform={`translate(0, -8) scale(0.95) rotate(${rotations[4]} 50 46)`} filter="url(#shadow-hero)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
    </g>
  );
};

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

  const vb = bouquetSize === 'large' ? '-5 -10 110 150'
    : bouquetSize === 'small' ? '5 -5 90 130'
    : '0 0 100 130';

  const w = bouquetSize === 'large' ? size * 1.8 : bouquetSize === 'small' ? size * 1.4 : size;
  const h = bouquetSize === 'large' ? size * 1.7 : bouquetSize === 'small' ? size * 1.3 : size + 20;

  return (
    <Wrapper {...wrapperProps as any} style={{ width: w, height: h, background: 'transparent' }} className="relative flex items-center justify-center">
      <svg viewBox={vb} width={w} height={h} style={{ background: 'transparent' }}>
        <defs>
          <radialGradient id={`glow-${color}-${bouquetSize}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={customPetalColor || c.petal} stopOpacity="0.3" />
            <stop offset="100%" stopColor={customPetalColor || c.petal} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r={bouquetSize === 'large' ? 55 : 30} fill={`url(#glow-${color}-${bouquetSize})`} />
        {bouquetSize === 'single' && <BouquetSingle type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
        {bouquetSize === 'small' && <BouquetSmall type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
        {bouquetSize === 'large' && <BouquetLarge type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
      </svg>
    </Wrapper>
  );
};
