import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { FloatingPetals } from './FloatingPetals';
import type { BloomCard, CardBg, Decoration } from '@/types/bloom';

const bgColors: Record<CardBg, string> = {
  midnight: 'bg-[hsl(270,20%,10%)]',
  aurora: 'bg-gradient-to-br from-[hsl(280,40%,20%)] to-[hsl(180,40%,15%)]',
  sunset: 'bg-gradient-to-br from-[hsl(340,50%,20%)] to-[hsl(30,50%,18%)]',
  ocean: 'bg-gradient-to-br from-[hsl(210,50%,15%)] to-[hsl(190,40%,20%)]',
  forest: 'bg-gradient-to-br from-[hsl(150,30%,12%)] to-[hsl(120,25%,18%)]',
};

const decoEmojis: Record<Decoration, string> = {
  bow: '🎀', hearts: '💕', sparkles: '✨', stars: '⭐', none: '',
};

type Phase = 'intro' | 'walk' | 'action' | 'drop' | 'bloom' | 'card';

interface ReceiverExperienceProps {
  card: BloomCard;
  onReset: () => void;
}

export const ReceiverExperience = ({ card, onReset }: ReceiverExperienceProps) => {
  const [phase, setPhase] = useState<Phase>('intro');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('walk'), 2500),
      setTimeout(() => setPhase('action'), 4500),
      setTimeout(() => setPhase('drop'), 6000),
      setTimeout(() => setPhase('bloom'), 7500),
      setTimeout(() => setPhase('card'), 9500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-background">
      <FloatingPetals count={20} />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4">
        {/* Phase: Intro text */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <p className="text-2xl font-display text-glow text-foreground">
                Someone sent you a flower
              </p>
              <motion.p
                className="text-foreground/40 text-sm font-body mt-3"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase: Character walks in */}
        <AnimatePresence>
          {(phase === 'walk' || phase === 'action' || phase === 'drop') && (
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <CharacterSVG
                character={card.character}
                action={phase === 'action' ? card.animation : undefined}
                size={100}
                animate={phase === 'action'}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase: Flower drops and blooms */}
        <AnimatePresence>
          {(phase === 'drop' || phase === 'bloom' || phase === 'card') && (
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', bounce: 0.4 }}
              className="mt-4"
            >
              <FlowerSVG
                type={card.flowerType}
                color={card.flowerColor}
                leafStyle={card.leafStyle}
                size={phase === 'bloom' || phase === 'card' ? 120 : 80}
                animate={phase === 'bloom'}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase: Card opens */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`glass-card glow-border-lg p-6 mt-6 w-full max-w-xs ${bgColors[card.cardBg]}`}
              style={{ perspective: 1000 }}
            >
              <div className="text-center space-y-3">
                {card.decoration !== 'none' && (
                  <motion.p
                    className="text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {decoEmojis[card.decoration]}
                  </motion.p>
                )}
                <p className={`text-foreground/90 leading-relaxed ${
                  card.fontStyle === 'elegant' ? 'font-display text-lg' :
                  card.fontStyle === 'handwritten' ? 'italic font-body text-base' :
                  card.fontStyle === 'playful' ? 'font-body font-bold text-base' :
                  'font-body text-base'
                }`}>
                  {card.message}
                </p>
                {card.senderName && (
                  <p className="text-foreground/50 text-sm font-body">— {card.senderName}</p>
                )}
                {card.decoration !== 'none' && (
                  <p className="text-xl">{decoEmojis[card.decoration]}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset button */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onReset}
              className="mt-8 glass-card px-5 py-2.5 text-sm font-body text-foreground/60 hover:text-primary transition-all"
            >
              Create your own bloom ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
