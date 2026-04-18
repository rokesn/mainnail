// Tiny markdown renderer for blog body. Supports headings, lists, tables,
// inline links, bold/italic and paragraphs. Avoids adding heavy deps.
import React from "react";

const inline = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/;
  const boldRe = /\*\*([^*]+)\*\*/;
  while (remaining.length) {
    const link = remaining.match(linkRe);
    const bold = remaining.match(boldRe);
    const next = [link, bold].filter(Boolean).sort((a, b) => a!.index! - b!.index!)[0];
    if (!next) {
      parts.push(remaining);
      break;
    }
    if (next.index! > 0) parts.push(remaining.slice(0, next.index));
    if (next === link) {
      parts.push(
        <a key={key++} href={link![2]} className="text-gold underline hover:text-gold-light">
          {link![1]}
        </a>
      );
      remaining = remaining.slice(next.index! + next[0].length);
    } else {
      parts.push(
        <strong key={key++} className="text-cream font-semibold">
          {bold![1]}
        </strong>
      );
      remaining = remaining.slice(next.index! + next[0].length);
    }
  }
  return parts;
};

export const renderMarkdown = (md: string): React.ReactNode => {
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    // Headings
    if (line.startsWith("### ")) { out.push(<h3 key={key++} className="font-serif text-xl md:text-2xl text-gold mt-8 mb-3">{line.slice(4)}</h3>); i++; continue; }
    if (line.startsWith("## ")) { out.push(<h2 key={key++} className="font-serif text-2xl md:text-3xl text-cream mt-10 mb-4">{line.slice(3)}</h2>); i++; continue; }

    // Table
    if (line.startsWith("|") && lines[i + 1]?.includes("---")) {
      const header = line.split("|").slice(1, -1).map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      out.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-gold/20 rounded">
            <thead className="bg-gold/10">
              <tr>{header.map((h, idx) => <th key={idx} className="text-left p-3 text-gold font-sans font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-t border-gold/10">
                  {r.map((c, ci) => <td key={ci} className="p-3 text-cream/80">{inline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      out.push(
        <ol key={key++} className="list-decimal list-inside space-y-2 text-cream/80 my-4 pl-2">
          {items.map((it, idx) => <li key={idx}>{inline(it)}</li>)}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      out.push(
        <ul key={key++} className="list-disc list-inside space-y-2 text-cream/80 my-4 pl-2">
          {items.map((it, idx) => <li key={idx}>{inline(it)}</li>)}
        </ul>
      );
      continue;
    }

    // Paragraph
    out.push(<p key={key++} className="text-cream/80 leading-relaxed my-4">{inline(line)}</p>);
    i++;
  }
  return out;
};
