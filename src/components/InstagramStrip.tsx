import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Instagram } from "lucide-react";
import nailArt1 from "@/assets/nail-art-1.jpg";
import nailArt2 from "@/assets/nail-art-2.jpg";
import nailArt3 from "@/assets/nail-art-3.jpg";
import nailArt4 from "@/assets/nail-art-4.jpg";
import nailArt5 from "@/assets/nail-art-5.jpg";
import nailArt6 from "@/assets/nail-art-6.jpg";

const images = [nailArt1, nailArt2, nailArt3, nailArt4, nailArt5, nailArt6];

const InstagramStrip = () => {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="bg-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-muted-foreground text-sm font-sans mb-6 tracking-wider">
          Seguici su Instagram <span className="text-gold-dark font-semibold">@fresaunghiepro</span>
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08 }}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img src={img} alt="Nail art" loading="lazy" width={640} height={640} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-nero/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-gold" size={28} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramStrip;
