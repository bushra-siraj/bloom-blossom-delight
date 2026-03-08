import type { FlowerType } from '@/types/bloom';
import { adjustColor } from './colorMap';

interface FlowerHeadProps {
  type: FlowerType;
  c: { petal: string; center: string; petalDark: string; petalLight: string; outline: string };
  customColor?: string;
  scale?: number;
}

export const FlowerHead = ({ type, c, customColor, scale = 1 }: FlowerHeadProps) => {
  const petal = customColor || c.petal;
  const petalDark = customColor ? adjustColor(customColor, -40) : c.petalDark;
  const petalLight = customColor ? adjustColor(customColor, 50) : c.petalLight;
  const outline = customColor ? adjustColor(customColor, -60) : c.outline;

  const s = scale;

  switch (type) {
    case 'rose':
      return (
        <g>
          {/* Outer petals - large rounded with outline strokes like reference */}
          {[0, 72, 144, 216, 288].map((r, i) => (
            <g key={i} transform={`rotate(${r} 50 46)`}>
              <path d={`M50 46 Q38 30 42 18 Q46 10 50 14 Q54 10 58 18 Q62 30 50 46Z`}
                fill={i % 2 === 0 ? petal : petalLight} stroke={outline} strokeWidth="0.8" />
              {/* Inner shading curve */}
              <path d={`M47 38 Q50 28 53 38`} fill="none" stroke={petalDark} strokeWidth="0.5" opacity="0.4" />
            </g>
          ))}
          {/* Inner spiral petals */}
          {[30, 110, 190, 270].map((r, i) => (
            <g key={`inner-${i}`} transform={`rotate(${r} 50 46)`}>
              <path d={`M50 46 Q42 36 46 28 Q50 24 54 28 Q58 36 50 46Z`}
                fill={petalDark} stroke={outline} strokeWidth="0.6" opacity="0.7" />
            </g>
          ))}
          {/* Center spiral */}
          <circle cx="50" cy="46" r="5" fill={petalDark} stroke={outline} strokeWidth="0.7" />
          <path d="M48 46 Q50 42 52 46 Q50 44 48 46" fill={petal} opacity="0.6" />
          {/* Highlight */}
          <ellipse cx="45" cy="38" rx="3" ry="2" fill="white" opacity="0.15" transform="rotate(-20 45 38)" />
        </g>
      );

    case 'sunflower':
      return (
        <g>
          {/* Outer ray petals - elongated pointed */}
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 16) * i} 50 48)`}>
              <path d="M50 48 L46 22 Q50 16 54 22 Z" fill={petal} stroke={outline} strokeWidth="0.6" />
            </g>
          ))}
          {/* Inner shorter petals */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`i-${i}`} transform={`rotate(${(360 / 12) * i + 15} 50 48)`}>
              <path d="M50 48 L47 30 Q50 26 53 30 Z" fill={petalDark} stroke={outline} strokeWidth="0.4" opacity="0.7" />
            </g>
          ))}
          {/* Brown center disc */}
          <circle cx="50" cy="48" r="14" fill="#5A3215" stroke="#3A1E0A" strokeWidth="0.8" />
          <circle cx="50" cy="48" r="11" fill="#7A4E2C" />
          {/* Seed grid pattern */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2 * 3;
            const radius = 2 + (i / 20) * 8;
            return <circle key={`s${i}`} cx={50 + Math.cos(angle) * radius} cy={48 + Math.sin(angle) * radius}
              r="1.2" fill="#3A1E0A" opacity="0.5" />;
          })}
          <ellipse cx="46" cy="44" rx="3" ry="2" fill="#9A6B3C" opacity="0.25" />
        </g>
      );

    case 'cherry-blossom':
      return (
        <g>
          {/* 5 round sakura petals with notch */}
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 5) * i} 50 44)`}>
              <path d="M50 44 Q42 28 44 18 Q47 12 49 16 L50 14 L51 16 Q53 12 56 18 Q58 28 50 44Z"
                fill={petal} stroke={outline} strokeWidth="0.7" />
              {/* Petal vein */}
              <line x1="50" y1="44" x2="50" y2="18" stroke={petalDark} strokeWidth="0.4" opacity="0.3" />
              {/* Soft highlight */}
              <path d="M47 30 Q50 24 53 30" fill="white" opacity="0.12" />
            </g>
          ))}
          {/* Center - stamens radiating out */}
          <circle cx="50" cy="44" r="5" fill="#FFF5F5" stroke={outline} strokeWidth="0.5" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const ex = 50 + Math.cos(a) * 6;
            const ey = 44 + Math.sin(a) * 6;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="44" x2={ex} y2={ey} stroke="#C07080" strokeWidth="0.5" />
                <circle cx={ex} cy={ey} r="1" fill="#DD5070" />
              </g>
            );
          })}
        </g>
      );

    case 'tulip':
      return (
        <g>
          {/* Tulip cup - 3 overlapping petals with outline */}
          <path d="M34 58 Q32 36 40 24 Q44 18 50 16 Q56 18 60 24 Q68 36 66 58 Q50 64 34 58Z"
            fill={petal} stroke={outline} strokeWidth="1" />
          {/* Left petal edge */}
          <path d="M34 58 Q33 44 42 28 Q44 32 46 40 Q42 50 34 58Z"
            fill={petalLight} stroke={outline} strokeWidth="0.6" opacity="0.7" />
          {/* Right petal edge */}
          <path d="M66 58 Q67 44 58 28 Q56 32 54 40 Q58 50 66 58Z"
            fill={petalLight} stroke={outline} strokeWidth="0.6" opacity="0.7" />
          {/* Center fold line */}
          <path d="M50 20 Q48 36 50 56" fill="none" stroke={petalDark} strokeWidth="0.7" opacity="0.35" />
          {/* Side fold lines */}
          <path d="M42 26 Q44 40 40 56" fill="none" stroke={petalDark} strokeWidth="0.5" opacity="0.25" />
          <path d="M58 26 Q56 40 60 56" fill="none" stroke={petalDark} strokeWidth="0.5" opacity="0.25" />
          {/* Highlight */}
          <path d="M46 28 Q48 22 50 18 Q48 30 46 42Z" fill="white" opacity="0.15" />
        </g>
      );

    case 'daisy':
      return (
        <g>
          {/* White petals - two layers */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 14) * i} 50 46)`}>
              <ellipse cx="50" cy="28" rx="5" ry="16" fill="white" stroke="#CCCCCC" strokeWidth="0.5" />
            </g>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`inner-${i}`} transform={`rotate(${(360 / 10) * i + 18} 50 46)`}>
              <ellipse cx="50" cy="32" rx="4" ry="12" fill="#F8F8FF" stroke="#DDDDDD" strokeWidth="0.4" />
            </g>
          ))}
          {/* Golden center with dotted texture */}
          <circle cx="50" cy="46" r="10" fill="#FFD633" stroke="#CCAA20" strokeWidth="0.8" />
          <circle cx="50" cy="46" r="7" fill="#EDCA38" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            const r = 3 + (i % 2) * 2.5;
            return <circle key={`d${i}`} cx={50 + Math.cos(a) * r} cy={46 + Math.sin(a) * r} r="0.8" fill="#C8A010" opacity="0.5" />;
          })}
        </g>
      );

    case 'lily':
      return (
        <g>
          {/* 6 elegant recurved petals with speckles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 6) * i} 50 46)`}>
              <path d="M50 46 Q40 26 44 14 Q50 6 56 14 Q60 26 50 46Z"
                fill={petal} stroke={outline} strokeWidth="0.7" />
              {/* Center vein */}
              <line x1="50" y1="46" x2="50" y2="14" stroke={petalDark} strokeWidth="0.5" opacity="0.3" />
              {/* Speckles */}
              <circle cx="48" cy="28" r="0.8" fill={petalDark} opacity="0.45" />
              <circle cx="52" cy="32" r="0.6" fill={petalDark} opacity="0.35" />
              <circle cx="49" cy="24" r="0.5" fill={petalDark} opacity="0.3" />
            </g>
          ))}
          {/* Pistil & stamens */}
          <circle cx="50" cy="46" r="4" fill="#E8E0A0" stroke={outline} strokeWidth="0.5" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="46" x2={50 + Math.cos(a) * 10} y2={46 + Math.sin(a) * 10}
                  stroke="#7A6A3A" strokeWidth="0.7" />
                <ellipse cx={50 + Math.cos(a) * 10} cy={46 + Math.sin(a) * 10}
                  rx="1.8" ry="1.2" fill="#C8A830" stroke="#8A7020" strokeWidth="0.3"
                  transform={`rotate(${(360 / 6) * i} ${50 + Math.cos(a) * 10} ${46 + Math.sin(a) * 10})`} />
              </g>
            );
          })}
        </g>
      );
  }
};
