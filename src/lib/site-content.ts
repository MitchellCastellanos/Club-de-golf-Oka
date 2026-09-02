/**
 * Contenido bilingue del sitio publico, tomado tal cual del objeto i18n de
 * design/mockups/golf-oka-maqueta.html (misma redaccion FR/EN, mismos
 * precios y textos legales) para que el sitio real no se desvie de la
 * maqueta aprobada.
 */
export type Lang = "fr" | "en";

export const nav = {
  fr: {
    home: "Accueil",
    book: "Tarifs & réservation",
    events: "Tournois",
    wedding: "Mariages",
    gallery: "Galerie",
    contact: "Contact",
    cta: "Réserver un départ",
    since: "CLUB ÉTABLI EN 1960",
  },
  en: {
    home: "Home",
    book: "Rates & booking",
    events: "Tournaments",
    wedding: "Weddings",
    gallery: "Gallery",
    contact: "Contact",
    cta: "Book a tee time",
    since: "CLUB FOUNDED IN 1960",
  },
};

export const home = {
  fr: {
    eyebrow: "OKA, QUÉBEC — LE LONG DU LAC DES DEUX MONTAGNES",
    title: "Un des plus beaux 9 trous du Québec",
    lead: "Un parcours normale 36 tracé parmi des pins centenaires, construit sur base de sable — l'eau n'y est jamais un problème. Une expérience différente, du premier au neuvième trou.",
    cta1: "Voir les tarifs et réserver",
    cta2: "Organiser un événement",
    stats: [
      ["1960", "Année de fondation"],
      ["36", "Normale du parcours"],
      ["2 848 vg", "Longueur du parcours"],
      ["100", "Places au chalet pour événements"],
    ] as [string, string][],
    introTitle: "Toute une expérience, trou après trou",
    introP1:
      "Considéré comme l'un des plus beaux 9 trous du Québec, le Club de golf d'Oka offre un paysage extraordinaire de pins centenaires en bordure du lac des Deux Montagnes. Le parcours, construit sur une base de sable, évacue naturellement l'eau — jouable même après la pluie.",
    introP2:
      "Le chalet accueille jusqu'à 100 personnes pour vos tournois, mariages ou réceptions. La terrasse, avec vue sur le lac, est l'endroit tout indiqué pour prolonger la journée.",
    introCta: "Consulter les tarifs",
    features: [
      {
        h: "Parcours normale 36",
        p: "9 trous jouables par des golfeurs de tous niveaux, sur un terrain sablonneux qui draine naturellement.",
      },
      {
        h: "Chalet & terrasse",
        p: "Salle pour groupes jusqu'à 100 personnes, casse-croûte, boutique et terrasse avec vue sur le lac.",
      },
      {
        h: "Ligues & tournois",
        p: "Ligues les mardis et jeudis soir dès 18h, et tournois corporatifs ou privés toute la saison.",
      },
    ],
    bandH: "Saison 2026 : du 1er mai au 31 octobre",
    bandP: "Réservez votre départ en quelques clics — plus besoin d'attendre l'ouverture du secrétariat.",
    bandCta: "Réserver maintenant",
  },
  en: {
    eyebrow: "OKA, QUEBEC — ALONG LAKE OF TWO MOUNTAINS",
    title: "One of Quebec's most beautiful 9-hole courses",
    lead: "A par-36 course set among century-old pines, built on a sand base — water buildup is never an issue. A different experience from the first to the ninth hole.",
    cta1: "View rates & book",
    cta2: "Plan an event",
    stats: [
      ["1960", "Year founded"],
      ["36", "Course par"],
      ["2,848 yd", "Course length"],
      ["100", "Clubhouse capacity for events"],
    ] as [string, string][],
    introTitle: "A full experience, hole after hole",
    introP1:
      "Regarded as one of the most beautiful 9-hole courses in Quebec, Club de golf d'Oka offers an extraordinary landscape of century-old pines along the Lake of Two Mountains. Built on a sand base, the course drains naturally — playable even after rain.",
    introP2:
      "The clubhouse hosts up to 100 people for tournaments, weddings or receptions. The lakeside terrace is the perfect spot to extend the day.",
    introCta: "View rates",
    features: [
      {
        h: "Par-36 course",
        p: "9 holes playable by golfers of all skill levels, on naturally draining sandy terrain.",
      },
      {
        h: "Clubhouse & terrace",
        p: "Function room for up to 100 people, snack bar, pro shop and a lakeview terrace.",
      },
      {
        h: "Leagues & tournaments",
        p: "Tuesday and Thursday evening leagues from 6pm, plus corporate and private tournaments all season.",
      },
    ],
    bandH: "2026 season: May 1 – October 31",
    bandP: "Book your tee time in a few clicks — no need to wait for the office to open.",
    bandCta: "Book now",
  },
};

export const booking = {
  fr: {
    kicker: "TARIFICATION 2026 — TAXES EN SUS",
    h: "Tarifs et réservation en ligne",
    priceCards: [
      {
        h: "Droits de jeu",
        lines: [
          ["9 trous — semaine", "28 $"],
          ["9 trous — fin de semaine", "30 $"],
          ["18 trous — semaine", "36 $"],
          ["18 trous — fin de semaine", "40 $"],
          ["Après 15h (9 trous)", "20–22 $"],
        ] as [string, string][],
      },
      {
        h: "Blocs de 10 parties",
        lines: [
          ["10 parties de 9 trous", "260 $"],
          ["10 parties de 18 trous", "330 $"],
          ["Aucune date d'expiration", "—"],
          ["Voiturette (9 trous)", "14–15 $"],
          ["Voiturette (18 trous)", "18–20 $"],
        ] as [string, string][],
      },
      {
        h: "Abonnements annuels",
        lines: [
          ["Individuel 7 jours", "1 250 $"],
          ["Individuel 5 jours", "1 200 $"],
          ["5 jours après 15h", "650 $"],
          ["Early Bird (avant 8h)", "500 $"],
          ["Casier et entreposage inclus", "—"],
        ] as [string, string][],
      },
    ],
    widgetKicker: "RÉSERVATION EN LIGNE",
    widgetH: "Réservez votre départ",
    date: "Date",
    players: "Nombre de joueurs",
    holes: "Parcours",
    hole9: "9 trous — 28 $",
    hole18: "18 trous — 36 $",
    cart: "Ajouter voiturette électrique (+14 $/pers.)",
    slots: "Heures de départ disponibles",
    summary: "Résumé de la réservation",
    empty: "Sélectionnez une heure de départ.",
    pay: "Procéder au paiement",
    name: "Nom complet",
    email: "Courriel",
    phone: "Téléphone",
    payH: "Paiement",
    payNote: "Environnement de démonstration — aucune carte n'est débitée.",
    payNameLbl: "Nom sur la carte",
    payCard: "Numéro de carte",
    payExp: "Expiration",
    paySubmit: "Confirmer et payer",
    payProcessing: "Traitement en cours…",
    payDoneH: "Réservation confirmée",
    payDoneP:
      "Un courriel de confirmation vient d'être envoyé. Cette réservation est visible immédiatement dans le panneau administratif du club.",
    payDoneBtn: "Fermer",
  },
  en: {
    kicker: "2026 RATES — TAXES EXTRA",
    h: "Rates & online booking",
    priceCards: [
      {
        h: "Green fees",
        lines: [
          ["9 holes — weekday", "$28"],
          ["9 holes — weekend", "$30"],
          ["18 holes — weekday", "$36"],
          ["18 holes — weekend", "$40"],
          ["After 3pm (9 holes)", "$20–22"],
        ] as [string, string][],
      },
      {
        h: "10-round packs",
        lines: [
          ["10 rounds of 9 holes", "$260"],
          ["10 rounds of 18 holes", "$330"],
          ["No expiry date", "—"],
          ["Cart (9 holes)", "$14–15"],
          ["Cart (18 holes)", "$18–20"],
        ] as [string, string][],
      },
      {
        h: "Annual memberships",
        lines: [
          ["Individual, 7 days", "$1,250"],
          ["Individual, 5 days", "$1,200"],
          ["5 days, after 3pm", "$650"],
          ["Early Bird (before 8am)", "$500"],
          ["Locker & storage included", "—"],
        ] as [string, string][],
      },
    ],
    widgetKicker: "ONLINE BOOKING",
    widgetH: "Book your tee time",
    date: "Date",
    players: "Number of players",
    holes: "Course",
    hole9: "9 holes — $28",
    hole18: "18 holes — $36",
    cart: "Add electric cart (+$14/person)",
    slots: "Available tee times",
    summary: "Booking summary",
    empty: "Select a tee time.",
    pay: "Proceed to payment",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    payH: "Payment",
    payNote: "Demonstration environment — no card is charged.",
    payNameLbl: "Name on card",
    payCard: "Card number",
    payExp: "Expiry",
    paySubmit: "Confirm & pay",
    payProcessing: "Processing…",
    payDoneH: "Booking confirmed",
    payDoneP:
      "A confirmation email was just sent. This booking is immediately visible in the club's admin panel.",
    payDoneBtn: "Close",
  },
};

export const events = {
  fr: {
    kicker: "LIGUES & TOURNOIS",
    h: "Activités de la saison 2026",
    p: "Ligues du mardi et du jeudi dès 18h, tournois corporatifs et compétitions amicales.",
    register: "S'inscrire",
    registered: "Inscription enregistrée",
    list: [
      { d: "14", m: "JUIN", t: "Tournoi Invitation Oka", s: "Format quatre-balles, brunch inclus" },
      { d: "05", m: "JUIL.", t: "Ligue du mardi soir", s: "Départs dès 18h, inscription à la saison" },
      { d: "22", m: "AOÛT", t: "Tournoi corporatif — inscriptions ouvertes", s: "Réception sur la terrasse en soirée" },
      { d: "13", m: "SEPT.", t: "Championnat du club", s: "Deux rondes, remise des prix au chalet" },
    ],
  },
  en: {
    kicker: "LEAGUES & TOURNAMENTS",
    h: "2026 season activities",
    p: "Tuesday and Thursday leagues from 6pm, corporate tournaments and friendly competitions.",
    register: "Sign up",
    registered: "Sign-up recorded",
    list: [
      { d: "14", m: "JUN", t: "Oka Invitational", s: "Four-ball format, brunch included" },
      { d: "05", m: "JUL", t: "Tuesday evening league", s: "Tee off from 6pm, season sign-up" },
      { d: "22", m: "AUG", t: "Corporate tournament — open registration", s: "Evening reception on the terrace" },
      { d: "13", m: "SEP", t: "Club championship", s: "Two rounds, awards at the clubhouse" },
    ],
  },
};

export const wedding = {
  fr: {
    kicker: "CHALET & TERRASSE",
    h: "Mariages et réceptions",
    p: "Notre chalet accueille jusqu'à 100 personnes, avec une terrasse donnant sur le lac des Deux Montagnes — un cadre naturel pour votre réception.",
    packages: [
      { h: "Forfait Terrasse", p: "Cocktail en terrasse avec vue sur le lac, jusqu'à 60 invités." },
      { h: "Forfait Chalet complet", p: "Location exclusive du chalet et de la terrasse, jusqu'à 100 invités." },
      { h: "Forfait Tournoi + Réception", p: "Avant-midi de golf suivi d'une réception — idéal pour les groupes corporatifs." },
    ],
    formH: "Demander une soumission",
    name: "Nom complet",
    email: "Courriel",
    date: "Date souhaitée",
    guests: "Nombre d'invités",
    message: "Message",
    submit: "Envoyer la demande",
    success:
      "Merci ! Votre demande a été reçue — notre équipe vous contactera normalement sous 48h.",
  },
  en: {
    kicker: "CLUBHOUSE & TERRACE",
    h: "Weddings & receptions",
    p: "Our clubhouse hosts up to 100 people, with a terrace overlooking the Lake of Two Mountains — a natural setting for your reception.",
    packages: [
      { h: "Terrace package", p: "Terrace cocktail with lake view, up to 60 guests." },
      { h: "Full clubhouse package", p: "Exclusive rental of the clubhouse and terrace, up to 100 guests." },
      { h: "Tournament + reception package", p: "Morning of golf followed by a reception — ideal for corporate groups." },
    ],
    formH: "Request a quote",
    name: "Full name",
    email: "Email",
    date: "Preferred date",
    guests: "Number of guests",
    message: "Message",
    submit: "Send request",
    success:
      "Thank you! Your request has been received — our team would normally reply within 48h.",
  },
};

export const gallery = {
  fr: {
    kicker: "GALERIE",
    h: "Le parcours, en images",
    p: "Emplacements réservés pour les photographies réelles du club — pins centenaires, terrasse, chalet et vue sur le lac.",
    items: ["Pins centenaires", "Terrasse & vue sur le lac", "Chalet principal", "1er trou", "9e trou", "Lac des Deux Montagnes"],
  },
  en: {
    kicker: "GALLERY",
    h: "The course, in pictures",
    p: "Placeholders reserved for real club photography — century-old pines, terrace, clubhouse and lake view.",
    items: ["Century-old pines", "Terrace & lake view", "Main clubhouse", "1st hole", "9th hole", "Lake of Two Mountains"],
  },
};

export const contact = {
  fr: {
    kicker: "CONTACT",
    h: "Nous joindre",
    addr: "ADRESSE",
    tel: "TÉLÉPHONE",
    mail: "COURRIEL",
    season: "SAISON",
    seasonV: "1er mai – 31 octobre 2026",
  },
  en: {
    kicker: "CONTACT",
    h: "Get in touch",
    addr: "ADDRESS",
    tel: "PHONE",
    mail: "EMAIL",
    season: "SEASON",
    seasonV: "May 1 – October 31, 2026",
  },
};

export const footer = {
  fr: {
    address: "345, rue St-Michel, Oka, Québec, J0N 1E0 · 450 479-8267",
    line1: "© 2026 Club de Golf d'Oka. Tous droits réservés.",
    line2: "Venez jouer sur le plus beau 9 trous du Québec.",
  },
  en: {
    address: "345 St-Michel, Oka, Quebec, J0N 1E0 · 450 479-8267",
    line1: "© 2026 Club de Golf d'Oka. All rights reserved.",
    line2: "Come play the most beautiful 9 holes in Quebec.",
  },
};

export const clubInfo = {
  address: "345, rue St-Michel, Oka, Québec, J0N 1E0",
  phone: "450 479-8267",
  email: "info@club-de-golf-oka.com",
};
