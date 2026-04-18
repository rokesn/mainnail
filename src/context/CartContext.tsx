import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";

export interface CartVariant {
  id: string;
  name: string;
  image_url?: string | null;
  price?: number | null;
}

export interface CartItem {
  product: Product;
  variant?: CartVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant?: CartVariant) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, variant?: CartVariant) => {
    setItems(prev => {
      const existing = prev.find(i => 
        i.product.id === product.id && 
        ((!variant && !i.variant) || (variant && i.variant && variant.id === i.variant.id))
      );
      if (existing) {
        return prev.map(i => 
          (i.product.id === product.id && 
          ((!variant && !i.variant) || (variant && i.variant && variant.id === i.variant.id)))
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      }
      return [...prev, { product, variant, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems(prev => prev.filter(i => 
      !(i.product.id === productId && (!variantId || (i.variant && i.variant.id === variantId)))
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems(prev => prev.map(i => 
      (i.product.id === productId && (!variantId || (i.variant && i.variant.id === variantId)))
        ? { ...i, quantity } 
        : i
    ));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const price = i.variant?.price || i.product.price;
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, totalItems, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
