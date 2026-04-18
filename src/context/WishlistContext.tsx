import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface WishlistContextType {
  items: string[];
  toggle: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<string[]>([]);

  const toggle = useCallback((productId: string) => {
    setItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      toast({ title: "✓ Aggiunto alla wishlist!" });
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => items.includes(productId), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
