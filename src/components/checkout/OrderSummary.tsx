import { CartItem } from "@/context/CartContext";

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

const OrderSummary = ({ items, totalPrice }: OrderSummaryProps) => {
  return (
    <div className="bg-background border border-border rounded-xl p-6 h-fit space-y-4">
      <h2 className="font-serif text-xl font-bold text-foreground">Riepilogo Ordine</h2>
      {items.map(item => {
        const itemKey = `${item.product.id}-${item.variant?.id || "none"}`;
        const itemImage = item.variant?.image_url || item.product.mainImage;
        const itemPrice = item.variant?.price || item.product.price;
        
        return (
          <div key={itemKey} className="flex gap-3 pb-3 border-b border-border">
            <img src={itemImage} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-sans text-sm font-semibold truncate max-w-[150px]">{item.product.name}</p>
              {item.variant && (
                <p className="text-muted-foreground text-xs font-sans">Colore: {item.variant.name}</p>
              )}
              <p className="text-muted-foreground text-xs font-sans">Qtà: {item.quantity}</p>
              <p className="text-gold-dark text-sm font-sans font-semibold">€{(itemPrice * item.quantity).toFixed(2).replace(".", ",")}</p>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between font-sans font-bold text-lg pt-2">
        <span>Totale</span>
        <span className="text-gold-dark">€{totalPrice.toFixed(2).replace(".", ",")}</span>
      </div>
      <p className="text-xs text-muted-foreground font-sans">📦 Consegna in 7 giorni lavorativi</p>
    </div>
  );
};

export default OrderSummary;
