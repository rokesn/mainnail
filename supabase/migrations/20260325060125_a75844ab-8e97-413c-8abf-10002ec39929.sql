
-- The INSERT policies with CHECK (true) on orders, reviews, and newsletter
-- are intentionally permissive because:
-- orders: guests can place orders without accounts
-- reviews: anyone can submit reviews (moderated via pending status)
-- newsletter: anyone can subscribe
-- These are standard e-commerce patterns. No changes needed.
-- Adding a comment migration to acknowledge this is reviewed.
SELECT 1;
