import { useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonProps {
  amount: number;
  orderNumber: string;
  onSuccess: (details: any) => void;
  onError: (err: any) => void;
  disabled?: boolean;
}

const PayPalButton = ({ amount, orderNumber, onSuccess, onError, disabled }: PayPalButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!window.paypal || rendered.current || !containerRef.current || disabled) return;

    rendered.current = true;

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        height: 45,
      },
      createOrder: async () => {
        try {
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, currency: "EUR", orderNumber }),
          });
          const data = await res.json();
          if (!res.ok || data.error) throw new Error(data.error || "Failed to create order");
          return data.id;
        } catch (err) {
          console.error("PayPal createOrder error:", err);
          toast({ title: "Errore PayPal", description: "Impossibile creare l'ordine. Riprova.", variant: "destructive" });
          throw err;
        }
      },
      onApprove: async (data: any) => {
        try {
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          const captureData = await res.json();
          if (!res.ok || captureData.error) throw new Error(captureData.error || "Failed to capture order");
          onSuccess(captureData);
        } catch (err) {
          console.error("PayPal capture error:", err);
          onError(err);
        }
      },
      onError: (err: any) => {
        console.error("PayPal button error:", err);
        onError(err);
      },
    }).render(containerRef.current);

    return () => {
      rendered.current = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [amount, orderNumber, disabled]);

  return (
    <div>
      <div ref={containerRef} className={disabled ? "opacity-50 pointer-events-none" : ""} />
      {!window.paypal && (
        <p className="text-sm text-muted-foreground font-sans text-center py-4">
          Caricamento metodi di pagamento...
        </p>
      )}
    </div>
  );
};

export default PayPalButton;
