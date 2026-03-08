import type { LeafStyle } from '@/types/bloom';

/** Reference-style illustrated leaf with vein detail */
export function renderLeaf(
  leafStyle: LeafStyle,
  x: number,
  y: number,
  flipX: boolean,
  scale = 1,
  colorVariant: 'dark' | 'medium' | 'light' = 'medium'
) {
  if (leafStyle === 'none') return null;
  const sx = flipX ? -scale : scale;

  const colors = {
    dark:   { fill: '#2A5A3A', vein: '#1A3A28', highlight: '#3A7A4E' },
    medium: { fill: '#4A8A5E', vein: '#2A5A3A', highlight: '#6AAE7A' },
    light:  { fill: '#6AAE80', vein: '#4A8A5E', highlight: '#8AD0A0' },
  };
  const c = colors[colorVariant];

  const d = leafStyle === 'round'
    ? 'M0 0 Q-8 -6 -14 -16 Q-12 -24 -6 -26 Q0 -24 2 -16 Q2 -6 0 0 Z'
    : leafStyle === 'pointed'
    ? 'M0 0 L-4 -10 L-8 -18 Q-6 -28 0 -30 Q6 -28 4 -18 L2 -10 Z'
    : 'M0 0 Q-10 -8 -14 -20 Q-10 -28 -4 -28 Q2 -26 4 -18 Q4 -8 0 0 Z';

  return (
    <g transform={`translate(${x},${y}) scale(${sx},${scale})`}>
      {/* Main leaf shape with outline */}
      <path d={d} fill={c.fill} stroke={c.vein} strokeWidth="0.6" />
      {/* Lighter overlay for depth */}
      <path d={d} fill={c.highlight} opacity="0.25" />
      {/* Center vein */}
      <line x1="0" y1="0" x2={-2} y2="-22" stroke={c.vein} strokeWidth="0.7" opacity="0.6" />
      {/* Side veins */}
      <line x1={-1} y1="-6" x2={-7} y2="-12" stroke={c.vein} strokeWidth="0.35" opacity="0.4" />
      <line x1={-1} y1="-12" x2={-6} y2="-20" stroke={c.vein} strokeWidth="0.35" opacity="0.4" />
      <line x1={-1} y1="-8" x2={2} y2="-14" stroke={c.vein} strokeWidth="0.3" opacity="0.3" />
      <line x1={-1} y1="-14" x2={2} y2="-22" stroke={c.vein} strokeWidth="0.3" opacity="0.3" />
    </g>
  );
}

/** Small berry/bud accent like in the reference */
export function renderBerry(x: number, y: number, color = '#EA726A') {
  return (
    <g>
      <line x1={x} y1={y + 8} x2={x} y2={y} stroke="#5A3A2A" strokeWidth="0.7" />
      <circle cx={x} cy={y} r="2.5" fill={color} stroke={color === '#EA726A' ? '#C04A42' : '#8A5A50'} strokeWidth="0.5" />
      <circle cx={x - 0.5} cy={y - 0.7} r="0.7" fill="white" opacity="0.3" />
    </g>
  );
}

/** Berry cluster - 3 berries on stems */
export function renderBerryCluster(x: number, y: number, flipX: boolean, color = '#EA726A') {
  const dir = flipX ? -1 : 1;
  return (
    <g>
      {/* Main stem */}
      <path d={`M${x} ${y + 12} Q${x + dir * 4} ${y + 4} ${x + dir * 2} ${y - 2}`}
        stroke="#5A3A2A" strokeWidth="0.7" fill="none" />
      {/* Branch stems */}
      <line x1={x + dir * 1} y1={y + 2} x2={x + dir * 6} y2={y - 4} stroke="#5A3A2A" strokeWidth="0.5" />
      <line x1={x + dir * 2} y1={y - 2} x2={x + dir * -2} y2={y - 8} stroke="#5A3A2A" strokeWidth="0.5" />
      {/* Berries */}
      <circle cx={x + dir * 2} cy={y - 2} r="2" fill={color} stroke="#C04A42" strokeWidth="0.4" />
      <circle cx={x + dir * 6} cy={y - 4} r="2.2" fill={color} stroke="#C04A42" strokeWidth="0.4" />
      <circle cx={x + dir * -2} cy={y - 8} r="1.8" fill={color} stroke="#C04A42" strokeWidth="0.4" />
    </g>
  );
}
