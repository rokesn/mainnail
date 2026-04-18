import { Heart, ShoppingBag, ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useInView } from "@/hooks/use-in-view";
import OptimizedImage from "./OptimizedImage";

const ProductsSection = () => {
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const { ref, isInView } = useInView();

  return (
    <section id="prodotti" ref={ref} className="bg-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-nero">
            Frese per Unghie: <span className="italic text-gold-dark">Scegli il Tuo Kit</span>
          </h2>
          <p className="text-muted-foreground font-sans mt-3 max-w-2xl mx-auto">
            Scopri la fresa per unghie professionale perfetta per te. Uso personale o da salone, con 12 punte incluse.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, i) => (
            <motion.article
              key={product.id}
              itemScope
              itemType="https://schema.org/Product"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="bg-background rounded-2xl overflow-hidden border border-border shadow-md group"
            >
              <meta itemProp="sku" content={product.sku} />
              <meta itemProp="brand" content="Fresa Unghie Pro" />
              <meta itemProp="image" content={product.mainImage} />
              <link itemProp="url" href={`https://fresaunghie.store/prodotto/${product.slug}`} />
              <div className="relative overflow-hidden bg-muted/30">
                <a href={`/prodotto/${product.slug}`}>
                  <OptimizedImage
                    src={product.mainImage}
                    alt={product.id === "fresa-unghie-professionale"
                      ? "Fresa per unghie professionale uso personale con 12 punte incluse"
                      : "Fresa unghie professionale da salone 45000 RPM kit completo"}
                    width={600}
                    height={400}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>
                <div className="absolute top-3 left-3">
                  <span className="bg-gold text-nero px-3 py-1 text-xs font-semibold rounded-full font-sans">
                    {product.badge}
                  </span>
                </div>
                <button
                  onClick={() => toggle(product.id)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-nero/50 flex items-center justify-center hover:bg-nero/70 transition-colors"
                  aria-label={`Aggiungi ${product.name} alla wishlist`}
                >
                  <Heart
                    size={16}
                    className={isInWishlist(product.id) ? "fill-gold text-gold" : "text-cream"}
                  />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-muted-foreground text-xs font-sans tracking-wider uppercase">{product.category}</p>
                <h3 itemProp="name" className="font-serif text-xl font-bold text-foreground">{product.name}</h3>
                <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating" className="flex items-center gap-2">
                  <meta itemProp="ratingValue" content={String(product.rating)} />
                  <meta itemProp="reviewCount" content={String(product.reviewCount)} />
                  <meta itemProp="bestRating" content="5" />
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={12} className={i <= Math.floor(product.rating) ? "fill-gold text-gold" : i <= product.rating ? "fill-gold/50 text-gold" : "text-gold/30"} />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-sans">
                    {product.rating} · {product.reviewCountFormatted} recensioni · <span className="text-gold-dark font-semibold">{product.soldLabel}</span>
                  </span>
                </div>
                <p itemProp="description" className="text-muted-foreground font-sans text-sm leading-relaxed line-clamp-2">{product.description}</p>

                <div className="space-y-1.5">
                  {product.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-2 text-sm font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-foreground/70">{spec}</span>
                    </div>
                  ))}
                </div>

                <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="flex items-center justify-between pt-3 border-t border-border">
                  <meta itemProp="priceCurrency" content="EUR" />
                  <meta itemProp="price" content={String(product.price)} />
                  <meta itemProp="availability" content="https://schema.org/InStock" />
                  <link itemProp="url" href={`https://fresaunghie.store/prodotto/${product.slug}`} />
                  <div>
                    <span className="font-serif text-2xl font-bold text-gold-dark">{product.priceFormatted}</span>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">Spedizione gratuita in Italia</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/prodotto/${product.slug}`}
                      className="flex items-center gap-1.5 border border-gold/40 text-gold-dark px-3 py-2 rounded-md text-sm font-sans hover:bg-gold/10 transition-colors"
                    >
                      <ExternalLink size={14} /> Dettagli
                    </a>
                    <button
                      onClick={() => addItem(product)}
                      className="flex items-center gap-1.5 bg-gold text-nero px-3 py-2 rounded-md text-sm font-sans font-semibold hover:bg-gold-light transition-colors"
                    >
                      <ShoppingBag size={14} /> Aggiungi
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
