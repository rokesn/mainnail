import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSection = () => {
  const { ref, isInView } = useInView();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter" as any).insert({ email } as any);
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Già iscritto!", description: "Questa email è già nella nostra lista." });
      } else {
        toast({ title: "Errore", description: "Riprova più tardi.", variant: "destructive" });
      }
    } else {
      toast({ title: "✓ Iscrizione completata!", description: "Riceverai le nostre novità." });
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="bg-nero py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-4">
            Rimani <span className="italic text-gold">Aggiornata</span> sulle Novità
          </h2>
          <p className="text-cream/60 font-sans text-sm mb-8">
            Iscriviti e ricevi consigli di nail care, tutorial e offerte esclusive.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email"
              required
              className="flex-1 bg-nero-card border border-gold/20 rounded-md px-4 py-3 text-cream font-sans text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-nero px-6 py-3 rounded-md font-sans font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loading ? "..." : "Iscriviti"}
            </button>
          </form>
          <p className="text-cream/30 text-xs font-sans mt-4">
            Nessuno spam. Puoi cancellarti in qualsiasi momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
