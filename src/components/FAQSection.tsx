import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

export const faqs = [
  // Featured snippet-optimized (paragraph snippet target)
  { q: "Cos'è una fresa per unghie?", a: "La fresa per unghie è uno strumento elettrico rotativo professionale utilizzato per limare, modellare, lucidare e preparare le unghie naturali e artificiali. Funziona tramite un manipolo con punte intercambiabili che ruotano a velocità variabile, ideale per manicure, pedicure, gel e acrilico sia a casa che in salone. Lo strumento viene utilizzato da onicotecniche e estetiste professioniste in ogni salone." },
  { q: "Come si usa una fresa per unghie?", a: "Per usare la fresa per unghie: 1) Seleziona la punta adatta al tipo di lavorazione. 2) Inserisci la punta nel manipolo fino al click. 3) Imposta la velocità minima (per i principianti). 4) Mantieni il manipolo inclinato di 45° rispetto all'unghia. 5) Muovi la fresa in direzione della crescita dell'unghia. 6) Pulisci le punte con il pennellino dopo ogni utilizzo." },
  { q: "Come si usano le punte frese per unghie?", a: "Le punte frese per unghie si applicano al manipolo della fresa. Ogni punta ha un uso specifico: le punte diamantate sono ideali per cuticole, quelle in ceramica per gel e acrilico, quelle in carburo di tungsteno per rimozione materiale. Le punte a fiamma servono per pulizia sotto l'unghia, le punte a cilindro per la limatura della superficie, e le punte a cono per la modellatura dei bordi. Le 12 punte incluse nel kit coprono tutte le esigenze." },
  // PAA-targeted questions (People Also Ask)
  { q: "La fresa per unghie fa male alle unghie naturali?", a: "No, la fresa per unghie non fa male alle unghie naturali se usata correttamente. Il segreto è mantenere il dispositivo in movimento costante, senza premere troppo, e partire sempre dalla velocità più bassa con punte a grana fine. Le punte diamantate delicate sono ideali per lavorare sulle unghie naturali senza danneggiarle." },
  { q: "Qual è la velocità giusta per la fresa unghie?", a: "La velocità giusta dipende dalla lavorazione. Per le cuticole e unghie naturali, usa 5.000-10.000 RPM. Per la rimozione del gel, 15.000-25.000 RPM. Per acrilico e ricostruzioni, 25.000-35.000 RPM. Per la lucidatura finale, 5.000-8.000 RPM. I principianti dovrebbero iniziare sempre dalla velocità più bassa e aumentare gradualmente." },
  { q: "Quanto dura una fresa per unghie professionale?", a: "Una fresa per unghie professionale di qualità dura in media 3-5 anni con un uso regolare e una manutenzione corretta. Le punte intercambiabili vanno sostituite ogni 3-6 mesi per uso professionale in salone, mentre per uso domestico durano diversi mesi. La manutenzione regolare — pulizia dopo ogni uso e disinfezione — prolunga notevolmente la vita dello strumento." },
  { q: "Posso usare la fresa su unghie danneggiate?", a: "No, è sconsigliato usare la fresa su unghie gravemente danneggiate, infiammate o con infezioni fungine. In caso di unghie leggermente indebolite, puoi usare la velocità minima con punte a grana fine per lucidatura delicata. Per problemi alle unghie è sempre consigliabile consultare un dermatologo prima di usare la fresa." },
  { q: "La fresa per unghie si può usare a casa?", a: "Sì, la fresa per unghie si può assolutamente usare a casa. La Fresa Unghie Professionale è stata progettata specificamente per l'uso domestico: è compatta, silenziosa, ricaricabile via Type-C e ha 4 velocità regolabili per permettere anche alle principianti di ottenere risultati professionali in autonomia." },
  { q: "Qual è la differenza tra fresa e lima elettrica?", a: "Fresa e lima elettrica per unghie sono essenzialmente lo stesso strumento. 'Lima elettrica' è il termine più usato per modelli compatti ad uso personale, mentre 'fresa' indica tipicamente modelli più potenti per uso professionale in salone. Entrambi utilizzano punte rotanti intercambiabili per limare, modellare e lucidare le unghie." },
  { q: "Come si sterilizzano le punte della fresa?", a: "Per sterilizzare le punte della fresa: 1) Rimuovi i residui con una spazzolina dopo ogni utilizzo. 2) Immergi le punte in soluzione disinfettante per 10-15 minuti. 3) Per uso professionale in salone, usa l'autoclave per la sterilizzazione completa. 4) Le punte in metallo possono essere sterilizzate anche con lampada UV. 5) Asciuga completamente prima di riporre." },
  { q: "La fresa per unghie scalda?", a: "Se usata correttamente, la fresa per unghie non dovrebbe surriscaldare le unghie. Il segreto è mantenere il dispositivo in movimento costante, senza premere troppo e partire dalla velocità più bassa. La Fresa Salone ha un sistema di raffreddamento integrato che aiuta a prevenire il surriscaldamento durante le sessioni intensive." },
  // Original FAQs
  { q: "La fresa è adatta ai principianti?", a: "Assolutamente sì! La Fresa Unghie Professionale è stata progettata appositamente per chi inizia. Le 4 velocità regolabili ti permettono di partire piano e aumentare man mano che acquisisci sicurezza." },
  { q: "Posso usare la fresa su unghie in gel e acriliche?", a: "Certamente! Entrambi i modelli di fresa per unghie sono adatti per gel e acrilico. Per lavori intensivi, consigliamo la Fresa Professionale Salone 45000 RPM per la sua potenza superiore." },
  { q: "Quando arriva il mio ordine?", a: "Spediamo entro 24 ore lavorative. La consegna della fresa per unghie avviene in 7 giorni lavorativi in tutta Italia con spedizione gratuita. Riceverai una email con il link di tracciamento." },
  { q: "Come funziona il reso?", a: "Offriamo reso gratuito entro 30 giorni dall'acquisto. Basta contattarci e ti invieremo le istruzioni per il reso. Il rimborso viene processato entro 5-7 giorni lavorativi." },
  { q: "Qual è la differenza tra la fresa uso personale e quella da salone?", a: "La Fresa Unghie Professionale è compatta, portatile e ricaricabile via Type-C, perfetta per uso domestico. La Fresa Professionale Salone raggiunge 45.000 RPM con alta coppia motore, ideale per estetiste e onicotecniche professioniste." },
  { q: "A cosa serve la fresa per unghie?", a: "La fresa per unghie serve per molteplici lavorazioni: limatura e modellatura delle unghie naturali e artificiali, rimozione di gel, acrilico e semipermanente, cura e pulizia delle cuticole, lucidatura della superficie ungueale e preparazione dell'unghia per l'applicazione di nuovi prodotti. È uno strumento versatile indispensabile per manicure e pedicure professionali." },
  { q: "La fresa per unghie è rumorosa?", a: "No, i nostri modelli sono progettati per essere silenziosi e a bassa vibrazione. La Fresa Unghie Professionale è particolarmente silenziosa grazie al motore brushless, perfetta per l'uso domestico senza disturbare." },
  { q: "Posso usare la fresa sulle unghie naturali?", a: "Sì, la fresa per unghie è adatta anche per le unghie naturali. Ti consigliamo di usare la velocità più bassa e le punte più fini (come le punte diamantate a grana fine) per lavorare delicatamente sulle unghie naturali." },
  { q: "Quale velocità usare per il gel?", a: "Per la rimozione del gel si consiglia una velocità media-alta. Con la Fresa Unghie Professionale, usa la velocità 3 o 4. Con la Fresa Salone, imposta tra 20.000 e 35.000 RPM. Usa le punte in ceramica specifiche per gel incluse nel kit." },
  { q: "La fresa Personal Pro va in aereo? È permessa come bagaglio a mano?", a: "Sì, la Fresa Unghie Professionale è compatta e può essere portata nel bagaglio a mano. Le sue dimensioni tascabili la rendono perfetta per viaggiare. La batteria integrata è entro i limiti consentiti dalle compagnie aeree." },
  { q: "Quanto dura la batteria della Fresa Unghie Professionale?", a: "La batteria 180mAh della Fresa Unghie Professionale garantisce sessioni di lavoro sufficienti per una manicure completa. La ricarica avviene tramite cavo Type-C incluso nella confezione e richiede circa 1-2 ore per una carica completa." },
  { q: "La fresa è adatta per la pedicure professionale?", a: "Assolutamente sì! Entrambi i modelli possono essere utilizzati per la pedicure. Per la pedicure professionale in salone, consigliamo la Fresa Salone 45000 RPM per la maggiore potenza necessaria a lavorare su unghie dei piedi più spesse e callosità." },
  { q: "Posso acquistare solo le punte fresa di ricambio?", a: "Al momento offriamo i kit completi con 12 punte incluse. Stiamo lavorando per rendere disponibili le punte di ricambio singole nel prossimo futuro. Iscriviti alla newsletter per essere avvisata quando saranno disponibili!" },
  // Table snippet target
  { q: "Quali sono i tipi di punte fresa per unghie e a cosa servono?", a: "Ecco i principali tipi di punte: Punta a fiamma (ceramica) → rimozione gel e acrilico. Punta diamantata (diamante sintetico) → cuticole e bordi. Punta a cilindro (carburo di tungsteno) → limatura superficie. Punta a cono (pietra/ceramica) → modellatura bordi. Buffing cap (gomma/silicone) → lucidatura finale. Nel nostro kit trovi 12 punte che coprono tutte queste categorie." },
];

const FAQSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="faq" ref={ref} className="bg-cream py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl md:text-5xl font-bold text-nero text-center mb-12"
        >
          Domande Frequenti sulla <span className="italic text-gold-dark">Fresa Unghie</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4 bg-background">
                <AccordionTrigger className="text-left font-sans text-sm font-semibold text-foreground hover:text-gold-dark transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-sans text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
