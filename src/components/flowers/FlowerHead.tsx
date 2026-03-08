import type { FlowerType } from '@/types/bloom';
import { adjustColor } from './colorMap';

interface FlowerHeadProps {
  type: FlowerType;
  c: { petal: string; center: string; petalDark: string; petalLight: string; outline: string };
  customColor?: string;
  scale?: number;
}

const OUTLINE = '#1E2024';

// Type-synced palette so fills always update when selectedFlowerType changes.
const typeBase: Record<FlowerType, { petal: string; center: string }> = {
  rose: { petal: '#EA726A', center: '#5A2A2A' },
  tulip: { petal: '#F07B63', center: '#5E2E28' },
  daisy: { petal: '#F36B55', center: '#2D2A27' },
  lily: { petal: '#F29C88', center: '#5A3C2B' },
  sunflower: { petal: '#F3A245', center: '#5A3215' },
  'cherry-blossom': { petal: '#F3D6DB', center: '#2A1F24' },
};

export const FlowerHead = ({ type, c, customColor }: FlowerHeadProps) => {
  const basePetal = customColor || typeBase[type].petal;
  const petal = basePetal;
  const petalDark = adjustColor(basePetal, -30);
  const petalLight = adjustColor(basePetal, 35);
  const centerTone = typeBase[type].center || c.center;

  switch (type) {
    case 'rose':
      return (
        <g>
          <path d="M50 56 Q30 48 26 34 Q24 22 36 18 Q44 16 50 26 Q56 16 64 18 Q76 22 74 34 Q70 48 50 56Z"
            fill={petal} stroke={OUTLINE} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M36 52 Q18 40 20 28 Q22 18 34 16 Q40 16 38 28 Q36 40 36 52Z"
            fill={petalLight} stroke={OUTLINE} strokeWidth="1" />
          <path d="M64 52 Q82 40 80 28 Q78 18 66 16 Q60 16 62 28 Q64 40 64 52Z"
            fill={petalLight} stroke={OUTLINE} strokeWidth="1" />
          <path d="M50 50 Q36 42 34 30 Q34 22 42 22 Q48 22 50 32Z"
            fill={petal} stroke={OUTLINE} strokeWidth="0.8" opacity="0.9" />
          <path d="M50 50 Q64 42 66 30 Q66 22 58 22 Q52 22 50 32Z"
            fill={petal} stroke={OUTLINE} strokeWidth="0.8" opacity="0.9" />
          <path d="M50 46 Q40 38 42 28 Q46 24 50 30Z"
            fill={petalDark} stroke={OUTLINE} strokeWidth="0.7" opacity="0.85" />
          <path d="M50 46 Q60 38 58 28 Q54 24 50 30Z"
            fill={petalDark} stroke={OUTLINE} strokeWidth="0.7" opacity="0.85" />
          <circle cx="50" cy="36" r="3" fill={petalDark} stroke={OUTLINE} strokeWidth="0.6" />
        </g>
      );

    case 'sunflower':
      return (
        <g>
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 18) * i} 50 46)`}>
              <path d="M50 46 L45 18 Q50 10 55 18 Z" fill={petal} stroke={OUTLINE} strokeWidth="0.85" />
            </g>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`i-${i}`} transform={`rotate(${(360 / 14) * i + 13} 50 46)`}>
              <path d="M50 46 L47 28 Q50 22 53 28 Z" fill={petalDark} stroke={OUTLINE} strokeWidth="0.55" opacity="0.75" />
            </g>
          ))}
          <circle cx="50" cy="46" r="15" fill={centerTone} stroke={OUTLINE} strokeWidth="1" />
          <circle cx="50" cy="46" r="12" fill={adjustColor(centerTone, 18)} />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = i * 2.39996;
            const r = 2 + Math.sqrt(i) * 2.8;
            return <circle key={`s${i}`} cx={50 + Math.cos(angle) * r} cy={46 + Math.sin(angle) * r} r="1.05" fill={adjustColor(centerTone, -20)} opacity="0.45" />;
          })}
        </g>
      );

    case 'cherry-blossom':
      return (
        <g>
          {Array.from({ length: 5 }).map((_, i) => {
            const a = ((360 / 5) * i - 90) * Math.PI / 180;
            const px = 50 + Math.cos(a) * 20;
            const py = 44 + Math.sin(a) * 20;
            return (
              <g key={i}>
                <ellipse cx={px} cy={py} rx="14" ry="13" fill={petal} stroke={OUTLINE} strokeWidth="1"
                  transform={`rotate(${(360/5)*i} ${px} ${py})`} />
                <ellipse cx={px} cy={py} rx="10" ry="9" fill={petalLight} opacity="0.28"
                  transform={`rotate(${(360/5)*i} ${px} ${py})`} />
              </g>
            );
          })}
          <circle cx="50" cy="44" r="8" fill="#FFF8F0" stroke={OUTLINE} strokeWidth="0.7" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            const ex = 50 + Math.cos(a) * 10;
            const ey = 44 + Math.sin(a) * 10;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="44" x2={ex} y2={ey} stroke={OUTLINE} strokeWidth="0.7" />
                <circle cx={ex} cy={ey} r="1.4" fill="#2A1A1A" />
              </g>
            );
          })}
        </g>
      );

    case 'tulip':
      return (
        <g>
          <path d="M30 58 Q28 34 38 20 Q44 12 50 10 Q56 12 62 20 Q72 34 70 58 Q50 66 30 58Z"
            fill={petal} stroke={OUTLINE} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M30 58 Q30 40 40 24 Q42 30 44 40 Q38 50 30 58Z"
            fill={petalLight} stroke={OUTLINE} strokeWidth="0.75" opacity="0.75" />
          <path d="M70 58 Q70 40 60 24 Q58 30 56 40 Q62 50 70 58Z"
            fill={petalLight} stroke={OUTLINE} strokeWidth="0.75" opacity="0.75" />
          <path d="M50 14 Q48 32 50 56" fill="none" stroke={petalDark} strokeWidth="0.8" opacity="0.35" />
        </g>
      );

    case 'daisy':
      return (
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`b-${i}`} transform={`rotate(${(360 / 12) * i + 15} 50 46)`}>
              <ellipse cx="50" cy="26" rx="6" ry="18" fill={petalLight} stroke={OUTLINE} strokeWidth="0.65" />
            </g>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`f-${i}`} transform={`rotate(${(360 / 10) * i} 50 46)`}>
              <ellipse cx="50" cy="28" rx="5.5" ry="16" fill={petal} stroke={OUTLINE} strokeWidth="0.55" />
            </g>
          ))}
          <circle cx="50" cy="46" r="11" fill={adjustColor(petal, 10)} stroke={OUTLINE} strokeWidth="0.95" />
          <circle cx="50" cy="46" r="8" fill={adjustColor(petal, -10)} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r = 3 + (i % 2) * 3;
            return <circle key={`d${i}`} cx={50 + Math.cos(a) * r} cy={46 + Math.sin(a) * r}
              r="0.85" fill={adjustColor(petalDark, -35)} opacity="0.45" />;
          })}
        </g>
      );

    case 'lily':
      return (
        <g>
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 6) * i} 50 46)`}>
              <path d="M50 46 Q38 24 42 10 Q50 0 58 10 Q62 24 50 46Z"
                fill={petal} stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round" />
              <line x1="50" y1="44" x2="50" y2="10" stroke={petalDark} strokeWidth="0.5" opacity="0.35" />
              <circle cx="47" cy="26" r="0.9" fill={petalDark} opacity="0.5" />
              <circle cx="53" cy="30" r="0.7" fill={petalDark} opacity="0.4" />
            </g>
          ))}
          <circle cx="50" cy="46" r="5" fill={adjustColor(centerTone, 60)} stroke={OUTLINE} strokeWidth="0.65" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            const ex = 50 + Math.cos(a) * 12;
            const ey = 46 + Math.sin(a) * 12;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="46" x2={ex} y2={ey} stroke={adjustColor(centerTone, 20)} strokeWidth="0.85" />
                <ellipse cx={ex} cy={ey} rx="2" ry="1.2" fill={adjustColor(centerTone, 35)} stroke={OUTLINE} strokeWidth="0.45"
                  transform={`rotate(${(360 / 6) * i} ${ex} ${ey})`} />
              </g>
            );
          })}
        </g>
      );
  }
};
