/**
 * Gestione delle due lingue del sito.
 *
 * L'italiano sta in radice (/chi-sono), l'inglese sotto /en (/en/about):
 * sono due copie statiche vere, quindi Google indicizza entrambe e i link
 * sono condivisibili. Ogni componente ricava la lingua dall'indirizzo con
 * `linguaDa(Astro.url.pathname)` e legge i testi da `testi[lingua]`.
 *
 * Per aggiungere una pagina: una voce in `pagine`, le due pagine in
 * src/pages e i testi nei due dizionari qui sotto.
 */

/** Coppie di indirizzi: servono alla bandiera per trovare la pagina gemella. */
export const pagine = [
  { it: '/', en: '/en' },
  { it: '/chi-sono', en: '/en/about' },
  { it: '/servizi', en: '/en/experiences' },
  { it: '/galleria', en: '/en/gallery' },
  { it: '/contatti', en: '/en/contact' },
];

/** In build gli indirizzi arrivano con lo slash finale: "/chi-sono/" → "/chi-sono". */
const normalizza = (percorso) => {
  const p = percorso.replace(/\/+$/, '');
  return p === '' ? '/' : p;
};

/** Ricava la lingua dall'indirizzo: tutto ciò che sta sotto /en è inglese. */
export const linguaDa = (percorso) => {
  const p = normalizza(percorso);
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'it';
};

/** L'indirizzo della stessa pagina nell'altra lingua. */
export const gemella = (percorso) => {
  const p = normalizza(percorso);
  const lingua = linguaDa(p);
  const altra = lingua === 'it' ? 'en' : 'it';
  const coppia = pagine.find((c) => c[lingua] === p);
  // pagina non mappata: si torna alla home dell'altra lingua
  return coppia ? coppia[altra] : altra === 'en' ? '/en' : '/';
};

export const testi = {
  it: {
    codice: 'it',
    etichettaLingua: 'Italiano',
    bandiera: '/images/italian_flag.png',
    bandieraAlt: 'Italiano',
    cambioLingua: 'Passa alla versione in inglese',

    nav: [
      { label: 'Home', href: '/' },
      { label: 'Chi sono', href: '/chi-sono' },
      { label: 'Esperienze', href: '/servizi' },
      { label: 'Galleria', href: '/galleria' },
      { label: 'Contatti', href: '/contatti' },
    ],
    prenotaOra: 'Prenota ora',

    hero: {
      claim: 'Affitti brevi · Verona e provincia',
      titolo: 'La tua chiave per Verona',
      testo: 'Ospitalità su misura a Verona. Da me, per te.',
      conoscimi: 'Conoscimi',
      prenota: 'Prenota',
      scorri: 'Scorri',
    },

    chiSono: {
      eyebrow: 'Chi sono',
      titolo: 'Ospitalità fatta a mano, una casa alla volta',
      lead: 'Ho 28 anni e accolgo ospiti tra Isola della Scala e Verona.',
      testo1:
        'Ho iniziato con un appartamento e la voglia di far sentire le persone a casa anche lontano da casa. Oggi gestisco i miei alloggi su Airbnb e Booking e curo tutto io: la pulizia, il check-in, i messaggi a cui rispondo anche la sera tardi.',
      testo2:
        'Chi arriva trova le chiavi, un frigo con qualcosa dentro e una mappa dei posti dove mangio io — non quelli delle guide. Se hai bisogno di una culla, di un parcheggio o di un consiglio sull’Arena, basta scrivermi.',
      numeri: [
        { n: '2', l: 'Appartamenti gestiti' },
        { n: '15′', l: 'Dal centro di Verona' },
        { n: '1', l: 'Persona che risponde: io' },
      ],
      ritrattoAlt: 'Sara Pinna',
      ritrattoDidascalia: 'Sara Pinna, Isola della Scala (VR)',
    },

    esperienze: {
      eyebrow: 'Esperienze',
      titolo: 'Le esperienze che organizzo a Verona',
      cta: 'Richiedi disponibilità',
    },

    galleria: {
      eyebrow: 'Galleria',
      titolo: 'Dove soggiornerai',
      indicazioneDesktop: 'Passa sopra una foto per aprirla, clicca per vederla grande',
      indicazioneMobile: 'Tocca una foto per vederla grande',
      apri: 'Apri',
      chiudi: 'Chiudi ✕',
    },

    contatti: {
      eyebrow: 'Contatti',
      titolo: 'Scrivimi, risponde sempre Sara',
      testo:
        'Per disponibilità, preventivi o una domanda sulle case. Di solito rispondo entro poche ore.',
      doveSono: 'Dove sono',
      distanza: '15 minuti dal centro, 20 dalla Fiera',
      telefono: 'Telefono e WhatsApp',
      email: 'Email',
    },

    form: {
      titolo: 'Richiedi disponibilità',
      sottotitolo: 'Compila il modulo, ti rispondo via email.',
      nome: 'Nome',
      cognome: 'Cognome',
      email: 'Email',
      emailSegnaposto: 'nome@email.com',
      messaggio: 'Messaggio',
      messaggioSegnaposto: 'Date, numero di ospiti, domande…',
      esca: 'Sito web',
      invia: 'Invia messaggio',
      invio: 'Invio…',
      inviato: 'Inviato',
      grazie: 'Grazie! Ti rispondo al più presto.',
      erroreGenerico: 'Invio non riuscito. Scrivimi su WhatsApp o per email.',
    },

    footer: {
      testo:
        'Affitti brevi tra Isola della Scala e Verona. Case curate una per una, accoglienza di persona.',
      instagram: 'Profilo Instagram',
      airbnb: 'Pagina Airbnb',
      colonnaSito: 'Sito',
      colonnaPrenota: 'Prenota',
      colonnaContatti: 'Contatti',
      richiedi: 'Richiedi disponibilità',
      diritti: 'Tutti i diritti riservati',
    },

    whatsapp: {
      etichetta: 'Scrivimi su WhatsApp',
      messaggio: 'Ciao Sara, vorrei informazioni sulla disponibilità',
    },

    pagine: {
      home: {
        titolo: 'Sara Pinna — Affitti brevi a Verona e Isola della Scala',
        descrizione:
          'Appartamenti in affitto breve tra Isola della Scala e Verona. Accoglienza curata di persona, prenotazioni su Airbnb e Booking.',
      },
      chiSono: {
        titolo: 'Chi sono — Sara Pinna',
        descrizione:
          'Ho 28 anni e accolgo ospiti tra Isola della Scala e Verona: ogni soggiorno lo curo di persona.',
        eyebrow: 'Chi sono',
        h1: 'Racconto breve, casa vera',
      },
      servizi: {
        titolo: 'Esperienze — Sara Pinna',
        descrizione:
          'Tour guidato di Verona, degustazioni di vini locali e giri in auto d’epoca: le esperienze che organizzo per i miei ospiti.',
        eyebrow: 'Esperienze',
        h1: 'Verona, non solo dormire',
      },
      galleria: {
        titolo: 'Galleria — Sara Pinna',
        descrizione: 'Le foto degli appartamenti: soggiorno, camere, cucina e dettagli.',
        eyebrow: 'Galleria',
        h1: 'Le case, in fotografia',
      },
      contatti: {
        titolo: 'Contatti — Sara Pinna',
        descrizione:
          'Telefono, WhatsApp, email e modulo di contatto per richiedere disponibilità.',
        eyebrow: 'Contatti',
        h1: 'Parliamone',
      },
    },
  },

  en: {
    codice: 'en',
    etichettaLingua: 'English',
    bandiera: '/images/english_flag.png',
    bandieraAlt: 'English',
    cambioLingua: 'Switch to the Italian version',

    nav: [
      { label: 'Home', href: '/en' },
      { label: 'About', href: '/en/about' },
      { label: 'Experiences', href: '/en/experiences' },
      { label: 'Gallery', href: '/en/gallery' },
      { label: 'Contact', href: '/en/contact' },
    ],
    prenotaOra: 'Book now',

    hero: {
      claim: 'Short stays · Verona and around',
      titolo: 'Your key to Verona',
      testo: 'Tailor-made hospitality in Verona. From me, for you.',
      conoscimi: 'Meet me',
      prenota: 'Book',
      scorri: 'Scroll',
    },

    chiSono: {
      eyebrow: 'About',
      titolo: 'Handmade hospitality, one home at a time',
      lead: 'I’m 28 and I host guests between Isola della Scala and Verona.',
      testo1:
        'I started with one apartment and the wish to make people feel at home even when they are far from home. Today I run my places on Airbnb and Booking and I look after everything myself: the cleaning, the check-in, the messages I answer late in the evening too.',
      testo2:
        'You’ll find the keys waiting, a fridge with something in it and a map of the places where I eat — not the ones in the guidebooks. If you need a cot, a parking spot or advice about the Arena, just write to me.',
      numeri: [
        { n: '2', l: 'Apartments I run' },
        { n: '15′', l: 'From the centre of Verona' },
        { n: '1', l: 'Person who answers: me' },
      ],
      ritrattoAlt: 'Sara Pinna',
      ritrattoDidascalia: 'Sara Pinna, Isola della Scala (Verona)',
    },

    esperienze: {
      eyebrow: 'Experiences',
      titolo: 'The experiences I arrange in Verona',
      cta: 'Ask about availability',
    },

    galleria: {
      eyebrow: 'Gallery',
      titolo: 'Where you’ll be staying',
      indicazioneDesktop: 'Hover a photo to open it, click to see it full size',
      indicazioneMobile: 'Tap a photo to see it full size',
      apri: 'Open',
      chiudi: 'Close ✕',
    },

    contatti: {
      eyebrow: 'Contact',
      titolo: 'Write to me — Sara always replies',
      testo:
        'For availability, quotes or a question about the homes. I usually reply within a few hours.',
      doveSono: 'Where I am',
      distanza: '15 minutes from the centre, 20 from the exhibition centre',
      telefono: 'Phone and WhatsApp',
      email: 'Email',
    },

    form: {
      titolo: 'Ask about availability',
      sottotitolo: 'Fill in the form and I’ll reply by email.',
      nome: 'First name',
      cognome: 'Last name',
      email: 'Email',
      emailSegnaposto: 'name@email.com',
      messaggio: 'Message',
      messaggioSegnaposto: 'Dates, number of guests, questions…',
      esca: 'Website',
      invia: 'Send message',
      invio: 'Sending…',
      inviato: 'Sent',
      grazie: 'Thank you! I’ll reply as soon as I can.',
      erroreGenerico: 'Could not send. Write to me on WhatsApp or by email.',
    },

    footer: {
      testo:
        'Short stays between Isola della Scala and Verona. Homes looked after one by one, welcomed in person.',
      instagram: 'Instagram profile',
      airbnb: 'Airbnb page',
      colonnaSito: 'Site',
      colonnaPrenota: 'Book',
      colonnaContatti: 'Contact',
      richiedi: 'Ask about availability',
      diritti: 'All rights reserved',
    },

    whatsapp: {
      etichetta: 'Message me on WhatsApp',
      messaggio: 'Hi Sara, I’d like to know about availability',
    },

    pagine: {
      home: {
        titolo: 'Sara Pinna — Short stays in Verona and Isola della Scala',
        descrizione:
          'Short-stay apartments between Isola della Scala and Verona. Welcomed in person, bookable on Airbnb and Booking.',
      },
      chiSono: {
        titolo: 'About — Sara Pinna',
        descrizione:
          'I’m 28 and I host guests between Isola della Scala and Verona: I look after every stay myself.',
        eyebrow: 'About',
        h1: 'A short story, a real home',
      },
      servizi: {
        titolo: 'Experiences — Sara Pinna',
        descrizione:
          'Guided tours of Verona, local wine tastings and vintage car rides: the experiences I arrange for my guests.',
        eyebrow: 'Experiences',
        h1: 'Verona, not just a place to sleep',
      },
      galleria: {
        titolo: 'Gallery — Sara Pinna',
        descrizione: 'Photos of the apartments: living room, bedrooms, kitchen and details.',
        eyebrow: 'Gallery',
        h1: 'The homes, in photographs',
      },
      contatti: {
        titolo: 'Contact — Sara Pinna',
        descrizione: 'Phone, WhatsApp, email and a contact form to ask about availability.',
        eyebrow: 'Contact',
        h1: 'Let’s talk',
      },
    },
  },
};
