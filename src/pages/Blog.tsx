import { Head } from "@/lib/ssg-shim";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import BackToTop from "@/components/BackToTop";
import OptimizedImage from "@/components/OptimizedImage";
import { posts } from "@/data/blog";
import { ArrowRight, Clock } from "lucide-react";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Guide Fresa Unghie",
  url: "https://fresaunghie.store/guide",
  description:
    "Guide professionali sulla fresa per unghie: come usarla, scelta delle punte, manutenzione e tecniche di onicotecnica.",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://fresaunghie.store/guide/${p.slug}`,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    image: p.cover,
    author: { "@type": "Person", name: "Francesca Conti" },
  })),
};

const Blog = () => {
  return (
    <>
      <Head>
        <title>Guide Fresa Unghie | Tutorial e Consigli Professionali</title>
        <meta
          name="description"
          content="Guide professionali sulla fresa per unghie: come usarla, scelta punte, rimozione gel, manutenzione e migliori modelli 2026. Scritte da onicotecniche."
        />
        <link rel="canonical" href="https://fresaunghie.store/guide" />
        <meta property="og:title" content="Guide Fresa Unghie | Tutorial Professionali" />
        <meta property="og:description" content="Tutorial, recensioni e consigli sulla fresa per unghie professionale." />
        <meta property="og:url" content="https://fresaunghie.store/guide" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Head>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-nero min-h-screen pt-24 md:pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <p className="text-gold text-sm tracking-[0.2em] uppercase font-sans">Guide & Tutorial</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3">
              Guide sulla <span className="italic text-gold">Fresa per Unghie</span>
            </h1>
            <p className="text-cream/60 max-w-2xl mx-auto mt-4 font-sans">
              Tutorial, recensioni e consigli scritti da onicotecniche certificate. Tutto quello che devi
              sapere per usare la fresa elettrica come una professionista.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/guide/${p.slug}`}
                className="group bg-nero border border-gold/20 rounded-lg overflow-hidden hover:border-gold/50 transition-colors flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <OptimizedImage
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={800}
                    height={500}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-gold/70 text-xs font-sans mb-2">
                    <Clock size={12} /> {p.readingMinutes} min
                    <span>·</span>
                    <time dateTime={p.publishedAt}>
                      {new Date(p.publishedAt).toLocaleDateString("it-IT", { month: "long", year: "numeric" })}
                    </time>
                  </div>
                  <h2 className="font-serif text-xl text-cream group-hover:text-gold transition-colors leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-cream/60 text-sm font-sans mt-2 flex-1">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-sans mt-4">
                    Leggi la guida <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default Blog;
