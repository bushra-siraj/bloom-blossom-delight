import { supabase } from '@/integrations/supabase/client';

async function ensureAnonUserId(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user?.id) return session.user.id;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error('[BloomAuth] anonymous sign-in failed:', error);
    throw error;
  }

  const userId = data.user?.id ?? data.session?.user?.id;
  if (!userId) {
    throw new Error('Anonymous session could not be established');
  }

  return userId;
}

export async function recordBloom(
  flowerType: string,
  flowerColor: string,
  message: string,
  senderName: string
): Promise<number> {
  const userId = await ensureAnonUserId();
  console.log('[recordBloom] persisting bloom for user:', userId);

  const { error: rpcError } = await supabase.rpc('record_bloom', {
    p_flower_type: flowerType,
    p_flower_color: flowerColor,
    p_message: message,
    p_sender_name: senderName,
  });

  if (rpcError) {
    console.error('[recordBloom] RPC error:', rpcError);
    throw rpcError;
  }

  const { data, error: fetchError } = await supabase
    .from('global_stats')
    .select('total_blooms')
    .eq('id', 1)
    .single();

  if (fetchError) {
    console.error('[recordBloom] failed to fetch updated total:', fetchError);
    throw fetchError;
  }

  const total = Number(data?.total_blooms ?? 0);
  console.log('[recordBloom] success. Updated total_blooms:', total);
  return total;
}

export async function fetchGlobalBlooms(): Promise<number> {
  const { data, error } = await supabase
    .from('global_stats')
    .select('total_blooms')
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    return 0;
  }

  return Number(data?.total_blooms ?? 0);
}

export async function fetchMyBlooms(): Promise<number> {
  try {
    const userId = await ensureAnonUserId();
    const { count, error } = await supabase
      .from('user_flower_history')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) {
      console.error(error);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error('[fetchMyBlooms] failed:', error);
    return 0;
  }
}

