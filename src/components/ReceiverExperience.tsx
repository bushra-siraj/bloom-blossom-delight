import { useState, useEffect, useRef } from 'react';
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
}

function getShareUrl(): string {
  return window.location.href;
}

export const ReceiverExperience = ({ card, onReset }: ReceiverExperienceProps) => {
  const [phase, setPhase] = useState<Phase>('env');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('intro'), 1500),
      setTimeout(() => setPhase('walk'), 4000),
      setTimeout(() => setPhase('pause'), 6000),
      setTimeout(() => setPhase('action'), 7000),
      setTimeout(() => setPhase('drop'), 8500),
      setTimeout(() => setPhase('land'), 9500),
      setTimeout(() => { setPhase('bloom'); playBloomChime(); }, 10500),
      setTimeout(() => { setPhase('card'); playPaperUnfold(); }, 14500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSaveImage = async () => {
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
      const text = `${card.message}${card.senderName ? ` — ${card.senderName}` : ''}`;
      navigator.clipboard.writeText(text);
      alert('Message copied to clipboard!');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const phaseIndex = ['env', 'intro', 'walk', 'pause', 'action', 'drop', 'land', 'bloom', 'card'].indexOf(phase);

  return (
    <div className="fixed inset-0 overflow-hidden" ref={cardRef}>
      <EnvironmentBg environment={card.environment} particleColor={card.particleColor} glowColor={card.glowColor} />
      {phaseIndex >= 7 && <FloatingPetals count={20} color={card.petalColor} />}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 safe-area-inset">
        {/* "Someone sent you a flower" text */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="text-center">
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

        {/* Flower drops + blooms */}
        <AnimatePresence>
          {phaseIndex >= 5 && (
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0 }}
              animate={{
                y: phaseIndex >= 6 ? 0 : -50,
                opacity: 1,
                scale: phaseIndex >= 7 ? 1 : 0.5,
              }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="absolute bottom-[20%]"
            >
              <FlowerSVG type={card.flowerType} color={card.flowerColor}
                leafStyle={card.leafStyle} bouquetSize={card.bouquetSize}
                size={phaseIndex >= 7 ? 130 : 70} animate={phaseIndex === 7}
                customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message card */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-xs z-20">
              <MessageCardRenderer card={card} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share & Viral buttons */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="flex gap-2.5 mt-5 z-20 flex-wrap justify-center">
              <button onClick={handleCopyLink}
                className="glass-card px-5 py-3 min-h-[44px] text-xs font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2 hover:shadow-[0_0_15px_hsl(330_60%_65%/0.15)] active:scale-95">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button onClick={handleSaveImage}
                className="glass-card px-5 py-3 min-h-[44px] text-xs font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2 hover:shadow-[0_0_15px_hsl(330_60%_65%/0.15)] active:scale-95">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Save Image
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create your own - viral loop CTA */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              onClick={onReset}
              className="mt-5 glass-card px-6 py-3 min-h-[44px] text-sm font-body text-primary transition-all z-20 glow-border hover:shadow-[0_0_25px_hsl(330_60%_65%/0.3)] active:scale-95">
              🌸 Create your own bloom
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
