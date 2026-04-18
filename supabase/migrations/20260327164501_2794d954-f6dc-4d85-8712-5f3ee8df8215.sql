
-- Tighten order inserts to require authenticated users or allow guest checkout
DROP POLICY "Users can insert orders" ON public.orders;
CREATE POLICY "Authenticated users can insert orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Reviews: require at minimum a product_id and rating
DROP POLICY "Anyone can insert reviews" ON public.reviews;
CREATE POLICY "Anyone can insert reviews" ON public.reviews FOR INSERT WITH CHECK (product_id IS NOT NULL AND rating >= 1 AND rating <= 5);

-- Newsletter stays open but that's acceptable for a subscription form
