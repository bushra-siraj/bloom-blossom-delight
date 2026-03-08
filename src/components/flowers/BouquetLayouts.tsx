import type { FlowerType, LeafStyle } from '@/types/bloom';
import { FlowerHead } from './FlowerHead';
import { renderLeaf, renderBerryCluster } from './LeafSVG';
import { AnimatedFlower, FloatingPetalParticles, SwayingRibbon } from './Animations';
import { colorMap } from './colorMap';

type C = typeof colorMap.rose;

/* ══════════════════════════════════════════════════════════════
   SINGLE FLOWER — Clean centered bloom, long stem, 2 symmetrical leaves
   ══════════════════════════════════════════════════════════════ */
export const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* Long straight stem */}
    <path d="M50 62 Q48 80 49 100 Q50 112 50 125"
      stroke="#41545E" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Left leaf — symmetrical, angled out */}
    <g transform="translate(46, 82) rotate(-30)">
      <path d="M0 0 Q-8 -6 -12 -18 Q-10 -26 -4 -28 Q2 -26 4 -16 Q4 -6 0 0Z"
        fill="#5A8A9A" stroke="#2A3A40" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="0" y1="-2" x2="-3" y2="-22" stroke="#3A6070" strokeWidth="0.8" opacity="0.6" />
      <line x1="-1" y1="-8" x2="-8" y2="-14" stroke="#3A6070" strokeWidth="0.4" opacity="0.4" />
      <line x1="-1" y1="-14" x2="-6" y2="-22" stroke="#3A6070" strokeWidth="0.4" opacity="0.4" />
    </g>

    {/* Right leaf — symmetrical, angled out */}
    <g transform="translate(54, 95) rotate(25) scale(-1,1)">
      <path d="M0 0 Q-8 -6 -12 -18 Q-10 -26 -4 -28 Q2 -26 4 -16 Q4 -6 0 0Z"
        fill="#6A9AAA" stroke="#2A3A40" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="0" y1="-2" x2="-3" y2="-22" stroke="#3A6070" strokeWidth="0.8" opacity="0.6" />
      <line x1="-1" y1="-8" x2="-8" y2="-14" stroke="#3A6070" strokeWidth="0.4" opacity="0.4" />
      <line x1="-1" y1="-14" x2="-6" y2="-22" stroke="#3A6070" strokeWidth="0.4" opacity="0.4" />
    </g>

    {/* The bloom */}
    <AnimatedFlower delay={0.15} cx={50} cy={46}>
      <FlowerHead type={type} c={c} customColor={customColor} />
    </AnimatedFlower>

    <FloatingPetalParticles color={customColor || c.petal} count={3} delay={1} />
  </g>
);

/* ══════════════════════════════════════════════════════════════
   3-FLOWER BOUQUET — Ribbon Tie style
   Stems converge at a single point, tied with a prominent red ribbon bow
   ══════════════════════════════════════════════════════════════ */
export const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    <defs>
      <filter id="sh-sm-back"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#00000025" /></filter>
      <filter id="sh-sm-hero"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#00000030" /></filter>
    </defs>

    {/* === STEMS — all converge to tie point at 50,112 === */}
    <path d="M30 50 C34 68 42 90 50 112" stroke="#41545E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 36 C50 60 50 85 50 112" stroke="#41545E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    <path d="M70 50 C66 68 58 90 50 112" stroke="#41545E" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Stems continue below tie */}
    <path d="M50 112 Q44 126 38 140" stroke="#41545E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M50 112 Q50 126 50 140" stroke="#41545E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 112 Q56 126 62 140" stroke="#41545E" strokeWidth="1.8" fill="none" strokeLinecap="round" />

    {/* === TEAL LEAVES — behind flowers, visible veins, black outlines === */}
    {renderLeaf(leafStyle, 12, 54, false, 2.2, 'dark')}
    {renderLeaf(leafStyle, 88, 54, true, 2.2, 'dark')}
    {renderLeaf(leafStyle, 20, 68, false, 1.8, 'medium')}
    {renderLeaf(leafStyle, 80, 68, true, 1.8, 'medium')}
    {renderLeaf(leafStyle, 32, 78, false, 1.4, 'light')}
    {renderLeaf(leafStyle, 68, 78, true, 1.4, 'light')}
    {/* Top peeking leaves */}
    {renderLeaf(leafStyle, 22, 40, false, 1.6, 'dark')}
    {renderLeaf(leafStyle, 78, 40, true, 1.6, 'dark')}

    {/* === RED BERRY CLUSTERS — between blooms === */}
    {renderBerryCluster(14, 42, false)}
    {renderBerryCluster(86, 42, true)}
    {renderBerryCluster(26, 60, false, '#E8A060')}
    {renderBerryCluster(74, 60, true, '#E8A060')}

    {/* === BACK ROW — 2 side flowers, smaller & slightly darker === */}
    <AnimatedFlower delay={0.1} cx={28} cy={50}>
      <g transform="translate(-22, 8) scale(0.62) rotate(-12 50 46)" opacity="0.8" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.2} cx={72} cy={50}>
      <g transform="translate(22, 8) scale(0.62) rotate(10 50 46)" opacity="0.8" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* === FRONT ROW — hero center flower, largest & brightest === */}
    <AnimatedFlower delay={0.4} cx={50} cy={38}>
      <g transform="translate(0, -6) scale(0.88) rotate(-2 50 46)" filter="url(#sh-sm-hero)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* === RIBBON BOW — prominent red, at the tie point === */}
    {/* Ribbon band */}
    <rect x="36" y="108" width="28" height="8" rx="4" fill="#CC2244" stroke="#8A1430" strokeWidth="0.8" />
    {/* Left bow loop */}
    <path d="M42 112 Q28 96 34 102 Q22 88 42 112Z" fill="#DD3355" stroke="#8A1430" strokeWidth="0.7" />
    {/* Right bow loop */}
    <path d="M58 112 Q72 96 66 102 Q78 88 58 112Z" fill="#DD3355" stroke="#8A1430" strokeWidth="0.7" />
    {/* Bow center knot */}
    <ellipse cx="50" cy="112" rx="8" ry="4" fill="#DD3355" stroke="#8A1430" strokeWidth="0.6" />
    <circle cx="50" cy="112" r="3" fill="#AA1838" stroke="#8A1430" strokeWidth="0.5" />
    {/* Swaying ribbon tails */}
    <SwayingRibbon x={38} y={116} side="left" />
    <SwayingRibbon x={62} y={116} side="right" />

    <FloatingPetalParticles color={customColor || c.petal} count={4} delay={0.9} />
  </g>
);

/* ══════════════════════════════════════════════════════════════
   5-FLOWER BOUQUET — Full Diamond Kraft Paper Wrap
   Wide flared polygon cradling the flowers, matching valentine reference
   ══════════════════════════════════════════════════════════════ */
export const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => {
  return (
    <g>
      <defs>
        <filter id="sh-lg-back"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#00000020" /></filter>
        <filter id="sh-lg-mid"><feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#00000028" /></filter>
        <filter id="sh-lg-hero"><feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#00000035" /></filter>
      </defs>

      {/* === KRAFT PAPER DIAMOND WRAP — wide flared polygon === */}
      <path d="M-2 82 Q-8 60 16 42 Q38 22 57 18 Q76 22 98 42 Q122 60 116 82 L122 138 Q114 154 92 158 Q57 162 22 158 Q0 154 -8 138Z"
        fill="#D4B896" stroke="#2A1E14" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Paper texture overlay */}
      <path d="M-2 82 Q-8 60 16 42 Q38 22 57 18 Q76 22 98 42 Q122 60 116 82 L122 138 Q114 154 92 158 Q57 162 22 158 Q0 154 -8 138Z"
        fill="#C8A880" opacity="0.2" />
      {/* Speckle dots for paper texture */}
      {[{x:20,y:80},{x:56,y:72},{x:90,y:82},{x:34,y:104},{x:74,y:110},{x:48,y:122},{x:24,y:126},{x:84,y:120},{x:42,y:92},{x:70,y:96},{x:38,y:138},{x:80,y:134},{x:58,y:100},{x:16,y:110},{x:100,y:106}].map((p,i) => (
        <circle key={`dot${i}`} cx={p.x} cy={p.y} r="1" fill="#B89A72" opacity="0.3" />
      ))}
      {/* Paper fold accent lines */}
      <path d="M6 76 Q57 36 108 76" stroke="#C0A478" strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M0 82 Q57 46 114 82" stroke="#C0A478" strokeWidth="0.5" fill="none" opacity="0.25" />

      {/* === STEMS — S-curved, converging at 57,140 === */}
      <path d="M16 48 C24 68 40 98 57 140" stroke="#41545E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M32 38 C38 62 46 94 57 140" stroke="#41545E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M57 26 C57 58 57 98 57 140" stroke="#41545E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M82 38 C76 62 68 94 57 140" stroke="#41545E" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M98 48 C90 68 74 98 57 140" stroke="#41545E" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* === TEAL LEAVES — dense backdrop behind flowers, black outlines === */}
      {renderLeaf(leafStyle, 0, 56, false, 2.6, 'dark')}
      {renderLeaf(leafStyle, 114, 56, true, 2.6, 'dark')}
      {renderLeaf(leafStyle, 10, 70, false, 2.2, 'dark')}
      {renderLeaf(leafStyle, 104, 70, true, 2.2, 'dark')}
      {renderLeaf(leafStyle, 22, 84, false, 1.8, 'medium')}
      {renderLeaf(leafStyle, 92, 84, true, 1.8, 'medium')}
      {renderLeaf(leafStyle, 34, 94, false, 1.4, 'light')}
      {renderLeaf(leafStyle, 80, 94, true, 1.4, 'light')}
      {/* Top leaves poking above wrap */}
      {renderLeaf(leafStyle, 28, 38, false, 2.0, 'dark')}
      {renderLeaf(leafStyle, 86, 38, true, 2.0, 'dark')}
      {renderLeaf(leafStyle, 14, 46, false, 1.6, 'medium')}
      {renderLeaf(leafStyle, 100, 46, true, 1.6, 'medium')}

      {/* === RED BERRY CLUSTERS — fill gaps between flowers === */}
      {renderBerryCluster(6, 40, false)}
      {renderBerryCluster(108, 40, true)}
      {renderBerryCluster(20, 58, false, '#E8A060')}
      {renderBerryCluster(94, 58, true, '#E8A060')}
      {renderBerryCluster(38, 34, false, '#E84040')}
      {renderBerryCluster(76, 34, true, '#E84040')}
      {renderBerryCluster(50, 58, false, '#E84040')}

      {/* === BACK ROW — 2 flowers at 50% scale, smaller & slightly darker === */}
      <AnimatedFlower delay={0.08} cx={22} cy={52}>
        <g transform="translate(-32, 14) scale(0.5) rotate(-15 50 46)" opacity="0.72" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.16} cx={92} cy={52}>
        <g transform="translate(32, 14) scale(0.5) rotate(12 50 46)" opacity="0.72" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === MIDDLE ROW — 2 flowers at 72% scale === */}
      <AnimatedFlower delay={0.28} cx={36} cy={42}>
        <g transform="translate(-18, 2) scale(0.72) rotate(-10 50 46)" opacity="0.88" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.38} cx={78} cy={42}>
        <g transform="translate(18, 2) scale(0.72) rotate(8 50 46)" opacity="0.88" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === RIBBON BOW — prominent red, at wrap tie point === */}
      <rect x="28" y="124" width="58" height="9" rx="4.5" fill="#CC2244" stroke="#2A1018" strokeWidth="0.9" />
      {/* Left bow loop */}
      <path d="M40 128 Q24 110 30 116 Q18 98 40 128Z" fill="#DD3355" stroke="#2A1018" strokeWidth="0.8" />
      {/* Right bow loop */}
      <path d="M74 128 Q90 110 84 116 Q96 98 74 128Z" fill="#DD3355" stroke="#2A1018" strokeWidth="0.8" />
      {/* Bow center */}
      <ellipse cx="57" cy="128" rx="12" ry="5" fill="#DD3355" stroke="#2A1018" strokeWidth="0.6" />
      <circle cx="57" cy="128" r="4" fill="#AA1838" stroke="#2A1018" strokeWidth="0.5" />
      {/* Swaying ribbon tails */}
      <SwayingRibbon x={36} y={132} side="left" />
      <SwayingRibbon x={78} y={132} side="right" />

      {/* === HERO FLOWER — front center, largest & brightest === */}
      <AnimatedFlower delay={0.5} cx={57} cy={32}>
        <g transform="translate(7, -12) scale(0.92) rotate(-3 50 46)" filter="url(#sh-lg-hero)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === "Love" TAG hanging from ribbon (like valentine reference) === */}
      <line x1="68" y1="132" x2="74" y2="144" stroke="#5A3A2A" strokeWidth="0.7" />
      <rect x="66" y="144" width="20" height="12" rx="2" fill="#F0E8D8" stroke="#B89A72" strokeWidth="0.7" />
      <text x="76" y="153" textAnchor="middle" fontSize="6" fill="#5A3A2A" fontFamily="serif" fontStyle="italic">Love</text>

      <FloatingPetalParticles color={customColor || c.petal} count={6} delay={1.1} />
    </g>
  );
};
