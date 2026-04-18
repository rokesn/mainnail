
-- Create product_variants table
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL, -- References hardcoded product ID (e.g., 'personal-pro')
  name TEXT NOT NULL, -- Color name (e.g., 'Bianco', 'Nero', 'Oro')
  color_code TEXT, -- Optional hex color code (e.g., '#FFFFFF')
  image_url TEXT, -- Specific image for this variant
  price NUMERIC(10,2), -- Specific price for this variant
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view product variants" 
  ON public.product_variants FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert product variants" 
  ON public.product_variants FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product variants" 
  ON public.product_variants FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product variants" 
  ON public.product_variants FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_product_variants_updated_at 
  BEFORE UPDATE ON public.product_variants 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
