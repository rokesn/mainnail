import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Giulia M.",
    location: "Milano",
    text: "Perfetta per chi inizia! Silenziosa, facile da usare e le 12 testine sono un grande valore. La consiglio a tutte!",
    rating: 5,
  },
  {
    name: "Valentina R.",
    location: "Roma",
    text: "La uso nel mio salone e i clienti adorano i risultati. 45.000 RPM fanno davvero la differenza. Professionale al 100%.",
    rating: 5,
  },
  {
    name: "Sofia T.",
    location: "Napoli",
    text: "Qualità incredibile per il prezzo. La gift box è bellissima, perfetta anche come regalo. Spedizione velocissima!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="recensioni" ref={ref} className="bg-nero py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl md:text-5xl font-bold text-cream text-center mb-12"
        >
          Cosa Dicono le Nostre <span className="italic text-gold">Clienti</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="bg-nero-card border border-gold/10 rounded-xl p-6 space-y-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={16} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-cream/70 font-sans text-sm leading-relaxed italic">"{review.text}"</p>
              <div>
                <p className="text-gold font-sans font-semibold text-sm">{review.name}</p>
                <p className="text-cream/40 font-sans text-xs">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
