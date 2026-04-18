import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  color_code: string | null;
  image_url: string | null;
  price: number | null;
}

export const useProductVariants = (productId: string) => {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) {
      setVariants([]);
      setLoading(false);
      return;
    }

    const fetchVariants = async () => {
      setLoading(true);
      try {
        const { data, error: supabaseError } = await supabase
          .from("product_variants" as any)
          .select("*")
          .eq("product_id", productId)
          .order("created_at", { ascending: true });

        if (supabaseError) throw supabaseError;
        setVariants((data as any) || []);
      } catch (err: any) {
        console.error("Error fetching product variants:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [productId]);

  return { variants, loading, error };
};
