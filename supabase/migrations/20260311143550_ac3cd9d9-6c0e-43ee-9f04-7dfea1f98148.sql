
-- Global stats: single-row table
CREATE TABLE public.global_stats (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  total_blooms bigint NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Seed the single row
INSERT INTO public.global_stats (id, total_blooms) VALUES (1, 0);

ALTER TABLE public.global_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can read global stats
CREATE POLICY "Anyone can read global stats"
  ON public.global_stats FOR SELECT
  USING (true);

-- User flower history
CREATE TABLE public.user_flower_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  flower_type text NOT NULL,
  flower_color text NOT NULL,
  message text NOT NULL DEFAULT '',
  sender_name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_flower_history ENABLE ROW LEVEL SECURITY;

-- Users can read their own history
CREATE POLICY "Users can read own history"
  ON public.user_flower_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own history
CREATE POLICY "Users can insert own history"
  ON public.user_flower_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to record a bloom: increments global count + inserts history row
CREATE OR REPLACE FUNCTION public.record_bloom(
  p_flower_type text,
  p_flower_color text,
  p_message text DEFAULT '',
  p_sender_name text DEFAULT ''
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.global_stats SET total_blooms = total_blooms + 1, updated_at = now() WHERE id = 1;
  INSERT INTO public.user_flower_history (user_id, flower_type, flower_color, message, sender_name)
  VALUES (auth.uid(), p_flower_type, p_flower_color, p_message, p_sender_name);
END;
$$;
