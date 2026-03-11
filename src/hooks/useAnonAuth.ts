import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAnonAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
      setReady(true);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        supabase.auth.signInAnonymously().catch(console.error);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userId, ready };
}
