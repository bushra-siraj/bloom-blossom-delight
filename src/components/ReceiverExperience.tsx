import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { EnvironmentBg } from './EnvironmentBg';
import { FloatingPetals } from './FloatingPetals';
import { MessageCardRenderer } from './cards/MessageCardRenderer';
import { playBloomChime, playPaperUnfold } from '@/lib/sounds';
import type { BloomCard } from '@/types/bloom';

type Phase = 'env' | 'intro' | 'walk' | 'pause' | 'action' | 'drop' | 'land' | 'bloom' | 'card';

interface ReceiverExperienceProps {
  card: BloomCard;
  onReset: () => void;
  shareUrl?: string;
}

export const ReceiverExperience = ({ card, onReset, shareUrl }: ReceiverExperienceProps) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('walk'), 3000),
      setTimeout(() => setPhase('pause'), 4500),
      setTimeout(() => setPhase('action'), 5500),
      setTimeout(() => setPhase('drop'), 7000),
      setTimeout(() => setPhase('land'), 8000),
      setTimeout(() => { setPhase('bloom'); playBloomChime(); }, 9000),
      setTimeout(() => { setPhase('card'); playPaperUnfold(); }, 13000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleCopyLink = () => {
    const url = shareUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const phaseIndex = ['env', 'intro', 'walk', 'pause', 'action', 'drop', 'land', 'bloom', 'card'].indexOf(phase);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <EnvironmentBg environment={card.environment} particleColor={card.particleColor} glowColor={card.glowColor} />
      {phaseIndex >= 7 && <FloatingPetals count={12} color={card.petalColor} />}

      <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-6 safe-area-inset overflow-hidden">
        {/* "Someone sent you a flower" text */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="text-center absolute top-1/2 -translate-y-1/2">
              <motion.p className="text-2xl md:text-3xl font-display text-glow text-foreground leading-relaxed"
                animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
                Someone sent you a flower
              </motion.p>
              <motion.div className="mt-4 flex justify-center gap-2"
                animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character */}
        <AnimatePresence>
          {phaseIndex >= 2 && phaseIndex <= 7 && (
            <motion.div
              initial={{ x: '-50vw', opacity: 0 }}
              animate={{
                x: phaseIndex >= 3 ? 0 : '-20vw',
                opacity: phaseIndex >= 7 ? 0 : 1,
                scale: phaseIndex >= 7 ? 0.7 : 1,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-[24%]"
            >
              <CharacterSVG character={card.character}
                action={phaseIndex >= 4 ? card.animation : undefined}
                size={130} animate={phaseIndex >= 4 && phaseIndex <= 6}
                walking={phaseIndex <= 3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flower drops + blooms — isolated, scaled to fit */}
        <AnimatePresence>
          {phaseIndex >= 5 && phase !== 'card' && (
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0 }}
              animate={{
                y: phaseIndex >= 6 ? 0 : -50,
                opacity: 1,
                scale: phaseIndex >= 7 ? 1 : 0.5,
              }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="absolute bottom-[20%]"
              style={{ isolation: 'isolate', contain: 'layout style paint', willChange: 'transform' }}
            >
              <FlowerSVG type={card.flowerType} color={card.flowerColor}
                leafStyle={card.leafStyle} bouquetSize={card.bouquetSize}
                size={phaseIndex >= 7 ? 100 : 60} animate={phaseIndex === 7}
                customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card phase: bouquet + card + buttons stacked vertically */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full flex flex-col items-center z-20 gap-3 max-w-xs mx-auto"
            >
              {/* Compact bouquet above card */}
              <div className="flex-shrink-0" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
                <FlowerSVG type={card.flowerType} color={card.flowerColor}
                  leafStyle={card.leafStyle} bouquetSize={card.bouquetSize}
                  size={card.bouquetSize === 'large' ? 55 : card.bouquetSize === 'small' ? 50 : 45}
                  customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
              </div>

              <div className="w-full">
                <MessageCardRenderer card={card} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full flex flex-col items-center gap-3"
              >
                <button onClick={handleCopyLink}
                  className="glass-card px-5 py-3 min-h-[44px] text-xs font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2 hover:shadow-[0_0_15px_hsl(330_60%_65%/0.15)] active:scale-95">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>

                <button onClick={onReset}
                  className="glass-card px-6 py-3 min-h-[44px] text-sm font-body text-primary transition-all glow-border hover:shadow-[0_0_25px_hsl(330_60%_65%/0.3)] active:scale-95">
                  🌸 Create your own bloom
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
