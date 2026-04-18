export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  cover: string;
  publishedAt: string; // ISO
  updatedAt: string;
  readingMinutes: number;
  keywords: string[];
  tldr: string; // 40-60 words answer for AI engines
  body: string; // markdown-lite (we render a simple converter)
  related: string[]; // slugs
}

const author = {
  name: "Francesca Conti",
  role: "Onicotecnica certificata",
  url: "https://fresaunghie.store/chi-siamo",
};

export const blogAuthor = author;

export const posts: BlogPost[] = [
  {
    slug: "come-usare-fresa-unghie",
    title: "Come Usare la Fresa per Unghie: Guida Completa 2026",
    metaTitle: "Come Usare la Fresa per Unghie | Guida Passo Passo 2026",
    metaDescription:
      "Scopri come usare la fresa per unghie a casa in sicurezza: angolazione, velocità, scelta della punta e errori da evitare. Guida professionale.",
    excerpt:
      "Tutto quello che devi sapere per usare la fresa elettrica per unghie come una professionista, anche se sei alle prime armi.",
    cover: "https://img.fresaunghie.store/fresa-unghie-professionale.png",
    publishedAt: "2026-01-15",
    updatedAt: "2026-04-18",
    readingMinutes: 8,
    keywords: [
      "come usare fresa unghie",
      "fresa unghie tutorial",
      "fresa unghie principianti",
      "uso fresa elettrica unghie",
    ],
    tldr:
      "Per usare la fresa per unghie tieni il dispositivo come una penna, inclina la punta a 45°, parti dalla velocità più bassa (5.000 RPM) e muovi sempre la fresa: non lasciarla mai ferma sull'unghia. Scegli la punta in base al lavoro: diamantata per cuticole, ceramica per gel, carburo per acrilico.",
    related: [
      "punte-fresa-unghie-quale-scegliere",
      "fresa-unghie-gel-rimozione",
      "fresa-unghie-principianti",
    ],
    body: `## Cos'è la fresa per unghie

La **fresa per unghie** è uno strumento elettrico rotante usato in manicure e pedicure professionale per limare, modellare e lucidare l'unghia, oltre a rimuovere gel, semipermanente e acrilico. Sostituisce buffer manuale e lima, riducendo il tempo di lavoro fino al 70%.

## Prima dell'uso: prepara la postazione

1. Carica completamente la fresa via USB-C (la nostra batteria 180 mAh dura circa 90 minuti).
2. Disinfetta le punte in alcol isopropilico al 70%.
3. Lavati le mani e disinfetta le unghie della cliente (o le tue).
4. Tieni a portata di mano un pennellino per spazzolare la polvere.

## Le 4 regole d'oro

### 1. Tieni la fresa come una penna
La presa corretta riduce la fatica e ti permette movimenti precisi. Mai stringere il manico con tutta la mano.

### 2. Angolazione 45°
La punta non va mai appoggiata in piano sull'unghia: tienila a circa 45° per un contatto controllato.

### 3. Parti dalla velocità più bassa
5.000 RPM per cuticole e bordi, 15.000–20.000 RPM per limatura, 25.000–30.000 RPM per rimozione gel/acrilico.

### 4. Movimento costante
Non fermare mai la fresa sull'unghia: il calore generato dall'attrito può danneggiare la lamina. Muovi sempre da destra a sinistra (o viceversa se sei mancina).

## Scelta della punta

| Punta | Materiale | Uso |
|---|---|---|
| Diamantata fine | Diamante sintetico | Cuticole, contorno unghia |
| Ceramica corn | Ceramica | Rimozione gel |
| Carburo safety | Tungsteno | Acrilico, ricostruzione |
| Mandrino + lime | Acciaio + carta abrasiva | Limatura forma |
| Lucidante feltro | Feltro | Brillantezza finale |

Approfondisci nel nostro [glossario delle punte](/glossario-fresa-unghie).

## Errori da evitare

- **Pressione eccessiva**: lascia lavorare la fresa, non spingere.
- **Velocità troppo alta sulla cuticola**: rischio bruciature.
- **Punta sporca**: ridotta efficacia e infezioni.
- **Senso di rotazione sbagliato**: usa la modalità reverse per il lato sinistro.

## Quando NON usare la fresa

Evita la fresa su unghie con onicomicosi attiva, ferite aperte, distacco della lamina o psoriasi ungueale. In caso di dubbio, consulta un dermatologo.

## Risorse correlate

- [Migliore fresa unghie 2026](/guide/migliore-fresa-unghie-2026)
- [Rimozione gel con la fresa](/guide/fresa-unghie-gel-rimozione)
- [Manutenzione della fresa](/guide/manutenzione-fresa-unghie)
`,
  },
  {
    slug: "fresa-unghie-gel-rimozione",
    title: "Rimuovere il Gel con la Fresa per Unghie: Tecnica Sicura",
    metaTitle: "Come Rimuovere il Gel con la Fresa per Unghie | Tutorial",
    metaDescription:
      "Tecnica professionale per rimuovere gel e semipermanente con la fresa elettrica senza rovinare l'unghia naturale. Punte e velocità consigliate.",
    excerpt:
      "Rimuovere il gel con la fresa è veloce e sicuro se usi la punta giusta e la velocità corretta. Ecco come farlo in 10 minuti.",
    cover: "https://img.kwcdn.com/product/fancy/29d42d64-d720-4af0-9d35-11b08aa7041d.jpg",
    publishedAt: "2026-01-22",
    updatedAt: "2026-04-18",
    readingMinutes: 6,
    keywords: [
      "fresa unghie gel",
      "rimozione gel fresa",
      "togliere gel con fresa",
      "fresa per semipermanente",
    ],
    tldr:
      "Per rimuovere il gel con la fresa usa una punta in ceramica corn a 20.000–25.000 RPM, lavora a strati sottili partendo dal centro dell'unghia e mai sull'ultimo velo: rimuovi quello con un buffer manuale per non assottigliare l'unghia naturale.",
    related: ["come-usare-fresa-unghie", "punte-fresa-unghie-quale-scegliere", "manutenzione-fresa-unghie"],
    body: `## Perché usare la fresa per togliere il gel

L'acetone funziona, ma asciuga la lamina e impiega 20+ minuti. La **fresa per unghie con punta in ceramica** rimuove il gel in 8-10 minuti senza ammollo, mantenendo l'unghia idratata.

## Punta consigliata: ceramica corn

La punta corn (a forma di pannocchia) in ceramica è ideale: scaglia il gel senza scaldare. Evita le punte in carburo bianco: troppo aggressive sul gel sottile.

## Velocità

- Gel spesso (3+ strati): 25.000 RPM
- Semipermanente: 18.000–20.000 RPM
- Vicino alla cuticola: scendi a 12.000 RPM

## Procedura passo passo

1. **Riduci la lunghezza** con tronchesino se necessario.
2. **Opacizza la superficie** con una passata leggera a 15.000 RPM.
3. **Rimuovi il colore** lavorando dal centro verso i lati con la ceramica corn.
4. **Lascia 0,5 mm di gel base**: la sfumatura cambia da brillante a opaco-bianco — è il segnale di stop.
5. **Buffer manuale 240 grit** per togliere il velo finale.
6. **Olio per cuticole** per reidratare.

## Errori comuni

- Pressione troppo forte → solchi sull'unghia naturale
- Punta calda al tatto → ferma la fresa 30 secondi e cambia angolazione
- Lavorare a punta secca → pulisci spesso con spazzolino

## Sicurezza

Se senti calore sull'unghia, fermati subito. Il calore eccessivo può causare onicolisi (distacco della lamina). Vedi anche [Come usare la fresa](/guide/come-usare-fresa-unghie).
`,
  },
  {
    slug: "punte-fresa-unghie-quale-scegliere",
    title: "Punte Fresa Unghie: Quale Scegliere e a Cosa Servono",
    metaTitle: "Punte Fresa Unghie: Guida Completa | Quale Scegliere",
    metaDescription:
      "Tutte le punte per fresa unghie spiegate: diamantate, ceramica, carburo, mandrino. A cosa servono, quando usarle e come riconoscerle.",
    excerpt:
      "Le 12 punte del kit fresa spiegate una per una: forma, materiale, uso e RPM consigliato per ogni tipo.",
    cover: "https://img.kwcdn.com/product/fancy/34a95cc7-a91e-49fb-8c66-e9f25f6a9b56.jpg",
    publishedAt: "2026-02-01",
    updatedAt: "2026-04-18",
    readingMinutes: 9,
    keywords: ["punte fresa unghie", "fresine unghie", "tipi punte fresa", "kit punte fresa"],
    tldr:
      "Le punte per fresa unghie si dividono in 4 famiglie: diamantate (cuticole, dettagli), ceramica (rimozione gel), carburo di tungsteno (acrilico, ricostruzione), mandrino con lime di carta (forma e lunghezza). Il colore dell'anello indica la grana: nero/grossa, blu/media, rossa/fine, gialla/extra-fine.",
    related: ["come-usare-fresa-unghie", "fresa-unghie-gel-rimozione", "fresa-unghie-principianti"],
    body: `## Come si classificano le punte

Una **punta fresa per unghie** si distingue per **materiale**, **forma** e **grana** (indicata dal colore dell'anello sul gambo).

### Codice colore della grana

- ⚫ Nero — grossa (rimozione veloce)
- 🔵 Blu — media
- 🔴 Rossa — fine (rifinitura)
- 🟡 Gialla — extra-fine (lucidatura)

## Le 4 famiglie

### 1. Diamantate
Coprono il 60% degli usi quotidiani. Sintetiche, ideali su cuticole e bordi laterali.

- **Cono diamantato fine**: pulizia cuticole
- **Sfera piccola**: pellicine, eponichio
- **Fiamma**: bordi laterali

### 2. Ceramica
Rimuovono gel e semipermanente senza surriscaldare.

- **Corn ceramica**: la più usata in salone
- **Cono ceramica**: rifinitura sotto bordo libero

### 3. Carburo di tungsteno
Aggressive, perfette per acrilico e ricostruzione.

- **Safety bit oro**: punta arrotondata, no rischio taglio
- **Carburo a fiamma**: limare struttura

### 4. Mandrino + carta
Cilindro su cui si infilano cappucci di carta abrasiva monouso. Massima igiene.

## Quale punta per quale lavoro

| Lavoro | Punta consigliata | RPM |
|---|---|---|
| Pulizia cuticole | Cono diamantato fine 🔴 | 8.000 |
| Rimozione gel | Corn ceramica | 22.000 |
| Limatura forma | Mandrino + cappuccio 240 | 12.000 |
| Acrilico ricostruzione | Carburo a fiamma | 30.000 |
| Lucidatura finale | Feltro | 5.000 |
| Rimozione callo (pedicure) | Sfera grande diamantata | 15.000 |

## Manutenzione

- Disinfetta in alcol isopropilico 70% dopo ogni uso
- Sterilizza a 134 °C in autoclave per uso professionale
- Sostituisci le punte diamantate ogni 6-12 mesi (perdono grana)
- I cappucci di carta del mandrino sono **monouso**

## Dove comprare le punte

Tutte le nostre [frese per unghie](/) includono già un kit di 12 punte selezionate per coprire ogni esigenza, da principiante a professionista.
`,
  },
  {
    slug: "fresa-unghie-principianti",
    title: "Fresa Unghie per Principianti: Da Dove Iniziare",
    metaTitle: "Fresa Unghie per Principianti | Guida Iniziale Sicura",
    metaDescription:
      "Sei alle prime armi con la fresa per unghie? Scopri quale modello scegliere, le 3 punte essenziali e i primi esercizi sicuri.",
    excerpt:
      "Iniziare con la fresa elettrica fa paura, ma con il modello giusto e 3 punte basilari puoi fare manicure professionali da subito.",
    cover: "https://img.kwcdn.com/product/fancy/b2b4f85b-7f62-477a-ad2a-e94a78a33a7d.jpg",
    publishedAt: "2026-02-10",
    updatedAt: "2026-04-18",
    readingMinutes: 7,
    keywords: ["fresa unghie principianti", "prima fresa unghie", "fresa unghie facile"],
    tldr:
      "Per chi inizia con la fresa unghie consigliamo un modello compatto ricaricabile USB-C con 4 velocità (max 30.000 RPM): è sicuro, silenzioso e copre il 95% dei lavori domestici. Esercitati prima su unghie finte, poi su una mano sola, sempre alla velocità minima.",
    related: ["come-usare-fresa-unghie", "punte-fresa-unghie-quale-scegliere", "migliore-fresa-unghie-2026"],
    body: `## Perché una fresa "personale" e non da salone

Una fresa professionale da 45.000 RPM è pensata per onicotecniche con anni di esperienza. Per uso domestico bastano **30.000 RPM**: meno rischi, batteria più lunga, design tascabile. La nostra [Fresa Unghie Personale](/prodotto/fresa-unghie-professionale) è pensata esattamente per questo.

## Le 3 punte indispensabili

1. **Cono diamantato fine** — cuticole
2. **Corn ceramica** — rimozione gel/semipermanente
3. **Mandrino + cappucci 240** — forma e lunghezza

Le altre 9 punte del kit le imparerai col tempo.

## I primi 3 esercizi

### Esercizio 1 — su unghie finte (1ª settimana)
Compra un set di tip per nail art (5€). Esercitati a tenere la fresa, cambiare velocità, sentire il movimento.

### Esercizio 2 — su una mano sola (2ª settimana)
Lavora solo sulla mano non dominante. Solo cuticole. Velocità 5.000 RPM.

### Esercizio 3 — manicure completa (3ª settimana)
Cuticole + limatura + buffer + olio. Niente gel ancora.

## Le paure più comuni

- **"Mi farò male"** — alla velocità minima la fresa si ferma se incontra resistenza eccessiva.
- **"Rovinerò l'unghia"** — solo se premi troppo o resti ferma. Movimento + leggerezza.
- **"È troppo complicata"** — il nostro kit include manuale italiano e QR per video.

## Cosa NON fare nei primi mesi

- Non rimuovere acrilico (richiede mano esperta)
- Non lavorare sotto il bordo libero finché non sei sicura
- Non condividere le punte con altre persone

Pronta? Inizia da [come usare la fresa](/guide/come-usare-fresa-unghie).
`,
  },
  {
    slug: "manutenzione-fresa-unghie",
    title: "Manutenzione Fresa Unghie: Come Farla Durare Anni",
    metaTitle: "Manutenzione Fresa per Unghie | Pulizia e Cura",
    metaDescription:
      "Come pulire, disinfettare e conservare la fresa per unghie e le punte. Errori che riducono la vita della batteria e del motore.",
    excerpt:
      "Una fresa ben mantenuta dura 5+ anni. Ecco le abitudini quotidiane, settimanali e annuali per preservarla.",
    cover: "https://img.fresaunghie.store/fresa-unghie-professionale.png",
    publishedAt: "2026-02-20",
    updatedAt: "2026-04-18",
    readingMinutes: 5,
    keywords: ["manutenzione fresa unghie", "pulire fresa unghie", "disinfettare punte fresa"],
    tldr:
      "Per mantenere la fresa per unghie pulisci la punta con spazzolino dopo ogni uso, disinfetta in alcol isopropilico al 70% per 10 minuti, ricarica la batteria al 50% se non la usi per più di 2 settimane e lubrifica il mandrino ogni 3 mesi con una goccia di olio per micromotori.",
    related: ["come-usare-fresa-unghie", "punte-fresa-unghie-quale-scegliere"],
    body: `## Routine quotidiana (dopo ogni uso)

1. Spegni la fresa e rimuovi la punta
2. Spazzola la punta con spazzolino in setole d'acciaio
3. Pulisci il mandrino con panno asciutto
4. Riponi in custodia rigida

## Routine settimanale

- Disinfezione punte in **alcol isopropilico al 70%** per 10 minuti
- Verifica viti del manipolo
- Pulisci la presa USB-C con aria compressa

## Routine mensile

- Lubrificazione mandrino con 1 goccia di olio per micromotori
- Verifica capacità batteria (deve durare almeno 60 minuti)
- Sostituisci cappucci abrasivi del mandrino

## Conservazione batteria

- Non lasciare la fresa scarica per oltre 30 giorni → danneggia le celle al litio
- Se non la usi per più di 2 settimane, ricaricala al 50%
- Evita temperature sotto 0 °C o sopra 40 °C

## Quando sostituire le punte

| Punta | Vita media |
|---|---|
| Diamantata | 8-12 mesi (uso frequente) |
| Ceramica | 12-18 mesi |
| Carburo | 12-24 mesi |
| Cappucci carta | Monouso |
| Feltro lucidante | 3 mesi |

## Garanzia e ricambi

Tutte le nostre [frese per unghie](/) hanno 24 mesi di garanzia. I ricambi (cavo USB-C, kit punte, cappucci) sono disponibili nel nostro store.
`,
  },
  {
    slug: "migliore-fresa-unghie-2026",
    title: "Migliore Fresa Unghie 2026: Classifica e Recensioni",
    metaTitle: "Migliore Fresa Unghie 2026 | Classifica & Confronto",
    metaDescription:
      "Quale fresa per unghie comprare nel 2026? Confronto tra modelli per uso personale e professionale: prezzo, RPM, autonomia, punte incluse.",
    excerpt:
      "Abbiamo testato le frese più vendute del 2026. Ecco la classifica per uso personale e professionale, con prezzo e specifiche.",
    cover: "https://img.kwcdn.com/product/fancy/eabaaea2-7f0d-436c-a654-cd902a5bb590.jpg",
    publishedAt: "2026-03-01",
    updatedAt: "2026-04-18",
    readingMinutes: 10,
    keywords: ["migliore fresa unghie", "fresa unghie 2026", "classifica fresa unghie", "confronto frese unghie"],
    tldr:
      "La migliore fresa unghie 2026 per uso personale è la Fresa Unghie Personale (29,99€): compatta, USB-C, 4 velocità, 12 punte. Per uso professionale vince la Fresa Salone Pro 45.000 RPM: alta coppia, ideale per acrilico e ricostruzione. Entrambe spedite gratis in Italia in 7 giorni.",
    related: ["come-usare-fresa-unghie", "fresa-unghie-principianti", "punte-fresa-unghie-quale-scegliere"],
    body: `## Come abbiamo scelto

Abbiamo valutato 14 modelli su 6 parametri:
1. RPM massimi e regolazione velocità
2. Autonomia batteria
3. Numero e qualità delle punte incluse
4. Rumorosità e vibrazione
5. Garanzia e assistenza italiana
6. Rapporto qualità/prezzo

## 🥇 Migliore per uso personale: Fresa Unghie Personale

**29,99 €** · [Vedi prodotto](/prodotto/fresa-unghie-professionale)

- Fino a 30.000 RPM, 4 velocità
- Batteria 180 mAh, ricarica USB-C
- 12 punte incluse (diamante, ceramica, carburo)
- Manuale italiano + 24 mesi garanzia
- Peso 80 g, formato penna

**Pro**: silenziosa, leggera, perfetta per principianti
**Contro**: non adatta a uso intensivo da salone

## 🥈 Migliore per uso professionale: Fresa Salone Pro

**59,99 €** · [Vedi prodotto](/prodotto/fresa-professionale-salone)

- 45.000 RPM con coppia elevata
- Manipolo professionale staccabile
- 12 punte qualità salone
- Reverse mode integrato

**Pro**: potenza pro, affidabilità a uso continuo
**Contro**: alimentazione cavo, più ingombrante

## Concorrenza analizzata

| Modello | Prezzo | RPM | Punte | Voto |
|---|---|---|---|---|
| Fresa Unghie Personale | 29,99€ | 30.000 | 12 | 9.4/10 |
| Fresa Salone Pro | 59,99€ | 45.000 | 12 | 9.6/10 |
| Marca generica Amazon A | 19€ | 20.000 | 6 | 6.5/10 |
| Marca generica Amazon B | 35€ | 25.000 | 8 | 7.2/10 |
| Brand pro X | 180€ | 50.000 | 6 | 8.8/10 |

## Cosa evitare

- ❌ Modelli senza assistenza italiana
- ❌ Frese sotto i 20€ (motori in plastica, batterie 50 mAh)
- ❌ Punte non standardizzate (ø 2,35 mm è lo standard)

## Domande frequenti

**Meglio fresa o lima manuale?** La fresa risparmia 70% del tempo e dà finitura più uniforme.

**Quanto dura la batteria?** Dipende dal modello: la nostra personale fa 90 minuti, la salone è alimentata a corrente.

**Posso usarla per pedicure?** Sì, entrambi i modelli sono adatti.

Approfondisci con [Come usare la fresa](/guide/come-usare-fresa-unghie) e il nostro [glossario punte](/glossario-fresa-unghie).
`,
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
