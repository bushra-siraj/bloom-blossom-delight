import { motion } from 'framer-motion';
import type { FlowerType, FlowerColor, LeafStyle, BouquetSize } from '@/types/bloom';
import { colorMap } from './flowers/colorMap';
import { BouquetSingle, BouquetSmall, BouquetLarge } from './flowers/BouquetLayouts';

interface FlowerSVGProps {
  type: FlowerType;
  color: FlowerColor;
  leafStyle: LeafStyle;
  size?: number;
  animate?: boolean;
  bouquetSize?: BouquetSize;
  customPetalColor?: string;
}

export const FlowerSVG = ({
  type, color, leafStyle, size = 120, animate = false,
  bouquetSize = 'single', customPetalColor,
}: FlowerSVGProps) => {
  const c = colorMap[color];

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ? {
    initial: { scale: 0, rotate: -20, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    transition: { duration: 1.2, ease: 'easeOut' },
  } : {};

  const vb = bouquetSize === 'large' ? '-10 -10 130 170'
    : bouquetSize === 'small' ? '0 -5 100 150'
    : '0 0 100 130';

  const w = bouquetSize === 'large' ? size * 1.8 : bouquetSize === 'small' ? size * 1.4 : size;
  const h = bouquetSize === 'large' ? size * 2 : bouquetSize === 'small' ? size * 1.5 : size + 20;

  return (
    <Wrapper {...wrapperProps as any} style={{ width: w, height: h, background: 'transparent' }}
      className="relative flex items-center justify-center">
      <svg viewBox={vb} width={w} height={h} style={{ background: 'transparent', overflow: 'visible' }}>
        <defs>
          <radialGradient id={`glow-${color}-${bouquetSize}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={customPetalColor || c.petal} stopOpacity="0.2" />
            <stop offset="100%" stopColor={customPetalColor || c.petal} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r={bouquetSize === 'large' ? 60 : 30} fill={`url(#glow-${color}-${bouquetSize})`} />
        {bouquetSize === 'single' && <BouquetSingle type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
        {bouquetSize === 'small' && <BouquetSmall type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
        {bouquetSize === 'large' && <BouquetLarge type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
      </svg>
    </Wrapper>
  );
};
