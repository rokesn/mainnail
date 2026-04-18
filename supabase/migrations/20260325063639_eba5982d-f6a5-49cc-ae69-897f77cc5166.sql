
CREATE TABLE public.product_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  media_type text NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product media"
  ON public.product_media FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage product media"
  ON public.product_media FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
