import { motion } from 'framer-motion';
import type { FlowerType, FlowerColor, LeafStyle, BouquetSize } from '@/types/bloom';

/* ── Vibrant, high-contrast color map ── */
const colorMap: Record<FlowerColor, { petal: string; center: string; petalDark: string; petalLight: string }> = {
  rose:     { petal: '#FF4D8A', center: '#FFD700', petalDark: '#D4266E', petalLight: '#FF8AB5' },
  lavender: { petal: '#C466FF', center: '#FFE44D', petalDark: '#9B33DD', petalLight: '#D99CFF' },
  mint:     { petal: '#33E8A0', center: '#FFF066', petalDark: '#1CB87A', petalLight: '#7FFFCA' },
  peach:    { petal: '#FF8F5C', center: '#FFDD44', petalDark: '#E06A30', petalLight: '#FFB898' },
  sky:      { petal: '#42B8FF', center: '#FFF280', petalDark: '#1A8FDD', petalLight: '#8AD4FF' },
  gold:     { petal: '#FFD633', center: '#FF6B33', petalDark: '#DDB200', petalLight: '#FFE680' },
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

/* ── Unique illustrated flower heads ── */
const FlowerHead = ({ type, c, customColor }: {
  type: FlowerType;
  c: { petal: string; center: string; petalDark: string; petalLight: string };
  customColor?: string;
}) => {
  const petal = customColor || c.petal;
  const petalDark = customColor ? adjustColor(customColor, -35) : c.petalDark;
  const petalLight = customColor ? adjustColor(customColor, 40) : c.petalLight;

  switch (type) {
    case 'rose':
      return (
        <g>
          {/* Outer petals — layered spiral */}
          {[-25, 20, 65, -60, 100].map((r, i) => (
            <ellipse key={i} cx="50" cy="48" rx="17" ry="13" fill={petal} opacity={0.7 + i * 0.03} transform={`rotate(${r} 50 48)`} />
          ))}
          {/* Inner petals — tighter curl */}
          {[10, -35, 55, -70].map((r, i) => (
            <ellipse key={`m${i}`} cx="50" cy="46" rx="12" ry="9" fill={petal} transform={`rotate(${r} 50 46)`} />
          ))}
          {/* Dark depth petals */}
          {[15, 75, -45].map((r, i) => (
            <ellipse key={`d${i}`} cx="50" cy="45" rx="8" ry="6" fill={petalDark} opacity="0.5" transform={`rotate(${r} 50 45)`} />
          ))}
          {/* Center bud spiral */}
          <circle cx="50" cy="46" r="5" fill={petalDark} />
          <path d="M47 46 Q50 42 53 46 Q50 50 47 46" fill={petal} opacity="0.85" />
          {/* Highlight */}
          <ellipse cx="46" cy="42" rx="3" ry="2" fill={petalLight} opacity="0.25" transform="rotate(-20 46 42)" />
        </g>
      );

    case 'sunflower':
      return (
        <g>
          {/* Outer ray petals */}
          {Array.from({ length: 18 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="28" rx="5.5" ry="18" fill={petal}
              transform={`rotate(${(360 / 18) * i} 50 48)`} />
          ))}
          {/* Inner ray petals */}
          {Array.from({ length: 14 }).map((_, i) => (
            <ellipse key={`i${i}`} cx="50" cy="33" rx="4.5" ry="13" fill={petalDark} opacity="0.6"
              transform={`rotate(${(360 / 14) * i + 10} 50 48)`} />
          ))}
          {/* Brown center disc */}
          <circle cx="50" cy="48" r="13" fill="#5A3215" />
          <circle cx="50" cy="48" r="11" fill="#7A4E2C" />
          <circle cx="50" cy="48" r="8" fill="#5A3215" opacity="0.5" />
          {/* Seed dots */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r = 3 + (i % 3) * 2;
            return <circle key={`s${i}`} cx={50 + Math.cos(a) * r} cy={48 + Math.sin(a) * r} r="1" fill="#3A1E0A" opacity="0.55" />;
          })}
          {/* Highlight */}
          <ellipse cx="45" cy="44" rx="3" ry="2" fill="#9A6B3C" opacity="0.3" />
        </g>
      );

    case 'cherry-blossom':
      return (
        <g>
          {/* 5 heart-shaped sakura petals */}
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 5) * i} 50 44)`}>
              <path d="M50 44 Q43 30 45 20 Q48 15 50 18 Q52 15 55 20 Q57 30 50 44Z" fill={petal} opacity="0.88" />
              <path d="M50 44 Q45 32 47 22 Q49 17 50 20 Q51 17 53 22 Q55 32 50 44Z" fill="white" opacity="0.15" />
              {/* Notch at tip */}
              <circle cx="50" cy="18" r="1.5" fill="white" opacity="0.08" />
            </g>
          ))}
          {/* Center */}
          <circle cx="50" cy="44" r="5.5" fill="#FFE4E8" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="44" x2={50 + Math.cos(a) * 5} y2={44 + Math.sin(a) * 5} stroke="#E8A0B0" strokeWidth="0.6" />
                <circle cx={50 + Math.cos(a) * 5} cy={44 + Math.sin(a) * 5} r="0.8" fill={c.center} />
              </g>
            );
          })}
        </g>
      );

    case 'tulip':
      return (
        <g>
          {/* Cup shape — 3 overlapping petals */}
          <path d="M34 58 Q32 36 40 24 Q44 18 50 16 Q56 18 60 24 Q68 36 66 58 Q50 64 34 58Z" fill={petal} />
          {/* Left petal overlap */}
          <path d="M34 58 Q32 42 42 26 Q44 30 46 38 Q42 50 34 58Z" fill={petalLight} opacity="0.6" />
          {/* Right petal overlap */}
          <path d="M66 58 Q68 42 58 26 Q56 30 54 38 Q58 50 66 58Z" fill={petalLight} opacity="0.6" />
          {/* Center fold */}
          <path d="M42 56 Q40 40 46 28 Q48 24 50 20 Q52 24 54 28 Q60 40 58 56 Q50 60 42 56Z" fill={petalDark} opacity="0.35" />
          {/* Inner light streak */}
          <path d="M46 30 Q48 22 50 18 Q48 28 46 40Z" fill="white" opacity="0.18" />
          {/* Subtle lip */}
          <path d="M38 56 Q50 52 62 56" stroke={petalDark} strokeWidth="0.6" fill="none" opacity="0.4" />
        </g>
      );

    case 'daisy':
      return (
        <g>
          {/* Two layers of white petals */}
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="30" rx="4" ry="16" fill="white" opacity="0.9"
              transform={`rotate(${(360 / 16) * i} 50 46)`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={`inner${i}`} cx="50" cy="34" rx="3" ry="11" fill="#F8F8FF" opacity="0.7"
              transform={`rotate(${(360 / 12) * i + 15} 50 46)`} />
          ))}
          {/* Golden center */}
          <circle cx="50" cy="46" r="9" fill="#FFD633" />
          <circle cx="50" cy="46" r="7" fill="#EDCA38" />
          <circle cx="50" cy="46" r="4" fill="#E0B820" opacity="0.5" />
          {/* Tiny dots on center */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return <circle key={`d${i}`} cx={50 + Math.cos(a) * 4} cy={46 + Math.sin(a) * 4} r="0.6" fill="#C8A010" opacity="0.5" />;
          })}
        </g>
      );

    case 'lily':
      return (
        <g>
          {/* 6 elegant recurved petals */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 6) * i} 50 46)`}>
              <path d="M50 46 Q42 28 44 16 Q50 10 56 16 Q58 28 50 46Z" fill={petal} opacity="0.88" />
              <path d="M50 46 Q44 30 46 18 Q50 13 54 18 Q56 30 50 46Z" fill={petalDark} opacity="0.25" />
              {/* Speckles */}
              <circle cx="49" cy="30" r="0.7" fill={petalDark} opacity="0.4" />
              <circle cx="51" cy="34" r="0.5" fill={petalDark} opacity="0.35" />
            </g>
          ))}
          {/* Pistil center */}
          <circle cx="50" cy="46" r="5" fill={c.center} opacity="0.75" />
          {/* Stamens */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="46" x2={50 + Math.cos(a) * 9} y2={46 + Math.sin(a) * 9} stroke="#7A6A3A" strokeWidth="0.7" />
                <ellipse cx={50 + Math.cos(a) * 9} cy={46 + Math.sin(a) * 9} rx="1.5" ry="1" fill="#C8A830" transform={`rotate(${(360 / 6) * i} ${50 + Math.cos(a) * 9} ${46 + Math.sin(a) * 9})`} />
              </g>
            );
          })}
        </g>
      );
  }
};

/* ── Leaf shapes with vein detail ── */
function renderLeaf(leafStyle: LeafStyle, x: number, y: number, flipX: boolean, scale = 1) {
  if (leafStyle === 'none') return null;
  const sx = flipX ? -scale : scale;
  const d = leafStyle === 'round'
    ? 'M0 0 Q-14 -10 -10 -24 Q-2 -22 0 0 Z'
    : leafStyle === 'pointed'
    ? 'M0 0 L-18 -16 Q-6 -22 0 0 Z'
    : 'M0 0 Q-16 -10 -12 -24 Q-2 -20 0 0 Z';

  return (
    <g transform={`translate(${x},${y}) scale(${sx},${scale})`}>
      <path d={d} fill="#2E9648" opacity="0.85" />
      <path d={d} fill="#3DB85C" opacity="0.45" />
      {/* Center vein */}
      <line x1="0" y1="0" x2={flipX ? 7 : -9} y2="-14" stroke="#236B38" strokeWidth="0.6" opacity="0.45" />
      {/* Side veins */}
      <line x1={flipX ? 3 : -4} y1="-5" x2={flipX ? 6 : -8} y2="-10" stroke="#236B38" strokeWidth="0.3" opacity="0.3" />
      <line x1={flipX ? 2 : -3} y1="-10" x2={flipX ? 5 : -7} y2="-16" stroke="#236B38" strokeWidth="0.3" opacity="0.3" />
    </g>
  );
}

/* ── Animated flower wrapper with elastic bloom ── */
const AnimatedFlower = ({ children, delay = 0, cx, cy }: {
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
      stiffness: 160,
      damping: 10,
    }}
  >
    {children}
  </motion.g>
);

/* ── Floating petal particles that drift after bloom ── */
const FloatingPetalParticles = ({ color, count = 4, delay = 0.8 }: { color: string; count?: number; delay?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const startX = 30 + Math.random() * 40;
      const startY = 20 + Math.random() * 30;
      const drift = (Math.random() - 0.5) * 30;
      return (
        <motion.ellipse
          key={`fp-${i}`}
          cx={startX} cy={startY}
          rx={2 + Math.random() * 2} ry={1.5 + Math.random() * 1.5}
          fill={color} opacity="0"
          animate={{
            cx: [startX, startX + drift, startX + drift * 1.5],
            cy: [startY, startY + 30, startY + 60],
            opacity: [0, 0.55, 0],
            rotate: [0, 180 + Math.random() * 180],
          }}
          transition={{
            delay: delay + i * 0.25,
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 3,
            ease: 'easeOut',
          }}
        />
      );
    })}
  </>
);

/* ── Swaying ribbon animation ── */
const SwayingRibbon = ({ x, y, side }: { x: number; y: number; side: 'left' | 'right' }) => {
  const endX = side === 'left' ? x - 12 : x + 12;
  const endY = y + 22;
  const cp1x = side === 'left' ? x - 6 : x + 6;
  const cp1y = y + 10;

  return (
    <motion.path
      d={`M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`}
      stroke="#FF8FAB" strokeWidth="2" fill="none" strokeLinecap="round"
      animate={{
        d: [
          `M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`,
          `M${x} ${y} Q${cp1x + (side === 'left' ? -3 : 3)} ${cp1y + 2} ${endX + (side === 'left' ? -2 : 2)} ${endY}`,
          `M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`,
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
    />
  );
};

/* ── Single flower ── */
const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* Stem */}
    <path d="M50 62 Q48 82 50 120" stroke="#3A7A4C" strokeWidth="2.5" fill="none" />
    {/* Leaves behind */}
    {renderLeaf(leafStyle, 48, 82, false, 1.1)}
    {renderLeaf(leafStyle, 52, 96, true, 1.1)}
    {/* Bloom */}
    <AnimatedFlower delay={0.15} cx={50} cy={46}>
      <FlowerHead type={type} c={c} customColor={customColor} />
    </AnimatedFlower>
    <FloatingPetalParticles color={customColor || c.petal} count={3} delay={1} />
  </g>
);

/* ── 3-flower ribbon wrap bouquet ── */
const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    <defs>
      <filter id="sh-sm-back"><feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#00000018" /></filter>
      <filter id="sh-sm-hero"><feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#00000028" /></filter>
    </defs>

    {/* S-curved stems converging at 50,108 */}
    <path d="M28 50 C34 68 42 88 50 108" stroke="#3A7A4C" strokeWidth="1.6" fill="none" />
    <path d="M50 40 C50 62 50 84 50 108" stroke="#3A7A4C" strokeWidth="2" fill="none" />
    <path d="M72 50 C66 68 58 88 50 108" stroke="#3A7A4C" strokeWidth="1.6" fill="none" />

    {/* Leaves — arranged behind flowers */}
    {renderLeaf(leafStyle, 18, 62, false, 1.5)}
    {renderLeaf(leafStyle, 82, 62, true, 1.5)}
    {renderLeaf(leafStyle, 28, 78, false, 1.2)}
    {renderLeaf(leafStyle, 72, 78, true, 1.2)}
    {renderLeaf(leafStyle, 40, 90, false, 0.9)}
    {renderLeaf(leafStyle, 60, 90, true, 0.9)}

    {/* === BACK: 2 side flowers at 72% === */}
    <AnimatedFlower delay={0.12} cx={30} cy={50}>
      <g transform="translate(-18, 6) scale(0.72) rotate(-13 50 46)" opacity="0.82" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.24} cx={70} cy={50}>
      <g transform="translate(18, 6) scale(0.72) rotate(11 50 46)" opacity="0.82" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* Ribbon wrap — cinched tissue */}
    <path d="M34 94 Q50 88 66 94 L68 114 Q50 118 32 114Z" fill="#F5EADC" opacity="0.5" />
    <path d="M36 96 Q50 90 64 96 L66 112 Q50 116 34 112Z" fill="#FFF8F0" opacity="0.4" />
    {/* Ribbon band + bow */}
    <rect x="36" y="100" width="28" height="5" rx="2" fill="#FF6B8A" opacity="0.9" />
    <ellipse cx="50" cy="102" rx="8" ry="3" fill="#FF8FAB" opacity="0.85" />
    <circle cx="50" cy="102" r="2" fill="#E05068" />
    <SwayingRibbon x={40} y={104} side="left" />
    <SwayingRibbon x={60} y={104} side="right" />

    {/* === FRONT: Hero flower at 92% === */}
    <AnimatedFlower delay={0.42} cx={50} cy={42}>
      <g transform="translate(0, -4) scale(0.92) rotate(-2 50 46)" filter="url(#sh-sm-hero)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    <FloatingPetalParticles color={customColor || c.petal} count={4} delay={0.9} />
  </g>
);

/* ── 5-flower tissue wrap bouquet ── */
const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: typeof colorMap.rose; leafStyle: LeafStyle; customColor?: string;
}) => {
  const rotations = [-14, 12, -9, 13, -3];

  return (
    <g>
      <defs>
        <filter id="sh-lg-back"><feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#00000015" /></filter>
        <filter id="sh-lg-mid"><feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#00000025" /></filter>
        <filter id="sh-lg-hero"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#00000038" /></filter>
      </defs>

      {/* S-curved stems converging at 50,112 */}
      <path d="M16 50 C24 66 36 86 50 112" stroke="#3A7A4C" strokeWidth="1.3" fill="none" />
      <path d="M30 42 C36 60 42 82 50 112" stroke="#3A7A4C" strokeWidth="1.6" fill="none" />
      <path d="M50 34 C50 58 50 86 50 112" stroke="#3A7A4C" strokeWidth="2" fill="none" />
      <path d="M70 42 C64 60 58 82 50 112" stroke="#3A7A4C" strokeWidth="1.6" fill="none" />
      <path d="M84 50 C76 66 64 86 50 112" stroke="#3A7A4C" strokeWidth="1.3" fill="none" />

      {/* Backdrop leaves — arranged at multiple depths */}
      {renderLeaf(leafStyle, 8, 52, false, 2)}
      {renderLeaf(leafStyle, 92, 52, true, 2)}
      {renderLeaf(leafStyle, 18, 68, false, 1.6)}
      {renderLeaf(leafStyle, 82, 68, true, 1.6)}
      {renderLeaf(leafStyle, 28, 82, false, 1.2)}
      {renderLeaf(leafStyle, 72, 82, true, 1.2)}
      {renderLeaf(leafStyle, 38, 92, false, 0.8)}
      {renderLeaf(leafStyle, 62, 92, true, 0.8)}

      {/* === LAYER 1: Back row — 2 flowers at 58%, smaller and behind === */}
      <AnimatedFlower delay={0.08} cx={26} cy={56}>
        <g transform={`translate(-24, 12) scale(0.58) rotate(${rotations[0]} 50 46)`} opacity="0.75" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.18} cx={74} cy={56}>
        <g transform={`translate(24, 12) scale(0.58) rotate(${rotations[1]} 50 46)`} opacity="0.75" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === LAYER 2: Middle row — 2 flowers at 78% === */}
      <AnimatedFlower delay={0.3} cx={36} cy={46}>
        <g transform={`translate(-14, 2) scale(0.78) rotate(${rotations[2]} 50 46)`} opacity="0.9" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.42} cx={64} cy={46}>
        <g transform={`translate(14, 2) scale(0.78) rotate(${rotations[3]} 50 46)`} opacity="0.9" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* Tissue wrapping — wide flared organic cradle */}
      <path
        d="M4 88 C0 78 10 64 24 56 Q50 46 76 56 C90 64 100 78 96 88 L100 122 Q92 134 76 136 Q50 140 24 136 Q8 134 0 122Z"
        fill="#F5EADC" opacity="0.4"
      />
      <path
        d="M10 86 C6 76 16 62 28 54 Q50 44 72 54 C84 62 94 76 90 86 L94 120 Q88 130 72 132 Q50 136 28 132 Q12 130 6 120Z"
        fill="#FFF8F0" opacity="0.3"
      />
      {/* Tissue fold accents */}
      <path d="M16 78 Q50 60 84 78" stroke="#E8D5C0" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M12 86 Q50 66 88 86" stroke="#E8D5C0" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M20 72 Q36 62 50 58 Q64 62 80 72" stroke="#EDE0D0" strokeWidth="0.4" fill="none" opacity="0.25" />

      {/* Ribbon — band + bow knot + swaying tails */}
      <rect x="30" y="106" width="40" height="6" rx="3" fill="#FF6B8A" opacity="0.92" />
      {/* Bow loops */}
      <path d="M36 108 Q24 96 28 100 Q22 88 36 108Z" fill="#FF8FAB" opacity="0.7" />
      <path d="M64 108 Q76 96 72 100 Q78 88 64 108Z" fill="#FF8FAB" opacity="0.7" />
      <ellipse cx="50" cy="109" rx="10" ry="4" fill="#FF8FAB" opacity="0.85" />
      <circle cx="50" cy="109" r="2.5" fill="#E05068" opacity="0.9" />
      <SwayingRibbon x={34} y={112} side="left" />
      <SwayingRibbon x={66} y={112} side="right" />

      {/* === LAYER 3: Hero flower — front center, largest === */}
      <AnimatedFlower delay={0.58} cx={50} cy={36}>
        <g transform={`translate(0, -10) scale(0.96) rotate(${rotations[4]} 50 46)`} filter="url(#sh-lg-hero)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      <FloatingPetalParticles color={customColor || c.petal} count={6} delay={1.1} />
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

  const vb = bouquetSize === 'large' ? '-5 -10 110 155'
    : bouquetSize === 'small' ? '5 -5 90 130'
    : '0 0 100 130';

  const w = bouquetSize === 'large' ? size * 1.8 : bouquetSize === 'small' ? size * 1.4 : size;
  const h = bouquetSize === 'large' ? size * 1.8 : bouquetSize === 'small' ? size * 1.3 : size + 20;

  return (
    <Wrapper {...wrapperProps as any} style={{ width: w, height: h, background: 'transparent' }} className="relative flex items-center justify-center">
      <svg viewBox={vb} width={w} height={h} style={{ background: 'transparent', overflow: 'visible' }}>
        <defs>
          <radialGradient id={`glow-${color}-${bouquetSize}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={customPetalColor || c.petal} stopOpacity="0.25" />
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
