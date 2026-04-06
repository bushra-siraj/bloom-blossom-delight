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
import { useAnonAuth } from '@/hooks/useAnonAuth';
import { supabase } from '@/integrations/supabase/client';
import { generateShortId } from '@/lib/shortId';

const Index = () => {
  const [mode, setMode] = useState<'create' | 'preview'>('create');
  const [card, setCard] = useState<BloomCard | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [liveCard, setLiveCard] = useState<BloomCard>(defaultCard);
  const [bloomVersion, setBloomVersion] = useState(0);
  useAnonAuth();

  const handleComplete = async (c: BloomCard) => {
    setCard(c);
    setMode('preview');

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

      // Generate short ID and save bloom data
      const shortId = generateShortId();
      console.log('[SendBloom] saving bloom with ID:', shortId);
      const { error: shareError } = await (supabase as any).from('shared_blooms').insert({
        id: shortId,
        card_data: c,
      });
      if (shareError) throw shareError;
      console.log('[SendBloom] bloom saved successfully:', shortId);

      // Build the clean short URL
      const url = `${window.location.origin}/b/${shortId}`;
      setShareUrl(url);

      // Insert flower history
      const { error: insertError } = await supabase.from('user_flower_history').insert({
        user_id: userId,
        flower_type: c.flowerType,
        flower_color: c.flowerColor,
        message: sanitize(c.message || ''),
        sender_name: sanitize(c.senderName || ''),
      });
      if (insertError) throw insertError;

      // Increment global counter
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

      setBloomVersion(v => v + 1);
      console.log('[Bloom] saved with short ID:', shortId);
    } catch (err) {
      console.error('[Bloom] save failed:', err);
      // Fallback: still show preview even if DB save fails
    }
  };

  const handleReset = () => {
    setCard(null);
    setShareUrl('');
    setMode('create');
    window.history.replaceState(null, '', window.location.pathname);
  };

  if (mode === 'preview' && card) {
    return (
      <>
        <Watermark />
        <ReceiverExperience card={card} onReset={handleReset} shareUrl={shareUrl} />
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
