import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Head } from "@/lib/ssg-shim";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProductMedia, ProductMediaItem } from "@/hooks/use-product-media";
import { useProductVariants, ProductVariant } from "@/hooks/use-product-variants";
import { useProductDescriptions } from "@/hooks/use-product-descriptions";
import { Heart, Minus, Plus, Star, ShoppingBag, Truck, RotateCcw, Shield, Play, ChevronRight, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductReviews from "@/components/product/ProductReviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import BackToTop from "@/components/BackToTop";
import StickyAddToCart from "@/components/StickyAddToCart";
import WhatsAppButton from "@/components/WhatsAppButton";
import OptimizedImage from "@/components/OptimizedImage";
import personalCard from "@/assets/product-personal-card.jpg";
import saloneCard from "@/assets/product-salone-card.jpg";

const cardImages: Record<string, string> = {
  "fresa-unghie-professionale": personalCard,
  "salone-pro": saloneCard,
};

const getEmbedUrl = (url: string, autoplay: boolean = false) => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}${autoplay ? "?autoplay=1&mute=1" : ""}`;
  return url;
};

interface MediaViewerProps {
  item: ProductMediaItem;
  productName: string;
  className?: string;
  showDirectly?: boolean;
}

const MediaViewer = ({ item, productName, className, showDirectly = false }: MediaViewerProps) => {
  const [playing, setPlaying] = useState(showDirectly);
  const sizeClass = className || "h-64 sm:h-80 md:h-96 lg:h-[500px]";

  if (item.type === "image") {
    return <OptimizedImage src={item.url} alt={`${productName} compatta con ricarica Type-C`} className={`w-full h-auto block`} priority={true} />;
  }

  // If we show directly, we render the video player immediately.
  // Otherwise, we show a thumbnail + play button.
  if (!playing && item.thumbnail && !showDirectly) {
    return (
      <div className={`relative cursor-pointer w-full ${sizeClass}`} onClick={() => setPlaying(true)}>
        <OptimizedImage src={item.thumbnail} alt={`Video ${productName}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-xl backdrop-blur-sm transform transition-transform group-hover:scale-110">
            <Play size={32} className="text-nero fill-nero ml-1" />
          </div>
        </div>
      </div>
    );
  }

  const isYouTube = item.url.includes("youtube") || item.url.includes("youtu.be");
  if (isYouTube) {
    return (
      <iframe
        src={getEmbedUrl(item.url, playing && !showDirectly)}
        className={`w-full ${sizeClass} border-0 rounded-inherit`}
        allowFullScreen
        allow="autoplay; encrypted-media"
        title={`Video dimostrazione ${productName}`}
      />
    );
  }
  return (
    <video
      src={item.url}
      controls
      autoPlay={playing && !showDirectly}
      className={`w-full ${sizeClass} object-contain bg-nero rounded-xl`}
      playsInline
    />
  );
};

const ProductInfoTable = ({ specs }: { specs: any }) => {
  if (!specs) return null;

  return (
    <div className="mt-16 border-t border-border pt-12 animate-in fade-in duration-1000">
      <h2 className="font-serif text-3xl font-bold text-foreground mb-10">Scheda Tecnica Prodotto</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-12">
          {/* Features & Specs */}
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4 bg-muted/30 px-3 py-2 rounded-t-lg">
              <h3 className="font-sans font-bold text-lg text-foreground">Specifiche Tecniche</h3>
              <ChevronRight size={20} className="text-gold rotate-90" />
            </div>
            <div className="divide-y divide-border/50">
              {Object.entries(specs.features).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 py-3 px-3 hover:bg-gold/5 transition-colors group">
                  <span className="text-muted-foreground text-sm font-sans group-hover:text-gold-dark transition-colors">{key}</span>
                  <span className="text-foreground text-sm font-sans font-medium text-right lg:text-left">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4 bg-muted/30 px-3 py-2 rounded-t-lg">
              <h3 className="font-sans font-bold text-lg text-foreground">Dimensioni e Peso</h3>
              <ChevronRight size={20} className="text-gold rotate-90" />
            </div>
            <div className="divide-y divide-border/50">
              {Object.entries(specs.measurements).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 py-3 px-3 hover:bg-gold/5 transition-colors group">
                  <span className="text-muted-foreground text-sm font-sans group-hover:text-gold-dark transition-colors">{key}</span>
                  <span className="text-foreground text-sm font-sans font-medium text-right lg:text-left">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4 bg-muted/30 px-3 py-2 rounded-t-lg">
              <h3 className="font-sans font-bold text-lg text-foreground">Dettagli Aggiuntivi</h3>
              <ChevronRight size={20} className="text-gold rotate-90" />
            </div>
            <div className="divide-y divide-border/50">
              {Object.entries(specs.additional).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 py-3 px-3 hover:bg-gold/5 transition-colors group">
                  <span className="text-muted-foreground text-sm font-sans group-hover:text-gold-dark transition-colors">{key}</span>
                  <span className="text-foreground text-sm font-sans font-medium text-right lg:text-left">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-12">
          {/* Item Details */}
          <div>
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4 bg-muted/30 px-3 py-2 rounded-t-lg">
              <h3 className="font-sans font-bold text-lg text-foreground">Dettagli Articolo</h3>
              <h3 className="sr-only">Amazon Item Information</h3>
              <ChevronRight size={20} className="text-gold rotate-90" />
            </div>
            <div className="divide-y divide-border/50">
              {Object.entries(specs.itemDetails).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 py-3 px-3 hover:bg-gold/5 transition-colors group">
                  <span className="text-muted-foreground text-sm font-sans group-hover:text-gold-dark transition-colors">{key}</span>
                  <span className="text-foreground text-sm font-sans font-medium text-right lg:text-left">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Summary */}
          <div className="bg-nero p-6 rounded-2xl border border-gold/20 shadow-xl">
            <h3 className="text-gold font-serif text-xl font-bold mb-4">Feedback Clienti</h3>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} className="fill-gold text-gold" />)}
              </div>
              <span className="text-cream font-sans font-bold text-lg">4.9 su 5</span>
            </div>
            <div className="flex items-center gap-2 text-cream/60 text-sm font-sans">
              <span>Basato su 1.738 recensioni verificate</span>
              <span className="w-1 h-1 rounded-full bg-cream/20" />
              <span className="text-gold font-semibold">15K+ venduti</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const { toggle, isInWishlist } = useWishlist();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { variants, loading: variantsLoading } = useProductVariants(product?.id || "");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const { media } = useProductMedia(product?.id || "", product?.images || []);
  const { descriptionBlocks, loading: descriptionsLoading } = useProductDescriptions(product?.id || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-nero flex items-center justify-center">
        <p className="text-cream font-sans">Prodotto non trovato.</p>
      </div>
    );
  }

  const otherProduct = products.find(p => p.id !== product.id);

  // Custom Media logic: If a variant image is selected and it's not in the regular media, we might want to prioritize it.
  // For now, we'll just show the regular media, but we could insert the variant image at the start.
  const currentItem = selectedVariant?.image_url
    ? { type: "image", url: selectedVariant.image_url } as ProductMediaItem
    : (media[selectedIndex] || media[0]);

  const displayPrice = selectedVariant?.price || product.price;
  const displayPriceFormatted = selectedVariant?.price
    ? `€${selectedVariant.price.toFixed(2).replace(".", ",")}`
    : product.priceFormatted;

  // Product + BreadcrumbList + HowTo + Reviews + Speakable schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.longDescription || product.description,
    "image": product.images,
    "sku": product.sku,
    "mpn": product.mpn,
    "gtin13": (product as any).detailedSpecs?.itemDetails?.["Codice EAN"] || undefined,
    "brand": { "@type": "Brand", "name": "Fresa Unghie Pro" },
    "category": "Elettrodomestici > Cura Personale > Manicure e Pedicure",
    "offers": {
      "@type": "Offer",
      "url": `https://fresaunghie.store/prodotto/${product.slug}`,
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "priceValidUntil": "2026-12-31",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "deliveryTime": { "@type": "ShippingDeliveryTime", "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" }, "transitTime": { "@type": "QuantitativeValue", "minValue": 5, "maxValue": 7, "unitCode": "DAY" } },
        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "IT" },
        "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "EUR" }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IT",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1728" },
    "review": [
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Giulia M." },
        "publisher": { "@type": "Organization", "name": "Fresa Unghie Pro" },
        "reviewBody": "Prodotto fantastico! La fresa per unghie è silenziosa e potente. Le 12 punte sono perfette per rimuovere il gel a casa.",
        "datePublished": "2026-03-01"
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Sara R." },
        "publisher": { "@type": "Organization", "name": "Fresa Unghie Pro" },
        "reviewBody": "Ottima qualità per il prezzo. La ricarica Type-C è comodissima e le punte sono varie e ben fatte.",
        "datePublished": "2026-02-15"
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Chiara L." },
        "publisher": { "@type": "Organization", "name": "Fresa Unghie Pro" },
        "reviewBody": "Uso questa fresa nel mio salone da 2 mesi. Precisa, silenziosa e le clienti sono soddisfatte del risultato.",
        "datePublished": "2026-01-20"
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Francesca D." },
        "publisher": { "@type": "Organization", "name": "Fresa Unghie Pro" },
        "reviewBody": "Buon prodotto, le punte sono di qualità. Unica nota: la batteria dura circa 45 minuti, sufficiente per una sessione.",
        "datePublished": "2026-02-28"
      }
    ],
    "hasCertification": {
      "@type": "Certification",
      "name": "CE",
      "certificationStatus": "https://schema.org/CertificationActive",
      "issuedBy": { "@type": "Organization", "name": "European Commission" }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fresaunghie.store" },
      { "@type": "ListItem", "position": 2, "name": "Prodotti", "item": "https://fresaunghie.store/#prodotti" },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://fresaunghie.store/prodotto/${product.slug}` }
    ]
  };

  const faqItems = [
    {
      question: `La ${product.name} è adatta ai principianti?`,
      answer: `Sì, la ${product.name} è progettata per essere intuitiva e sicura, ideale sia per chi è alle prime armi che per uso professionale. Le 4 velocità regolabili permettono di iniziare dal livello più basso e aumentare gradualmente.`
    },
    {
      question: "Cosa include il kit della fresa per unghie?",
      answer: "Il kit include la fresa professionale, 12 punte intercambiabili di alta qualità (diamantate, in ceramica e carburo di tungsteno), cavo di ricarica Type-C (per i modelli wireless) e manuale d'uso in italiano."
    },
    {
      question: "È possibile rimuovere il gel e l'acrilico?",
      answer: "Certamente, grazie alla potenza regolabile e alle punte specifiche incluse, è possibile rimuovere ogni tipo di prodotto: semipermanente, gel e acrilico. Le punte in ceramica sono ideali per la rimozione gel."
    },
    {
      question: "Quanto dura la batteria della fresa unghie?",
      answer: "La batteria da 180mAh si ricarica completamente in circa 1 ora tramite Type-C e offre fino a 3 ore di autonomia continua, sufficiente per più sessioni di manicure e pedicure."
    },
    {
      question: "Come si puliscono le punte della fresa?",
      answer: "Pulisci le punte dopo ogni utilizzo con un pennellino per rimuovere i residui. Per una pulizia più profonda, immergile in soluzione disinfettante per 10-15 minuti. Conservale nell'apposito astuccio per mantenerle in perfette condizioni."
    },
    {
      question: "Qual è la differenza tra fresa uso personale e professionale?",
      answer: `La ${product.name} è compatta, ricaricabile e ideale per l'uso a casa con 20.000 RPM. La Fresa Professionale Salone offre invece 45.000 RPM, alimentazione plug-in e coppia motore elevata per sessioni intensive in salone.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Come Usare ${product.name}`,
    "description": `Guida passo passo su come usare la ${product.name} per manicure e pedicure professionale.`,
    "step": [
      { "@type": "HowToStep", "position": 1, "text": "Carica completamente il dispositivo (solo Personal Pro) o collegalo alla presa." },
      { "@type": "HowToStep", "position": 2, "text": "Scegli la testina adatta al tipo di lavorazione." },
      { "@type": "HowToStep", "position": 3, "text": "Imposta la velocità desiderata, partendo dal livello più basso." },
      { "@type": "HowToStep", "position": 4, "text": "Lavora sull'unghia con movimenti delicati e costanti." },
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".product-description-short", ".product-price"]
    }
  };

  const galleryMedia = media.filter(it => it.placement === "gallery");
  const tabVideos = media.filter(it => it.placement === "tab");

  const isPersonalPro = product.id === "fresa-unghie-professionale";
  const seoTitle = isPersonalPro
    ? "Fresa Unghie Professionale con 12 Punte | Fresa Unghie Pro"
    : "Fresa Professionale Salone 45000 RPM | Fresa Unghie Pro";

  const seoDescription = isPersonalPro
    ? "Fresa Unghie Professionale con 12 punte e ricarica Type-C a €29,99. Compatta, 4 velocità, ideale per principianti. Spedizione gratis Italia. Acquista ora!"
    : `Fresa Professionale Salone 45000 RPM con 12 punte a €79,99. Alta coppia motore per gel e acrilico. Spedizione gratis Italia. Acquista ora!`;

  const seoKeywords = isPersonalPro
    ? "fresa unghie professionale, fresa per unghie, fresa unghie ricaricabile, kit fresa unghie 12 punte, lima elettrica unghie professionale, fresa unghie gel, miglior fresa unghie principianti, fresa manicure pedicure"
    : `${product.name}, fresa unghie, fresa professionale, kit unghie`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`https://fresaunghie.store/prodotto/${product.slug}`} />
        <link rel="alternate" hrefLang="it" href={`https://fresaunghie.store/prodotto/${product.slug}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={product.mainImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${product.name} con kit 12 punte intercambiabili`} />
        <meta property="og:url" content={`https://fresaunghie.store/prodotto/${product.slug}`} />
        <meta property="og:type" content="product" />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={product.mainImage} />
        <meta property="product:price:amount" content={String(product.price)} />
        <meta property="product:price:currency" content="EUR" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream pt-20 md:pt-32 content-visibility-auto">
        {/* Visible Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-4">
          <ol className="flex items-center gap-1 text-xs font-sans text-muted-foreground">
            <li><Link to="/" className="hover:text-gold-dark transition-colors">Home</Link></li>
            <li><ChevronRight size={12} /></li>
            <li><a href="/#prodotti" className="hover:text-gold-dark transition-colors">Prodotti</a></li>
            <li><ChevronRight size={12} /></li>
            <li className="text-foreground font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Gallery */}
            <div className="space-y-3 w-full min-w-0">
              <div className="overflow-hidden rounded-xl border border-border bg-background">
                {selectedVariant?.image_url ? (
                  <img src={selectedVariant.image_url} alt={`${product.name} variante colore ${selectedVariant.name}`} className="w-full h-auto block" />
                ) : (
                  galleryMedia[selectedIndex] && <MediaViewer item={galleryMedia[selectedIndex]} productName={product.name} />
                )}
              </div>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-1 px-1 text-gold-gradient">
                {galleryMedia.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedIndex === i ? "border-gold scale-95" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    {item.type === "image" ? (
                      <img src={item.url} alt={`${product.name} – vista dettaglio kit professionale ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-nero flex items-center justify-center relative">
                        {item.thumbnail ? <img src={item.thumbnail} alt={`Miniatura video ${product.name}`} className="w-full h-full object-cover opacity-50" /> : <Video size={20} className="text-gold" />}
                        <div className="absolute inset-0 flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-gold/80 flex items-center justify-center text-nero"><Play size={10} fill="currentColor" /></div></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 sm:space-y-6 w-full min-w-0">
              <div>
                <span className="bg-gold text-nero px-3 py-1 text-xs font-semibold rounded-full font-sans">
                  {product.badge}
                </span>
                <p className="text-muted-foreground text-xs font-sans tracking-wider uppercase mt-3">{product.category}</p>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground break-words">{isPersonalPro ? "Fresa Unghie Professionale – Kit Completo con 12 Punte" : product.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm font-sans flex items-center gap-2">
                  <span>4.9 · 1.738 recensioni</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-gold-dark font-semibold">15K+ venduti</span>
                </span>
              </div>
              <p className="product-description-short text-muted-foreground font-sans leading-relaxed">{product.description}</p>
              <div className="space-y-2">
                {product.specs.map(spec => (
                  <div key={spec} className="flex items-center gap-2 text-sm font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-foreground/80">{spec}</span>
                  </div>
                ))}
              </div>
              <div className="bg-background border border-border rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-sans"><Truck size={16} className="text-gold-dark" /><span>Consegna stimata: 7 giorni lavorativi</span></div>
                <div className="flex items-center gap-2 text-sm font-sans"><ShoppingBag size={16} className="text-gold-dark" /><span>Spedizione gratuita</span></div>
                <div className="flex items-center gap-2 text-sm font-sans"><RotateCcw size={16} className="text-gold-dark" /><span><Link to="/politica-reso" className="hover:text-gold-dark transition-colors">Reso gratuito entro 30 giorni</Link></span></div>
              </div>
              {/* Color Selection */}
              {variants.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-sans font-semibold text-foreground">
                    Colore: <span className="text-gold-dark">{selectedVariant?.name || "Seleziona un colore"}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`group relative w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedVariant?.id === v.id ? "border-gold scale-110" : "border-transparent hover:border-gold/30"
                          }`}
                        title={v.name}
                      >
                        <div
                          className="w-full h-full rounded-full border border-black/10 shadow-inner"
                          style={{ backgroundColor: v.color_code || "#ccc" }}
                        />
                        {selectedVariant?.id === v.id && (
                          <div className="absolute -bottom-1 -right-1 bg-gold text-nero rounded-full p-0.5 shadow-sm">
                            <Plus size={8} className="rotate-45" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-price text-gold-dark font-serif text-4xl font-bold">{displayPriceFormatted}</div>
              <p className="text-green-600 text-sm font-sans font-medium">✓ Disponibile — 1.205 pezzi in magazzino</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-foreground/50 hover:text-foreground"><Minus size={16} /></button>
                  <span className="px-4 font-sans">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-foreground/50 hover:text-foreground"><Plus size={16} /></button>
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    const cartVariant = selectedVariant ? {
                      id: selectedVariant.id,
                      name: selectedVariant.name,
                      image_url: selectedVariant.image_url,
                      price: selectedVariant.price
                    } : undefined;
                    for (let i = 0; i < quantity; i++) addItem(product, cartVariant);
                  }}
                  className="flex-1 bg-gold text-nero py-3 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors text-sm sm:text-base"
                >
                  Aggiungi al Carrello
                </button>
                <button onClick={() => toggle(product.id)} className={`w-11 h-11 sm:w-12 sm:h-12 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${isInWishlist(product.id) ? "border-gold bg-gold/10" : "border-border"}`}>
                  <Heart size={18} className={isInWishlist(product.id) ? "fill-gold text-gold" : "text-muted-foreground"} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans"><Shield size={14} /><span>Garanzia 12 mesi · Acquisto sicuro</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10 md:pb-16">
          <Tabs defaultValue="descrizione">
            <TabsList className="bg-muted w-full flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="descrizione" className="font-sans text-sm">Descrizione</TabsTrigger>
              <TabsTrigger value="specifiche" className="font-sans text-sm">Specifiche</TabsTrigger>
              <TabsTrigger value="recensioni" className="font-sans text-sm">Recensioni</TabsTrigger>
              {tabVideos.length > 0 && <TabsTrigger value="video" className="font-sans text-sm">Video</TabsTrigger>}
              <TabsTrigger value="spedizione" className="font-sans text-sm">Spedizione e Resi</TabsTrigger>
              <TabsTrigger value="utilizzo" className="font-sans text-sm">Utilizzo</TabsTrigger>
            </TabsList>
            <TabsContent value="descrizione" className="mt-6 space-y-8">
              {descriptionBlocks.length > 0 ? (
                <div className="space-y-0">
                  {descriptionBlocks.map((block) => (
                    <div key={block.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {(block.title || block.content) && (
                        <div className="max-w-2xl mb-4">
                          {block.title && <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{block.title}</h3>}
                          {block.content && <p className="font-sans text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">{block.content}</p>}
                        </div>
                      )}
                      {block.image_url && (
                        <div className="w-full">
                          <img
                            src={block.image_url}
                            alt={block.title ? `${block.title} - ${product.name}` : `${product.name} - dettaglio kit professionale`}
                            className="w-full h-auto block hover:scale-[1.01] transition-transform duration-700"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-sans text-sm leading-relaxed text-muted-foreground space-y-4">
                  <p>{product.longDescription || product.description}</p>
                  <p>Nella confezione troverai: 1x {product.name}, 12x testine professionali, 1x cavo di ricarica Type-C (solo Personal Pro), 1x manuale d'uso in italiano.</p>
                  <p>Ideale per: limatura, lucidatura, rimozione cuticole, modellatura unghie naturali e artificiali.</p>
                </div>
              )}

              {/* Product Info Table */}
              {(product as any).detailedSpecs && (
                <ProductInfoTable specs={(product as any).detailedSpecs} />
              )}
            </TabsContent>
            <TabsContent value="specifiche" className="mt-6">
              <div className="space-y-3">
                {product.specs.map(spec => (
                  <div key={spec} className="flex items-center gap-3 py-2 border-b border-border text-sm font-sans">
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" /><span>{spec}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recensioni" className="mt-6"><ProductReviews productId={product.id} /></TabsContent>
            {tabVideos.length > 0 && (
              <TabsContent value="video" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tabVideos.map((vid, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="aspect-video rounded-xl overflow-hidden border border-border bg-nero shadow-lg">
                        <MediaViewer item={vid} productName={product.name} className="h-full" showDirectly={true} />
                      </div>
                      <p className="text-muted-foreground text-xs font-sans text-center font-medium">Video dimostrazione {product.name}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
            <TabsContent value="spedizione" className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground space-y-4">
              <p>Spediamo entro 1-2 giorni lavorativi dall'ordine.</p>
              <p>La consegna avviene entro 7 giorni lavorativi in tutta Italia.</p>
              <p>Reso gratuito entro 30 giorni. Garanzia 12 mesi sul prodotto. Leggi la nostra <Link to="/politica-reso" className="text-gold-dark hover:underline">politica di reso completa</Link>.</p>
            </TabsContent>
            <TabsContent value="utilizzo" className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground space-y-4">
              <p><strong>Step 1:</strong> Carica completamente il dispositivo (solo Personal Pro) o collegalo alla presa.</p>
              <p><strong>Step 2:</strong> Scegli la testina adatta al tipo di lavorazione.</p>
              <p><strong>Step 3:</strong> Imposta la velocità desiderata, partendo dal livello più basso.</p>
              <p><strong>Step 4:</strong> Lavora sull'unghia con movimenti delicati e costanti.</p>
              <p><strong>Consiglio:</strong> Per principianti, inizia sempre con la velocità più bassa e una testina fine.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Visible FAQ Section — matches schema FAQ for SEO compliance */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10 md:pb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Domande Frequenti sulla {product.name}</h2>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <details key={idx} className="group border border-border rounded-xl bg-background overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-sans font-semibold text-foreground hover:text-gold-dark transition-colors">
                  <span className="text-sm md:text-base pr-4">{item.question}</span>
                  <ChevronRight size={18} className="text-gold transform transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="px-5 pb-4 text-muted-foreground font-sans text-sm leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Cross-link section — internal linking for SEO */}
        {otherProduct && (
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10 md:pb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Potrebbe Interessarti Anche</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to={`/prodotto/${otherProduct.slug}`} className="group border border-border rounded-xl overflow-hidden bg-background hover:border-gold/40 transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img src={otherProduct.mainImage} alt={otherProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="bg-gold/10 text-gold-dark px-2 py-0.5 text-xs font-semibold rounded-full font-sans">{otherProduct.badge}</span>
                  <h3 className="font-serif text-lg font-bold text-foreground mt-2 group-hover:text-gold-dark transition-colors">{otherProduct.name}</h3>
                  <p className="text-muted-foreground text-sm font-sans mt-1 line-clamp-2">{otherProduct.description}</p>
                  <p className="text-gold-dark font-serif text-xl font-bold mt-2">{otherProduct.priceFormatted}</p>
                </div>
              </Link>
              <Link to="/confronta/fresa-unghie-professionale-vs-fresa-professionale-salone" className="group border border-border rounded-xl bg-background hover:border-gold/40 transition-colors p-6 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                  <ChevronRight size={20} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-gold-dark transition-colors">Confronta i Modelli</h3>
                <p className="text-muted-foreground text-sm font-sans mt-1">Scopri le differenze tra Personal Pro e Salone Pro</p>
              </Link>
              <Link to="/glossario-fresa-unghie" className="group border border-border rounded-xl bg-background hover:border-gold/40 transition-colors p-6 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                  <Shield size={20} className="text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-gold-dark transition-colors">Glossario Fresa Unghie</h3>
                <p className="text-muted-foreground text-sm font-sans mt-1">Scopri tutti i termini tecnici e le punte</p>
              </Link>
            </div>
          </div>
        )}

        {/* Internal linking: City pages for SEO */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10 md:pb-16 border-t border-border/40 pt-10">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4 text-center">Spedizioni Veloci in Tutta Italia</h2>
          <p className="text-muted-foreground text-center mb-6 text-sm max-w-2xl mx-auto">Consegniamo la tua fresa unghie professionale in 24/48 ore nelle principali città italiane. Scopri la qualità Fresa Unghie Pro a:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["milano", "roma", "napoli", "torino", "palermo", "bologna", "firenze", "bari"].map(city => (
              <Link 
                key={city} 
                to={`/spedizioni/${city}`} 
                className="px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-gold/10 hover:border-gold/40 hover:text-gold-dark transition-all"
              >
                Fresa Unghie {city.charAt(0).toUpperCase() + city.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* Internal linking: Punta pages for SEO */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-10 md:pb-16 bg-gold/5 py-10 rounded-3xl mb-10 md:mb-16">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-4 text-center">Guida alle Punte per Fresa</h2>
          <p className="text-muted-foreground text-center mb-6 text-sm max-w-2xl mx-auto">Ogni kit include 12 punte professionali. Scopri come utilizzare al meglio ogni punta per risultati perfetti:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["diamantata", "ceramica", "a-fiamma", "a-sfera"].map(punta => (
              <Link 
                key={punta} 
                to={`/punta-fresa/${punta}`} 
                className="flex items-center justify-center p-4 bg-background border border-border rounded-xl text-sm font-bold text-foreground hover:border-gold/40 hover:text-gold-dark text-center transition-all shadow-sm"
              >
                Punta {punta.replace(/-/g, " ").charAt(0).toUpperCase() + punta.replace(/-/g, " ").slice(1)}
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
      <BackToTop />
      <StickyAddToCart
        productName={product.name}
        priceFormatted={displayPriceFormatted}
        onAddToCart={() => {
          const cartVariant = selectedVariant ? {
            id: selectedVariant.id,
            name: selectedVariant.name,
            image_url: selectedVariant.image_url,
            price: selectedVariant.price
          } : undefined;
          for (let i = 0; i < quantity; i++) addItem(product, cartVariant);
        }}
      />
      <WhatsAppButton />
    </>
  );
};

export default ProductDetailPage;
