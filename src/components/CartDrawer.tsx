import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-nero/50 z-50" onClick={closeCart} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-nero border-l border-gold/10 z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gold/10">
          <h2 className="font-serif text-xl text-cream font-bold">Carrello</h2>
          <button onClick={closeCart} className="text-cream/50 hover:text-cream">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-4xl mb-4">🛍️</span>
            <p className="text-cream/50 font-sans text-sm">Il tuo carrello è vuoto</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map(item => {
                const itemKey = `${item.product.id}-${item.variant?.id || "none"}`;
                const itemImage = item.variant?.image_url || item.product.mainImage;
                const itemPrice = item.variant?.price || item.product.price;
                const itemPriceFormatted = item.variant?.price 
                  ? `€${item.variant.price.toFixed(2).replace(".", ",")}`
                  : item.product.priceFormatted;

                return (
                  <div key={itemKey} className="flex gap-4 border-b border-gold/5 pb-4">
                    <img src={itemImage} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-cream font-sans text-sm font-semibold">{item.product.name}</h3>
                      {item.variant && (
                        <p className="text-cream/50 text-xs font-sans mt-0.5">Colore: {item.variant.name}</p>
                      )}
                      <p className="text-gold text-sm font-sans mt-1">{itemPriceFormatted}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)} 
                          className="w-7 h-7 rounded border border-gold/20 flex items-center justify-center text-cream/50 hover:text-cream"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-cream font-sans text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)} 
                          className="w-7 h-7 rounded border border-gold/20 flex items-center justify-center text-cream/50 hover:text-cream"
                        >
                          <Plus size={12} />
                        </button>
                        <button 
                          onClick={() => removeItem(item.product.id, item.variant?.id)} 
                          className="ml-auto text-cream/30 hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-gold/10 space-y-4">
              <div className="flex justify-between text-cream font-sans">
                <span>Totale</span>
                <span className="text-gold font-semibold">€{totalPrice.toFixed(2).replace(".", ",")}</span>
              </div>
              <p className="text-cream/40 text-xs font-sans">📦 Consegna in 7 giorni lavorativi</p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full bg-gold text-nero text-center py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors"
              >
                Procedi all'Ordine
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
