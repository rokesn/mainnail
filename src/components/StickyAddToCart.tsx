import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

interface StickyAddToCartProps {
  productName: string;
  priceFormatted: string;
  onAddToCart: () => void;
}

const StickyAddToCart = ({ productName, priceFormatted, onAddToCart }: StickyAddToCartProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border shadow-lg p-3 md:hidden">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="min-w-0">
          <p className="font-sans text-xs text-muted-foreground truncate">{productName}</p>
          <p className="font-serif text-lg font-bold text-gold-dark">{priceFormatted}</p>
        </div>
        <button
          onClick={onAddToCart}
          className="flex items-center gap-2 bg-gold text-nero px-5 py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors flex-shrink-0 text-sm"
        >
          <ShoppingBag size={16} />
          Aggiungi
        </button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
