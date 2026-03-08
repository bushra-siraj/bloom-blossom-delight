import type { FlowerType, LeafStyle } from '@/types/bloom';
import { FlowerHead } from './FlowerHead';
import { renderLeaf, renderBerryCluster } from './LeafSVG';
import { AnimatedFlower, FloatingPetalParticles, SwayingRibbon } from './Animations';
import { colorMap } from './colorMap';

type C = typeof colorMap.rose;

/* ── Single flower on a stem ── */
export const BouquetSingle = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    {/* Stem with slight curve */}
    <path d="M50 62 Q47 78 49 95 Q50 108 50 120" stroke="#4A7A52" strokeWidth="2.8" fill="none" strokeLinecap="round" />
    {/* Leaves on stem */}
    {renderLeaf(leafStyle, 47, 78, false, 1.2, 'dark')}
    {renderLeaf(leafStyle, 53, 92, true, 1.1, 'medium')}
    {/* Bloom with elastic spring */}
    <AnimatedFlower delay={0.15} cx={50} cy={46}>
      <FlowerHead type={type} c={c} customColor={customColor} />
    </AnimatedFlower>
    <FloatingPetalParticles color={customColor || c.petal} count={3} delay={1} />
  </g>
);

/* ── 3-flower bouquet — kraft paper cone with ribbon (valentine reference style) ── */
export const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    <defs>
      <filter id="sh-sm-back"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#00000020" /></filter>
      <filter id="sh-sm-hero"><feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#00000030" /></filter>
    </defs>

    {/* === LAYER 0: Kraft paper diamond cone (valentine reference) === */}
    <path d="M14 74 Q8 56 26 40 Q50 24 74 40 Q92 56 86 74 L92 126 Q86 140 68 142 Q50 144 32 142 Q14 140 8 126Z"
      fill="#D4B896" stroke="#B89A72" strokeWidth="1.2" strokeLinejoin="round" />
    {/* Paper texture - speckle dots */}
    <path d="M14 74 Q8 56 26 40 Q50 24 74 40 Q92 56 86 74 L92 126 Q86 140 68 142 Q50 144 32 142 Q14 140 8 126Z"
      fill="#C8A880" opacity="0.25" />
    {[{x:22,y:82},{x:60,y:76},{x:38,y:98},{x:68,y:108},{x:28,y:116},{x:52,y:90},{x:74,y:92},{x:40,y:120},{x:62,y:124}].map((p,i) => (
      <circle key={`dot${i}`} cx={p.x} cy={p.y} r="0.9" fill="#B89A72" opacity="0.3" />
    ))}
    {/* Paper fold accent lines */}
    <path d="M18 68 Q50 38 82 68" stroke="#C0A478" strokeWidth="0.7" fill="none" opacity="0.4" />
    <path d="M14 74 Q50 48 86 74" stroke="#C0A478" strokeWidth="0.5" fill="none" opacity="0.3" />

    {/* === LAYER 1: Stems converging at bottom === */}
    <path d="M30 48 C36 66 44 88 50 122" stroke="#4A7A52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M50 36 C50 58 50 84 50 122" stroke="#4A7A52" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M70 48 C64 66 56 88 50 122" stroke="#4A7A52" strokeWidth="1.8" fill="none" strokeLinecap="round" />

    {/* === LAYER 2: Teal leaves behind flowers (reference style) === */}
    {renderLeaf(leafStyle, 8, 56, false, 2.0, 'dark')}
    {renderLeaf(leafStyle, 92, 56, true, 2.0, 'dark')}
    {renderLeaf(leafStyle, 18, 70, false, 1.6, 'medium')}
    {renderLeaf(leafStyle, 82, 70, true, 1.6, 'medium')}
    {renderLeaf(leafStyle, 30, 82, false, 1.2, 'light')}
    {renderLeaf(leafStyle, 70, 82, true, 1.2, 'light')}
    {/* Extra top leaves poking out */}
    {renderLeaf(leafStyle, 20, 42, false, 1.4, 'dark')}
    {renderLeaf(leafStyle, 80, 42, true, 1.4, 'dark')}

    {/* === LAYER 2.5: Berry accents (red like reference) === */}
    {renderBerryCluster(12, 44, false)}
    {renderBerryCluster(88, 44, true)}

    {/* === LAYER 3: Back side flowers at 68% === */}
    <AnimatedFlower delay={0.1} cx={28} cy={48}>
      <g transform="translate(-20, 6) scale(0.68) rotate(-15 50 46)" opacity="0.82" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.22} cx={72} cy={48}>
      <g transform="translate(20, 6) scale(0.68) rotate(12 50 46)" opacity="0.82" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* === LAYER 4: Ribbon band + bow (red like reference) === */}
    <rect x="30" y="106" width="40" height="7" rx="3.5" fill="#CC2244" opacity="0.92" />
    {/* Bow loops */}
    <path d="M38 108 Q26 94 30 100 Q20 84 38 108Z" fill="#DD3355" opacity="0.8" />
    <path d="M62 108 Q74 94 70 100 Q80 84 62 108Z" fill="#DD3355" opacity="0.8" />
    <ellipse cx="50" cy="109" rx="10" ry="4" fill="#DD3355" opacity="0.88" />
    <circle cx="50" cy="109" r="3" fill="#AA1838" />
    <SwayingRibbon x={36} y={112} side="left" />
    <SwayingRibbon x={64} y={112} side="right" />

    {/* === LAYER 5: Hero flower — front center === */}
    <AnimatedFlower delay={0.4} cx={50} cy={40}>
      <g transform="translate(0, -4) scale(0.9) rotate(-2 50 46)" filter="url(#sh-sm-hero)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    <FloatingPetalParticles color={customColor || c.petal} count={4} delay={0.9} />
  </g>
);

/* ── 5-flower tissue/kraft wrap bouquet (full reference style) ── */
export const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => {
  const rotations = [-14, 13, -10, 12, -3];

  return (
    <g>
      <defs>
        <filter id="sh-lg-back"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#00000018" /></filter>
        <filter id="sh-lg-mid"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#00000025" /></filter>
        <filter id="sh-lg-hero"><feDropShadow dx="0" dy="4" stdDeviation="4.5" floodColor="#00000035" /></filter>
      </defs>

      {/* === LAYER 0: Kraft paper diamond wrap (valentine reference) === */}
      <path d="M0 84 Q-6 64 14 46 Q36 26 57 22 Q78 26 100 46 Q120 64 114 84 L120 134 Q112 150 90 154 Q57 158 24 154 Q2 150 -6 134Z"
        fill="#D4B896" stroke="#B89A72" strokeWidth="1.3" strokeLinejoin="round" />
      {/* Paper grain texture */}
      <path d="M0 84 Q-6 64 14 46 Q36 26 57 22 Q78 26 100 46 Q120 64 114 84 L120 134 Q112 150 90 154 Q57 158 24 154 Q2 150 -6 134Z"
        fill="#C8A880" opacity="0.22" />
      {[{x:18,y:78},{x:58,y:70},{x:92,y:80},{x:32,y:102},{x:72,y:108},{x:48,y:120},{x:22,y:124},{x:82,y:118},{x:42,y:90},{x:68,y:94},{x:36,y:136},{x:78,y:132}].map((p,i) => (
        <circle key={`dot${i}`} cx={p.x} cy={p.y} r="1" fill="#B89A72" opacity="0.28" />
      ))}
      {/* Fold lines */}
      <path d="M8 76 Q57 38 106 76" stroke="#C0A478" strokeWidth="0.8" fill="none" opacity="0.35" />
      <path d="M2 84 Q57 50 112 84" stroke="#C0A478" strokeWidth="0.5" fill="none" opacity="0.25" />

      {/* === LAYER 1: S-curved stems converging at 57,134 === */}
      <path d="M14 48 C22 66 38 94 57 134" stroke="#4A7A52" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M30 38 C36 60 44 90 57 134" stroke="#4A7A52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M57 28 C57 58 57 94 57 134" stroke="#4A7A52" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M80 38 C74 60 66 90 57 134" stroke="#4A7A52" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M98 48 C90 66 74 94 57 134" stroke="#4A7A52" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* === LAYER 2: Dense teal leaf backdrop (reference style) === */}
      {renderLeaf(leafStyle, -2, 56, false, 2.4, 'dark')}
      {renderLeaf(leafStyle, 116, 56, true, 2.4, 'dark')}
      {renderLeaf(leafStyle, 10, 70, false, 2.0, 'dark')}
      {renderLeaf(leafStyle, 104, 70, true, 2.0, 'dark')}
      {renderLeaf(leafStyle, 22, 84, false, 1.6, 'medium')}
      {renderLeaf(leafStyle, 92, 84, true, 1.6, 'medium')}
      {renderLeaf(leafStyle, 34, 94, false, 1.2, 'light')}
      {renderLeaf(leafStyle, 80, 94, true, 1.2, 'light')}
      {/* Extra top leaves poking above wrap */}
      {renderLeaf(leafStyle, 28, 40, false, 1.8, 'dark')}
      {renderLeaf(leafStyle, 86, 40, true, 1.8, 'dark')}
      {renderLeaf(leafStyle, 16, 48, false, 1.4, 'medium')}
      {renderLeaf(leafStyle, 98, 48, true, 1.4, 'medium')}

      {/* === LAYER 2.5: Berry/bud clusters (red + orange like reference) === */}
      {renderBerryCluster(4, 40, false)}
      {renderBerryCluster(110, 40, true)}
      {renderBerryCluster(18, 58, false, '#E8A060')}
      {renderBerryCluster(96, 58, true, '#E8A060')}
      {renderBerryCluster(36, 36, false, '#E84040')}
      {renderBerryCluster(78, 36, true, '#E84040')}

      {/* === LAYER 3: Back row — 2 flowers at 55% === */}
      <AnimatedFlower delay={0.08} cx={22} cy={54}>
        <g transform={`translate(-30, 14) scale(0.55) rotate(${rotations[0]} 50 46)`} opacity="0.75" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.18} cx={92} cy={54}>
        <g transform={`translate(30, 14) scale(0.55) rotate(${rotations[1]} 50 46)`} opacity="0.75" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === LAYER 4: Middle row — 2 flowers at 76% === */}
      <AnimatedFlower delay={0.28} cx={34} cy={44}>
        <g transform={`translate(-18, 2) scale(0.76) rotate(${rotations[2]} 50 46)`} opacity="0.9" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.4} cx={80} cy={44}>
        <g transform={`translate(18, 2) scale(0.76) rotate(${rotations[3]} 50 46)`} opacity="0.9" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === LAYER 5: Ribbon band + bow (red like valentine reference) === */}
      <rect x="26" y="120" width="62" height="8" rx="4" fill="#CC2244" opacity="0.92" />
      {/* Bow loops */}
      <path d="M38 122 Q22 106 28 112 Q16 94 38 122Z" fill="#DD3355" opacity="0.8" />
      <path d="M76 122 Q92 106 86 112 Q98 94 76 122Z" fill="#DD3355" opacity="0.8" />
      <ellipse cx="57" cy="123" rx="13" ry="5" fill="#DD3355" opacity="0.88" />
      <circle cx="57" cy="123" r="3.5" fill="#AA1838" />
      <SwayingRibbon x={34} y={126} side="left" />
      <SwayingRibbon x={80} y={126} side="right" />

      {/* === LAYER 6: Hero flower — front center, largest === */}
      <AnimatedFlower delay={0.55} cx={57} cy={34}>
        <g transform={`translate(7, -10) scale(0.95) rotate(${rotations[4]} 50 46)`} filter="url(#sh-lg-hero)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      <FloatingPetalParticles color={customColor || c.petal} count={6} delay={1.1} />
    </g>
  );
};
