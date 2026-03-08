import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import type {
  BloomCard, FlowerType, FlowerColor, LeafStyle, CardBg,
  FontStyle, Decoration, CharacterType, AnimationAction
} from '@/types/bloom';
import { defaultCard } from '@/types/bloom';

const steps = ['Flower', 'Card', 'Message', 'Character', 'Preview'];

const flowerTypes: FlowerType[] = ['rose', 'tulip', 'daisy', 'lily', 'sunflower', 'cherry-blossom'];
const flowerColors: FlowerColor[] = ['rose', 'lavender', 'mint', 'peach', 'sky', 'gold'];
const leafStyles: LeafStyle[] = ['classic', 'round', 'pointed', 'none'];
const cardBgs: CardBg[] = ['midnight', 'aurora', 'sunset', 'ocean', 'forest'];
const fontStyles: FontStyle[] = ['elegant', 'playful', 'modern', 'handwritten'];
const decorations: Decoration[] = ['bow', 'hearts', 'sparkles', 'stars', 'none'];
const characters: CharacterType[] = ['girl', 'boy', 'cat', 'robot', 'ghost', 'butterfly'];
const animations: AnimationAction[] = ['wink', 'wave', 'drop-flower', 'present-flower'];

const bgColors: Record<CardBg, string> = {
  midnight: 'bg-[hsl(270,20%,10%)]',
  aurora: 'bg-gradient-to-br from-[hsl(280,40%,20%)] to-[hsl(180,40%,15%)]',
  sunset: 'bg-gradient-to-br from-[hsl(340,50%,20%)] to-[hsl(30,50%,18%)]',
  ocean: 'bg-gradient-to-br from-[hsl(210,50%,15%)] to-[hsl(190,40%,20%)]',
  forest: 'bg-gradient-to-br from-[hsl(150,30%,12%)] to-[hsl(120,25%,18%)]',
};

const decoEmojis: Record<Decoration, string> = {
  bow: '🎀', hearts: '💕', sparkles: '✨', stars: '⭐', none: '—',
};

interface FlowerCreatorProps {
  onComplete: (card: BloomCard) => void;
}

export const FlowerCreator = ({ onComplete }: FlowerCreatorProps) => {
  const [step, setStep] = useState(0);
  const [card, setCard] = useState<BloomCard>(defaultCard);

  const update = (partial: Partial<BloomCard>) => setCard(prev => ({ ...prev, ...partial }));

  const OptionGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-3 gap-3">{children}</div>
  );

  const OptionButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`glass-card p-3 text-center text-sm font-body transition-all duration-200 ${
        selected ? 'glow-border ring-1 ring-primary' : 'hover:ring-1 hover:ring-muted-foreground/30'
      }`}
    >
      {children}
    </button>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Flower Type</h3>
              <OptionGrid>
                {flowerTypes.map(f => (
                  <OptionButton key={f} selected={card.flowerType === f} onClick={() => update({ flowerType: f })}>
                    <FlowerSVG type={f} color={card.flowerColor} leafStyle="none" size={50} />
                    <span className="text-xs text-foreground/70 capitalize mt-1 block">{f.replace('-', ' ')}</span>
                  </OptionButton>
                ))}
              </OptionGrid>
            </div>
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Flower Color</h3>
              <div className="flex gap-3 flex-wrap">
                {flowerColors.map(c => (
                  <button
                    key={c}
                    onClick={() => update({ flowerColor: c })}
                    className={`w-10 h-10 rounded-full transition-all ${
                      card.flowerColor === c ? 'ring-2 ring-primary scale-110' : ''
                    }`}
                    style={{ background: `hsl(var(--bloom-${c}))` }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Leaf Style</h3>
              <div className="flex gap-3">
                {leafStyles.map(l => (
                  <OptionButton key={l} selected={card.leafStyle === l} onClick={() => update({ leafStyle: l })}>
                    <span className="capitalize text-foreground/70">{l}</span>
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Card Background</h3>
              <OptionGrid>
                {cardBgs.map(bg => (
                  <OptionButton key={bg} selected={card.cardBg === bg} onClick={() => update({ cardBg: bg })}>
                    <div className={`w-full h-10 rounded-md ${bgColors[bg]}`} />
                    <span className="capitalize text-xs text-foreground/70 mt-1 block">{bg}</span>
                  </OptionButton>
                ))}
              </OptionGrid>
            </div>
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Font Style</h3>
              <div className="flex gap-3 flex-wrap">
                {fontStyles.map(f => (
                  <OptionButton key={f} selected={card.fontStyle === f} onClick={() => update({ fontStyle: f })}>
                    <span className={`capitalize text-foreground/70 ${
                      f === 'elegant' ? 'font-display' : f === 'playful' ? 'font-body font-bold' : f === 'handwritten' ? 'italic' : ''
                    }`}>{f}</span>
                  </OptionButton>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Decoration</h3>
              <div className="flex gap-3 flex-wrap">
                {decorations.map(d => (
                  <OptionButton key={d} selected={card.decoration === d} onClick={() => update({ decoration: d })}>
                    <span className="text-lg">{decoEmojis[d]}</span>
                    <span className="capitalize text-xs text-foreground/70 block">{d}</span>
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Your Message</h3>
              <textarea
                value={card.message}
                onChange={e => update({ message: e.target.value })}
                className="w-full h-32 glass-card p-4 text-foreground bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-primary font-body"
                placeholder="Write something beautiful..."
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-1">{card.message.length}/200</p>
            </div>
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Your Name (optional)</h3>
              <input
                value={card.senderName}
                onChange={e => update({ senderName: e.target.value })}
                className="w-full glass-card p-3 text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary font-body"
                placeholder="From..."
                maxLength={30}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Messenger Character</h3>
              <OptionGrid>
                {characters.map(ch => (
                  <OptionButton key={ch} selected={card.character === ch} onClick={() => update({ character: ch })}>
                    <CharacterSVG character={ch} size={50} />
                    <span className="capitalize text-xs text-foreground/70 mt-1 block">{ch}</span>
                  </OptionButton>
                ))}
              </OptionGrid>
            </div>
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Animation</h3>
              <div className="flex gap-3 flex-wrap">
                {animations.map(a => (
                  <OptionButton key={a} selected={card.animation === a} onClick={() => update({ animation: a })}>
                    <span className="capitalize text-foreground/70 text-xs">{a.replace('-', ' ')}</span>
                  </OptionButton>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-foreground/60 text-sm font-body">Preview your creation</p>
            <div className={`glass-card p-6 w-full max-w-xs glow-border ${bgColors[card.cardBg]} flex flex-col items-center gap-4`}>
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} size={80} />
              <div className="flex items-center gap-2">
                <CharacterSVG character={card.character} size={40} />
                <span className="text-xs text-foreground/50 capitalize">{card.animation.replace('-', ' ')}</span>
              </div>
              <p className={`text-center text-foreground/90 text-sm ${
                card.fontStyle === 'elegant' ? 'font-display' : card.fontStyle === 'handwritten' ? 'italic' : 'font-body'
              }`}>
                {card.decoration !== 'none' && <span className="mr-1">{decoEmojis[card.decoration]}</span>}
                {card.message}
                {card.decoration !== 'none' && <span className="ml-1">{decoEmojis[card.decoration]}</span>}
              </p>
              {card.senderName && <p className="text-xs text-foreground/50">— {card.senderName}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`text-xs font-body px-3 py-1.5 rounded-full transition-all ${
              i === step
                ? 'bg-primary/20 text-primary glow-border'
                : i < step
                ? 'bg-muted text-foreground/60'
                : 'text-muted-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className={`glass-card px-5 py-2.5 text-sm font-body text-foreground/70 transition-all hover:text-foreground ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          Back
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="glass-card px-5 py-2.5 text-sm font-body text-primary glow-border hover:bg-primary/10 transition-all"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => onComplete(card)}
            className="glass-card px-6 py-2.5 text-sm font-body text-primary glow-border hover:bg-primary/10 transition-all animate-glow-pulse"
          >
            Send Bloom ✨
          </button>
        )}
      </div>
    </div>
  );
};
