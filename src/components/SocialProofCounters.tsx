import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useEffect, useState } from "react";

const counters = [
  { target: 2000, suffix: "+", label: "Clienti Soddisfatti" },
  { target: 4.9, suffix: "/5", label: "Valutazione Media", decimal: true },
  { target: 98, suffix: "%", label: "Consigliano il Prodotto" },
  { target: 7, suffix: " Giorni", label: "Consegna Garantita" },
];

const CounterItem = ({ target, suffix, label, decimal, started }: { target: number; suffix: string; label: string; decimal?: boolean; started: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div className="text-center">
      <div className="font-serif text-3xl md:text-4xl font-bold text-gold">
        {decimal ? count.toFixed(1) : Math.floor(count).toLocaleString("it-IT")}{suffix}
      </div>
      <div className="text-cream/50 text-sm font-sans mt-1">{label}</div>
    </div>
  );
};

const SocialProofCounters = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-nero py-16 px-4 border-y border-gold/10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {counters.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <CounterItem {...c} started={isInView} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialProofCounters;
