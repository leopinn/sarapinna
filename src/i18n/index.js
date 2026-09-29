/**
 * Gestione delle due lingue del sito.
 *
 * L'italiano sta in radice (/esperienze), l'inglese sotto /en (/en/experiences):
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
  { it: '/esperienze', en: '/en/experiences' },
  { it: '/about', en: '/en/about' },
  { it: '/contatti', en: '/en/contact' },
];

/** In build gli indirizzi arrivano con lo slash finale: "/about/" → "/about". */
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

    // L'ordine conta: [0] è la home (il marchio), [3] è la pagina contatti,
    // a cui puntano il bottone del menù e le chiamate all'azione.
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Esperienze', href: '/esperienze' },
      { label: 'About', href: '/about' },
      { label: 'Contatti', href: '/contatti' },
    ],
    prenotaOra: 'Prenota',

    hero: {
      claim: 'Experience creator · Verona e territorio',
      titolo: 'Vivi Verona diversamente',
      testo:
        'Esperienze locali curate, create insieme a chi questo territorio lo conosce davvero.',
      esplora: 'Scopri le esperienze',
      contatta: 'Parliamone',
      scorri: 'Scorri',
    },

    about: {
      eyebrow: 'About',
      titolo: 'Creo esperienze, non rivendo tour',
      lead:
        'Ideo e organizzo esperienze sul territorio di Verona: metto insieme attività, luoghi e partner locali e li trasformo in giornate complete da vivere.',
      testo1:
        'Il progetto nasce per portare a Verona e nei dintorni esperienze curate davvero. Non sono sempre io a svolgere ogni attività: il mio lavoro è ideare il format, trovare i partner giusti, mettere insieme i vari elementi e coordinare l’esperienza dall’inizio alla fine.',
      testo2:
        'Collaboro con cantine, ristoranti, chef, guide, maneggi, strutture ricettive e servizi particolari come le auto d’epoca. Ognuno fa quello che sa fare meglio; io tengo insieme i pezzi e rispondo di come va la giornata.',
      numeri: [
        { n: '5', l: 'Esperienze in preparazione' },
        { n: '100%', l: 'Partner del territorio' },
        { n: '1', l: 'Persona che coordina tutto: io' },
      ],
      ritrattoAlt: 'Sara Pinna',
      blocchi: [
        {
          titolo: 'Non il solito tour turistico',
          fotoAlt: 'Un momento di un’esperienza a Verona',
          paragrafi: [
            'Verona è piena di giri organizzati che si assomigliano tutti: stessi orari, stesse tappe, stesse fotografie. Io sono partita dall’idea opposta, e cioè da quello che mi piacerebbe vivere se arrivassi qui per la prima volta.',
            'Da qui nascono esperienze più autentiche e più belle da vivere: gruppi piccoli, luoghi veri, persone del posto che raccontano il proprio mestiere. E curate anche nell’immagine, perché il modo in cui un’esperienza si presenta fa parte dell’esperienza.',
            'Il risultato non è un elenco di monumenti visti di corsa, ma una giornata che ti resta addosso.',
          ],
        },
        {
          titolo: 'Come nasce un’esperienza',
          fotoAlt: 'Sara al lavoro sull’organizzazione di un’esperienza',
          paragrafi: [
            'Prima viene l’idea: che cosa voglio far provare, in che luogo, con che ritmo. Poi cerco i partner giusti — una cantina, uno chef, una guida, un maneggio, un’auto d’epoca — e li incontro di persona, perché l’esperienza vale quanto vale chi la porta avanti.',
            'A quel punto metto insieme i pezzi: tempi, spostamenti, soste, materiali. Provo il percorso, aggiusto quello che non funziona e solo alla fine lo apro alle prenotazioni.',
            'Le prenotazioni passano soprattutto da Airbnb Experiences, ma se vuoi qualcosa di costruito su misura — una data particolare, un gruppo, un’occasione — scrivimi e ne parliamo.',
          ],
        },
      ],
      perche: {
        titolo: 'Perché scegliermi?',
        voci: [
          'Esperienze ideate, non rivendute',
          'Partner locali scelti uno a uno',
          'Niente classiche attività turistiche',
        ],
      },
    },

    esperienze: {
      eyebrow: 'Esperienze',
      titolo: 'Le esperienze che sto creando',
      intro:
        'Verona e il suo territorio raccontati attraverso il vino, la cucina, la campagna e qualche mezzo fuori dal comune. Ogni esperienza nasce insieme a partner locali scelti di persona.',
      indicazioneDesktop: 'Passa sopra una foto per scoprirla, clicca per i dettagli',
      indicazioneMobile: 'Tocca una foto per i dettagli',
      apri: 'Scopri',
      cta: 'Richiedi informazioni',
      prenotaAirbnb: 'Prenota su Airbnb',
      nota:
        'I nomi sono provvisori e il calendario è in costruzione: scrivimi per sapere quando parte l’esperienza che ti interessa.',
    },

    contatti: {
      eyebrow: 'Contatti',
      titolo: 'Quindi, pronto a iniziare?',
      testo:
        'Per disponibilità, preventivi o una domanda sulle esperienze. Di solito rispondo entro poche ore.',
      doveSono: 'Dove opero',
      dove: 'Verona e provincia',
      telefono: 'Telefono e WhatsApp',
      email: 'Email',
    },

    form: {
      titolo: 'Richiedi informazioni',
      sottotitolo: 'Compila il modulo, ti rispondo via email.',
      nome: 'Nome',
      cognome: 'Cognome',
      email: 'Email',
      emailSegnaposto: 'nome@email.com',
      messaggio: 'Messaggio',
      messaggioSegnaposto: 'Quale esperienza ti interessa, quante persone, in che date…',
      esca: 'Sito web',
      invia: 'Invia messaggio',
      invio: 'Invio…',
      inviato: 'Inviato',
      grazie: 'Grazie! Ti rispondo al più presto.',
      erroreGenerico: 'Invio non riuscito. Scrivimi su WhatsApp o per email.',
    },

    footer: {
      testo:
        'Esperienze curate a Verona e nel suo territorio, ideate e coordinate insieme a partner locali.',
      instagram: 'Profilo Instagram',
      airbnb: 'Pagina Airbnb',
      colonnaSito: 'Sito',
      colonnaPrenota: 'Prenota',
      colonnaContatti: 'Contatti',
      richiedi: 'Richiedi informazioni',
      diritti: 'Tutti i diritti riservati',
    },

    whatsapp: {
      etichetta: 'Scrivimi su WhatsApp',
      messaggio: 'Ciao Sara, vorrei informazioni sulle esperienze',
    },

    pagine: {
      home: {
        titolo: 'Sara Pinna — Esperienze a Verona e nel territorio',
        descrizione:
          'Esperienze locali curate a Verona e dintorni: vino, cucina veronese, auto d’epoca, cavallo e borghi. Ideate e coordinate insieme a partner del posto.',
      },
      esperienze: {
        titolo: 'Esperienze — Sara Pinna',
        descrizione:
          'Wine & food a Verona, cooking class con chef, auto d’epoca, cavallo e degustazioni, Soave e il suo borgo: le esperienze che creo sul territorio veronese.',
        eyebrow: 'Esperienze',
        h1: 'Verona, una giornata alla volta',
      },
      about: {
        titolo: 'About — Sara Pinna',
        descrizione:
          'Ideo e coordino esperienze a Verona e nel territorio, mettendo insieme attività, luoghi e partner locali.',
        eyebrow: 'About',
        h1: 'Chi c’è dietro le esperienze',
      },
      contatti: {
        titolo: 'Contatti — Sara Pinna',
        descrizione:
          'Telefono, WhatsApp, email e modulo di contatto per informazioni sulle esperienze a Verona.',
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
      { label: 'Experiences', href: '/en/experiences' },
      { label: 'About', href: '/en/about' },
      { label: 'Contact', href: '/en/contact' },
    ],
    prenotaOra: 'Book',

    hero: {
      claim: 'Experience creator · Verona and around',
      titolo: 'Experience Verona differently',
      testo:
        'Curated local experiences, created with the people who know this land best.',
      esplora: 'See the experiences',
      contatta: 'Let’s talk',
      scorri: 'Scroll',
    },

    about: {
      eyebrow: 'About',
      titolo: 'I create experiences, I don’t resell tours',
      lead:
        'I design and organise experiences around Verona: I bring together activities, places and local partners and turn them into complete days worth living.',
      testo1:
        'The project started to bring genuinely curated experiences to Verona and the area around it. I am not always the one running every activity: my job is to design the format, find the right partners, put the pieces together and coordinate the experience from start to finish.',
      testo2:
        'I work with wineries, restaurants, chefs, guides, riding stables, places to stay and unusual services such as classic cars. Each of them does what they do best; I hold it all together and answer for how the day goes.',
      numeri: [
        { n: '5', l: 'Experiences in the making' },
        { n: '100%', l: 'Local partners' },
        { n: '1', l: 'Person coordinating it all: me' },
      ],
      ritrattoAlt: 'Sara Pinna',
      blocchi: [
        {
          titolo: 'Not the usual tourist tour',
          fotoAlt: 'A moment from an experience in Verona',
          paragrafi: [
            'Verona is full of organised tours that all look alike: same timings, same stops, same photographs. I started from the opposite idea — from what I would want to live if I arrived here for the first time.',
            'That is where these experiences come from: small groups, real places, local people talking about their own craft. And looked after down to the way they are presented, because how an experience looks is part of the experience.',
            'The result is not a list of monuments seen in a hurry, but a day that stays with you.',
          ],
        },
        {
          titolo: 'How an experience comes together',
          fotoAlt: 'Sara working on the planning of an experience',
          paragrafi: [
            'First comes the idea: what I want people to feel, in which place, at what pace. Then I look for the right partners — a winery, a chef, a guide, a riding stable, a classic car — and I meet them in person, because an experience is only as good as the people running it.',
            'Then I put the pieces together: timings, transfers, stops, materials. I try the route myself, fix what does not work, and only then open it to bookings.',
            'Bookings mostly go through Airbnb Experiences, but if you want something built around you — a particular date, a group, a special occasion — write to me and we will talk it through.',
          ],
        },
      ],
      perche: {
        titolo: 'Why choose me?',
        voci: [
          'Experiences created, not resold',
          'Local partners chosen one by one',
          'No typical tourist activities',
        ],
      },
    },

    esperienze: {
      eyebrow: 'Experiences',
      titolo: 'The experiences I am creating',
      intro:
        'Verona and its land told through wine, food, the countryside and a few unusual ways of getting around. Every experience is built with local partners I choose myself.',
      indicazioneDesktop: 'Hover a photo to discover it, click for the details',
      indicazioneMobile: 'Tap a photo for the details',
      apri: 'Discover',
      cta: 'Ask for details',
      prenotaAirbnb: 'Book on Airbnb',
      nota:
        'Names are provisional and the calendar is still being built: write to me to find out when the experience you like starts.',
    },

    contatti: {
      eyebrow: 'Contact',
      titolo: 'So, ready to get started?',
      testo:
        'For availability, quotes or a question about the experiences. I usually reply within a few hours.',
      doveSono: 'Where I work',
      dove: 'Verona and its province',
      telefono: 'Phone and WhatsApp',
      email: 'Email',
    },

    form: {
      titolo: 'Ask for details',
      sottotitolo: 'Fill in the form and I’ll reply by email.',
      nome: 'First name',
      cognome: 'Last name',
      email: 'Email',
      emailSegnaposto: 'name@email.com',
      messaggio: 'Message',
      messaggioSegnaposto: 'Which experience you like, how many people, which dates…',
      esca: 'Website',
      invia: 'Send message',
      invio: 'Sending…',
      inviato: 'Sent',
      grazie: 'Thank you! I’ll reply as soon as I can.',
      erroreGenerico: 'Could not send. Write to me on WhatsApp or by email.',
    },

    footer: {
      testo:
        'Curated experiences in Verona and the land around it, designed and coordinated with local partners.',
      instagram: 'Instagram profile',
      airbnb: 'Airbnb page',
      colonnaSito: 'Site',
      colonnaPrenota: 'Book',
      colonnaContatti: 'Contact',
      richiedi: 'Ask for details',
      diritti: 'All rights reserved',
    },

    whatsapp: {
      etichetta: 'Message me on WhatsApp',
      messaggio: 'Hi Sara, I’d like to know more about the experiences',
    },

    pagine: {
      home: {
        titolo: 'Sara Pinna — Experiences in Verona and around',
        descrizione:
          'Curated local experiences in Verona and the area around it: wine, Veronese cooking, classic cars, horse riding and villages. Created with local partners.',
      },
      esperienze: {
        titolo: 'Experiences — Sara Pinna',
        descrizione:
          'Wine & food in Verona, a cooking class with a chef, classic cars, horse riding with tastings, Soave and its old village: the experiences I create around Verona.',
        eyebrow: 'Experiences',
        h1: 'Verona, one day at a time',
      },
      about: {
        titolo: 'About — Sara Pinna',
        descrizione:
          'I design and coordinate experiences in Verona and the land around it, bringing together activities, places and local partners.',
        eyebrow: 'About',
        h1: 'The person behind the experiences',
      },
      contatti: {
        titolo: 'Contact — Sara Pinna',
        descrizione:
          'Phone, WhatsApp, email and a contact form for details about the experiences in Verona.',
        eyebrow: 'Contact',
        h1: 'Let’s talk',
      },
    },
  },
};
