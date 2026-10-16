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
      titolo: 'Ti ricordi l’ultima volta che ti sei lasciato sorprendere?',
      testo: 'Lasciati guidare. C’è un’experience che aspetta il tuo sì.',
      scorri: 'Scopri',
    },

    // Descrizione principale, subito sotto l'hero della Home
    intro: {
      titolo: 'Ogni experience nasce da un’emozione',
      paragrafi: [
        'Un’experience è un modo di vivere un luogo attraverso ciò che fai e le persone che incontri: il suo valore è nelle emozioni e nelle sensazioni che provi, nei ricordi che porti con te.',
        'La curiosità di una prima volta. Il piacere di perdere la nozione del tempo. La felicità di essere esattamente dove vuoi essere, con la voglia di restare ancora un po’.',
        'È da qui che nascono le mie experience: dal desiderio di farti vivere qualcosa che abbia un significato per te. Scelgo persone, luoghi e incontri capaci di coinvolgerti, perché tu possa lasciarti andare e scoprire anche ciò che non avevi immaginato.',
      ],
      chiusura: 'C’è qualcosa che hai sempre desiderato vivere? Partiamo da lì.',
      cta: 'Get in touch',
    },

    about: {
      nome: 'Sara Pinna',
      ruolo: 'Experience Creator',
      fotoAlt: 'Sara Pinna davanti a un tramonto in montagna',
      titolo: 'La curiosità mi somiglia.',
      paragrafi: [
        'Mi piace viaggiare, stare all’aperto, scoprire un posto attraverso le persone che lo vivono. Amo il mondo del vino: mi ha insegnato quanto ci sia da conoscere dietro ciò che, a prima vista, sembra semplice.',
        'Ho scelto di creare experience perché mi appassiona immaginare le possibilità di un luogo: incontrare qualcuno, ascoltare la sua storia e pensare «qui potrebbe nascere qualcosa di speciale». Poi dare forma a quell’idea, mettendo insieme persone e dettagli.',
        'In questo lavoro ritrovo ciò che mi piace di più: la scoperta, la creatività e il contatto con gli altri. Il mio desiderio è condividere quella curiosità e farti venire voglia di vivere qualcosa che, da solo, forse non avresti pensato di cercare.',
      ],
      metodo: {
        titolo: 'Il mio modo di creare experience',
        voci: [
          {
            titolo: 'Un’idea che prende vita',
            testo: 'Creo ogni experience insieme a chi può renderla speciale, curando ciò che vivrai dall’inizio alla fine.',
          },
          {
            titolo: 'Le persone fanno la differenza',
            testo: 'Scelgo partner che amano ciò che fanno e sanno trasmetterti quella passione.',
          },
          {
            titolo: 'Spazio ai tuoi desideri',
            testo: 'Puoi lasciarti ispirare dalle mie proposte o partire da un’idea tutta tua.',
          },
        ],
      },
      cta: 'Disegno la tua',
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
      desiderio: {
        titolo: 'Hai un desiderio speciale?',
        testo:
          'Forse quello che sogni non è in questo elenco: un luogo che hai in mente da tempo, un’occasione da festeggiare, un’idea tutta tua. Scrivimi e raccontamela: ne parliamo insieme e costruisco un’esperienza su misura, pensata intorno a te.',
        cta: 'Raccontami la tua idea',
      },
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
      titolo: 'Do you remember the last time you let yourself be surprised?',
      testo: 'Let yourself be guided. There’s an experience waiting for your yes.',
      scorri: 'Discover',
    },

    intro: {
      titolo: 'Every experience begins with a feeling',
      paragrafi: [
        'An experience is a way of living a place through what you do and the people you meet: its value lies in the emotions and sensations you feel, in the memories you take home with you.',
        'The curiosity of a first time. The pleasure of losing track of time. The joy of being exactly where you want to be, wishing you could stay a little longer.',
        'That is where my experiences come from: the wish to let you live something that means something to you. I choose people, places and encounters that can draw you in, so you can let go and discover even what you had not imagined.',
      ],
      chiusura: 'Is there something you have always wanted to live? Let’s start there.',
      cta: 'Get in touch',
    },

    about: {
      nome: 'Sara Pinna',
      ruolo: 'Experience Creator',
      fotoAlt: 'Sara Pinna watching a mountain sunset',
      titolo: 'Curiosity is who I am.',
      paragrafi: [
        'I love travelling, being outdoors, discovering a place through the people who live there. I love the world of wine: it taught me how much there is to know behind what, at first sight, looks simple.',
        'I chose to create experiences because I love imagining what a place could become: meeting someone, listening to their story and thinking “something special could happen here”. Then giving that idea a shape, bringing people and details together.',
        'In this work I find what I love most: discovery, creativity and being with people. My wish is to share that curiosity and make you want to live something you might never have thought of looking for on your own.',
      ],
      metodo: {
        titolo: 'How I create experiences',
        voci: [
          {
            titolo: 'An idea that comes to life',
            testo: 'I create every experience together with those who can make it special, looking after everything you will live from start to finish.',
          },
          {
            titolo: 'People make the difference',
            testo: 'I choose partners who love what they do and know how to pass that passion on to you.',
          },
          {
            titolo: 'Room for your wishes',
            testo: 'You can draw inspiration from my ideas or start from one entirely your own.',
          },
        ],
      },
      cta: 'Design yours',
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
      desiderio: {
        titolo: 'Have a special wish?',
        testo:
          'Maybe what you’re dreaming of isn’t on this list: a place you’ve long had in mind, an occasion to celebrate, an idea all your own. Write to me and tell me about it: we’ll talk it through and I’ll build a tailor-made experience around you.',
        cta: 'Tell me your idea',
      },
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
