import type { LeafStyle } from '@/types/bloom';

/**
 * Delicate fern-like leaf branch: a curved central stem with 5-7 small
 * rounded oval leaflets attached alternately. Soft teal #4A7C7C palette.
 */
export function renderLeafBranch(
  x: number, y: number, angle: number, scale = 1,
  colorVariant: 'dark' | 'medium' | 'light' = 'medium'
) {
  const colors = {
    dark:   { stem: '#2A5252', leaf: '#3A6A6A', outline: '#1E2024' },
    medium: { stem: '#365E6A', leaf: '#4A7C7C', outline: '#1E2024' },
    light:  { stem: '#4A7878', leaf: '#6A9E9E', outline: '#2A3838' },
  };
  const c = colors[colorVariant];

  // 6 leaflets along the branch, alternating left/right
  const leaflets = [
    { ty: -5,  side: -1, s: 0.55 },
    { ty: -9,  side: 1,  s: 0.65 },
    { ty: -13, side: -1, s: 0.75 },
    { ty: -17, side: 1,  s: 0.8 },
    { ty: -21, side: -1, s: 0.7 },
    { ty: -24, side: 1,  s: 0.55 },
  ];

  return (
    <g transform={`translate(${x},${y}) rotate(${angle}) scale(${scale})`}>
      {/* Central stem — thin curved line */}
      <path d="M0 0 Q-1 -12 0 -26" stroke={c.stem} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Leaflets */}
      {leaflets.map((l, i) => (
        <g key={i} transform={`translate(${l.side * 1.5}, ${l.ty})`}>
          {/* tiny branch to leaflet */}
          <line x1="0" y1="0" x2={l.side * 4 * l.s} y2={-1.5 * l.s}
            stroke={c.stem} strokeWidth="0.5" />
          {/* oval leaflet */}
          <ellipse
            cx={l.side * 5.5 * l.s} cy={-1.5 * l.s}
            rx={3 * l.s} ry={1.8 * l.s}
            fill={c.leaf} stroke={c.outline} strokeWidth="0.5"
            transform={`rotate(${l.side * 20} ${l.side * 5.5 * l.s} ${-1.5 * l.s})`}
          />
        </g>
      ))}
      {/* Tip leaflet */}
      <ellipse cx="0" cy="-27.5" rx="2" ry="1.3" fill={c.leaf} stroke={c.outline} strokeWidth="0.4" />
    </g>
  );
}

/** Legacy API — redirects to new branch style */
export function renderLeaf(
  _leafStyle: string,
  x: number, y: number, flipX: boolean,
  scale = 1, colorVariant: 'dark' | 'medium' | 'light' = 'medium'
) {
  const angle = flipX ? 30 : -30;
  return renderLeafBranch(x, y, angle, scale * 0.35, colorVariant);
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
      <line x1={x + dir * 2.5} y1={y + 1} x2={x + dir * 8} y2={y - 4} stroke="#2A1E14" strokeWidth="0.45" />
      <circle cx={x + dir * 2} cy={y} r="2" fill={color} stroke="#1E2024" strokeWidth="0.6" />
      <circle cx={x + dir * 5} cy={y - 2} r="2.2" fill={color} stroke="#1E2024" strokeWidth="0.6" />
      <circle cx={x - dir * 1} cy={y - 5} r="1.8" fill={color} stroke="#1E2024" strokeWidth="0.6" />
      <circle cx={x + dir * 8} cy={y - 4} r="1.6" fill={color} stroke="#1E2024" strokeWidth="0.55" />
      <circle cx={x + dir * 1.5} cy={y - 0.6} r="0.55" fill="white" opacity="0.3" />
      <circle cx={x + dir * 4.5} cy={y - 2.6} r="0.6" fill="white" opacity="0.3" />
    </g>
  );
}
