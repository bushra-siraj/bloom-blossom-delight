import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import LZString from 'lz-string';
import { FloatingPetals } from '@/components/FloatingPetals';
import { FlowerCreator } from '@/components/FlowerCreator';
import { ReceiverExperience } from '@/components/ReceiverExperience';
import { AppSidebar } from '@/components/AppSidebar';
import { Watermark } from '@/components/Watermark';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { BloomCard } from '@/types/bloom';
import { defaultCard } from '@/types/bloom';
import { useAnonAuth } from '@/hooks/useAnonAuth';
import { supabase } from '@/integrations/supabase/client';

function encodeCard(card: BloomCard): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(card));
}

function decodeCard(encoded: string): BloomCard | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return { ...defaultCard, ...JSON.parse(json) } as BloomCard;
  } catch {
    return null;
  }
}

const Index = () => {
  const [mode, setMode] = useState<'create' | 'preview'>('create');
  const [card, setCard] = useState<BloomCard | null>(null);
  const [liveCard, setLiveCard] = useState<BloomCard>(defaultCard);
  const [bloomVersion, setBloomVersion] = useState(0);
  const [searchParams] = useSearchParams();
  useAnonAuth();

  useEffect(() => {
    // Check query param ?d= first, then legacy hash for backwards compat
    const dParam = searchParams.get('d');
    const hash = window.location.hash.slice(1);
    const encoded = dParam || hash;
    if (encoded) {
      const decoded = decodeCard(encoded);
      if (decoded) {
        setCard(decoded);
        setMode('preview');
      }
    }
  }, [searchParams]);

  const handleComplete = async (c: BloomCard) => {
    setCard(c);
    setMode('preview');
    const encoded = encodeCard(c);
    window.history.replaceState(null, '', `?d=${encoded}`);

    try {
      let { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const { data, error: anonError } = await supabase.auth.signInAnonymously();
        if (anonError) throw anonError;
        session = data.session ?? null;
      }

      const userId = session?.user?.id;
      if (!userId) throw new Error('Missing user_id for bloom insert');

      const sanitize = (s: string) => s.replace(/<[^>]*>/g, '').trim();

      const { error: insertError } = await supabase.from('user_flower_history').insert({
        user_id: userId,
        flower_type: c.flowerType,
        flower_color: c.flowerColor,
        message: sanitize(c.message || ''),
        sender_name: sanitize(c.senderName || ''),
      });
      if (insertError) throw insertError;

      const { data: currentStats, error: currentStatsError } = await supabase
        .from('global_stats')
        .select('total_blooms')
        .eq('id', 1)
        .single();
      if (currentStatsError) throw currentStatsError;

      const nextTotal = Number(currentStats?.total_blooms ?? 0) + 1;

      const { error: updateError } = await supabase
        .from('global_stats')
        .update({ total_blooms: nextTotal, updated_at: new Date().toISOString() })
        .eq('id', 1);
      if (updateError) throw updateError;

      const { data: updatedStats, error: updatedStatsError } = await supabase
        .from('global_stats')
        .select('total_blooms')
        .eq('id', 1)
        .single();
      if (updatedStatsError) throw updatedStatsError;

      setBloomVersion(v => v + 1);
      console.log('[Bloom] direct insert/update succeeded. Updated total_blooms:', Number(updatedStats?.total_blooms ?? 0));
    } catch (err) {
      console.error('[Bloom] direct insert/update failed:', err);
    }
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
        <AppSidebar card={liveCard} bloomVersion={bloomVersion} />

        <div className="flex-1 flex flex-col items-center justify-start relative overflow-hidden">
          <FloatingPetals count={10} />

          <SidebarTrigger className="fixed top-4 left-4 z-50 glass-card p-2 rounded-full text-foreground/50 hover:text-primary transition-colors h-8 w-8" />

          {/* Solid layer to prevent backdrop-blur from processing animated petals underneath — fixes mobile flickering */}
          <div className="relative z-10 w-full" style={{ isolation: 'isolate' }}>
            <div className="absolute inset-0 bg-background/80 -z-10" />
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
