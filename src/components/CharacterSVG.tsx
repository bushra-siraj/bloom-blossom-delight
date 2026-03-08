import { motion } from 'framer-motion';
import type { CharacterType, AnimationAction } from '@/types/bloom';

interface CharacterSVGProps {
  character: CharacterType;
  action?: AnimationAction;
  size?: number;
  animate?: boolean;
}

const characterEmojis: Record<CharacterType, string> = {
  girl: '👧',
  boy: '👦',
  cat: '🐱',
  robot: '🤖',
  ghost: '👻',
  butterfly: '🦋',
};

export const CharacterSVG = ({ character, action, size = 80, animate = false }: CharacterSVGProps) => {
  const emoji = characterEmojis[character];

  const actionAnimation = action === 'wave'
    ? { rotate: [0, 15, -15, 15, 0] }
    : action === 'wink'
    ? { scale: [1, 1.1, 1, 1.1, 1] }
    : action === 'drop-flower'
    ? { y: [0, -20, 0] }
    : action === 'present-flower'
    ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }
    : {};

  if (!animate) {
    return (
      <div className="flex items-center justify-center" style={{ fontSize: size * 0.7, width: size, height: size }}>
        {emoji}
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center justify-center"
      style={{ fontSize: size * 0.7, width: size, height: size }}
      animate={actionAnimation}
      transition={{ duration: 1.5, ease: 'easeInOut', repeat: action === 'wave' ? 2 : 1 }}
    >
      {emoji}
    </motion.div>
  );
};
