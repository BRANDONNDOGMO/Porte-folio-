/* =====================================================
   PROJETS.JS — LA LISTE DE TES PROJETS
   -----------------------------------------------------
   Pour AJOUTER un projet : copie un bloc { ... }, colle-le
   à la suite (sans oublier la virgule) et change les valeurs.
   Pour SUPPRIMER un projet : efface son bloc.
   Pour CHANGER l'image : modifie le chemin "image" et mets
   ton fichier dans le dossier images/.
   Les 3 projets ci-dessous sont des EXEMPLES à remplacer.
   ===================================================== */

const PROJETS = [
  {
    id: "projet-1",                       // identifiant unique, sans espace ni accent
    titre: "Projet exemple n°1",
    description: "Décris ici ton projet en 2-3 phrases : le problème, ce que tu as fait, le résultat.",
    image: "images/projet1.svg",          // ⬅ remplace par ton image (ex : "images/mon-projet.jpg")
    tags: ["Python", "Analyse de données"], // technologies / outils
    role: "Mon rôle : à compléter",
    liens: [
      // { texte: "Voir le code", url: "https://github.com/..." },
      // { texte: "Démo en ligne", url: "https://..." },
    ],
  },
  {
    id: "projet-2",
    titre: "Projet exemple n°2",
    description: "Un deuxième projet : une idée, un travail de classe, une recherche personnelle…",
    image: "images/projet2.svg",
    tags: ["Humanités numériques", "Recherche"],
    role: "Mon rôle : à compléter",
    liens: [],
  },
  {
    id: "projet-3",
    titre: "Projet exemple n°3",
    description: "Tu pourras en ajouter autant que tu veux : la grille s'adapte toute seule.",
    image: "images/projet3.svg",
    tags: ["Web", "Visualisation"],
    role: "Mon rôle : à compléter",
    liens: [],
  },
];
