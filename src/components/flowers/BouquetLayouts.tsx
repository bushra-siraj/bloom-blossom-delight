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

/* ── 3-flower bouquet with kraft paper cone wrap ── */
export const BouquetSmall = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => (
  <g>
    <defs>
      <filter id="sh-sm-back"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#00000020" /></filter>
      <filter id="sh-sm-hero"><feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#00000030" /></filter>
    </defs>

    {/* === LAYER 0: Kraft paper cone wrapping (back) === */}
    <path d="M18 72 Q14 60 28 48 Q50 34 72 48 Q86 60 82 72 L90 124 Q84 136 68 138 Q50 140 32 138 Q16 136 10 124Z"
      fill="#D4B896" stroke="#B89A72" strokeWidth="1" />
    {/* Paper texture dots */}
    <path d="M18 72 Q14 60 28 48 Q50 34 72 48 Q86 60 82 72 L90 124 Q84 136 68 138 Q50 140 32 138 Q16 136 10 124Z"
      fill="#C8A880" opacity="0.3" />
    {[{x:25,y:80},{x:65,y:75},{x:40,y:100},{x:60,y:110},{x:30,y:115},{x:55,y:90},{x:70,y:95}].map((p,i) => (
      <circle key={`dot${i}`} cx={p.x} cy={p.y} r="0.8" fill="#B89A72" opacity="0.35" />
    ))}
    {/* Paper fold accent */}
    <path d="M22 66 Q50 46 78 66" stroke="#C0A478" strokeWidth="0.7" fill="none" opacity="0.5" />

    {/* === LAYER 1: Stems converging at bottom === */}
    <path d="M30 50 C36 68 44 90 50 120" stroke="#4A7A52" strokeWidth="1.8" fill="none" />
    <path d="M50 38 C50 62 50 86 50 120" stroke="#4A7A52" strokeWidth="2.2" fill="none" />
    <path d="M70 50 C64 68 56 90 50 120" stroke="#4A7A52" strokeWidth="1.8" fill="none" />

    {/* === LAYER 2: Leaves behind flowers === */}
    {renderLeaf(leafStyle, 12, 58, false, 1.8, 'dark')}
    {renderLeaf(leafStyle, 88, 58, true, 1.8, 'dark')}
    {renderLeaf(leafStyle, 22, 72, false, 1.4, 'medium')}
    {renderLeaf(leafStyle, 78, 72, true, 1.4, 'medium')}
    {renderLeaf(leafStyle, 34, 84, false, 1.0, 'light')}
    {renderLeaf(leafStyle, 66, 84, true, 1.0, 'light')}

    {/* Berry accents */}
    {renderBerryCluster(16, 48, false)}
    {renderBerryCluster(84, 48, true)}

    {/* === LAYER 3: Back side flowers at 72% === */}
    <AnimatedFlower delay={0.12} cx={30} cy={50}>
      <g transform="translate(-18, 6) scale(0.72) rotate(-13 50 46)" opacity="0.85" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>
    <AnimatedFlower delay={0.24} cx={70} cy={50}>
      <g transform="translate(18, 6) scale(0.72) rotate(11 50 46)" opacity="0.85" filter="url(#sh-sm-back)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    {/* === LAYER 4: Ribbon band + bow === */}
    <rect x="32" y="104" width="36" height="6" rx="3" fill="#CC3355" opacity="0.92" />
    <ellipse cx="50" cy="107" rx="9" ry="3.5" fill="#DD4466" opacity="0.85" />
    {/* Bow loops */}
    <path d="M38 106 Q28 94 32 98 Q24 86 38 106Z" fill="#DD4466" opacity="0.75" />
    <path d="M62 106 Q72 94 68 98 Q76 86 62 106Z" fill="#DD4466" opacity="0.75" />
    <circle cx="50" cy="107" r="2.5" fill="#AA2040" />
    <SwayingRibbon x={38} y={110} side="left" />
    <SwayingRibbon x={62} y={110} side="right" />

    {/* === LAYER 5: Hero flower front center === */}
    <AnimatedFlower delay={0.42} cx={50} cy={42}>
      <g transform="translate(0, -4) scale(0.92) rotate(-2 50 46)" filter="url(#sh-sm-hero)">
        <FlowerHead type={type} c={c} customColor={customColor} />
      </g>
    </AnimatedFlower>

    <FloatingPetalParticles color={customColor || c.petal} count={4} delay={0.9} />
  </g>
);

/* ── 5-flower tissue wrap bouquet (reference-style) ── */
export const BouquetLarge = ({ type, c, leafStyle, customColor }: {
  type: FlowerType; c: C; leafStyle: LeafStyle; customColor?: string;
}) => {
  const rotations = [-14, 12, -9, 13, -3];

  return (
    <g>
      <defs>
        <filter id="sh-lg-back"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#00000018" /></filter>
        <filter id="sh-lg-mid"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#00000025" /></filter>
        <filter id="sh-lg-hero"><feDropShadow dx="0" dy="4" stdDeviation="4.5" floodColor="#00000035" /></filter>
      </defs>

      {/* === LAYER 0: Kraft paper cone (back, like reference image) === */}
      <path d="M2 82 Q-4 66 16 50 Q38 30 62 30 Q84 30 104 50 Q118 66 112 82 L118 130 Q110 144 88 148 Q58 152 28 148 Q6 144 -4 130Z"
        fill="#D4B896" stroke="#B89A72" strokeWidth="1.2" />
      {/* Paper grain texture */}
      <path d="M2 82 Q-4 66 16 50 Q38 30 62 30 Q84 30 104 50 Q118 66 112 82 L118 130 Q110 144 88 148 Q58 152 28 148 Q6 144 -4 130Z"
        fill="#C8A880" opacity="0.25" />
      {[{x:20,y:75},{x:60,y:68},{x:90,y:78},{x:35,y:100},{x:70,y:105},{x:50,y:118},{x:25,y:120},{x:80,y:115},{x:45,y:88},{x:65,y:92}].map((p,i) => (
        <circle key={`dot${i}`} cx={p.x} cy={p.y} r="0.9" fill="#B89A72" opacity="0.3" />
      ))}
      {/* Paper fold lines */}
      <path d="M10 74 Q55 42 104 74" stroke="#C0A478" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M6 82 Q55 54 108 82" stroke="#C0A478" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* === LAYER 1: S-curved stems converging at 57,130 === */}
      <path d="M16 50 C24 68 40 92 57 130" stroke="#4A7A52" strokeWidth="1.5" fill="none" />
      <path d="M32 40 C38 62 46 88 57 130" stroke="#4A7A52" strokeWidth="1.8" fill="none" />
      <path d="M57 32 C57 60 57 92 57 130" stroke="#4A7A52" strokeWidth="2.2" fill="none" />
      <path d="M78 40 C72 62 64 88 57 130" stroke="#4A7A52" strokeWidth="1.8" fill="none" />
      <path d="M96 50 C88 68 72 92 57 130" stroke="#4A7A52" strokeWidth="1.5" fill="none" />

      {/* === LAYER 2: Dense leaf backdrop (dark teal like reference) === */}
      {renderLeaf(leafStyle, 2, 54, false, 2.2, 'dark')}
      {renderLeaf(leafStyle, 110, 54, true, 2.2, 'dark')}
      {renderLeaf(leafStyle, 14, 68, false, 1.8, 'dark')}
      {renderLeaf(leafStyle, 98, 68, true, 1.8, 'dark')}
      {renderLeaf(leafStyle, 24, 82, false, 1.4, 'medium')}
      {renderLeaf(leafStyle, 88, 82, true, 1.4, 'medium')}
      {renderLeaf(leafStyle, 36, 92, false, 1.0, 'light')}
      {renderLeaf(leafStyle, 76, 92, true, 1.0, 'light')}
      {/* Extra top leaves */}
      {renderLeaf(leafStyle, 30, 44, false, 1.6, 'dark')}
      {renderLeaf(leafStyle, 82, 44, true, 1.6, 'dark')}

      {/* Berry/bud clusters */}
      {renderBerryCluster(8, 42, false)}
      {renderBerryCluster(104, 42, true)}
      {renderBerryCluster(20, 60, false, '#E8A060')}
      {renderBerryCluster(92, 60, true, '#E8A060')}

      {/* === LAYER 3: Back row — 2 flowers at 58% === */}
      <AnimatedFlower delay={0.08} cx={26} cy={56}>
        <g transform={`translate(-28, 14) scale(0.58) rotate(${rotations[0]} 50 46)`} opacity="0.78" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.18} cx={86} cy={56}>
        <g transform={`translate(28, 14) scale(0.58) rotate(${rotations[1]} 50 46)`} opacity="0.78" filter="url(#sh-lg-back)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === LAYER 4: Middle row — 2 flowers at 78% === */}
      <AnimatedFlower delay={0.3} cx={36} cy={46}>
        <g transform={`translate(-16, 2) scale(0.78) rotate(${rotations[2]} 50 46)`} opacity="0.92" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>
      <AnimatedFlower delay={0.42} cx={74} cy={46}>
        <g transform={`translate(16, 2) scale(0.78) rotate(${rotations[3]} 50 46)`} opacity="0.92" filter="url(#sh-lg-mid)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      {/* === LAYER 5: Ribbon band + bow === */}
      <rect x="28" y="116" width="58" height="7" rx="3.5" fill="#CC3355" opacity="0.92" />
      {/* Bow loops */}
      <path d="M40 118 Q26 104 32 108 Q20 92 40 118Z" fill="#DD4466" opacity="0.75" />
      <path d="M74 118 Q88 104 82 108 Q94 92 74 118Z" fill="#DD4466" opacity="0.75" />
      <ellipse cx="57" cy="119" rx="12" ry="4.5" fill="#DD4466" opacity="0.85" />
      <circle cx="57" cy="119" r="3" fill="#AA2040" />
      <SwayingRibbon x={36} y={122} side="left" />
      <SwayingRibbon x={78} y={122} side="right" />

      {/* === LAYER 6: Hero flower — front center, largest === */}
      <AnimatedFlower delay={0.58} cx={57} cy={36}>
        <g transform={`translate(7, -10) scale(0.96) rotate(${rotations[4]} 50 46)`} filter="url(#sh-lg-hero)">
          <FlowerHead type={type} c={c} customColor={customColor} />
        </g>
      </AnimatedFlower>

      <FloatingPetalParticles color={customColor || c.petal} count={6} delay={1.1} />
    </g>
  );
};
