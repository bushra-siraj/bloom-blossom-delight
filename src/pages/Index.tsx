import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingPetals } from '@/components/FloatingPetals';
import { FlowerCreator } from '@/components/FlowerCreator';
import { ReceiverExperience } from '@/components/ReceiverExperience';
import { AppSidebar } from '@/components/AppSidebar';
import { Watermark } from '@/components/Watermark';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { BloomCard } from '@/types/bloom';
import { defaultCard } from '@/types/bloom';

// Compact encoding: pipe-delimited values with single-char enum codes
const ENUM_CODES: Record<string, Record<string, string>> = {
  flowerType:  { rose: 'r', tulip: 't', daisy: 'd', lily: 'l', sunflower: 's', 'cherry-blossom': 'c' },
  flowerColor: { rose: 'r', lavender: 'l', mint: 'm', peach: 'p', sky: 's', gold: 'g' },
  leafStyle:   { classic: 'c', round: 'r', pointed: 'p', none: 'n' },
  bouquetSize: { single: 's', small: 'm', large: 'l' },
  environment: { midnight: 'm', sunset: 's', forest: 'f', clouds: 'c' },
  cardStyle:   { classic: 'c', polaroid: 'p', envelope: 'e', glass: 'g' },
  fontStyle:   { romantic: 'r', handwritten: 'h', modern: 'm' },
  decoration:  { bow: 'b', sparkles: 's', hearts: 'h', butterflies: 'u', vines: 'v', none: 'n' },
  character:   { girl: 'g', boy: 'b', cat: 'c', robot: 'r', ghost: 'h', butterfly: 'u' },
  animation:   { wink: 'w', wave: 'v', 'drop-flower': 'd', 'present-flower': 'p' },
};

// Reverse lookup
const REV_ENUM: Record<string, Record<string, string>> = {};
for (const [field, map] of Object.entries(ENUM_CODES)) {
  REV_ENUM[field] = Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

// Encode order (fixed) — colors stored as short hex without #
const FIELDS = [
  'flowerType', 'flowerColor', 'leafStyle', 'bouquetSize', 'environment',
  'cardStyle', 'fontStyle', 'decoration', 'character', 'animation',
  'petalColor', 'glowColor', 'particleColor', 'cardColor', 'message', 'senderName',
] as const;

function encodeCard(card: BloomCard): string {
  const parts = FIELDS.map(f => {
    const val = (card as any)[f] as string;
    if (ENUM_CODES[f]) return ENUM_CODES[f][val] || val;
    if (f.endsWith('Color')) return val.replace('#', '');
    return val;
  });
  // Trim trailing empty parts
  while (parts.length && !parts[parts.length - 1]) parts.pop();
  return btoa(parts.join('|'));
}

function decodeCard(hash: string): BloomCard | null {
  try {
    const parts = atob(hash).split('|');
    const card: any = { ...defaultCard };
    FIELDS.forEach((f, i) => {
      if (i >= parts.length || !parts[i]) return;
      if (REV_ENUM[f]) card[f] = REV_ENUM[f][parts[i]] || parts[i];
      else if (f.endsWith('Color')) card[f] = '#' + parts[i];
      else card[f] = parts[i];
    });
    return card as BloomCard;
  } catch {
    return null;
  }
}

const Index = () => {
  const [mode, setMode] = useState<'create' | 'preview'>('create');
  const [card, setCard] = useState<BloomCard | null>(null);
  const [liveCard, setLiveCard] = useState<BloomCard>(defaultCard);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const decoded = decodeCard(hash);
      if (decoded) {
        setCard(decoded);
        setMode('preview');
      }
    }
  }, []);

  const handleComplete = (c: BloomCard) => {
    setCard(c);
    setMode('preview');
    const encoded = encodeCard(c);
    window.history.replaceState(null, '', `#${encoded}`);
  };

  const handleReset = () => {
    setCard(null);
    setMode('create');
    window.history.replaceState(null, '', window.location.pathname);
  };

  if (mode === 'preview' && card) {
    return (
      <>
        <Watermark />
        <ReceiverExperience card={card} onReset={handleReset} />
      </>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full relative">
        <AppSidebar card={liveCard} />

        <div className="flex-1 flex flex-col items-center justify-start relative overflow-hidden">
          <FloatingPetals count={10} />

          <SidebarTrigger className="fixed top-4 left-4 z-50 glass-card p-2 rounded-full text-foreground/50 hover:text-primary transition-colors h-8 w-8" />

          <div className="relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center pt-8 pb-4 px-4"
            >
              <h1 className="text-3xl md:text-4xl font-display text-glow text-foreground tracking-tight">
                BloomForYou
              </h1>
              <p className="text-foreground/40 text-xs font-body mt-1.5">
                Design a digital flower & send it to someone special
              </p>
            </motion.div>

            <FlowerCreator onComplete={handleComplete} onCardChange={setLiveCard} />
          </div>

          <Watermark />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
