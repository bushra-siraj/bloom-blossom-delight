import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useAnonAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[AnonAuth] state change:', _event, session?.user?.id);
      setUserId(session?.user?.id ?? null);
      setReady(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUserId(session.user.id);
        setReady(true);
      } else {
        supabase.auth.signInAnonymously().then(({ data, error }) => {
          if (error) console.error('[AnonAuth] sign-in error:', error);
          else console.log('[AnonAuth] signed in:', data.user?.id);
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userId, ready };
}
