import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { EnvironmentBg } from './EnvironmentBg';
import { DecorationSVG } from './DecorationSVG';
import { FloatingPetals } from './FloatingPetals';
import { MessageCardRenderer, CardStylePreview } from './cards/MessageCardRenderer';
import type {
  BloomCard, FlowerType, FlowerColor, LeafStyle, BouquetSize,
  Environment, CardStyle, FontStyle, Decoration, CharacterType, AnimationAction
} from '@/types/bloom';
import { defaultCard } from '@/types/bloom';

const steps = ['Flower', 'Leaves', 'Bouquet', 'Card', 'Scene', 'Character', 'Action', 'Message', 'Preview'];

const flowerTypes: FlowerType[] = ['rose', 'tulip', 'daisy', 'lily', 'sunflower', 'cherry-blossom'];
const flowerColors: FlowerColor[] = ['rose', 'lavender', 'mint', 'peach', 'sky', 'gold'];
const leafStyles: LeafStyle[] = ['classic', 'round', 'pointed', 'none'];
const bouquetSizes: BouquetSize[] = ['single', 'small', 'large'];
const environments: Environment[] = ['midnight', 'sunset', 'forest', 'clouds'];
const cardStyles: CardStyle[] = ['classic', 'polaroid', 'envelope', 'glass'];
const fontStyles: FontStyle[] = ['romantic', 'handwritten', 'modern'];
const decorations: Decoration[] = ['bow', 'sparkles', 'hearts', 'butterflies', 'vines', 'none'];
const characters: CharacterType[] = ['girl', 'boy', 'cat', 'robot', 'ghost', 'butterfly'];
const animations: AnimationAction[] = ['wink', 'wave', 'drop-flower', 'present-flower'];

const envLabels: Record<Environment, { icon: string; name: string }> = {
  midnight: { icon: '🌙', name: 'Midnight Sky' },
  sunset: { icon: '🌅', name: 'Sunset Field' },
  forest: { icon: '🌲', name: 'Forest Clearing' },
  clouds: { icon: '☁️', name: 'Dreamy Clouds' },
};

const cardStyleLabels: Record<CardStyle, string> = {
  classic: 'Classic Card',
  polaroid: 'Polaroid',
  envelope: 'Envelope',
  glass: 'Glass Card',
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

  const OptionButton = ({ selected, onClick, children, className = '' }: {
    selected: boolean; onClick: () => void; children: React.ReactNode; className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`glass-card p-3 text-center text-sm font-body transition-all duration-300 hover:scale-[1.02] ${
        selected
          ? 'ring-2 ring-primary/60 shadow-[0_0_20px_hsl(330_60%_65%/0.2)]'
          : 'hover:ring-1 hover:ring-foreground/10'
      } ${className}`}
    >
      {children}
    </button>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-foreground/70 text-xs font-body uppercase tracking-wider mb-3">{children}</h3>
  );

  const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
    <div>
      <SectionTitle>{label}</SectionTitle>
      <div className="flex gap-2 flex-wrap items-center">
        {colorPresets.map(c => (
          <button key={c} onClick={() => onChange(c)}
            className={`w-7 h-7 rounded-full transition-all duration-200 ${value === c ? 'ring-2 ring-primary scale-110 shadow-lg' : 'hover:scale-105'}`}
            style={{ background: c }}
          />
        ))}
        <label className="w-7 h-7 rounded-full cursor-pointer overflow-hidden relative border border-foreground/20">
          <input type="color" value={value} onChange={e => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="w-full h-full" style={{
            background: `conic-gradient(#e8729a, #f0c060, #6ec9a8, #6aade0, #b07ed6, #e8729a)`,
          }} />
        </label>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0: // Flower type + color
        return (
          <div className="space-y-5">
            <SectionTitle>Choose your flower</SectionTitle>
            <div className="grid grid-cols-3 gap-2.5">
              {flowerTypes.map(f => (
                <OptionButton key={f} selected={card.flowerType === f} onClick={() => update({ flowerType: f })}>
                  <div className="flex flex-col items-center gap-1.5">
                    <FlowerSVG type={f} color={card.flowerColor} leafStyle="none" size={48} />
                    <span className="text-[10px] text-foreground/60 capitalize">{f === 'cherry-blossom' ? 'Sakura' : f}</span>
                  </div>
                </OptionButton>
              ))}
            </div>
            <SectionTitle>Petal color</SectionTitle>
            <div className="flex gap-2.5 flex-wrap">
              {flowerColors.map(c => (
                <button key={c} onClick={() => update({ flowerColor: c })}
                  className={`w-9 h-9 rounded-full transition-all duration-200 ${card.flowerColor === c ? 'ring-2 ring-primary scale-110 shadow-lg' : 'hover:scale-105'}`}
                  style={{ background: `hsl(var(--bloom-${c}))` }}
                />
              ))}
            </div>
            <div className="flex justify-center pt-1">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} size={90} />
            </div>
          </div>
        );

      case 1: // Leaf style
        return (
          <div className="space-y-5">
            <SectionTitle>Leaf Style</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {leafStyles.map(l => (
                <OptionButton key={l} selected={card.leafStyle === l} onClick={() => update({ leafStyle: l })}>
                  <span className="capitalize text-foreground/70">{l}</span>
                </OptionButton>
              ))}
            </div>
            <ColorPicker label="Custom petal color" value={card.petalColor} onChange={v => update({ petalColor: v })} />
            <div className="flex justify-center pt-1">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} size={100}
                customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
            </div>
          </div>
        );

      case 2: // Bouquet
        return (
          <div className="space-y-5">
            <SectionTitle>Bouquet size</SectionTitle>
            <div className="grid grid-cols-3 gap-2.5">
              {bouquetSizes.map(b => (
                <OptionButton key={b} selected={card.bouquetSize === b} onClick={() => update({ bouquetSize: b })}>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{b === 'single' ? '🌷' : b === 'small' ? '💐' : '🌺'}</span>
                    <span className="text-[10px] text-foreground/60">{b === 'small' ? '3 flowers' : b === 'large' ? '5 flowers' : 'Single'}</span>
                  </div>
                </OptionButton>
              ))}
            </div>
            <div className="flex justify-center pt-1 overflow-hidden">
              <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} bouquetSize={card.bouquetSize} size={75} />
            </div>
          </div>
        );

      case 3: // Card design
        return (
          <div className="space-y-5">
            <SectionTitle>Card style</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {cardStyles.map(cs => (
                <CardStylePreview key={cs} style={cs} selected={card.cardStyle === cs} onClick={() => update({ cardStyle: cs })} />
              ))}
            </div>
            <SectionTitle>Decoration</SectionTitle>
            <div className="flex gap-2.5 flex-wrap">
              {decorations.map(d => (
                <OptionButton key={d} selected={card.decoration === d} onClick={() => update({ decoration: d })}>
                  <div className="flex flex-col items-center gap-1 min-w-[40px]">
                    {d !== 'none' ? <DecorationSVG decoration={d} size={22} animate={false} /> : <span className="text-foreground/30 text-sm">—</span>}
                    <span className="text-[10px] text-foreground/50 capitalize">{d}</span>
                  </div>
                </OptionButton>
              ))}
            </div>
            <SectionTitle>Font</SectionTitle>
            <div className="flex gap-2.5 flex-wrap">
              {fontStyles.map(f => (
                <OptionButton key={f} selected={card.fontStyle === f} onClick={() => update({ fontStyle: f })}>
                  <span className={`text-foreground/70 text-sm ${
                    f === 'romantic' ? 'font-display italic' : f === 'handwritten' ? 'font-body' : 'font-body font-semibold tracking-wide'
                  }`}>{f === 'romantic' ? 'Romantic Script' : f === 'handwritten' ? 'Handwritten' : 'Modern Serif'}</span>
                </OptionButton>
              ))}
            </div>
            <ColorPicker label="Card color" value={card.cardColor} onChange={v => update({ cardColor: v })} />
          </div>
        );

      case 4: // Environment
        return (
          <div className="space-y-4">
            <SectionTitle>Choose your scene</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {environments.map(env => (
                <OptionButton key={env} selected={card.environment === env} onClick={() => update({ environment: env })} className="p-0 overflow-hidden">
                  <div className="relative h-28 rounded-lg overflow-hidden">
                    <EnvironmentBg environment={env} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <span className="text-lg">{envLabels[env].icon}</span>
                      <span className="text-foreground text-xs font-body mt-1">{envLabels[env].name}</span>
                    </div>
                  </div>
                </OptionButton>
              ))}
            </div>
            <ColorPicker label="Glow color" value={card.glowColor} onChange={v => update({ glowColor: v })} />
            <ColorPicker label="Particle color" value={card.particleColor} onChange={v => update({ particleColor: v })} />
          </div>
        );

      case 5: // Character
        return (
          <div className="space-y-5">
            <SectionTitle>Messenger character</SectionTitle>
            <div className="grid grid-cols-3 gap-2.5">
              {characters.map(ch => (
                <OptionButton key={ch} selected={card.character === ch} onClick={() => update({ character: ch })}>
                  <div className="flex flex-col items-center gap-1">
                    <CharacterSVG character={ch} size={52} />
                    <span className="text-[10px] text-foreground/60 capitalize">{ch}</span>
                  </div>
                </OptionButton>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <CharacterSVG character={card.character} size={90} />
            </div>
          </div>
        );

      case 6: // Animation
        return (
          <div className="space-y-5">
            <SectionTitle>Choose animation</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {animations.map(a => (
                <OptionButton key={a} selected={card.animation === a} onClick={() => update({ animation: a })}>
                  <span className="capitalize text-foreground/70 text-xs">{a.replace(/-/g, ' ')}</span>
                </OptionButton>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <CharacterSVG character={card.character} action={card.animation} size={90} animate />
            </div>
          </div>
        );

      case 7: // Message
        return (
          <div className="space-y-4">
            <SectionTitle>Your message</SectionTitle>
            <textarea
              value={card.message}
              onChange={e => update({ message: e.target.value })}
              className="w-full h-28 glass-card p-4 text-foreground bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 font-body text-sm"
              placeholder="Write something beautiful..."
              maxLength={200}
            />
            <p className="text-[10px] text-muted-foreground">{card.message.length}/200</p>
            <SectionTitle>Your name (optional)</SectionTitle>
            <input
              value={card.senderName}
              onChange={e => update({ senderName: e.target.value })}
              className="w-full glass-card p-3 text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/50 font-body text-sm"
              placeholder="From..."
              maxLength={30}
            />
          </div>
        );

      case 8: // Preview
        return (
          <div className="space-y-4">
            <SectionTitle>Preview your bloom</SectionTitle>
            {/* Mini environment preview */}
            <div className="relative h-64 rounded-2xl overflow-hidden glass-card">
              <EnvironmentBg environment={card.environment} glowColor={card.glowColor} particleColor={card.particleColor} />
              <FloatingPetals count={8} color={card.petalColor} />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
                <CharacterSVG character={card.character} size={50} />
                <FlowerSVG type={card.flowerType} color={card.flowerColor} leafStyle={card.leafStyle} bouquetSize={card.bouquetSize} size={60}
                  customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
                <MessageCardRenderer card={card} mini />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-foreground/40 font-body">Step {step + 1} of {steps.length}</span>
          <span className="text-[10px] text-primary/80 font-body font-semibold">{steps[step]}</span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-2 px-0.5">
          {steps.map((_, i) => (
            <button key={i} onClick={() => setStep(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'bg-primary scale-150 shadow-[0_0_8px_hsl(330_60%_65%/0.5)]' :
                i < step ? 'bg-primary/50' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="min-h-[320px]"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6 gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className={`glass-card px-5 py-2.5 text-sm font-body text-foreground/60 transition-all hover:text-foreground ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          ← Back
        </button>
        {step < steps.length - 1 ? (
          <button onClick={() => setStep(step + 1)}
            className="glass-card px-6 py-2.5 text-sm font-body text-primary transition-all hover:shadow-[0_0_20px_hsl(330_60%_65%/0.3)]">
            Next →
          </button>
        ) : (
          <motion.button
            onClick={() => onComplete(card)}
            className="glass-card px-6 py-2.5 text-sm font-body text-primary transition-all"
            animate={{ boxShadow: ['0 0 15px hsl(330 60% 65% / 0.2)', '0 0 30px hsl(330 60% 65% / 0.4)', '0 0 15px hsl(330 60% 65% / 0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Send Bloom ✨
          </motion.button>
        )}
      </div>
    </div>
  );
};

function getCardStyleClasses(style: CardStyle): string {
  switch (style) {
    case 'glass': return 'glass-card rounded-xl';
    case 'rounded': return 'rounded-2xl border border-foreground/10';
    case 'polaroid': return 'rounded-sm bg-foreground/5 border-4 border-foreground/10 border-b-[16px]';
    case 'envelope': return 'rounded-lg border border-foreground/10 relative';
  }
}

function getFontClasses(font: FontStyle): string {
  switch (font) {
    case 'romantic': return 'font-display italic';
    case 'handwritten': return 'font-body';
    case 'modern': return 'font-body font-semibold tracking-wide';
  }
}
