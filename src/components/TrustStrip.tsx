import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";

const items = [
  { icon: "📦", text: "Consegna 7 Giorni Lavorativi" },
  { icon: "🚚", text: "Spedizione Gratuita" },
  { icon: "🔒", text: "Acquisto 100% Sicuro" },
  { icon: "↩️", text: "Reso Gratuito 30 Giorni" },
  { icon: "🛡️", text: "Garanzia 12 Mesi" },
  { icon: "💬", text: "Supporto in Italiano" },
];

const TrustStrip = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-nero py-8 border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-cream/70 text-xs font-sans">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
