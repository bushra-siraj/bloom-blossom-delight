import { supabase } from '@/integrations/supabase/client';

export async function recordBloom(flowerType: string, flowerColor: string, message: string, senderName: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.error('[recordBloom] No active session');
    return;
  }
  console.log('[recordBloom] calling RPC as user:', session.user.id);
  const { error } = await supabase.rpc('record_bloom', {
    p_flower_type: flowerType,
    p_flower_color: flowerColor,
    p_message: message,
    p_sender_name: senderName,
  });
  if (error) console.error('[recordBloom] RPC error:', error);
  else console.log('[recordBloom] success');
}

export async function fetchGlobalBlooms(): Promise<number> {
  const { data, error } = await supabase
    .from('global_stats')
    .select('total_blooms')
    .eq('id', 1)
    .single();
  if (error) { console.error(error); return 0; }
  return Number(data?.total_blooms ?? 0);
}

export async function fetchMyBlooms(): Promise<number> {
  const { count, error } = await supabase
    .from('user_flower_history')
    .select('*', { count: 'exact', head: true });
  if (error) { console.error(error); return 0; }
  return count ?? 0;
}
