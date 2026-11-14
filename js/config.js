/* =====================================================
   CONFIG.JS — TOUT CE QUE TU PEUX MODIFIER SANS TOUCHER AU RESTE
   ===================================================== */

const CONFIG = {

  /* ---------- Identité ---------- */
  prenom: "Harold Brandon",
  nomComplet: "NDOGMO KANA HAROLD BRANDON",
  // Phrases qui défilent sous ton nom (effet machine à écrire)
  phrasesDefilantes: [
    "Étudiant en Humanités numériques",
    "Futur Data Scientist",
    "Curieux, créatif, rigoureux",
  ],
  accroche:
    "Je transforme la curiosité en projets : à l'ENSPY, j'apprends à relier le numérique, les données et les humains, avec l'ambition de devenir data scientist.",

  /* ---------- Photo ---------- */
  // Mets ta photo dans le dossier images/ puis change le chemin (ex : "images/moi.jpg")
  photoProfil: "images/profil.svg",
  // Image affichée quand un projet n'a pas (ou plus) d'image valide
  imageParDefaut: "images/placeholder.svg",

  /* ---------- Contact & réseaux ---------- */
  email: "ton.email@exemple.com",          // ⚠️ À REMPLACER par ton vrai e-mail
  instagram: "https://instagram.com/ton_compte", // ⚠️ À REMPLACER par ton lien Instagram

  /* ---------- Réception des commentaires par e-mail (sans backend) ----------
     Les messages des formulaires sont envoyés directement à ton e-mail grâce à Formspree
     (service gratuit, aucun serveur à gérer) :
       1. Crée un compte sur https://formspree.io avec ton e-mail
       2. Crée un formulaire → tu obtiens une adresse du type https://formspree.io/f/abcdwxyz
       3. Colle-la ci-dessous entre les guillemets.
     Tant que ce champ est vide, les formulaires ouvrent le logiciel de messagerie du visiteur
     avec un message pré-rempli adressé à ton e-mail (mode de secours). */
  formspreeEndpoint: "",

  /* ---------- À propos ---------- */
  // Un élément = un paragraphe
  apropos: [
    "Je m'appelle Harold Brandon NDOGMO KANA, étudiant en première année du cycle ingénieur à l'École Nationale Supérieure Polytechnique de Yaoundé (ENSPY), filière Humanités numériques.",
    "Ce qui me passionne : comprendre comment la technologie et les données peuvent éclairer les décisions et améliorer la vie des gens. En troisième année, je souhaite me spécialiser en Data Science.",
    "Ce portfolio rassemble mes projets au fil de mon parcours. N'hésite pas à les commenter : chaque retour me fait grandir.",
  ],
  // Petites infos à droite : [valeur, légende]
  chiffres: [
    ["ENSPY", "École d'ingénieurs · Yaoundé"],
    ["Niveau 1", "Cycle ingénieur"],
    ["Data Science", "Objectif en 3ᵉ année"],
  ],

  /* ---------- Compétences ----------
     niveau : de 0 à 100. Modifie, ajoute ou supprime librement. */
  competences: [
    { nom: "Humanités numériques", niveau: 40, icone: "🧠" },
    { nom: "Recherche & analyse", niveau: 55, icone: "🔍" },
    { nom: "Programmation (bases)", niveau: 35, icone: "💻" },
    { nom: "Statistiques (initiation)", niveau: 30, icone: "📊" },
    { nom: "Communication", niveau: 65, icone: "🗣️" },
    { nom: "Travail en équipe", niveau: 70, icone: "🤝" },
  ],

  /* ---------- Parcours ----------
     Ajoute une ligne pour chaque étape (du plus récent au plus ancien) */
  parcours: [
    { date: "2026 – aujourd'hui", titre: "Cycle ingénieur – Humanités numériques (Niveau 1)", lieu: "ENSPY, Yaoundé", texte: "Découverte des fondements du numérique, des données et des sciences humaines." },
    { date: "Objectif", titre: "Spécialisation Data Science (3ᵉ année)", lieu: "ENSPY, Yaoundé", texte: "Approfondir le machine learning, la statistique et l'analyse de données." },
    // { date: "2025", titre: "Baccalauréat …", lieu: "Nom du lycée", texte: "…" },
  ],
};
