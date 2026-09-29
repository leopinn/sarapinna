# Sito di Sara Pinna — Astro

Sito vetrina dell'attività di **experience creator** a Verona e nel territorio: esperienze
ideate e coordinate insieme a partner locali (cantine, chef, guide, maneggi, auto d'epoca).
Le prenotazioni passano soprattutto da Airbnb Experiences; il sito raccoglie le esperienze,
racconta chi c'è dietro e porta al contatto.

Palette: avorio caldo e champagne come fondi, antracite per il testo, bordeaux come unico
accento, champagne scuro per i dettagli. Tutti i valori stanno in `src/styles/global.css`.

## Avvio

```bash
npm install
cp .env.example .env    # inserisci le chiavi EmailJS
npm run dev             # http://localhost:4321
```

## Struttura

```
src/
  data/site.js            ← recapiti, link e le 5 esperienze (nome, foto, testo it/en)
  i18n/index.js           ← tutti i testi dell'interfaccia, italiano e inglese
  layouts/Base.astro      ← head, font, nav, footer, widget WhatsApp
  components/
    Nav.astro  Hero.astro  About.astro
    Esperienze.astro        ← accordion di foto, usato in home
    EsperienzeElenco.astro  ← schede con testo, usate nella pagina Esperienze
    Contatti.astro  FormContatti.astro  Footer.astro  WhatsappWidget.astro
  pages/
    index.astro  esperienze.astro  about.astro  contatti.astro
    en/index.astro  en/experiences.astro  en/about.astro  en/contact.astro
  styles/global.css       ← token di colore/tipografia + animazioni
public/
  media/verona-hero.mp4   ← video dell'hero
  images/                 ← foto (vedi sotto)
```

L'italiano sta in radice, l'inglese sotto `/en`: due copie statiche vere, collegate fra loro
dalla bandiera nel menù (`gemella()` in `src/i18n/index.js`).

## Cose da completare

1. **Foto delle esperienze** — in `public/images/` servono `experience-1.jpg` … `experience-5.jpg`,
   nell'ordine dei dati in `src/data/site.js`. Mancano ancora `experience-4.jpg`
   (cooking class) e `experience-5.jpg` (cavallo e vino). Formato consigliato: 1800 × 1200 px.
2. **Foto della sezione About** — `sara.jpg` (già presente), più `about-2.jpg` e `about-3.jpg`.
3. **Link Airbnb** — in `src/data/site.js` il campo `airbnb` è ancora una ricerca generica:
   va sostituito con il profilo Airbnb Experiences dedicato appena è pronto.
4. **EmailJS** — crea servizio + template su emailjs.com, poi compila `.env`.
   Il template deve usare le variabili `{{nome}} {{cognome}} {{email}} {{messaggio}}`.

Le vecchie foto degli appartamenti (`gallery-1.png` … `gallery-5.png`) non sono più usate da
nessuna pagina: si possono cancellare.

## Animazioni

Gestite con **GSAP + ScrollTrigger** in `src/scripts/reveal.js`:

- entrata in cascata dell'hero (timeline con stagger)
- parallasse del video e scrim che si scurisce, in scrub sullo scroll
- rivelazione delle sezioni a gruppi (`ScrollTrigger.batch`)
- deriva verticale dei titoli di sezione

Le transizioni di colore restano in CSS a 140ms, come da design system.
Tutto è disattivato se il browser dichiara `prefers-reduced-motion: reduce`.
