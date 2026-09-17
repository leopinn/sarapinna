# Sito di Sara Pinna — Astro

Sito vetrina per affitti brevi a Verona / Isola della Scala.
Design: sistema **Letter** (serif display Playfair Display + Archivo, radii 2px, nessuna ombra,
pareti colorate peach / mint / lavender per le card).

## Avvio

```bash
npm install
cp .env.example .env    # inserisci le chiavi EmailJS
npm run dev             # http://localhost:4321
```

## Struttura

```
src/
  data/site.js            ← tutti i testi, link e contatti in un unico posto
  layouts/Base.astro      ← head, font, nav, footer, widget WhatsApp
  components/
    Nav.astro  Hero.astro  ChiSono.astro  Servizi.astro
    Galleria.astro  Contatti.astro  FormContatti.astro
    Footer.astro  WhatsappWidget.astro
  pages/
    index.astro  chi-sono.astro  servizi.astro  galleria.astro  contatti.astro
    api/contatti.js         ← BACKEND opzionale (richiede output: 'server' + adapter)
    api/whatsapp.js         ← BACKEND opzionale: costruisce il link wa.me
  styles/global.css       ← token di colore/tipografia + animazioni
public/
  media/verona-hero.mp4   ← video dell'hero
  images/                 ← qui le foto: sara.jpg, gallery-1.jpg … gallery-5.jpg
```

## Cose da completare

1. **Foto** — metti in `public/images/`: `sara.jpg` (ritratto) e `gallery-1.jpg` … `gallery-5.jpg`.
2. **Link Airbnb e Booking** — in `src/data/site.js` metti gli URL veri; finché sono vuoti le card
   mostrano il badge "In arrivo" e portano ai contatti.
3. **EmailJS** — crea servizio + template su emailjs.com, poi compila `.env`.
   Il template deve usare le variabili `{{nome}} {{cognome}} {{email}} {{messaggio}}`.

## Animazioni

Gestite con **GSAP + ScrollTrigger** in `src/scripts/reveal.js`:

- entrata in cascata dell'hero (timeline con stagger)
- parallasse del video e scrim che si scurisce, in scrub sullo scroll
- rivelazione delle sezioni a gruppi (`ScrollTrigger.batch`)
- deriva verticale dei titoli di sezione
- micro-movimento della freccia nelle card dei servizi

Le transizioni di colore restano in CSS a 140ms, come da design system.
Tutto è disattivato se il browser dichiara `prefers-reduced-motion: reduce`.
