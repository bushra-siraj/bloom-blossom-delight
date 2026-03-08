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

function encodeCard(card: BloomCard): string {
  return btoa(encodeURIComponent(JSON.stringify(card)));
}

function decodeCard(hash: string): BloomCard | null {
  try {
    return JSON.parse(decodeURIComponent(atob(hash)));
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
