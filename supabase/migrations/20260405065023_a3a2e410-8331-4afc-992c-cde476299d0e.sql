
CREATE TABLE public.shared_blooms (
  id TEXT PRIMARY KEY,
  card_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.shared_blooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read shared blooms"
  ON public.shared_blooms FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert shared blooms"
  ON public.shared_blooms FOR INSERT
  TO authenticated
  WITH CHECK (true);
