const db = {
  sections: [
    {
      questions: [
        {
          title: "Vous _______ français?",
          options: [
            {
              text: "Est",
              correct: false,
            },
            {
              text: "Êtes",
              correct: true,
            },
            {
              text: "Etre",
              correct: false,
            },
            {
              text: "Es",
              correct: false,
            },
          ],
        },
        {
          title: "_________ vous parlez français?",
          options: [
            {
              text: "Qu’est-ce que",
              correct: false,
            },
            {
              text: "Est-ce que",
              correct: true,
            },
            {
              text: "Quel",
              correct: false,
            },
            {
              text: "Quoi",
              correct: false,
            },
          ],
        },
        {
          title: "________ 18 ans.",
          options: [
            {
              text: "J'ai",
              correct: true,
            },
            {
              text: "Je suis",
              correct: false,
            },
            {
              text: "Je",
              correct: false,
            },
            {
              text: "Je suis âgé",
              correct: false,
            },
          ],
        },
        {
          title: "J’habite ____ Paris ____ France.",
          options: [
            {
              text: "Au… à la",
              correct: false,
            },
            {
              text: "En… en",
              correct: false,
            },
            {
              text: "A… en",
              correct: true,
            },
            {
              text: "En… à",
              correct: false,
            },
          ],
        },
        {
          title: "Monsieur Martin et ____ femme sont très sympatiques.",
          options: [
            {
              text: "Sa",
              correct: true,
            },
            {
              text: "Son",
              correct: false,
            },
            {
              text: "Ses",
              correct: false,
            },
            {
              text: "Leur",
              correct: false,
            },
          ],
        },
        {
          title: "Mes parents ________ la radio tous les matins.",
          options: [
            {
              text: "Ecoute",
              correct: false,
            },
            {
              text: "Écouter",
              correct: false,
            },
            {
              text: "Écoutent",
              correct: true,
            },
            {
              text: "Ecoutes",
              correct: false,
            },
          ],
        },
        {
          title: "Sylvie ______ souvent à la piscine.",
          options: [
            {
              text: "Vais",
              correct: false,
            },
            {
              text: "Aller",
              correct: false,
            },
            {
              text: "Va",
              correct: true,
            },
            {
              text: "Vont",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          title: "Vous buvez_____ café.",
          options: [
            {
              text: "Un peur",
              correct: false,
            },
            {
              text: "De la",
              correct: false,
            },
            {
              text: "Des",
              correct: false,
            },
            {
              text: "Du",
              correct: true,
            },
          ],
        },
        {
          title: "Pour aller à la poste, vous tournez ________.",
          options: [
            {
              text: "Tout droit",
              correct: false,
            },
            {
              text: "A la droite",
              correct: false,
            },
            {
              text: "A droite",
              correct: true,
            },
            {
              text: "Droit",
              correct: false,
            },
          ],
        },
        {
          title: "Les enfants _______ leurs devoirs à 6 heures.",
          options: [
            {
              text: "Finissez",
              correct: false,
            },
            {
              text: "Finissons",
              correct: false,
            },
            {
              text: "Finis",
              correct: false,
            },
            {
              text: "Finissent",
              correct: true,
            },
          ],
        },
        {
          title: "Hier, nous ________ avec Monsieur le Maire à midi.",
          options: [
            {
              text: "Déjeunions",
              correct: false,
            },
            {
              text: "Avions déjeuné",
              correct: false,
            },
            {
              text: "Avons déjeuné",
              correct: true,
            },
            {
              text: "A déjeuné",
              correct: false,
            },
          ],
        },
        {
          title: "Quand j’habitais à Paris, ______ le métro tous les jours.",
          options: [
            {
              text: "J'ai pris",
              correct: false,
            },
            {
              text: "Je prenais",
              correct: true,
            },
            {
              text: "J'avais pris",
              correct: false,
            },
            {
              text: "Je prendrais",
              correct: false,
            },
          ],
        },
        {
          title:
            "Je regardais la télévision depuis une heure quand il ________.",
          options: [
            {
              text: "Arrivait",
              correct: false,
            },
            {
              text: "Vai arriver",
              correct: false,
            },
            {
              text: "Est arrivé",
              correct: true,
            },
            {
              text: "A arrivé",
              correct: false,
            },
          ],
        },
        {
          title:
            "Mon numéro de téléphone c’est le soixante-dix-huit, quatre-vingt-un, quarante, quatre-vingt-douze.",
          options: [
            {
              text: "68-41-40-82",
              correct: false,
            },
            {
              text: "78-41-40-92",
              correct: false,
            },
            {
              text: "78-81-40-92",
              correct: true,
            },
            {
              text: "68-81-14-92",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          title: "Je suis arrivé en Angleterre _______ dix ans.",
          options: [
            {
              text: "Pour",
              correct: false,
            },
            {
              text: "Depuis",
              correct: false,
            },
            {
              text: "Il y a",
              correct: true,
            },
            {
              text: "Pendant",
              correct: false,
            },
          ],
        },
        {
          title: "L'année prochaine j’ ________ au Canada.",
          options: [
            {
              text: "Irais",
              correct: false,
            },
            {
              text: "Irai",
              correct: true,
            },
            {
              text: "Ira",
              correct: false,
            },
            {
              text: "Irez",
              correct: false,
            },
          ],
        },
        {
          title: "Vous connaissez Monsieur Depuis? Oui, je ____ connais bien.",
          options: [
            {
              text: "Leur",
              correct: false,
            },
            {
              text: "Lui",
              correct: false,
            },
            {
              text: "Le",
              correct: true,
            },
            {
              text: "La",
              correct: false,
            },
          ],
        },
        {
          title:
            "Vous avez téléphoné à Mme Lesieur? Non, je ____ téléphonerai demain.",
          options: [
            {
              text: "Lui",
              correct: true,
            },
            {
              text: "Leur",
              correct: false,
            },
            {
              text: "La",
              correct: false,
            },
            {
              text: "Le",
              correct: false,
            },
          ],
        },
        {
          title: "Vous buvez de la bière? Oui, _____ bois de temps en temps.",
          options: [
            {
              text: "Je lui",
              correct: false,
            },
            {
              text: "Je la",
              correct: false,
            },
            {
              text: "J'en",
              correct: true,
            },
            {
              text: "Je le",
              correct: false,
            },
          ],
        },
        {
          title: "Vous allez au cinéma? Oui, _____ vais souvent.",
          options: [
            {
              text: "Je le",
              correct: false,
            },
            {
              text: "J'en",
              correct: false,
            },
            {
              text: "J'y",
              correct: true,
            },
            {
              text: "Je la",
              correct: false,
            },
          ],
        },
        {
          title: "Il mange en ________ la televisión.",
          options: [
            {
              text: "Regardait",
              correct: false,
            },
            {
              text: "Regarde",
              correct: false,
            },
            {
              text: "Regardé",
              correct: false,
            },
            {
              text: "Regardant",
              correct: true,
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          title: " La voiture de Paul est noire. _______ est rouge.",
          options: [
            {
              text: "ma",
              correct: false,
            },
            {
              text: "mienne",
              correct: false,
            },
            {
              text: "la mienne",
              correct: true,
            },
            {
              text: "á moi",
              correct: false,
            },
          ],
        },
        {
          title: " Je n’ai vu ___ Paul___ Jacques.",
          options: [
            {
              text: "ni… ni",
              correct: true,
            },
            {
              text: "pas…pas",
              correct: false,
            },
            {
              text: "ni… pas",
              correct: false,
            },
            {
              text: "pas… ni",
              correct: false,
            },
          ],
        },
        {
          title:
            " Si je pouvais, je ________ en vacances la semaine prochaine..",
          options: [
            {
              text: "partais",
              correct: false,
            },
            {
              text: "partirais",
              correct: true,
            },
            {
              text: "partirai",
              correct: false,
            },
            {
              text: "va partir",
              correct: false,
            },
          ],
        },
        {
          title: " Je suis allée voir un film ___ était très interéssant. ",
          options: [
            {
              text: "dont",
              correct: false,
            },
            {
              text: "que",
              correct: false,
            },
            {
              text: "qui",
              correct: true,
            },
            {
              text: "ou",
              correct: false,
            },
          ],
        },
        {
          title: " J'ai lu le livre _____ tu m’avais parlé. ",
          options: [
            {
              text: "qui",
              correct: false,
            },
            {
              text: "que",
              correct: false,
            },
            {
              text: "dont",
              correct: true,
            },
            {
              text: "ou",
              correct: false,
            },
          ],
        },
        {
          title: " À votre place, je _______ mes études. ",
          options: [
            {
              text: "continuerais",
              correct: true,
            },
            {
              text: "continuerai",
              correct: false,
            },
            {
              text: "va continuer",
              correct: false,
            },
            {
              text: "continue",
              correct: false,
            },
          ],
        },
        {
          title: "Voilà le restaurant ______ je pensais.",
          options: [
            {
              text: "á qui",
              correct: false,
            },
            {
              text: "auquel",
              correct: true,
            },
            {
              text: "lequel",
              correct: false,
            },
            {
              text: "duquel",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          title: " Il faut que tu _______ à l’aéroport.",
          options: [
            {
              text: "vas",
              correct: false,
            },
            {
              text: "aller",
              correct: false,
            },
            {
              text: "ailles",
              correct: true,
            },
            {
              text: "iras",
              correct: false,
            },
          ],
        },
        {
          title: " Si tu ________, nous serions allés au théâtre hier soir.",
          options: [
            {
              text: "voulais",
              correct: false,
            },
            {
              text: "voudras",
              correct: false,
            },
            {
              text: "voudrais",
              correct: false,
            },
            {
              text: "avais voulu",
              correct: true,
            },
          ],
        },
        {
          title: " Voici la salade que je vous ai ________.",
          options: [
            {
              text: "preparé",
              correct: false,
            },
            {
              text: "preparés",
              correct: false,
            },
            {
              text: "preparée",
              correct: true,
            },
            {
              text: "preparer",
              correct: false,
            },
          ],
        },
        {
          title:
            " Le suspect s’est rendu au Commisariat, où ________ pendant plusieures heures.",
          options: [
            {
              text: "il a interrogé",
              correct: false,
            },
            {
              text: "il s’est interrogé",
              correct: false,
            },
            {
              text: "il a été interrogé",
              correct: true,
            },
            {
              text: "il était interrogé",
              correct: false,
            },
          ],
        },
        {
          title: " Vous sortirez quand vous _______ vos devoirs!",
          options: [
            {
              text: "aurez fini",
              correct: true,
            },
            {
              text: "finirez",
              correct: false,
            },
            {
              text: "avez fini",
              correct: false,
            },
            {
              text: "auriez fini",
              correct: false,
            },
          ],
        },
        {
          title: " J'aurais voulu que ________ plus tôt.",
          options: [
            {
              text: "tu me le dises",
              correct: true,
            },
            {
              text: "tu me le dis",
              correct: false,
            },
            {
              text: "tu me l’aies dit",
              correct: false,
            },
            {
              text: "tu me l’aurais dit",
              correct: false,
            },
          ],
        },
        {
          title: "________, j’ai réussi més examens.",
          options: [
            {
              text: "a cause de toi",
              correct: false,
            },
            {
              text: " grâce à toi ",
              correct: true,
            },
            {
              text: "par ta faute",
              correct: false,
            },
            {
              text: "parce que toi",
              correct: false,
            },
          ],
        },
      ],
    },
    {
      questions: [
        {
          title:
            " Nous construisons ces hôtels ______ de dévélopper le tourisme dans cette région.",
          options: [
            {
              text: "afin",
              correct: true,
            },
            {
              text: "pour",
              correct: false,
            },
            {
              text: " de façon ",
              correct: false,
            },
            {
              text: "pour objectif",
              correct: false,
            },
          ],
        },
        {
          title: " Je n’ai jamais vu un ______ désordre!",
          options: [
            {
              text: "similaire",
              correct: false,
            },
            {
              text: "tel",
              correct: true,
            },
            {
              text: "aussi",
              correct: false,
            },
            {
              text: "autant",
              correct: false,
            },
          ],
        },
        {
          title: " Je ne crois pas que vous ______ raison.",
          options: [
            {
              text: "avez",
              correct: false,
            },
            {
              text: "aurez",
              correct: true,
            },
            {
              text: "ayez",
              correct: false,
            },
            {
              text: "auriez",
              correct: false,
            },
          ],
        },
        {
          title: "_______ il pleut, prenons l’autobus.",
          options: [
            {
              text: "parce qu’",
              correct: false,
            },
            {
              text: "puisqu’",
              correct: true,
            },
            {
              text: "a cause d’",
              correct: false,
            },
            {
              text: "a cause",
              correct: false,
            },
          ],
        },
        {
          title: " J'admets mes fautes _______ le mensonge.",
          options: [
            {
              text: "dehors",
              correct: false,
            },
            {
              text: "hors de",
              correct: false,
            },
            {
              text: "hors",
              correct: false,
            },
            {
              text: "hormis",
              correct: true,
            },
          ],
        },
        {
          title:
            " Ce musée est _______ attrayant qu’on peut y voir de magnifiques sculptures.",
          options: [
            {
              text: "autant",
              correct: false,
            },
            {
              text: "plus",
              correct: false,
            },
            {
              text: "d’autant plus",
              correct: true,
            },
            {
              text: "de plus",
              correct: false,
            },
          ],
        },
        {
          title: " Napoléon 1er _____ proclamé empereur en 1804.",
          options: [
            {
              text: "fit",
              correct: false,
            },
            {
              text: "fuit",
              correct: false,
            },
            {
              text: "fut",
              correct: true,
            },
            {
              text: "eu",
              correct: false,
            },
          ],
        },
      ],
    },
  ],
};
export default db;
