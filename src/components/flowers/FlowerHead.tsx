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

  switch (type) {
    /* ═══════ ROSE — Layered spiral petals like reference ═══════ */
    case 'rose':
      return (
        <g>
          {/* Outer large petals - rounded and overlapping with visible outlines */}
          <path d="M50 56 Q30 48 26 34 Q24 22 36 18 Q44 16 50 26 Q56 16 64 18 Q76 22 74 34 Q70 48 50 56Z"
            fill={petal} stroke={outline} strokeWidth="1.2" strokeLinejoin="round" />
          {/* Left outer petal */}
          <path d="M36 52 Q18 40 20 28 Q22 18 34 16 Q40 16 38 28 Q36 40 36 52Z"
            fill={petalLight} stroke={outline} strokeWidth="1" strokeLinejoin="round" />
          {/* Right outer petal */}
          <path d="M64 52 Q82 40 80 28 Q78 18 66 16 Q60 16 62 28 Q64 40 64 52Z"
            fill={petalLight} stroke={outline} strokeWidth="1" strokeLinejoin="round" />
          {/* Middle layer petals */}
          <path d="M50 50 Q36 42 34 30 Q34 22 42 22 Q48 22 50 32Z"
            fill={petal} stroke={outline} strokeWidth="0.8" opacity="0.9" />
          <path d="M50 50 Q64 42 66 30 Q66 22 58 22 Q52 22 50 32Z"
            fill={petal} stroke={outline} strokeWidth="0.8" opacity="0.9" />
          {/* Inner curl petals */}
          <path d="M50 46 Q40 38 42 28 Q46 24 50 30Z"
            fill={petalDark} stroke={outline} strokeWidth="0.7" opacity="0.8" />
          <path d="M50 46 Q60 38 58 28 Q54 24 50 30Z"
            fill={petalDark} stroke={outline} strokeWidth="0.7" opacity="0.8" />
          {/* Center spiral */}
          <path d="M47 38 Q50 32 53 38 Q50 36 47 38Z" fill={petalDark} stroke={outline} strokeWidth="0.6" />
          <circle cx="50" cy="36" r="3" fill={petalDark} stroke={outline} strokeWidth="0.6" />
          {/* Highlight reflection */}
          <ellipse cx="42" cy="30" rx="4" ry="3" fill="white" opacity="0.12" transform="rotate(-15 42 30)" />
        </g>
      );

    /* ═══════ SUNFLOWER — Dense ray petals with seed grid ═══════ */
    case 'sunflower':
      return (
        <g>
          {/* Outer ray petals - pointed elongated */}
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 18) * i} 50 46)`}>
              <path d="M50 46 L45 18 Q50 10 55 18 Z"
                fill={petal} stroke={outline} strokeWidth="0.8" strokeLinejoin="round" />
            </g>
          ))}
          {/* Inner shorter petals */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`i-${i}`} transform={`rotate(${(360 / 14) * i + 13} 50 46)`}>
              <path d="M50 46 L47 28 Q50 22 53 28 Z"
                fill={petalDark} stroke={outline} strokeWidth="0.5" opacity="0.75" />
            </g>
          ))}
          {/* Brown center disc with crosshatch */}
          <circle cx="50" cy="46" r="15" fill="#5A3215" stroke="#3A1E0A" strokeWidth="1" />
          <circle cx="50" cy="46" r="12" fill="#7A4E2C" />
          {/* Fibonacci seed spiral */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = i * 2.39996; // golden angle
            const r = 2 + Math.sqrt(i) * 2.8;
            return <circle key={`s${i}`} cx={50 + Math.cos(angle) * r} cy={46 + Math.sin(angle) * r}
              r="1.1" fill="#3A1E0A" opacity="0.5" />;
          })}
          <ellipse cx="46" cy="42" rx="4" ry="3" fill="#9A6B3C" opacity="0.2" />
        </g>
      );

    /* ═══════ CHERRY BLOSSOM — Soft 5-petal with prominent stamens (ref style) ═══════ */
    case 'cherry-blossom':
      return (
        <g>
          {/* 5 large soft round petals with notch - like the valentine reference */}
          {Array.from({ length: 5 }).map((_, i) => {
            const a = ((360 / 5) * i - 90) * Math.PI / 180;
            const px = 50 + Math.cos(a) * 20;
            const py = 44 + Math.sin(a) * 20;
            return (
              <g key={i}>
                <ellipse cx={px} cy={py} rx="14" ry="13"
                  fill={petal} stroke={outline} strokeWidth="0.9"
                  transform={`rotate(${(360/5)*i} ${px} ${py})`} />
                {/* Soft inner gradient */}
                <ellipse cx={px} cy={py} rx="10" ry="9"
                  fill={petalLight} opacity="0.3"
                  transform={`rotate(${(360/5)*i} ${px} ${py})`} />
              </g>
            );
          })}
          {/* Center circle */}
          <circle cx="50" cy="44" r="8" fill="#FFF8F0" stroke={outline} strokeWidth="0.6" />
          {/* Stamens radiating - prominent dark tips like reference */}
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            const ex = 50 + Math.cos(a) * 10;
            const ey = 44 + Math.sin(a) * 10;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="44" x2={ex} y2={ey} stroke="#4A3A3A" strokeWidth="0.7" />
                <circle cx={ex} cy={ey} r="1.5" fill="#2A1A1A" />
              </g>
            );
          })}
        </g>
      );

    /* ═══════ TULIP — Cupped 3-petal silhouette ═══════ */
    case 'tulip':
      return (
        <g>
          {/* Main cup shape */}
          <path d="M30 58 Q28 34 38 20 Q44 12 50 10 Q56 12 62 20 Q72 34 70 58 Q50 66 30 58Z"
            fill={petal} stroke={outline} strokeWidth="1.2" strokeLinejoin="round" />
          {/* Left petal overlap */}
          <path d="M30 58 Q30 40 40 24 Q42 30 44 40 Q38 50 30 58Z"
            fill={petalLight} stroke={outline} strokeWidth="0.7" opacity="0.75" />
          {/* Right petal overlap */}
          <path d="M70 58 Q70 40 60 24 Q58 30 56 40 Q62 50 70 58Z"
            fill={petalLight} stroke={outline} strokeWidth="0.7" opacity="0.75" />
          {/* Center fold */}
          <path d="M50 14 Q48 32 50 56" fill="none" stroke={petalDark} strokeWidth="0.8" opacity="0.3" />
          {/* Side folds */}
          <path d="M40 22 Q42 38 38 56" fill="none" stroke={petalDark} strokeWidth="0.5" opacity="0.2" />
          <path d="M60 22 Q58 38 62 56" fill="none" stroke={petalDark} strokeWidth="0.5" opacity="0.2" />
          {/* Highlight */}
          <path d="M44 24 Q48 16 50 12 Q48 28 44 40Z" fill="white" opacity="0.15" />
        </g>
      );

    /* ═══════ DAISY — Two-layer white petals with golden center (ref) ═══════ */
    case 'daisy':
      return (
        <g>
          {/* Back petal layer */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`b-${i}`} transform={`rotate(${(360 / 12) * i + 15} 50 46)`}>
              <ellipse cx="50" cy="26" rx="6" ry="18"
                fill="white" stroke="#B0B0B0" strokeWidth="0.6" />
            </g>
          ))}
          {/* Front petal layer */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={`f-${i}`} transform={`rotate(${(360 / 10) * i} 50 46)`}>
              <ellipse cx="50" cy="28" rx="5.5" ry="16"
                fill="#FFFFF0" stroke="#C0C0C0" strokeWidth="0.5" />
            </g>
          ))}
          {/* Golden center disc */}
          <circle cx="50" cy="46" r="11" fill="#FFD633" stroke="#CCAA20" strokeWidth="0.9" />
          <circle cx="50" cy="46" r="8" fill="#EDCA38" />
          {/* Dot texture */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const r = 3 + (i % 2) * 3;
            return <circle key={`d${i}`} cx={50 + Math.cos(a) * r} cy={46 + Math.sin(a) * r}
              r="0.9" fill="#B89010" opacity="0.5" />;
          })}
        </g>
      );

    /* ═══════ LILY — Recurved elegant 6-petal with speckles ═══════ */
    case 'lily':
      return (
        <g>
          {/* 6 long recurved petals */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i} transform={`rotate(${(360 / 6) * i} 50 46)`}>
              <path d="M50 46 Q38 24 42 10 Q50 0 58 10 Q62 24 50 46Z"
                fill={petal} stroke={outline} strokeWidth="0.9" strokeLinejoin="round" />
              {/* Vein */}
              <line x1="50" y1="44" x2="50" y2="10" stroke={petalDark} strokeWidth="0.5" opacity="0.3" />
              {/* Speckles */}
              <circle cx="47" cy="26" r="0.9" fill={petalDark} opacity="0.5" />
              <circle cx="53" cy="30" r="0.7" fill={petalDark} opacity="0.4" />
              <circle cx="49" cy="20" r="0.6" fill={petalDark} opacity="0.35" />
            </g>
          ))}
          {/* Pistil & anthers */}
          <circle cx="50" cy="46" r="5" fill="#F0E8B0" stroke={outline} strokeWidth="0.6" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            const ex = 50 + Math.cos(a) * 12;
            const ey = 46 + Math.sin(a) * 12;
            return (
              <g key={`st${i}`}>
                <line x1="50" y1="46" x2={ex} y2={ey} stroke="#7A6A3A" strokeWidth="0.8" />
                <ellipse cx={ex} cy={ey} rx="2" ry="1.3" fill="#C8A830" stroke="#8A7020" strokeWidth="0.4"
                  transform={`rotate(${(360 / 6) * i} ${ex} ${ey})`} />
              </g>
            );
          })}
        </g>
      );
  }
};
