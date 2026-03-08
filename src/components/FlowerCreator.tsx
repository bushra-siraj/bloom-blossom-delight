import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { EnvironmentBg } from './EnvironmentBg';
import type {
  BloomCard, FlowerType, FlowerColor, LeafStyle, BouquetSize,
  Environment, CardBg, FontStyle, Decoration, CharacterType, AnimationAction
} from '@/types/bloom';
import { defaultCard } from '@/types/bloom';

const steps = ['Flower', 'Color', 'Leaves', 'Bouquet', 'Card', 'Scene', 'Character', 'Message'];

const flowerTypes: FlowerType[] = ['rose', 'tulip', 'daisy', 'lily', 'sunflower', 'cherry-blossom'];
const flowerColors: FlowerColor[] = ['rose', 'lavender', 'mint', 'peach', 'sky', 'gold'];
const leafStyles: LeafStyle[] = ['classic', 'round', 'pointed', 'none'];
const bouquetSizes: BouquetSize[] = ['single', 'small', 'large'];
const environments: Environment[] = ['midnight', 'sunset', 'forest'];
const fontStyles: FontStyle[] = ['elegant', 'playful', 'modern', 'handwritten'];
const decorations: Decoration[] = ['bow', 'hearts', 'sparkles', 'stars', 'none'];
const characters: CharacterType[] = ['girl', 'boy', 'cat', 'robot', 'ghost', 'butterfly'];
const animations: AnimationAction[] = ['wink', 'wave', 'drop-flower', 'present-flower'];

const envLabels: Record<Environment, string> = {
  midnight: '🌙 Midnight Garden',
  sunset: '🌅 Sunset Field',
  forest: '🌲 Forest Clearing',
};

const decoEmojis: Record<Decoration, string> = {
  bow: '🎀', hearts: '💕', sparkles: '✨', stars: '⭐', none: '—',
};

const colorPresets = [
  '#e8729a', '#b07ed6', '#6ec9a8', '#f0a67a', '#6aade0', '#e8c84a',
  '#ff6b8a', '#d4a0e8', '#a0e8a0', '#f0c060', '#ff9090', '#90d0ff',
];

interface FlowerCreatorProps {
  onComplete: (card: BloomCard) => void;
}

export const FlowerCreator = ({ onComplete }: FlowerCreatorProps) => {
  const [step, setStep] = useState(0);
  const [card, setCard] = useState<BloomCard>(defaultCard);

  const update = (partial: Partial<BloomCard>) => setCard(prev => ({ ...prev, ...partial }));

  const OptionButton = ({ selected, onClick, children, className = '' }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) => (
    <button
      onClick={onClick}
      className={`glass-card p-3 text-center text-sm font-body transition-all duration-200 ${
        selected ? 'glow-border ring-1 ring-primary' : 'hover:ring-1 hover:ring-muted-foreground/30'
      } ${className}`}
    >
      {children}
    </button>
  );

  const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <div>
      <h3 className="text-foreground/80 text-sm font-body mb-3">{label}</h3>
      <div className="flex gap-2 flex-wrap items-center">
        {colorPresets.map(c => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-8 h-8 rounded-full transition-all ${value === c ? 'ring-2 ring-primary scale-110' : ''}`}
            style={{ background: c }}
          />
        ))}
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-8 h-8 rounded-full cursor-pointer border-0"
        />
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0: // Flower type
        return (
          <div className="space-y-4">
            <h3 className="text-foreground/80 text-sm font-body mb-3">Choose your flower</h3>
            <div className="grid grid-cols-3 gap-3">
              {flowerTypes.map(f => (
                <OptionButton key={f} selected={card.flowerType === f} onClick={() => update({ flowerType: f })}>
                  <FlowerSVG type={f} color={card.flowerColor} leafStyle="none" size={50} />
                  <span className="text-xs text-foreground/70 capitalize mt-1 block">{f === 'cherry-blossom' ? 'Sakura' : f}</span>
                </OptionButton>
              ))}
            </div>
            {/* Live preview */}
            <div className="flex justify-center pt-2">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} size={80} />
            </div>
          </div>
        );

      case 1: // Petal color
        return (
          <div className="space-y-5">
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Petal Color Preset</h3>
              <div className="flex gap-3 flex-wrap">
                {flowerColors.map(c => (
                  <button
                    key={c}
                    onClick={() => update({ flowerColor: c })}
                    className={`w-10 h-10 rounded-full transition-all ${card.flowerColor === c ? 'ring-2 ring-primary scale-110' : ''}`}
                    style={{ background: `hsl(var(--bloom-${c}))` }}
                  />
                ))}
              </div>
            </div>
            <ColorPicker label="Custom Petal Color" value={card.petalColor} onChange={v => update({ petalColor: v })} />
            <ColorPicker label="Glow Color" value={card.glowColor} onChange={v => update({ glowColor: v })} />
            <div className="flex justify-center pt-2">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} size={80} customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
            </div>
          </div>
        );

      case 2: // Leaf style
        return (
          <div className="space-y-4">
            <h3 className="text-foreground/80 text-sm font-body mb-3">Leaf Style</h3>
            <div className="flex gap-3 flex-wrap">
              {leafStyles.map(l => (
                <OptionButton key={l} selected={card.leafStyle === l} onClick={() => update({ leafStyle: l })}>
                  <span className="capitalize text-foreground/70">{l}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} size={100} />
            </div>
          </div>
        );

      case 3: // Bouquet size
        return (
          <div className="space-y-4">
            <h3 className="text-foreground/80 text-sm font-body mb-3">Bouquet Size</h3>
            <div className="flex gap-3">
              {bouquetSizes.map(b => (
                <OptionButton key={b} selected={card.bouquetSize === b} onClick={() => update({ bouquetSize: b })}>
                  <span className="text-foreground/70 capitalize">{b === 'small' ? 'Small (3)' : b === 'large' ? 'Large (5)' : 'Single'}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex justify-center pt-2 overflow-hidden">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} bouquetSize={card.bouquetSize} size={70} />
            </div>
          </div>
        );

      case 4: // Card design
        return (
          <div className="space-y-5">
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
            <ColorPicker label="Card Color" value={card.cardColor} onChange={v => update({ cardColor: v })} />
            <ColorPicker label="Particle Color" value={card.particleColor} onChange={v => update({ particleColor: v })} />
          </div>
        );

      case 5: // Environment
        return (
          <div className="space-y-4">
            <h3 className="text-foreground/80 text-sm font-body mb-3">Choose your scene</h3>
            <div className="space-y-3">
              {environments.map(env => (
                <OptionButton key={env} selected={card.environment === env} onClick={() => update({ environment: env })} className="w-full">
                  <div className="relative h-24 rounded-md overflow-hidden">
                    <EnvironmentBg environment={env} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-foreground font-body text-sm z-10">{envLabels[env]}</span>
                    </div>
                  </div>
                </OptionButton>
              ))}
            </div>
          </div>
        );

      case 6: // Character + animation
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-foreground/80 text-sm font-body mb-3">Messenger Character</h3>
              <div className="grid grid-cols-3 gap-3">
                {characters.map(ch => (
                  <OptionButton key={ch} selected={card.character === ch} onClick={() => update({ character: ch })}>
                    <CharacterSVG character={ch} size={50} />
                    <span className="capitalize text-xs text-foreground/70 mt-1 block">{ch}</span>
                  </OptionButton>
                ))}
              </div>
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
            <div className="flex justify-center">
              <CharacterSVG character={card.character} action={card.animation} size={80} animate />
            </div>
          </div>
        );

      case 7: // Message
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
            {/* Final preview */}
            <div className="glass-card p-4 text-center">
              <p className="text-xs text-foreground/50 mb-2">Preview</p>
              <div className="flex justify-center mb-2">
                <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} bouquetSize={card.bouquetSize} size={60} />
              </div>
              <p className={`text-foreground/90 text-sm ${
                card.fontStyle === 'elegant' ? 'font-display' : card.fontStyle === 'handwritten' ? 'italic' : 'font-body'
              }`}>
                {card.message || 'Your message here...'}
              </p>
              {card.senderName && <p className="text-xs text-foreground/50 mt-1">— {card.senderName}</p>}
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
      <div className="flex items-center justify-center gap-1.5 mb-6 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`text-xs font-body px-2.5 py-1 rounded-full transition-all ${
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
        {step < steps.length - 1 ? (
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
