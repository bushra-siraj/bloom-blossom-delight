import type { LeafStyle } from '@/types/bloom';

/** Teal leaf with vein detail — uses #4A7C7C family */
export function renderLeaf(
  leafStyle: LeafStyle,
  x: number, y: number, flipX: boolean,
  scale = 1, colorVariant: 'dark' | 'medium' | 'light' = 'medium'
) {
  if (leafStyle === 'none') return null;
  const sx = flipX ? -scale : scale;

  const colors = {
    dark:   { fill: '#3A6A6A', vein: '#1E3E3E', highlight: '#5A8A8A', outline: '#1E2024' },
    medium: { fill: '#4A7C7C', vein: '#2A5252', highlight: '#6AA0A0', outline: '#1E2024' },
    light:  { fill: '#6A9E9E', vein: '#3A7070', highlight: '#8AC0C0', outline: '#2A3838' },
  };
  const c = colors[colorVariant];

  const d = leafStyle === 'round'
    ? 'M0 0 Q-10 -8 -14 -20 Q-12 -30 -6 -32 Q0 -30 4 -20 Q4 -8 0 0Z'
    : leafStyle === 'pointed'
    ? 'M0 0 L-5 -12 L-8 -24 Q-5 -36 0 -38 Q5 -36 4 -24 L2 -12Z'
    : 'M0 0 Q-12 -10 -16 -26 Q-12 -36 -4 -36 Q4 -32 6 -22 Q6 -10 0 0Z';

  return (
    <g transform={`translate(${x},${y}) scale(${sx},${scale})`}>
      <path d={d} fill={c.fill} stroke={c.outline} strokeWidth="1.2" strokeLinejoin="round" />
      <path d={d} fill={c.highlight} opacity="0.18" />
      <line x1="0" y1="-2" x2={-2} y2="-28" stroke={c.vein} strokeWidth="1" opacity="0.65" />
      <line x1={-1} y1="-7" x2={-8} y2="-14" stroke={c.vein} strokeWidth="0.5" opacity="0.5" />
      <line x1={-1} y1="-13" x2={-7} y2="-22" stroke={c.vein} strokeWidth="0.5" opacity="0.5" />
      <line x1={-1} y1="-19" x2={-5} y2="-28" stroke={c.vein} strokeWidth="0.45" opacity="0.4" />
      <line x1={-1} y1="-9" x2={3} y2="-16" stroke={c.vein} strokeWidth="0.4" opacity="0.4" />
      <line x1={-1} y1="-15" x2={3} y2="-24" stroke={c.vein} strokeWidth="0.4" opacity="0.35" />
    </g>
  );
}

/** Berry cluster — 3-4 berries on branching stems */
export function renderBerryCluster(x: number, y: number, flipX: boolean, color = '#E84040') {
  const dir = flipX ? -1 : 1;
  return (
    <g>
      <path d={`M${x} ${y + 14} Q${x + dir * 4} ${y + 6} ${x + dir * 2} ${y}`}
        stroke="#2A1E14" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <line x1={x + dir * 1} y1={y + 4} x2={x + dir * 7} y2={y - 3} stroke="#2A1E14" strokeWidth="0.7" />
      <line x1={x + dir * 2} y1={y} x2={x - dir * 1} y2={y - 7} stroke="#2A1E14" strokeWidth="0.7" />
      <line x1={x + dir * 3} y1={y + 2} x2={x + dir * 10} y2={y - 6} stroke="#2A1E14" strokeWidth="0.6" />
      <circle cx={x + dir * 2} cy={y} r="2.5" fill={color} stroke="#1E2024" strokeWidth="0.8" />
      <circle cx={x + dir * 7} cy={y - 3} r="2.8" fill={color} stroke="#1E2024" strokeWidth="0.8" />
      <circle cx={x - dir * 1} cy={y - 7} r="2.2" fill={color} stroke="#1E2024" strokeWidth="0.8" />
      <circle cx={x + dir * 10} cy={y - 6} r="2" fill={color} stroke="#1E2024" strokeWidth="0.7" />
      <circle cx={x + dir * 1.5} cy={y - 0.8} r="0.7" fill="white" opacity="0.25" />
      <circle cx={x + dir * 6.5} cy={y - 3.8} r="0.8" fill="white" opacity="0.25" />
    </g>
  );
}

/** Single berry (not used in bouquets but available) */
export function renderBerry(x: number, y: number, color = '#E84040') {
  return (
    <g>
      <line x1={x} y1={y + 8} x2={x} y2={y} stroke="#2A1E14" strokeWidth="0.9" />
      <circle cx={x} cy={y} r="2.8" fill={color} stroke="#1E2024" strokeWidth="0.8" />
      <circle cx={x - 0.5} cy={y - 0.8} r="0.8" fill="white" opacity="0.25" />
    </g>
  );
}
