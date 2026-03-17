import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DecorationSVG } from '../DecorationSVG';
import type { BloomCard, CardStyle, FontStyle } from '@/types/bloom';

interface MessageCardRendererProps {
  card: BloomCard;
  mini?: boolean;
}

export const MessageCardRenderer = ({ card, mini = false }: MessageCardRendererProps) => {
  switch (card.cardStyle) {
    case 'polaroid':
      return <PolaroidCard card={card} mini={mini} />;
    case 'envelope':
      return <EnvelopeCard card={card} mini={mini} />;
    case 'glass':
      return <GlassCard card={card} mini={mini} />;
    case 'classic':
      return <ClassicCard card={card} mini={mini} />;
    default:
      return <GlassCard card={card} mini={mini} />;
  }
};

/* ── Shared ── */
const fontClasses = (font: FontStyle) => {
  switch (font) {
    case 'romantic': return 'font-display italic';
    case 'handwritten': return 'font-body';
    case 'modern': return 'font-body font-semibold tracking-wide';
  }
};

const DecoRow = ({ card, size }: { card: BloomCard; size: number }) =>
  card.decoration !== 'none' ? (
    <div className="flex justify-center">
      <DecorationSVG decoration={card.decoration} size={size} animate={false} />
    </div>
  ) : null;

const Msg = ({ card, mini }: { card: BloomCard; mini: boolean }) => {
  const textColor = card.fontColor || 'hsl(0 0% 15%)';
  const senderColor = card.fontColor
    ? card.fontColor
    : 'hsl(0 0% 30%)';

  return (
    <div className="text-center space-y-1.5">
      <DecoRow card={card} size={mini ? 16 : 26} />
      <p
        className={`leading-relaxed ${mini ? 'text-[10px]' : 'text-sm'} ${fontClasses(card.fontStyle)} ${!mini ? 'max-h-36 overflow-y-auto' : ''}`}
        style={{
          color: textColor,
          textShadow: '0 1px 3px hsl(0 0% 100% / 0.5)',
        }}
      >
        {card.message || 'Your message...'}
      </p>
      {card.senderName && (
        <p
          className={`font-body ${mini ? 'text-[8px]' : 'text-xs'}`}
          style={{
            color: senderColor,
            textShadow: '0 1px 2px hsl(0 0% 100% / 0.4)',
          }}
        >
          — {card.senderName}
        </p>
      )}
      <DecoRow card={card} size={mini ? 12 : 18} />
    </div>
  );
};

/* ── 1. Polaroid Card ── */
const PolaroidCard = ({ card, mini }: { card: BloomCard; mini: boolean }) => (
  <div
    className="relative"
    style={{ transform: 'rotate(-2deg)' }}
  >
    <div
      className={`bg-foreground/95 shadow-2xl ${mini ? 'p-1.5 pb-4 max-w-[180px]' : 'p-3 pb-10 max-w-xs'}`}
      style={{ borderRadius: '2px' }}
    >
      <div
        className={`${mini ? 'h-16' : 'h-40'} flex items-center justify-center overflow-hidden`}
        style={{ backgroundColor: `${card.cardColor}ee`, borderRadius: '1px' }}
      >
        <Msg card={{ ...card, fontStyle: card.fontStyle }} mini={mini} />
      </div>
      <div className={`text-center ${mini ? 'mt-1' : 'mt-2'}`}>
        {card.senderName && (
          <p className={`text-background/60 font-body ${mini ? 'text-[7px]' : 'text-[10px]'}`}>
            with love ♡
          </p>
        )}
      </div>
    </div>
    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-foreground/15 rounded-sm rotate-1" />
  </div>
);

/* ── 2. Envelope Card ── */
const EnvelopeCard = ({ card, mini }: { card: BloomCard; mini: boolean }) => {
  const [opened, setOpened] = useState(!mini);

  return (
    <div className={`relative ${mini ? 'max-w-[180px]' : 'max-w-xs w-full'}`}>
      <div
        className={`relative overflow-hidden border border-foreground/10 ${mini ? 'rounded-md' : 'rounded-lg'}`}
        style={{ backgroundColor: `${card.cardColor}dd` }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 z-10 origin-top"
          style={{ backgroundColor: `${card.cardColor}bb` }}
          initial={false}
          animate={{ rotateX: opened ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg viewBox="0 0 100 40" className="w-full" preserveAspectRatio="none">
            <polygon points="0,0 50,40 100,0" fill="currentColor" className="text-foreground/5" />
          </svg>
        </motion.div>

        <motion.div
          className={`relative z-0 ${mini ? 'p-2 pt-6' : 'p-4 pt-10'}`}
          initial={mini ? {} : { y: 30, opacity: 0 }}
          animate={opened ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => !opened && setOpened(true)}
        >
          <div
            className={`bg-foreground/5 border border-foreground/5 ${mini ? 'p-2 rounded-sm' : 'p-4 rounded-md'}`}
          >
            <Msg card={card} mini={mini} />
          </div>
        </motion.div>

        <div className={`absolute ${mini ? 'top-1 right-1 w-4 h-5' : 'top-2 right-2 w-6 h-7'} border border-foreground/10 rounded-sm flex items-center justify-center`}>
          <span className={mini ? 'text-[6px]' : 'text-[8px]'}>♡</span>
        </div>
      </div>
    </div>
  );
};

/* ── 3. Glass Card ── */
const GlassCard = ({ card, mini }: { card: BloomCard; mini: boolean }) => (
  <div className={`relative ${mini ? 'max-w-[180px]' : 'max-w-xs w-full'}`}>
    <div className="absolute -inset-1 rounded-2xl opacity-40 blur-xl"
      style={{ background: `radial-gradient(circle, ${card.glowColor}66, transparent 70%)` }} />
    <div
      className={`relative glass-card ${mini ? 'p-2.5 rounded-lg' : 'p-5 rounded-xl'}`}
      style={{
        boxShadow: `0 0 30px -5px ${card.glowColor}33, inset 0 1px 0 hsl(270 15% 40% / 0.15)`,
        border: `1px solid ${card.glowColor}22`,
      }}
    >
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <Msg card={card} mini={mini} />
    </div>
  </div>
);

/* ── 4. Classic Greeting Card ── */
const ClassicCard = ({ card, mini }: { card: BloomCard; mini: boolean }) => {
  const [isOpen, setIsOpen] = useState(!mini);

  return (
    <div
      className={`relative ${mini ? 'max-w-[180px]' : 'max-w-xs w-full'} cursor-pointer`}
      style={{ perspective: '800px' }}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <div
        className={`border border-foreground/10 ${mini ? 'rounded-lg p-2' : 'rounded-xl p-5'}`}
        style={{ backgroundColor: `${card.cardColor}dd`, minHeight: mini ? '80px' : '140px' }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Msg card={card} mini={mini} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className={`absolute inset-0 border border-foreground/10 origin-left ${mini ? 'rounded-lg' : 'rounded-xl'}`}
        style={{ backgroundColor: `${card.cardColor}ee`, backfaceVisibility: 'hidden' }}
        initial={false}
        animate={{ rotateY: isOpen ? -170 : 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-1.5">
          <DecoRow card={card} size={mini ? 20 : 32} />
          <p className={`font-display italic text-foreground/50 ${mini ? 'text-[9px]' : 'text-xs'}`}>
            for you ♡
          </p>
          {!isOpen && (
            <p className={`text-foreground/25 font-body ${mini ? 'text-[7px]' : 'text-[9px]'} mt-1`}>
              tap to open
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ── Preview thumbnails for creator step ── */
export const CardStylePreview = ({ style, selected, onClick }: {
  style: CardStyle; selected: boolean; onClick: () => void;
}) => {
  const labels: Record<CardStyle, string> = {
    polaroid: 'Polaroid',
    envelope: 'Envelope',
    glass: 'Glass',
    classic: 'Classic',
  };

  const previews: Record<CardStyle, React.ReactNode> = {
    polaroid: (
      <div className="h-16 flex items-center justify-center" style={{ transform: 'rotate(-2deg)' }}>
        <div className="bg-foreground/90 p-1 pb-3 w-14 rounded-[1px] shadow-md">
          <div className="bg-primary/15 h-7 rounded-[1px]" />
        </div>
      </div>
    ),
    envelope: (
      <div className="h-16 flex items-center justify-center">
        <div className="bg-card border border-foreground/10 w-16 h-10 rounded-md relative overflow-hidden">
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full">
            <polygon points="0,0 50,30 100,0" fill="currentColor" className="text-foreground/5" />
          </svg>
          <div className="absolute bottom-1 left-1 right-1 h-3 bg-foreground/5 rounded-sm" />
        </div>
      </div>
    ),
    glass: (
      <div className="h-16 flex items-center justify-center">
        <div className="glass-card w-14 h-10 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        </div>
      </div>
    ),
    classic: (
      <div className="h-16 flex items-center justify-center" style={{ perspective: '200px' }}>
        <div className="relative w-14 h-10">
          <div className="absolute inset-0 bg-card border border-foreground/10 rounded-md" />
          <div className="absolute inset-0 bg-card border border-foreground/10 rounded-md origin-left"
            style={{ transform: 'rotateY(-30deg)', backfaceVisibility: 'hidden' }}>
            <div className="flex items-center justify-center h-full">
              <span className="text-foreground/25 text-[7px]">♡</span>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <button
      onClick={onClick}
      className={`glass-card p-3 text-center text-sm font-body transition-all duration-300 hover:scale-[1.02] ${
        selected
          ? 'ring-2 ring-primary/60 shadow-[0_0_20px_hsl(330_60%_65%/0.2)]'
          : 'hover:ring-1 hover:ring-foreground/10'
      }`}
    >
      {previews[style]}
      <span className="text-[10px] text-foreground/60 mt-1 block">{labels[style]}</span>
    </button>
  );
};
