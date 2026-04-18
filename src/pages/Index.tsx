import { Head } from "@/lib/ssg-shim";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DeliveryBanner from "@/components/DeliveryBanner";
import TrustStrip from "@/components/TrustStrip";
import ProductsSection from "@/components/ProductsSection";
import ComparisonSection from "@/components/ComparisonSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SocialProofCounters from "@/components/SocialProofCounters";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstagramStrip from "@/components/InstagramStrip";
import FAQSection, { faqs } from "@/components/FAQSection";
import SEOArticleSection from "@/components/SEOArticleSection";
import AuthorBio from "@/components/AuthorBio";
import TrustBadgesStrip from "@/components/TrustBadgesStrip";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { lazy, Suspense, useEffect, useState } from "react";

// Lazy-load non-critical UI to protect INP / FID (seoip2 §6.4)
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const FomoNotification = lazy(() => import("@/components/FomoNotification"));

// Connected @id graph — links Organization ↔ Person ↔ FAQ ↔ HowTo ↔ Site
// for unified Knowledge Graph entity recognition (seoip2 §2.3)
const ORG_ID = "https://fresaunghie.store/#organization";
const PERSON_ID = "https://fresaunghie.store/#author-francesca-conti";
const SITE_ID = "https://fresaunghie.store/#website";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://fresaunghie.store/#faq",
  "isPartOf": { "@id": SITE_ID },
  "about": { "@id": ORG_ID },
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }))
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  "name": "Francesca Conti",
  "jobTitle": "Onicotecnica Certificata",
  "description": "Esperta di nail care con 12 anni di esperienza nel settore unghie. Formatrice per onicotecniche e consulente in prodotti professionali.",
  "worksFor": { "@id": ORG_ID },
  "url": "https://fresaunghie.store/chi-siamo",
  "image": "https://fresaunghie.store/og/author-francesca-conti.jpg",
  "knowsAbout": ["Manicure", "Pedicure", "Onicotecnica", "Fresa per unghie", "Gel ricostruzione", "Nail art"],
  "sameAs": [
    "https://www.instagram.com/fresaunghiepro",
    "https://it.wikipedia.org/wiki/Onicotecnica"
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://fresaunghie.store/#howto-usare-fresa",
  "name": "Come Usare la Fresa per Unghie",
  "description": "Guida passo passo per usare la fresa per unghie professionale a casa o in salone.",
  "totalTime": "PT15M",
  "author": { "@id": PERSON_ID },
  "publisher": { "@id": ORG_ID },
  "tool": [{ "@type": "HowToTool", "name": "Fresa Unghie Professionale" }],
  "supply": [{ "@type": "HowToSupply", "name": "Kit 12 Punte per Fresa" }],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Carica la Fresa", "text": "Collega il cavo Type-C e ricarica la fresa per unghie prima dell'uso. La batteria 180mAh garantisce sessioni complete.", "url": "https://fresaunghie.store/#come-funziona" },
    { "@type": "HowToStep", "position": 2, "name": "Scegli la Punta Fresa", "text": "Seleziona tra le 12 punte fresa quella più adatta alla lavorazione: diamantata per cuticole, ceramica per gel, carburo per acrilico.", "url": "https://fresaunghie.store/#come-funziona" },
    { "@type": "HowToStep", "position": 3, "name": "Imposta la Velocità", "text": "Regola tra 4 livelli di velocità. Inizia dal livello più basso (5.000 RPM) e aumenta in base al materiale da lavorare.", "url": "https://fresaunghie.store/#come-funziona" },
    { "@type": "HowToStep", "position": 4, "name": "Applica la Fresa", "text": "Muovi la fresa delicatamente sull'unghia inclinata a 45°. Mantieni il movimento costante per evitare calore eccessivo.", "url": "https://fresaunghie.store/#come-funziona" }
  ]
};

const siteNavSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": ["Prodotti", "Confronto", "Come Funziona", "Guide", "Recensioni", "FAQ"],
  "url": [
    "https://fresaunghie.store/#prodotti",
    "https://fresaunghie.store/#confronto",
    "https://fresaunghie.store/#come-funziona",
    "https://fresaunghie.store/glossario-fresa-unghie",
    "https://fresaunghie.store/#recensioni",
    "https://fresaunghie.store/#faq"
  ]
};

const Index = () => {
  // Defer non-critical UI until idle to protect INP/LCP (seoip2 §6.4)
  const [showDeferred, setShowDeferred] = useState(false);
  useEffect(() => {
    const w = window as any;
    const cb = () => setShowDeferred(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(cb, { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(cb, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>Fresa Unghie | Per Uso Personale e Professionale</title>
        <meta name="description" content="Fresa unghie perfetta per casa e salone. Risultati professionali per ogni tipo di unghia. Spedizione gratis in tutta Italia e reso facile in 14 giorni." />
        <meta name="keywords" content="fresa unghie, fresa per unghie, fresa per unghie professionale, fresa professionale unghie, lima elettrica unghie, frese per unghie, punte frese per unghie, fresa unghie professionale, kit fresa unghie, fresa manicure pedicure professionale, fresa unghie gel acrilico, fresa unghie ricaricabile, fresa nail art, come usare fresa unghie, migliore fresa unghie" />
        <link rel="canonical" href="https://fresaunghie.store/" />
        <meta property="og:title" content="Fresa Unghie | Per Uso Personale e Professionale" />
        <meta property="og:description" content="Fresa unghie perfetta per casa e salone. Risultati professionali per ogni tipo di unghia. Spedizione gratis in tutta Italia e reso facile in 14 giorni." />
        <meta property="og:url" content="https://fresaunghie.store/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://fresaunghie.store/og/fresa-unghie-pro-share.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Fresa Unghie Pro" />
        <meta property="og:locale" content="it_IT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fresa Unghie | Per Uso Personale e Professionale" />
        <meta name="twitter:description" content="Fresa unghie perfetta per casa e salone. Risultati professionali per ogni tipo di unghia. Spedizione gratis in tutta Italia e reso facile in 14 giorni." />
        <meta name="twitter:image" content="https://fresaunghie.store/og/fresa-unghie-pro-share.jpg" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(siteNavSchema)}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <DeliveryBanner />
      <TrustStrip />
      <ProductsSection />
      <ComparisonSection />
      <HowItWorksSection />
      <SocialProofCounters />
      <TestimonialsSection />
      <TrustBadgesStrip />
      <InstagramStrip />
      <SEOArticleSection />
      <AuthorBio />
      <FAQSection />
      <NewsletterSection />
      <Footer />
      <BackToTop />
      {showDeferred && (
        <Suspense fallback={null}>
          <ExitIntentPopup />
          <WhatsAppButton />
          <FomoNotification />
        </Suspense>
      )}
    </>
  );
};

export default Index;
