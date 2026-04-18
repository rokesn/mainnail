import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DescriptionBlock {
  id: string;
  product_id: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  sort_order: number;
}

export const useProductDescriptions = (productId: string) => {
  const [descriptionBlocks, setDescriptionBlocks] = useState<DescriptionBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("product_description_blocks" as any)
        .select("*")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        setDescriptionBlocks(data as any[]);
      }
      setLoading(false);
    };

    fetchBlocks();
  }, [productId]);

  return { descriptionBlocks, loading };
};
