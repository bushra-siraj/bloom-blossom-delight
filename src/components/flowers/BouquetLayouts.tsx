import type { FlowerType, LeafStyle } from '@/types/bloom';
import { FlowerHead } from './FlowerHead';
import { renderLeaf, renderBerryCluster } from './LeafSVG';
import { AnimatedFlower, FloatingPetalParticles, SwayingRibbon } from './Animations';
import { colorMap } from './colorMap';

type C = typeof colorMap.rose;

/* ──────────────────────────────────────────────────────────────
   Shared absolute-position data
────────────────────────────────────────────────────────────── */
const SMALL_TIE = { x: 50, y: 114 };
const LARGE_TIE = { x: 57, y: 128 };

const SMALL_FILL_LEAVES = [
  { x: 20, y: 58, flipX: false, scale: 2, colorVariant: 'dark' as const },
  { x: 80, y: 58, flipX: true, scale: 2, colorVariant: 'dark' as const },
  { x: 32, y: 74, flipX: false, scale: 1.6, colorVariant: 'medium' as const },
  { x: 68, y: 74, flipX: true, scale: 1.6, colorVariant: 'medium' as const },
];

const SMALL_FILL_BERRIES = [
  { x: 16, y: 46, flipX: false },
  { x: 84, y: 46, flipX: true },
  { x: 50, y: 60, flipX: false },
];

const LARGE_FILL_LEAVES = [
  { x: 14, y: 60, flipX: false, scale: 2.4, colorVariant: 'dark' as const },
  { x: 100, y: 60, flipX: true, scale: 2.4, colorVariant: 'dark' as const },
  { x: 30, y: 84, flipX: false, scale: 1.9, colorVariant: 'medium' as const },
  { x: 84, y: 84, flipX: true, scale: 1.9, colorVariant: 'medium' as const },
];

const LARGE_FILL_BERRIES = [
  { x: 10, y: 44, flipX: false },
  { x: 104, y: 44, flipX: true },
  { x: 57, y: 56, flipX: false },
];

/* ── Single flower: centered bloom + long stem + two symmetric leaves ── */
export const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <>
    {/* Stem layer */}
    <path d="M50 60 Q49 84 50 126" stroke="#41545E" strokeWidth="2.6" fill="none" strokeLinecap="round" />

    {/* Symmetrical leaves */}
    <g transform="translate(44,84) rotate(-28)">
      <path d="M0 0 Q-10 -8 -14 -22 Q-11 -30 -5 -32 Q2 -30 4 -19 Q4 -8 0 0Z"
        fill="#6A9AA8" stroke="#1E2024" strokeWidth="1.2" />
      <line x1="0" y1="-2" x2="-3" y2="-24" stroke="#365E6A" strokeWidth="0.8" />
    </g>
    <g transform="translate(56,84) rotate(28) scale(-1,1)">
      <path d="M0 0 Q-10 -8 -14 -22 Q-11 -30 -5 -32 Q2 -30 4 -19 Q4 -8 0 0Z"
        fill="#6A9AA8" stroke="#1E2024" strokeWidth="1.2" />
      <line x1="0" y1="-2" x2="-3" y2="-24" stroke="#365E6A" strokeWidth="0.8" />
    </g>

    {/* Bloom layer */}
    <AnimatedFlower delay={0.12} cx={50} cy={45}>
      <FlowerHead type={type} c={c} customColor={customColor} />
    </AnimatedFlower>

    <FloatingPetalParticles color={customColor || c.petal} count={3} delay={0.9} />
  </>
);

/* ── 3-flower bouquet: Ribbon Tie style (no wrap) ── */
export const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <>
    <defs>
      <filter id="sh-sm-back"><feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#00000022" /></filter>
      <filter id="sh-sm-mid"><feDropShadow dx="0" dy="1.8" stdDeviation="2" floodColor="#0000002b" /></filter>
      <filter id="sh-sm-front"><feDropShadow dx="0" dy="2.4" stdDeviation="2.6" floodColor="#00000032" /></filter>
    </defs>

    {/* Stems absolute-positioned, intersecting exactly at tie point */}
    <path d={`M28 48 C34 68 42 90 ${SMALL_TIE.x} ${SMALL_TIE.y}`} stroke="#41545E" strokeWidth="1.9" fill="none" strokeLinecap="round" />
    <path d={`M50 36 C50 62 50 88 ${SMALL_TIE.x} ${SMALL_TIE.y}`} stroke="#41545E" strokeWidth="2.3" fill="none" strokeLinecap="round" />
    <path d={`M72 48 C66 68 58 90 ${SMALL_TIE.x} ${SMALL_TIE.y}`} stroke="#41545E" strokeWidth="1.9" fill="none" strokeLinecap="round" />

    {/* Gap fillers (behind flowers): exactly 4 leaves + 3 berry clusters */}
    {SMALL_FILL_LEAVES.map((leaf, i) => (
      <g key={`sm-leaf-${i}`}>
        {renderLeaf(leafStyle, leaf.x, leaf.y, leaf.flipX, leaf.scale, leaf.colorVariant)}
      </g>
    ))}
    {SMALL_FILL_BERRIES.map((berry, i) => (
      <g key={`sm-berry-${i}`}>
        {renderBerryCluster(berry.x, berry.y, berry.flipX)}
      </g>
    ))}

    {/* z-index:1 back/side */}
    <AnimatedFlower delay={0.08} cx={30} cy={50}>
      <g transform="translate(-20, 6) scale(0.63) rotate(-13 50 46)" opacity="0.78" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.16} cx={70} cy={50}>
      <g transform="translate(20, 6) scale(0.63) rotate(11 50 46)" opacity="0.78" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* z-index:3 hero/front center */}
    <AnimatedFlower delay={0.34} cx={50} cy={40}>
      <g transform="translate(0,-6) scale(0.9) rotate(-2 50 46)" filter="url(#sh-sm-front)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* Ribbon positioned exactly over intersection */}
    <rect x={SMALL_TIE.x - 14} y={SMALL_TIE.y - 4} width="28" height="8" rx="4"
      fill="#CC2244" stroke="#1E2024" strokeWidth="0.9" />
    <path d={`M${SMALL_TIE.x - 8} ${SMALL_TIE.y} Q${SMALL_TIE.x - 22} ${SMALL_TIE.y - 16} ${SMALL_TIE.x - 16} ${SMALL_TIE.y - 10} Q${SMALL_TIE.x - 28} ${SMALL_TIE.y - 24} ${SMALL_TIE.x - 8} ${SMALL_TIE.y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.8" />
    <path d={`M${SMALL_TIE.x + 8} ${SMALL_TIE.y} Q${SMALL_TIE.x + 22} ${SMALL_TIE.y - 16} ${SMALL_TIE.x + 16} ${SMALL_TIE.y - 10} Q${SMALL_TIE.x + 28} ${SMALL_TIE.y - 24} ${SMALL_TIE.x + 8} ${SMALL_TIE.y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.8" />
    <circle cx={SMALL_TIE.x} cy={SMALL_TIE.y} r="3.2" fill="#A11735" stroke="#1E2024" strokeWidth="0.6" />
    <SwayingRibbon x={SMALL_TIE.x - 10} y={SMALL_TIE.y + 4} side="left" />
    <SwayingRibbon x={SMALL_TIE.x + 10} y={SMALL_TIE.y + 4} side="right" />

    <FloatingPetalParticles color={customColor || c.petal} count={4} delay={0.85} />
  </>
);

/* ── 5-flower bouquet: Full Diamond Wrap style ── */
export const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <>
    <defs>
      <filter id="sh-lg-back"><feDropShadow dx="0" dy="1.2" stdDeviation="1.5" floodColor="#00000022" /></filter>
      <filter id="sh-lg-mid"><feDropShadow dx="0" dy="2" stdDeviation="2.4" floodColor="#0000002b" /></filter>
      <filter id="sh-lg-front"><feDropShadow dx="0" dy="3" stdDeviation="3.2" floodColor="#00000035" /></filter>
    </defs>

    {/* Full diamond kraft wrap (flared top) */}
    <path d="M-4 82 Q-10 58 14 40 Q36 20 57 16 Q78 20 100 40 Q124 58 118 82 L124 140 Q116 156 92 160 Q57 164 22 160 Q-2 156 -10 140Z"
      fill="#D4B896" stroke="#1E2024" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M2 76 Q57 38 112 76" stroke="#C2A57C" strokeWidth="0.8" fill="none" opacity="0.4" />

    {/* Stems converge near bottom tie */}
    <path d="M14 48 C22 66 38 98 57 138" stroke="#41545E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M30 38 C36 60 44 92 57 138" stroke="#41545E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M57 26 C57 58 57 96 57 138" stroke="#41545E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M84 38 C78 60 70 92 57 138" stroke="#41545E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M100 48 C92 66 76 98 57 138" stroke="#41545E" strokeWidth="1.6" fill="none" strokeLinecap="round" />

    {/* Gap fillers (behind flowers): exactly 4 leaves + 3 berry clusters */}
    {LARGE_FILL_LEAVES.map((leaf, i) => (
      <g key={`lg-leaf-${i}`}>
        {renderLeaf(leafStyle, leaf.x, leaf.y, leaf.flipX, leaf.scale, leaf.colorVariant)}
      </g>
    ))}
    {LARGE_FILL_BERRIES.map((berry, i) => (
      <g key={`lg-berry-${i}`}>
        {renderBerryCluster(berry.x, berry.y, berry.flipX)}
      </g>
    ))}

    {/* z-index:1 back row (2 small flowers) */}
    <AnimatedFlower delay={0.08} cx={22} cy={54}>
      <g transform="translate(-30, 14) scale(0.52) rotate(-14 50 46)" opacity="0.74" filter="url(#sh-lg-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.16} cx={92} cy={54}>
      <g transform="translate(30, 14) scale(0.52) rotate(12 50 46)" opacity="0.74" filter="url(#sh-lg-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* z-index:2 middle row (2 medium flowers) */}
    <AnimatedFlower delay={0.28} cx={34} cy={44}>
      <g transform="translate(-18, 2) scale(0.74) rotate(-10 50 46)" opacity="0.9" filter="url(#sh-lg-mid)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.38} cx={80} cy={44}>
      <g transform="translate(18, 2) scale(0.74) rotate(9 50 46)" opacity="0.9" filter="url(#sh-lg-mid)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* z-index:3 hero/front center (largest) */}
    <AnimatedFlower delay={0.52} cx={57} cy={34}>
      <g transform="translate(7,-10) scale(0.94) rotate(-3 50 46)" filter="url(#sh-lg-front)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* Ribbon at bottom tie */}
    <rect x={LARGE_TIE.x - 30} y={LARGE_TIE.y - 4.5} width="60" height="9" rx="4.5"
      fill="#CC2244" stroke="#1E2024" strokeWidth="0.9" />
    <path d={`M${LARGE_TIE.x - 16} ${LARGE_TIE.y} Q${LARGE_TIE.x - 34} ${LARGE_TIE.y - 20} ${LARGE_TIE.x - 28} ${LARGE_TIE.y - 13} Q${LARGE_TIE.x - 40} ${LARGE_TIE.y - 30} ${LARGE_TIE.x - 16} ${LARGE_TIE.y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.8" />
    <path d={`M${LARGE_TIE.x + 16} ${LARGE_TIE.y} Q${LARGE_TIE.x + 34} ${LARGE_TIE.y - 20} ${LARGE_TIE.x + 28} ${LARGE_TIE.y - 13} Q${LARGE_TIE.x + 40} ${LARGE_TIE.y - 30} ${LARGE_TIE.x + 16} ${LARGE_TIE.y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.8" />
    <circle cx={LARGE_TIE.x} cy={LARGE_TIE.y} r="3.8" fill="#A11735" stroke="#1E2024" strokeWidth="0.6" />
    <SwayingRibbon x={LARGE_TIE.x - 20} y={LARGE_TIE.y + 4} side="left" />
    <SwayingRibbon x={LARGE_TIE.x + 20} y={LARGE_TIE.y + 4} side="right" />

    <FloatingPetalParticles color={customColor || c.petal} count={6} delay={1.05} />
  </>
);
