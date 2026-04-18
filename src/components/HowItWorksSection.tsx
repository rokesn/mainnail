import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const steps = [
  { icon: "🔋", title: "Carica la Fresa", desc: "Collega il cavo Type-C e ricarica la tua fresa per unghie in pochi minuti." },
  { icon: "💅", title: "Scegli la Punta Fresa", desc: "Seleziona tra le 12 punte frese per unghie quella più adatta al tuo lavoro." },
  { icon: "⚙️", title: "Imposta la Velocità", desc: "Regola tra 4 livelli di velocità della fresa per unghie professionale." },
  { icon: "✨", title: "Unghie Perfette", desc: "Risultati professionali da salone comodamente a casa tua con la fresa unghie." },
];

const HowItWorksSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="come-funziona" ref={ref} className="bg-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl md:text-5xl font-bold text-nero text-center mb-12"
        >
          Come Usare la Fresa per le <span className="italic text-gold-dark">Unghie</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center p-6 rounded-xl border border-border bg-background"
            >
              <span className="text-4xl block mb-4">{step.icon}</span>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm font-sans">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
