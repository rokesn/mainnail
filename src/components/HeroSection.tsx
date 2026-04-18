import { motion } from "framer-motion";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";


const HeroSection = () => {
  return (
    <section className="bg-nero min-h-screen pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-gold text-sm tracking-[0.2em] uppercase font-sans">
              Fresa per Unghie Professionale · Made for Italy
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
              Fresa per Unghie Professionale – <span className="italic text-gold-gradient">Kit Completo con 12 Punte</span>
            </h1>
            {/* Definitional paragraph — first 100 tokens cited by AI Overviews (seoip §2 / seoip2 §2.6) */}
            <p className="text-cream/75 text-base md:text-lg font-sans leading-relaxed max-w-xl">
              La <strong>fresa per unghie</strong> è uno strumento elettrico rotante usato in
              manicure e pedicure professionale per limare, modellare, rimuovere gel,
              semipermanente, acrilico e curare le cuticole. Il nostro kit include 12 punte
              intercambiabili (diamantate, ceramica, carburo di tungsteno), 4 velocità
              regolabili fino a 35.000 RPM e batteria USB-C ricaricabile da 180 mAh.
            </p>
            <p className="text-cream/55 text-sm font-sans leading-relaxed max-w-lg">
              Dal salone a casa tua. Ideale per onicotecniche professioniste e per chi vuole una
              manicure perfetta in autonomia.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 text-gold text-sm font-sans">
              📦 Spedizione gratuita in tutta Italia
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#prodotti"
                className="inline-flex items-center gap-2 bg-gold text-nero px-6 py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors"
              >
                Scopri le Frese per Unghie <ArrowRight size={18} />
              </a>
              <a
                href="#come-funziona"
                className="inline-flex items-center gap-2 border border-gold/40 text-gold px-6 py-3 rounded-md font-sans hover:bg-gold/10 transition-colors"
              >
                Come Usare la Fresa
              </a>
            </div>

            <div className="flex gap-8 pt-4">
              {[
                { value: "4.9★", label: "Valutazione" },
                { value: "2K+", label: "Clienti Soddisfatte" },
                { value: "12", label: "Punte Frese Incluse" },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-gold font-serif text-2xl font-bold">{stat.value}</div>
                  <div className="text-cream/50 text-xs font-sans">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-rows-2 gap-4"
          >
            {products.map(product => (
              <Link
                key={product.id}
                to={`/prodotto/${product.slug}`}
                className="relative group overflow-hidden rounded-lg gold-border-glow"
              >
                <OptimizedImage
                  src={product.mainImage}
                  alt={product.id === "fresa-unghie-professionale" 
                    ? "Fresa per Unghie Professionale" 
                    : "Fresa Professionale Salone"}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  width={1024}
                  height={768}
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-gold/20 border border-gold/40 text-gold px-3 py-1 text-xs rounded-full font-sans">
                    {product.badge}
                  </span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
