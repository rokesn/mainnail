import { useParams, Link, Navigate } from "react-router-dom";
import { Head } from "@/lib/ssg-shim";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import BackToTop from "@/components/BackToTop";
import OptimizedImage from "@/components/OptimizedImage";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import CitationBlock from "@/components/blog/CitationBlock";
import { getPostBySlug, posts } from "@/data/blog";
import { renderMarkdown } from "@/lib/markdown";
import { Clock, Calendar, ArrowRight, ChevronRight } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  if (!post) return <Navigate to="/guide" replace />;

  const url = `https://fresaunghie.store/guide/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    image: [post.cover],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@id": "https://fresaunghie.store/#author-francesca-conti" },
    publisher: { "@id": "https://fresaunghie.store/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": "https://fresaunghie.store/#website" },
    keywords: post.keywords.join(", "),
    inLanguage: "it-IT",
    wordCount: post.body.split(/\s+/).length,
    timeRequired: `PT${post.readingMinutes}M`,
    articleSection: "Guide Fresa Unghie",
    about: { "@type": "Thing", name: "Fresa per unghie", sameAs: "https://it.wikipedia.org/wiki/Onicotecnica" },
    citation: {
      "@type": "CreativeWork",
      name: "Fresa Unghie Pro Knowledge Base",
      url: "https://fresaunghie.store/llms-full.txt"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fresaunghie.store/" },
      { "@type": "ListItem", position: 2, name: "Guide", item: "https://fresaunghie.store/guide" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".tldr"] },
    url,
  };

  const related = post.related.map(getPostBySlug).filter(Boolean);

  return (
    <>
      <Head>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.cover} />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:author" content="Francesca Conti" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={post.cover} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
      </Head>
      <ReadingProgress />
      <AnnouncementBar />
      <Navbar />
      <TableOfContents />

      <main className="bg-nero min-h-screen pt-24 md:pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-cream/50 text-xs font-sans mb-6 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight size={12} />
            <Link to="/guide" className="hover:text-gold">Guide</Link>
            <ChevronRight size={12} />
            <span className="text-cream/70">{post.title}</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-cream leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-cream/50 text-sm font-sans">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> Aggiornato il <time dateTime={post.updatedAt}>{new Date(post.updatedAt).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}</time></span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readingMinutes} min di lettura</span>
              <span>· di <Link to="/chi-siamo" className="text-gold hover:underline">Francesca Conti</Link></span>
            </div>
          </header>

          <OptimizedImage
            src={post.cover}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-lg mb-8"
            width={1200}
            height={675}
            priority
          />

          {/* TL;DR — speakable for AI engines */}
          <aside className="tldr bg-gold/5 border-l-4 border-gold p-5 rounded mb-10">
            <p className="text-gold font-sans text-xs uppercase tracking-wider mb-2">Risposta breve</p>
            <p className="text-cream/90 leading-relaxed">{post.tldr}</p>
          </aside>

          <div className="prose-content">
            {renderMarkdown(post.body)}
          </div>

          {/* Citation block — boosts AI engine verbatim citation rate (seoip2 §2.4) */}
          <CitationBlock
            title={post.title}
            url={url}
            publishedAt={post.publishedAt}
            updatedAt={post.updatedAt}
          />

          {/* Author bio */}
          <div className="mt-12 p-6 border border-gold/20 rounded-lg bg-gold/5">
            <p className="text-gold text-xs uppercase tracking-wider font-sans mb-2">Autrice</p>
            <h3 className="font-serif text-xl text-cream">Francesca Conti</h3>
            <p className="text-cream/60 text-sm font-sans mt-1">
              Onicotecnica certificata con 12 anni di esperienza, formatrice per onicotecniche e
              consulente in prodotti professionali per nail care.
            </p>
            <Link to="/chi-siamo" className="inline-flex items-center gap-1 text-gold text-sm font-sans mt-3 hover:underline">
              Scopri di più <ArrowRight size={14} />
            </Link>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-serif text-2xl text-cream mb-6">Continua a leggere</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((r) => r && (
                  <Link key={r.slug} to={`/guide/${r.slug}`} className="block p-4 border border-gold/20 rounded hover:border-gold/50 transition-colors">
                    <h3 className="font-serif text-base text-cream group-hover:text-gold leading-snug">{r.title}</h3>
                    <span className="inline-flex items-center gap-1 text-gold text-xs font-sans mt-2">
                      Leggi <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-16 p-8 bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-lg text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-cream">Pronta a iniziare?</h2>
            <p className="text-cream/70 font-sans mt-2 max-w-md mx-auto">
              Scopri il nostro kit fresa per unghie con 12 punte incluse. Spedizione gratuita in Italia.
            </p>
            <Link
              to="/prodotto/fresa-unghie-professionale"
              className="inline-flex items-center gap-2 bg-gold text-nero px-6 py-3 rounded-md font-sans font-semibold mt-5 hover:bg-gold-light transition-colors"
            >
              Vedi la Fresa Unghie <ArrowRight size={16} />
            </Link>
          </section>
        </article>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default BlogPost;
