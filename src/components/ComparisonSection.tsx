import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Check, X } from "lucide-react";

const features = [
  { label: "RPM", personal: "20.000", salone: "45.000" },
  { label: "Alimentazione", personal: "Batteria Type-C", salone: "Plug-in" },
  { label: "Testine incluse", personal: "12", salone: "12" },
  { label: "Ideale per", personal: "Casa / Principianti", salone: "Salone / Professionisti" },
  { label: "Livello consigliato", personal: "Principiante", salone: "Avanzato" },
  { label: "Rumorosità", personal: "Silenziosa", salone: "Media" },
  { label: "Gift Box", personal: true, salone: true },
  { label: "Rotazione bidirezionale", personal: true, salone: true },
];

const ComparisonSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="confronto" ref={ref} className="bg-nero py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl md:text-5xl font-bold text-cream text-center mb-12"
        >
          Quale Fresa <span className="italic text-gold">Fa Per Te?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-4 px-4 text-cream/60 font-sans text-sm">Caratteristica</th>
                <th className="text-center py-4 px-4 text-gold font-sans text-sm">Personal Pro</th>
                <th className="text-center py-4 px-4 text-gold font-sans text-sm">Salone Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="border-b border-gold/5">
                  <td className="py-4 px-4 text-cream/70 font-sans text-sm">{f.label}</td>
                  <td className="text-center py-4 px-4">
                    {typeof f.personal === "boolean" ? (
                      f.personal ? <Check className="inline text-gold" size={18} /> : <X className="inline text-cream/20" size={18} />
                    ) : (
                      <span className="text-cream/80 font-sans text-sm">{f.personal}</span>
                    )}
                  </td>
                  <td className="text-center py-4 px-4">
                    {typeof f.salone === "boolean" ? (
                      f.salone ? <Check className="inline text-gold" size={18} /> : <X className="inline text-cream/20" size={18} />
                    ) : (
                      <span className="text-cream/80 font-sans text-sm">{f.salone}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
