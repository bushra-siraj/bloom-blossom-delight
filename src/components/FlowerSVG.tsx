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

  // Large uses a 200x300 canvas; small uses 200x260; single uses 100x140
  const vb = bouquetSize === 'large' ? '0 0 200 300'
    : bouquetSize === 'small' ? '0 0 200 260'
    : '0 0 100 140';

  const w = bouquetSize === 'large' ? size * 2.2 : bouquetSize === 'small' ? size * 1.8 : size;
  const h = bouquetSize === 'large' ? size * 3 : bouquetSize === 'small' ? size * 2.2 : size + 20;

  return (
    <Wrapper {...wrapperProps as any} style={{ width: w, height: h, background: 'transparent' }}
      className="relative flex items-center justify-center">
      <svg viewBox={vb} width={w} height={h} style={{ background: 'transparent', overflow: 'visible', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>
        {bouquetSize === 'single' && <BouquetSingle type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
        {bouquetSize === 'small' && <BouquetSmall type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
        {bouquetSize === 'large' && <BouquetLarge type={type} c={c} leafStyle={leafStyle} customColor={customPetalColor} />}
      </svg>
    </Wrapper>
  );
};
