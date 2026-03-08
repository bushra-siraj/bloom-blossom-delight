import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { EnvironmentBg } from './EnvironmentBg';
import { FloatingPetals } from './FloatingPetals';
import type { BloomCard, Decoration } from '@/types/bloom';

const decoEmojis: Record<Decoration, string> = {
  bow: '🎀', hearts: '💕', sparkles: '✨', stars: '⭐', none: '',
};

type Phase = 'env' | 'walk' | 'pause' | 'action' | 'drop' | 'land' | 'bloom' | 'card';

interface ReceiverExperienceProps {
  card: BloomCard;
  onReset: () => void;
}

export const ReceiverExperience = ({ card, onReset }: ReceiverExperienceProps) => {
  const [phase, setPhase] = useState<Phase>('env');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('walk'), 2000),
      setTimeout(() => setPhase('pause'), 4000),
      setTimeout(() => setPhase('action'), 5000),
      setTimeout(() => setPhase('drop'), 6500),
      setTimeout(() => setPhase('land'), 7500),
      setTimeout(() => setPhase('bloom'), 8500),
      setTimeout(() => setPhase('card'), 10500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSaveImage = async () => {
    // Use html2canvas-like approach - create a screenshot-worthy view
    // For now, create a shareable canvas
    const el = cardRef.current;
    if (!el) return;
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(el, { backgroundColor: null, scale: 2 });
      const link = document.createElement('a');
      link.download = 'bloom-for-you.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch {
      // Fallback: just alert
      alert('Screenshot feature requires html2canvas. Coming soon!');
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied!');
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BloomForYou', text: 'Someone sent you a flower!', url });
      } catch { /* user cancelled */ }
    } else {
      handleCopyLink();
    }
  };

  const phaseIndex = ['env', 'walk', 'pause', 'action', 'drop', 'land', 'bloom', 'card'].indexOf(phase);

  return (
    <div className="fixed inset-0 overflow-hidden" ref={cardRef}>
      {/* Illustrated environment */}
      <EnvironmentBg
        environment={card.environment}
        particleColor={card.particleColor}
        glowColor={card.glowColor}
      />

      {/* Floating petals */}
      <FloatingPetals count={15} color={card.petalColor} />

      {/* Intro text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <AnimatePresence>
          {phase === 'env' && (
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

        {/* Character walks in */}
        <AnimatePresence>
          {phaseIndex >= 1 && phaseIndex <= 5 && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute bottom-[25%]"
            >
              <CharacterSVG
                character={card.character}
                action={phaseIndex >= 3 ? card.animation : undefined}
                size={120}
                animate={phaseIndex >= 3 && phaseIndex <= 4}
                walking={phaseIndex <= 2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flower drops and blooms */}
        <AnimatePresence>
          {phaseIndex >= 4 && (
            <motion.div
              initial={{ y: -80, opacity: 0, scale: 0 }}
              animate={{
                y: phaseIndex >= 5 ? 0 : -40,
                opacity: 1,
                scale: phaseIndex >= 6 ? 1 : 0.6,
              }}
              transition={{ duration: 0.8, ease: 'easeOut', type: 'spring', bounce: 0.3 }}
              className="absolute bottom-[22%]"
            >
              <FlowerSVG
                type={card.flowerType}
                color={card.flowerColor}
                leafStyle={card.leafStyle}
                bouquetSize={card.bouquetSize}
                size={phaseIndex >= 6 ? 120 : 80}
                animate={phaseIndex === 6}
                customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card opens */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-card glow-border-lg p-6 w-full max-w-xs z-20"
              style={{
                perspective: 1000,
                backgroundColor: card.cardColor ? `${card.cardColor}cc` : undefined,
              }}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex gap-3 mt-6 z-20 flex-wrap justify-center"
            >
              <button
                onClick={handleSaveImage}
                className="glass-card px-4 py-2.5 text-sm font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                Save Image
              </button>
              <button
                onClick={handleCopyLink}
                className="glass-card px-4 py-2.5 text-sm font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                Copy Link
              </button>
              <button
                onClick={handleShare}
                className="glass-card px-4 py-2.5 text-sm font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create your own */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={onReset}
              className="mt-4 glass-card px-5 py-2.5 text-sm font-body text-foreground/50 hover:text-primary transition-all z-20"
            >
              Create your own bloom ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
