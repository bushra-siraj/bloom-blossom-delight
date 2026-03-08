import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { EnvironmentBg } from './EnvironmentBg';
import { FloatingPetals } from './FloatingPetals';
import { MessageCardRenderer } from './cards/MessageCardRenderer';
import type { BloomCard } from '@/types/bloom';

type Phase = 'env' | 'intro' | 'walk' | 'pause' | 'action' | 'drop' | 'land' | 'bloom' | 'card';

interface ReceiverExperienceProps {
  card: BloomCard;
  onReset: () => void;
}

export const ReceiverExperience = ({ card, onReset }: ReceiverExperienceProps) => {
  const [phase, setPhase] = useState<Phase>('env');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('intro'), 1500),
      setTimeout(() => setPhase('walk'), 4000),
      setTimeout(() => setPhase('pause'), 6000),
      setTimeout(() => setPhase('action'), 7000),
      setTimeout(() => setPhase('drop'), 8500),
      setTimeout(() => setPhase('land'), 9500),
      setTimeout(() => setPhase('bloom'), 10500),
      setTimeout(() => setPhase('card'), 12500),
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
      // Fallback
      const text = `${card.message}${card.senderName ? ` — ${card.senderName}` : ''}`;
      navigator.clipboard.writeText(text);
      alert('Message copied to clipboard!');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BloomForYou', text: 'Someone sent you a flower!', url: window.location.href });
      } catch { /* cancelled */ }
    } else {
      handleCopyLink();
    }
  };

  const phaseIndex = ['env', 'intro', 'walk', 'pause', 'action', 'drop', 'land', 'bloom', 'card'].indexOf(phase);

  return (
    <div className="fixed inset-0 overflow-hidden" ref={cardRef}>
      {/* Environment */}
      <EnvironmentBg environment={card.environment} particleColor={card.particleColor} glowColor={card.glowColor} />

      {/* Petals appear after bloom */}
      {phaseIndex >= 7 && <FloatingPetals count={20} color={card.petalColor} />}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* "Someone sent you a flower" text */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
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
          {phaseIndex >= 2 && phaseIndex <= 6 && (
            <motion.div
              initial={{ x: '-50vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-[24%]"
            >
              <CharacterSVG
                character={card.character}
                action={phaseIndex >= 4 ? card.animation : undefined}
                size={130}
                animate={phaseIndex >= 4 && phaseIndex <= 5}
                walking={phaseIndex <= 3}
              />
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
              <FlowerSVG
                type={card.flowerType}
                color={card.flowerColor}
                leafStyle={card.leafStyle}
                bouquetSize={card.bouquetSize}
                size={phaseIndex >= 7 ? 130 : 70}
                animate={phaseIndex === 7}
                customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message card */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.85, rotateX: 45 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className={`p-5 w-full max-w-xs z-20 ${cardStyleClasses}`}
              style={{ perspective: 1000, backgroundColor: `${card.cardColor}cc` }}
            >
              {/* Envelope flap */}
              {card.cardStyle === 'envelope' && (
                <div className="absolute -top-4 left-0 right-0 h-8" style={{
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                  backgroundColor: `${card.cardColor}aa`,
                }} />
              )}
              <div className="text-center space-y-2.5">
                {card.decoration !== 'none' && (
                  <motion.div className="flex justify-center"
                    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                    <DecorationSVG decoration={card.decoration} size={28} />
                  </motion.div>
                )}
                <p className={`text-foreground/90 leading-relaxed text-sm ${fontClasses}`}>
                  {card.message}
                </p>
                {card.senderName && (
                  <p className="text-foreground/45 text-xs font-body">— {card.senderName}</p>
                )}
                {card.decoration !== 'none' && (
                  <div className="flex justify-center pt-1">
                    <DecorationSVG decoration={card.decoration} size={20} animate={false} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="flex gap-2.5 mt-5 z-20 flex-wrap justify-center">
              {[
                { label: 'Copy Link', icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71', onClick: handleCopyLink },
                { label: 'Save Image', icon: 'M3 3h18v18H3z M8.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M21 15l-5-5L5 21', onClick: handleSaveImage },
                { label: 'Share', icon: 'M18 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M6 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', onClick: handleShare },
              ].map(btn => (
                <button key={btn.label} onClick={btn.onClick}
                  className="glass-card px-3.5 py-2 text-xs font-body text-foreground/60 hover:text-foreground transition-all flex items-center gap-1.5 hover:shadow-[0_0_15px_hsl(330_60%_65%/0.15)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={btn.icon} />
                  </svg>
                  {btn.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create your own */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
              onClick={onReset}
              className="mt-4 glass-card px-5 py-2 text-xs font-body text-foreground/40 hover:text-primary transition-all z-20">
              Create your own bloom ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function getCardStyleClasses(style: CardStyle): string {
  switch (style) {
    case 'glass': return 'glass-card glow-border-lg rounded-xl';
    case 'rounded': return 'rounded-2xl border border-foreground/10 glow-border';
    case 'polaroid': return 'rounded-sm bg-foreground/5 border-4 border-foreground/10 border-b-[20px] shadow-xl';
    case 'envelope': return 'rounded-lg border border-foreground/10 glow-border relative pt-6';
  }
}

function getFontClasses(font: FontStyle): string {
  switch (font) {
    case 'romantic': return 'font-display italic text-base';
    case 'handwritten': return 'font-body text-sm';
    case 'modern': return 'font-body font-semibold tracking-wide text-sm';
  }
}
