import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { ShieldCheck, CreditCard, Truck, Award, Lock, Headphones } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Acquisto Verificato", sub: "100% Sicuro" },
  { icon: CreditCard, label: "Pagamento Protetto", sub: "PayPal & Carte" },
  { icon: Lock, label: "SSL Certificato", sub: "Dati Crittografati" },
  { icon: Award, label: "Qualità Garantita", sub: "Garanzia 12 Mesi" },
  { icon: Truck, label: "Spedizione Gratuita", sub: "In Tutta Italia" },
  { icon: Headphones, label: "Supporto Italiano", sub: "Lun-Ven 9-18" },
];

const TrustBadgesStrip = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-nero-card py-12 px-4 border-y border-gold/10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center text-cream/40 text-xs font-sans uppercase tracking-[0.15em] mb-8"
        >
          Perché Oltre 2.000 Clienti Si Fidano di Noi
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-2 text-center p-3"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <badge.icon size={20} className="text-gold" />
              </div>
              <p className="text-cream text-xs font-sans font-semibold">{badge.label}</p>
              <p className="text-cream/40 text-[10px] font-sans">{badge.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesStrip;
