import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Award, BookOpen, Star } from "lucide-react";

const AuthorBio = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-nero py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-nero-card border border-gold/10 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Author avatar */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-gold">FC</span>
              </div>
            </div>

            {/* Author info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-cream">
                  Francesca Conti
                </h3>
                <p className="text-gold text-sm font-sans">
                  Esperta di Nail Care · Tecnica Onicotecnica Certificata
                </p>
              </div>
              <p className="text-cream/60 text-sm font-sans leading-relaxed">
                Con oltre 12 anni di esperienza nel settore della cura delle unghie, Francesca ha collaborato con i
                principali saloni di Milano e Roma. È specializzata nella formazione professionale sull'uso delle frese
                per unghie e nella selezione di strumenti di alta qualità per professioniste e appassionate.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { icon: Award, text: "Certificata ANCI" },
                  { icon: BookOpen, text: "12+ Anni Esperienza" },
                  { icon: Star, text: "2000+ Clienti Formate" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-cream/50 text-xs font-sans">
                    <item.icon size={14} className="text-gold" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* External citations */}
          <div className="mt-6 pt-6 border-t border-gold/10">
            <p className="text-cream/40 text-xs font-sans mb-3 uppercase tracking-wider">Fonti e Riferimenti</p>
            <div className="flex flex-wrap gap-3">
              {[
                "Associazione Nazionale Cosmetici Italiani",
                "European Nail Academy",
                "Cosmoprof Bologna",
              ].map((source, i) => (
                <span key={i} className="text-cream/50 text-xs font-sans bg-nero px-3 py-1.5 rounded-full border border-gold/10">
                  {source}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorBio;
