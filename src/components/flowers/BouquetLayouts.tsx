import type { FlowerType, LeafStyle } from '@/types/bloom';
import { FlowerHead } from './FlowerHead';
import { renderLeaf, renderBerryCluster } from './LeafSVG';
import { AnimatedFlower, FloatingPetalParticles, SwayingRibbon } from './Animations';
import { colorMap } from './colorMap';

type C = typeof colorMap.rose;

/* ══════════════════════════════════════════════════════════════
   SINGLE FLOWER  (viewBox 0 0 100 140)
   Centered bloom, long stem, 2 symmetric leaves
   ══════════════════════════════════════════════════════════════ */
export const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <>
    {/* Stem */}
    <path d="M50 62 Q49 84 50 130" stroke="#41545E" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Left leaf */}
    <g transform="translate(44,86) rotate(-30)">
      <path d="M0 0 Q-10 -8 -14 -22 Q-11 -30 -5 -32 Q2 -30 4 -19 Q4 -8 0 0Z"
        fill="#4A7C7C" stroke="#1E2024" strokeWidth="1.2" />
      <line x1="0" y1="-2" x2="-3" y2="-24" stroke="#365E6A" strokeWidth="0.8" />
    </g>
    {/* Right leaf */}
    <g transform="translate(56,96) rotate(28) scale(-1,1)">
      <path d="M0 0 Q-10 -8 -14 -22 Q-11 -30 -5 -32 Q2 -30 4 -19 Q4 -8 0 0Z"
        fill="#4A7C7C" stroke="#1E2024" strokeWidth="1.2" />
      <line x1="0" y1="-2" x2="-3" y2="-24" stroke="#365E6A" strokeWidth="0.8" />
    </g>

    <AnimatedFlower delay={0.12} cx={50} cy={45}>
      <FlowerHead type={type} c={c} customColor={customColor} />
    </AnimatedFlower>

    <FloatingPetalParticles color={customColor || c.petal} count={3} delay={0.9} />
  </>
);

/* ══════════════════════════════════════════════════════════════
   3-FLOWER  —  Ribbon Tie  (viewBox 0 0 200 260)
   NO wrap. 3 stems converge to focal point. Red ribbon at neck.
   ══════════════════════════════════════════════════════════════ */
const TIE3 = { x: 100, y: 190 };

export const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <>
    <defs>
      <filter id="sh3-back"><feDropShadow dx="0" dy="1.5" stdDeviation="1.8" floodColor="#00000020" /></filter>
      <filter id="sh3-front"><feDropShadow dx="0" dy="2.5" stdDeviation="2.8" floodColor="#00000030" /></filter>
    </defs>

    {/* ── 3 angled stems converging to focal point ── */}
    <line x1="60"  y1="68"  x2={TIE3.x} y2={TIE3.y} stroke="#41545E" strokeWidth="3" strokeLinecap="round" />
    <line x1="100" y1="50"  x2={TIE3.x} y2={TIE3.y} stroke="#41545E" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="140" y1="68"  x2={TIE3.x} y2={TIE3.y} stroke="#41545E" strokeWidth="3" strokeLinecap="round" />
    {/* Below tie — splay out */}
    <line x1={TIE3.x} y1={TIE3.y} x2="78"  y2="250" stroke="#41545E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1={TIE3.x} y1={TIE3.y} x2="100" y2="252" stroke="#41545E" strokeWidth="3" strokeLinecap="round" />
    <line x1={TIE3.x} y1={TIE3.y} x2="122" y2="250" stroke="#41545E" strokeWidth="2.5" strokeLinecap="round" />

    {/* ── 4 Teal leaves behind flowers ── */}
    {renderLeaf(leafStyle, 36, 90, false, 3.2, 'dark')}
    {renderLeaf(leafStyle, 164, 90, true, 3.2, 'dark')}
    {renderLeaf(leafStyle, 60, 110, false, 2.6, 'medium')}
    {renderLeaf(leafStyle, 140, 110, true, 2.6, 'medium')}

    {/* ── 3 Red berry clusters in gaps ── */}
    {renderBerryCluster(44, 72, false)}
    {renderBerryCluster(156, 72, true)}
    {renderBerryCluster(100, 95, false, '#E84040')}

    {/* ── Back row: 2 side flowers at 0.8 scale ── */}
    <AnimatedFlower delay={0.08} cx={60} cy={72}>
      <g transform="translate(10, 26) scale(0.8) rotate(-12 50 46)" opacity="0.82" filter="url(#sh3-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.18} cx={140} cy={72}>
      <g transform="translate(90, 26) scale(0.8) rotate(10 50 46)" opacity="0.82" filter="url(#sh3-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* ── Hero center: 1 large flower at full scale ── */}
    <AnimatedFlower delay={0.36} cx={100} cy={56}>
      <g transform="translate(50, 6) scale(1.0) rotate(-2 50 46)" filter="url(#sh3-front)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* ── Red ribbon bow at tie point ── */}
    <rect x={TIE3.x - 22} y={TIE3.y - 5} width="44" height="10" rx="5"
      fill="#CC2244" stroke="#1E2024" strokeWidth="1" />
    {/* Left bow loop */}
    <path d={`M${TIE3.x - 12} ${TIE3.y} Q${TIE3.x - 34} ${TIE3.y - 22} ${TIE3.x - 26} ${TIE3.y - 14} Q${TIE3.x - 42} ${TIE3.y - 32} ${TIE3.x - 12} ${TIE3.y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.9" />
    {/* Right bow loop */}
    <path d={`M${TIE3.x + 12} ${TIE3.y} Q${TIE3.x + 34} ${TIE3.y - 22} ${TIE3.x + 26} ${TIE3.y - 14} Q${TIE3.x + 42} ${TIE3.y - 32} ${TIE3.x + 12} ${TIE3.y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.9" />
    <circle cx={TIE3.x} cy={TIE3.y} r="5" fill="#A11735" stroke="#1E2024" strokeWidth="0.7" />
    <SwayingRibbon x={TIE3.x - 16} y={TIE3.y + 6} side="left" />
    <SwayingRibbon x={TIE3.x + 16} y={TIE3.y + 6} side="right" />

    <FloatingPetalParticles color={customColor || c.petal} count={4} delay={0.85} />
  </>
);

/* ══════════════════════════════════════════════════════════════
   5-FLOWER  —  Tapered V-Wrap  (viewBox 0 0 200 300)
   Kraft paper: ~40px base, ~180px top flare.
   All stems from focal (100,250). Ribbon at neck.
   ══════════════════════════════════════════════════════════════ */
const FOCAL = { x: 100, y: 250 };
const NECK_Y = 180; // where wrap meets stems

export const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <>
    <defs>
      <filter id="sh5-back"><feDropShadow dx="0" dy="1.5" stdDeviation="1.8" floodColor="#00000020" /></filter>
      <filter id="sh5-mid"><feDropShadow dx="0" dy="2.5" stdDeviation="2.8" floodColor="#00000028" /></filter>
      <filter id="sh5-front"><feDropShadow dx="0" dy="3.5" stdDeviation="3.8" floodColor="#00000035" /></filter>
    </defs>

    {/* ── Kraft paper V-wrap: narrow base (~40px), flared top (~180px) ── */}
    <path d={`M10 60 Q8 50 10 45 L80 ${NECK_Y} L80 260 Q85 275 100 278 Q115 275 120 260 L120 ${NECK_Y} L190 45 Q192 50 190 60 Q180 40 100 30 Q20 40 10 60Z`}
      fill="#D4B896" stroke="#1E2024" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Paper fold lines */}
    <path d="M20 55 Q100 35 180 55" stroke="#C0A478" strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M30 65 Q100 48 170 65" stroke="#C0A478" strokeWidth="0.6" fill="none" opacity="0.3" />
    {/* Speckle texture */}
    {[{x:40,y:80},{x:130,y:75},{x:90,y:100},{x:60,y:130},{x:140,y:120},{x:100,y:150},{x:85,y:200},{x:115,y:210},{x:95,y:240}].map((p,i) => (
      <circle key={`sp${i}`} cx={p.x} cy={p.y} r="1.2" fill="#B89A72" opacity="0.28" />
    ))}

    {/* ── 5 stems from focal point (100,250) ── */}
    <line x1={FOCAL.x} y1={FOCAL.y} x2="40"  y2="68"  stroke="#41545E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1={FOCAL.x} y1={FOCAL.y} x2="70"  y2="52"  stroke="#41545E" strokeWidth="2.8" strokeLinecap="round" />
    <line x1={FOCAL.x} y1={FOCAL.y} x2="100" y2="42"  stroke="#41545E" strokeWidth="3.2" strokeLinecap="round" />
    <line x1={FOCAL.x} y1={FOCAL.y} x2="130" y2="52"  stroke="#41545E" strokeWidth="2.8" strokeLinecap="round" />
    <line x1={FOCAL.x} y1={FOCAL.y} x2="160" y2="68"  stroke="#41545E" strokeWidth="2.5" strokeLinecap="round" />

    {/* ── 4 Teal leaves (#4A7C7C) behind flower heads ── */}
    {renderLeaf(leafStyle, 24, 80, false, 3.6, 'dark')}
    {renderLeaf(leafStyle, 176, 80, true, 3.6, 'dark')}
    {renderLeaf(leafStyle, 52, 100, false, 2.8, 'medium')}
    {renderLeaf(leafStyle, 148, 100, true, 2.8, 'medium')}

    {/* ── 3 Red berry clusters filling gaps ── */}
    {renderBerryCluster(30, 60, false)}
    {renderBerryCluster(170, 60, true)}
    {renderBerryCluster(100, 85, false, '#E84040')}

    {/* ── BACK ROW: 2 small flowers (scale 0.8) ── */}
    <AnimatedFlower delay={0.06} cx={44} cy={72}>
      <g transform="translate(-6, 26) scale(0.8) rotate(-14 50 46)" opacity="0.76" filter="url(#sh5-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.14} cx={156} cy={72}>
      <g transform="translate(106, 26) scale(0.8) rotate(12 50 46)" opacity="0.76" filter="url(#sh5-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* ── MIDDLE ROW: 2 medium flowers (scale 0.95) ── */}
    <AnimatedFlower delay={0.26} cx={68} cy={56}>
      <g transform="translate(18, 10) scale(0.95) rotate(-8 50 46)" opacity="0.9" filter="url(#sh5-mid)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.36} cx={132} cy={56}>
      <g transform="translate(82, 10) scale(0.95) rotate(7 50 46)" opacity="0.9" filter="url(#sh5-mid)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* ── HERO CENTER: 1 large flower (scale 1.15), overlapping stems & wrap edge ── */}
    <AnimatedFlower delay={0.5} cx={100} cy={44}>
      <g transform="translate(50, -4) scale(1.15) rotate(-2 50 46)" filter="url(#sh5-front)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* ── Red ribbon bow at the neck ── */}
    <rect x={FOCAL.x - 24} y={NECK_Y - 5} width="48" height="10" rx="5"
      fill="#CC2244" stroke="#1E2024" strokeWidth="1" />
    {/* Left bow loop */}
    <path d={`M${FOCAL.x - 14} ${NECK_Y} Q${FOCAL.x - 38} ${NECK_Y - 24} ${FOCAL.x - 30} ${NECK_Y - 16} Q${FOCAL.x - 48} ${NECK_Y - 36} ${FOCAL.x - 14} ${NECK_Y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.9" />
    {/* Right bow loop */}
    <path d={`M${FOCAL.x + 14} ${NECK_Y} Q${FOCAL.x + 38} ${NECK_Y - 24} ${FOCAL.x + 30} ${NECK_Y - 16} Q${FOCAL.x + 48} ${NECK_Y - 36} ${FOCAL.x + 14} ${NECK_Y}Z`}
      fill="#E2365B" stroke="#1E2024" strokeWidth="0.9" />
    <circle cx={FOCAL.x} cy={NECK_Y} r="5.5" fill="#A11735" stroke="#1E2024" strokeWidth="0.7" />
    <SwayingRibbon x={FOCAL.x - 18} y={NECK_Y + 6} side="left" />
    <SwayingRibbon x={FOCAL.x + 18} y={NECK_Y + 6} side="right" />

    {/* Love tag */}
    <line x1={FOCAL.x + 16} y1={NECK_Y + 6} x2={FOCAL.x + 28} y2={NECK_Y + 22} stroke="#5A3A2A" strokeWidth="0.8" />
    <rect x={FOCAL.x + 20} y={NECK_Y + 22} width="22" height="14" rx="2" fill="#F0E8D8" stroke="#B89A72" strokeWidth="0.8" />
    <text x={FOCAL.x + 31} y={NECK_Y + 32} textAnchor="middle" fontSize="7" fill="#5A3A2A" fontFamily="serif" fontStyle="italic">Love</text>

    <FloatingPetalParticles color={customColor || c.petal} count={6} delay={1.05} />
  </>
);
