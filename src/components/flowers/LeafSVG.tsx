import type { LeafStyle } from '@/types/bloom';

/* ═══════════════════════════════════════════════════════
   4 distinct, soft, illustrated leaf styles.
   Each renders at origin — caller applies translate/rotate/scale.
   ═══════════════════════════════════════════════════════ */

const TEAL_DARK = '#3A6A6A';
const TEAL_MED  = '#4A7C7C';
const TEAL_LIGHT = '#6A9E9E';
const OUTLINE   = '#1E2024';

type ColorVariant = 'dark' | 'medium' | 'light';
const palette = (v: ColorVariant) =>
  v === 'dark' ? { fill: TEAL_DARK, vein: '#2A5252' }
  : v === 'light' ? { fill: TEAL_LIGHT, vein: '#4A7878' }
  : { fill: TEAL_MED, vein: '#365E6A' };

/* ── CLASSIC: soft teardrop leaf with a central vein ── */
function classicLeaf(x: number, y: number, angle: number, scale: number, cv: ColorVariant) {
  const c = palette(cv);
  return (
    <g transform={`translate(${x},${y}) rotate(${angle}) scale(${scale})`}>
      <path d="M0 0 Q-8 -14 -3 -26 Q0 -30 3 -26 Q8 -14 0 0Z"
        fill={c.fill} stroke={OUTLINE} strokeWidth="0.7" strokeLinejoin="round" />
      <path d="M0 -2 Q-0.5 -14 0 -26" stroke={c.vein} strokeWidth="0.5" fill="none" opacity="0.6" />
      {/* small side veins */}
      <line x1="0" y1="-8" x2="-4" y2="-12" stroke={c.vein} strokeWidth="0.35" opacity="0.4" />
      <line x1="0" y1="-14" x2="3.5" y2="-18" stroke={c.vein} strokeWidth="0.35" opacity="0.4" />
      <line x1="0" y1="-20" x2="-2.5" y2="-23" stroke={c.vein} strokeWidth="0.3" opacity="0.3" />
    </g>
  );
}

/* ── ROUND: chubby oval leaf, like a eucalyptus/succulent feel ── */
function roundLeaf(x: number, y: number, angle: number, scale: number, cv: ColorVariant) {
  const c = palette(cv);
  return (
    <g transform={`translate(${x},${y}) rotate(${angle}) scale(${scale})`}>
      <ellipse cx="0" cy="-12" rx="7" ry="10" fill={c.fill} stroke={OUTLINE} strokeWidth="0.7" />
      {/* highlight */}
      <ellipse cx="-2" cy="-14" rx="3" ry="5" fill="white" opacity="0.1" />
      {/* central vein */}
      <path d="M0 -2 Q0 -12 0 -22" stroke={c.vein} strokeWidth="0.5" fill="none" opacity="0.5" />
      {/* cute stem nub */}
      <line x1="0" y1="0" x2="0" y2="-2" stroke={c.vein} strokeWidth="1" strokeLinecap="round" />
    </g>
  );
}

/* ── POINTED: sharp elegant leaf like a willow/fern frond ── */
function pointedLeaf(x: number, y: number, angle: number, scale: number, cv: ColorVariant) {
  const c = palette(cv);
  return (
    <g transform={`translate(${x},${y}) rotate(${angle}) scale(${scale})`}>
      <path d="M0 0 Q-5 -10 -2 -28 L0 -32 L2 -28 Q5 -10 0 0Z"
        fill={c.fill} stroke={OUTLINE} strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M0 -1 Q0 -16 0 -31" stroke={c.vein} strokeWidth="0.45" fill="none" opacity="0.5" />
      {/* diagonal veins */}
      <line x1="0" y1="-6" x2="-3.5" y2="-10" stroke={c.vein} strokeWidth="0.3" opacity="0.4" />
      <line x1="0" y1="-12" x2="3" y2="-16" stroke={c.vein} strokeWidth="0.3" opacity="0.4" />
      <line x1="0" y1="-18" x2="-2.5" y2="-22" stroke={c.vein} strokeWidth="0.25" opacity="0.35" />
      <line x1="0" y1="-24" x2="2" y2="-27" stroke={c.vein} strokeWidth="0.25" opacity="0.3" />
    </g>
  );
}

/* ── Render a leaf by style ── */
export function renderStyledLeaf(
  style: LeafStyle,
  x: number, y: number, angle: number,
  scale = 1.2, cv: ColorVariant = 'medium'
) {
  if (style === 'none') return null;
  switch (style) {
    case 'classic': return classicLeaf(x, y, angle, scale, cv);
    case 'round':   return roundLeaf(x, y, angle, scale, cv);
    case 'pointed': return pointedLeaf(x, y, angle, scale, cv);
    default:        return classicLeaf(x, y, angle, scale, cv);
  }
}

/* ── Leaf preview for selection UI (small standalone SVG) ── */
export function LeafPreview({ style, size = 40 }: { style: LeafStyle; size?: number }) {
  if (style === 'none') {
    return (
      <svg width={size} height={size} viewBox="-10 -34 20 38">
        <line x1="-6" y1="-6" x2="6" y2="6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="-6" x2="-6" y2="6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="-10 -34 20 38" style={{ overflow: 'visible' }}>
      {renderStyledLeaf(style, 0, 0, 0, 1, 'medium')}
    </svg>
  );
}

/* ── Legacy helpers for bouquet gap-filling ── */
export function renderLeafBranch(
  x: number, y: number, angle: number, scale = 1,
  colorVariant: ColorVariant = 'medium',
  style: LeafStyle = 'classic'
) {
  return renderStyledLeaf(style, x, y, angle, scale, colorVariant);
}

export function renderLeaf(
  leafStyle: string,
  x: number, y: number, flipX: boolean,
  scale = 1, colorVariant: ColorVariant = 'medium'
) {
  const angle = flipX ? 30 : -30;
  const ls = (leafStyle as LeafStyle) || 'classic';
  return renderStyledLeaf(ls, x, y, angle, scale * 0.9, colorVariant);
}

/** Berry cluster — 3-4 berries on branching stems */
export function renderBerryCluster(x: number, y: number, flipX: boolean, color = '#E84040') {
  const dir = flipX ? -1 : 1;
  return (
    <g>
      <path d={`M${x} ${y + 10} Q${x + dir * 3} ${y + 4} ${x + dir * 2} ${y}`}
        stroke="#2A1E14" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <line x1={x + dir * 1} y1={y + 3} x2={x + dir * 5} y2={y - 2} stroke="#2A1E14" strokeWidth="0.5" />
      <line x1={x + dir * 2} y1={y} x2={x - dir * 1} y2={y - 5} stroke="#2A1E14" strokeWidth="0.5" />
      <circle cx={x + dir * 2} cy={y} r="2" fill={color} stroke={OUTLINE} strokeWidth="0.6" />
      <circle cx={x + dir * 5} cy={y - 2} r="2.2" fill={color} stroke={OUTLINE} strokeWidth="0.6" />
      <circle cx={x - dir * 1} cy={y - 5} r="1.8" fill={color} stroke={OUTLINE} strokeWidth="0.6" />
      <circle cx={x + dir * 1.5} cy={y - 0.6} r="0.55" fill="white" opacity="0.3" />
      <circle cx={x + dir * 4.5} cy={y - 2.6} r="0.6" fill="white" opacity="0.3" />
    </g>
  );
}
