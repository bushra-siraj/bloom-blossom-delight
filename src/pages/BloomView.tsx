import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { ReceiverExperience } from '@/components/ReceiverExperience';
import { Watermark } from '@/components/Watermark';
import { BloomLoader } from '@/components/BloomLoader';
import type { BloomCard } from '@/types/bloom';
import { defaultCard } from '@/types/bloom';

const BloomView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<BloomCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) { setError(true); setLoading(false); return; }

    const fetchBloom = async () => {
      // Ensure we have a session (anonymous auth) before querying
      let { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { error: anonErr } = await supabase.auth.signInAnonymously();
        if (anonErr) console.warn('[BloomView] anon auth failed:', anonErr);
      }

      console.log('[BloomView] fetching bloom:', id);

      const { data, error: fetchErr } = await supabase
        .from('shared_blooms')
        .select('card_data')
        .eq('id', id)
        .maybeSingle();

      if (fetchErr || !data) {
        console.error('[BloomView] fetch error:', fetchErr, 'data:', data);
        setError(true);
      } else {
        console.log('[BloomView] bloom loaded successfully');
        setCard({ ...defaultCard, ...(data.card_data as Record<string, unknown>) } as BloomCard);
      }
      setLoading(false);
    };

    fetchBloom();
  }, [id]);

  const origin = window.location.origin;
  const receiverUrl = `${origin}/b/${id}`;
  const shareUrl = `${origin}/?b=${id}`;
  const ogImage = 'https://bloomforyou.me/preview.png';
  const handleReset = () => navigate('/');

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Someone sent you a flower 🌸 — BloomForYou</title>
          <meta property="og:title" content="Someone sent you a flower 🌸" />
          <meta property="og:description" content="Open to see your special bloom" />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={receiverUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Someone sent you a flower 🌸" />
          <meta name="twitter:description" content="Open to see your special bloom" />
          <meta name="twitter:image" content={ogImage} />
        </Helmet>
        <BloomLoader message="Loading your bloom..." />
      </>
    );
  }

  if (error || !card) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <div className="text-4xl mb-4">🥀</div>
          <p className="text-foreground/70 text-sm font-body mb-4">This bloom has expired or doesn't exist 🌸</p>
          <button onClick={handleReset}
            className="glass-card px-6 py-3 text-sm font-body text-primary glow-border">
            🌸 Create your own bloom
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Someone sent you a flower 🌸 — BloomForYou</title>
        <meta property="og:title" content="Someone sent you a flower 🌸" />
        <meta property="og:description" content="Open to see your special bloom" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={receiverUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Someone sent you a flower 🌸" />
        <meta name="twitter:description" content="Open to see your special bloom" />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <Watermark />
      <ReceiverExperience card={card} onReset={handleReset} shareUrl={shareUrl} />
    </>
  );
};

export default BloomView;
