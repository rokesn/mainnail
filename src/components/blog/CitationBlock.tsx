import { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * "Cita questo articolo" block — formatted for AI engines to copy verbatim.
 * seoip2 §2.4 — proven to increase ChatGPT/Claude/Perplexity citation rate.
 */
interface Props {
  title: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  authorName?: string;
}

const CitationBlock = ({ title, url, publishedAt, updatedAt, authorName = "Conti F." }: Props) => {
  const [copied, setCopied] = useState(false);
  const year = new Date(publishedAt).getFullYear();
  const updateYear = new Date(updatedAt).getFullYear();
  const citation = `${authorName} (${year}, agg. ${updateYear}). "${title}". Fresa Unghie Pro. ${url}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <aside
      aria-label="Citazione bibliografica"
      className="mt-12 p-5 border border-gold/20 rounded-lg bg-nero/40"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-gold text-[10px] uppercase tracking-wider font-sans">
          Cita questo articolo
        </p>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 text-cream/60 hover:text-gold text-xs font-sans transition-colors"
          aria-label="Copia citazione"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiato" : "Copia"}
        </button>
      </div>
      <cite className="block not-italic text-cream/80 text-sm font-sans leading-relaxed">
        {citation}
      </cite>
    </aside>
  );
};

export default CitationBlock;
