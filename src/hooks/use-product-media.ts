import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductMediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  placement?: "gallery" | "tab";
}

interface DBMediaItem {
  id: string;
  media_type: string;
  url: string;
  thumbnail_url: string | null;
  sort_order: number;
  placement?: string;
}

const getYouTubeThumbnail = (url: string): string | undefined => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return undefined;
};

export const useProductMedia = (productId: string, fallbackImages: string[]) => {
  const [media, setMedia] = useState<ProductMediaItem[]>(
    fallbackImages.map(url => ({ type: "image" as const, url }))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("product_media")
        .select("*")
        .eq("product_id", productId)
        .order("sort_order", { ascending: true });

      const items = (data as DBMediaItem[]) || [];
      if (items.length > 0) {
        setMedia(items.map(m => ({
          type: m.media_type as "image" | "video",
          url: m.url,
          thumbnail: m.media_type === "video"
            ? (m.thumbnail_url || getYouTubeThumbnail(m.url))
            : undefined,
          placement: (m.placement as "gallery" | "tab") || "gallery",
        })));
      }
      setLoading(false);
    };
    load();
  }, [productId]);

  return { media, loading };
};
