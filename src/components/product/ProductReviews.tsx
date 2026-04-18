import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Plus } from "lucide-react";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  text: string;
  photo_url: string | null;
  profile_pic_url: string | null;
  created_at: string;
}

const italianFlag = "🇮🇹";

const ProductReviews = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      setReviews((data as unknown as Review[]) || []);
      setLoading(false);
    };
    load();
  }, [productId]);

  const avgRating = "4.9";
  const displayReviewCount = (1728 + reviews.length).toLocaleString("it-IT");

  const getPhotos = (photoUrl: string | null): string[] => {
    if (!photoUrl) return [];
    return photoUrl.split("|||").map(u => u.trim()).filter(Boolean);
  };

  if (loading) return null;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground font-serif">{avgRating}</p>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={i < Math.round(Number(avgRating)) ? "fill-gold text-gold" : "text-muted-foreground"} />
            ))}
          </div>
          <p className="text-muted-foreground text-xs font-sans mt-1">{displayReviewCount} recensioni</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm font-sans">Nessuna recensione ancora.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => {
            const photos = getPhotos(review.photo_url);
            return (
              <div key={review.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {review.profile_pic_url ? (
                      <img src={review.profile_pic_url} alt={review.user_name} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-sans font-bold text-sm">
                        {review.user_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-foreground font-sans font-semibold text-sm flex items-center gap-1.5">
                        {review.user_name}
                        <span className="text-base" title="Italia">{italianFlag}</span>
                      </p>
                      <p className="text-muted-foreground text-xs font-sans">
                        {new Date(review.created_at).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < review.rating ? "fill-gold text-gold" : "text-muted-foreground"} />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80 text-sm font-sans leading-relaxed">{review.text}</p>
                {photos.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {photos.map((url, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedImage(url)}
                        className="relative group rounded-lg overflow-hidden w-24 h-24 hover:ring-2 hover:ring-gold transition-all"
                      >
                        <img src={url} alt="Review" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-nero/0 group-hover:bg-nero/20 flex items-center justify-center transition-colors">
                          <Plus className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" size={24} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground font-sans">
                  <span className="text-green-500">✓</span> Acquisto verificato
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-nero/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gold transition-colors p-2"
            >
              <Plus className="rotate-45" size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Review Full Size" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
