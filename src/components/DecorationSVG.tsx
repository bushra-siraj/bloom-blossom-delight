import { motion } from 'framer-motion';
import type { Decoration } from '@/types/bloom';

interface DecorationSVGProps {
  decoration: Decoration;
  size?: number;
  animate?: boolean;
}

export const DecorationSVG = ({ decoration, size = 24, animate = true }: DecorationSVGProps) => {
  const Wrap = animate ? motion.div : 'div';
  const props = animate ? {
    animate: { scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] },
    transition: { duration: 3, repeat: Infinity },
  } : {};

  switch (decoration) {
    case 'bow':
      return (
        <Wrap {...props as any} style={{ width: size, height: size }}>
          <svg viewBox="0 0 40 30" width={size} height={size * 0.75}>
            <path d="M20 15 Q10 5 4 8 Q0 12 6 16 Q10 20 20 15Z" fill="#FF8FAB" />
            <path d="M20 15 Q30 5 36 8 Q40 12 34 16 Q30 20 20 15Z" fill="#FF8FAB" />
            <circle cx="20" cy="15" r="3" fill="#FF6B8A" />
            <path d="M17 16 Q14 24 12 28" stroke="#FF8FAB" strokeWidth="1.5" fill="none" />
            <path d="M23 16 Q26 24 28 28" stroke="#FF8FAB" strokeWidth="1.5" fill="none" />
          </svg>
        </Wrap>
      );

    case 'sparkles':
      return (
        <Wrap {...props as any} style={{ width: size, height: size }}>
          <svg viewBox="0 0 40 40" width={size} height={size}>
            <path d="M20 2 L22 16 L36 18 L22 20 L20 34 L18 20 L4 18 L18 16Z" fill="#f5e066" opacity="0.9" />
            <path d="M10 6 L11 12 L17 13 L11 14 L10 20 L9 14 L3 13 L9 12Z" fill="#f5e066" opacity="0.6" />
            <path d="M32 24 L33 28 L37 29 L33 30 L32 34 L31 30 L27 29 L31 28Z" fill="#f5e066" opacity="0.5" />
          </svg>
        </Wrap>
      );

    case 'hearts':
      return (
        <Wrap {...props as any} style={{ width: size, height: size }}>
          <svg viewBox="0 0 40 36" width={size} height={size * 0.9}>
            <path d="M20 32 Q8 22 4 14 Q0 6 8 4 Q14 2 20 10 Q26 2 32 4 Q40 6 36 14 Q32 22 20 32Z" fill="#FF6B8A" opacity="0.85" />
            <path d="M14 24 Q10 20 8 16 Q6 12 10 10 Q13 9 14 12" fill="#FF8FAB" opacity="0.5" />
          </svg>
        </Wrap>
      );

    case 'butterflies':
      return (
        <Wrap {...(animate ? {
          animate: { y: [0, -4, 0], rotate: [0, 5, -5, 0] },
          transition: { duration: 2.5, repeat: Infinity },
        } : {}) as any} style={{ width: size, height: size }}>
          <svg viewBox="0 0 40 32" width={size} height={size * 0.8}>
            <ellipse cx="12" cy="12" rx="10" ry="11" fill="#b07ed6" opacity="0.7" />
            <ellipse cx="28" cy="12" rx="10" ry="11" fill="#b07ed6" opacity="0.7" />
            <ellipse cx="14" cy="24" rx="7" ry="7" fill="#d4a0e8" opacity="0.6" />
            <ellipse cx="26" cy="24" rx="7" ry="7" fill="#d4a0e8" opacity="0.6" />
            <ellipse cx="20" cy="18" rx="2" ry="10" fill="#3d2b50" />
            <circle cx="20" cy="8" r="2.5" fill="#3d2b50" />
            <path d="M19 6 Q15 1 13 0" stroke="#3d2b50" strokeWidth="0.8" fill="none" />
            <path d="M21 6 Q25 1 27 0" stroke="#3d2b50" strokeWidth="0.8" fill="none" />
            <circle cx="13" cy="0" r="1" fill="#d4a0e8" />
            <circle cx="27" cy="0" r="1" fill="#d4a0e8" />
          </svg>
        </Wrap>
      );

    case 'vines':
      return (
        <Wrap {...props as any} style={{ width: size, height: size }}>
          <svg viewBox="0 0 40 40" width={size} height={size}>
            <path d="M5 38 Q8 28 15 22 Q22 16 20 8 Q18 2 25 0" stroke="#5aad6a" strokeWidth="1.5" fill="none" />
            <path d="M12 24 Q8 20 6 24 Q8 28 12 24Z" fill="#5aad6a" opacity="0.7" />
            <path d="M18 14 Q22 10 20 14 Q18 18 18 14Z" fill="#5aad6a" opacity="0.6" />
            <circle cx="15" cy="22" r="2" fill="#e8729a" opacity="0.6" />
            <circle cx="22" cy="10" r="1.5" fill="#f5e066" opacity="0.5" />
            <path d="M30 36 Q28 28 32 22 Q36 16 34 10" stroke="#4a8c5c" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M32 22 Q36 18 34 22 Q32 26 32 22Z" fill="#4a8c5c" opacity="0.4" />
          </svg>
        </Wrap>
      );

    default:
      return null;
  }
};
