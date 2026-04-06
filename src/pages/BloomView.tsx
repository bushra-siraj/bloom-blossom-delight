import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ReceiverExperience } from '@/components/ReceiverExperience';
import { Watermark } from '@/components/Watermark';
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

      const { data, error: fetchErr } = await supabase
        .from('shared_blooms')
        .select('card_data')
        .eq('id', id)
        .maybeSingle();

      if (fetchErr || !data) {
        console.error('[BloomView] fetch error:', fetchErr);
        setError(true);
      } else {
        setCard({ ...defaultCard, ...(data.card_data as Record<string, unknown>) } as BloomCard);
      }
      setLoading(false);
    };

    fetchBloom();
  }, [id]);

  const shareUrl = `${window.location.origin}/b/${id}`;
  const handleReset = () => navigate('/');

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🌸</div>
          <p className="text-foreground/50 text-sm font-body">Loading your bloom...</p>
        </div>
      </div>
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
      <Watermark />
      <ReceiverExperience card={card} onReset={handleReset} shareUrl={shareUrl} />
    </>
  );
};

export default BloomView;
