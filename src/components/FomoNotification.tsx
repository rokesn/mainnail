import { useState, useEffect } from "react";
import { X } from "lucide-react";

const names = ["Sara", "Giulia", "Francesca", "Maria", "Elena", "Valentina", "Chiara", "Laura", "Anna", "Martina", "Alessia", "Federica", "Silvia", "Roberta", "Paola"];
const cities = ["Milano", "Roma", "Napoli", "Torino", "Bologna", "Firenze", "Palermo", "Genova", "Bari", "Verona", "Padova", "Catania", "Brescia", "Modena", "Parma"];
const productNames = ["Fresa Unghie Professionale", "Fresa Professionale Salone 45000 RPM"];

const FomoNotification = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ name: "", city: "", product: "" });

  useEffect(() => {
    const showNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const product = productNames[Math.floor(Math.random() * productNames.length)];
      setNotification({ name, city, product });
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    };

    // First notification after 20 seconds
    const initialTimer = setTimeout(showNotification, 20000);
    // Then every 45-90 seconds
    const interval = setInterval(showNotification, 45000 + Math.random() * 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs bg-background border border-border rounded-lg shadow-xl p-3 animate-in slide-in-from-left-5 duration-500">
      <button onClick={() => setShow(false)} className="absolute top-1 right-1 text-muted-foreground/40 hover:text-muted-foreground">
        <X size={14} />
      </button>
      <div className="flex items-start gap-3 pr-4">
        <span className="text-xl flex-shrink-0">👆</span>
        <div>
          <p className="font-sans text-xs text-foreground font-medium">
            {notification.name} da {notification.city}
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            ha acquistato <span className="text-gold-dark font-semibold">{notification.product}</span>
          </p>
          <p className="font-sans text-[10px] text-muted-foreground/50 mt-1">
            {Math.floor(Math.random() * 15) + 1} minuti fa
          </p>
        </div>
      </div>
    </div>
  );
};

export default FomoNotification;
