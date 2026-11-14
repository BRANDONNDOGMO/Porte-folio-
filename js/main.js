/* =====================================================
   MAIN.JS — la logique du site (affichage, animations, formulaires)
   Tu n'as normalement pas besoin de modifier ce fichier :
   tout le contenu se change dans config.js et projets.js.
   ===================================================== */

/* ---------- Petit utilitaire : sélectionner un élément ---------- */
const $ = (id) => document.getElementById(id);

/* Protège le texte contre l'injection de code HTML */
function echapper(texte) {
  const d = document.createElement("div");
  d.textContent = texte;
  return d.innerHTML;
}

/* Si une image est introuvable, on affiche l'image par défaut */
function imageSecours(img) {
  img.addEventListener("error", () => {
    if (!img.src.endsWith(CONFIG.imageParDefaut)) img.src = CONFIG.imageParDefaut;
  });
}

/* ---------- Accueil ---------- */
$("hero-nom").textContent = CONFIG.prenom;
$("hero-accroche").textContent = CONFIG.accroche;
$("photo-profil").src = CONFIG.photoProfil;
imageSecours($("photo-profil"));
$("annee").textContent = new Date().getFullYear();

/* Effet "machine à écrire" */
(function machineAEcrire() {
  const cible = $("typed");
  const phrases = CONFIG.phrasesDefilantes;
  let p = 0, c = 0, efface = false;
  function tick() {
    const phrase = phrases[p];
    cible.textContent = phrase.slice(0, c);
    if (!efface && c === phrase.length) { efface = true; return setTimeout(tick, 1600); }
    if (efface && c === 0) { efface = false; p = (p + 1) % phrases.length; }
    c += efface ? -1 : 1;
    setTimeout(tick, efface ? 35 : 70);
  }
  tick();
})();

/* Halo lumineux qui suit la souris */
document.addEventListener("mousemove", (e) => {
  const h = $("halo");
  h.style.left = e.clientX + "px";
  h.style.top = e.clientY + "px";
});

/* Menu mobile */
$("burger").addEventListener("click", () => $("menu").classList.toggle("ouvert"));
$("menu").addEventListener("click", () => $("menu").classList.remove("ouvert"));

/* ---------- À propos ---------- */
$("apropos-texte").innerHTML = CONFIG.apropos.map((t) => `<p>${echapper(t)}</p>`).join("");
$("apropos-infos").innerHTML = CONFIG.chiffres
  .map(([v, l]) => `<li><strong>${echapper(v)}</strong><span>${echapper(l)}</span></li>`)
  .join("");

/* ---------- Compétences ---------- */
$("competences-liste").innerHTML = CONFIG.competences
  .map((c) => `
    <div class="competence">
      <div class="competence-tete"><span>${c.icone || ""} ${echapper(c.nom)}</span><span>${c.niveau}%</span></div>
      <div class="barre"><div class="barre-remplie" data-niveau="${c.niveau}"></div></div>
    </div>`)
  .join("");

/* ---------- Parcours ---------- */
$("parcours-liste").innerHTML = CONFIG.parcours
  .map((e) => `
    <div class="etape">
      <span class="date">${echapper(e.date)}</span>
      <h3>${echapper(e.titre)}</h3>
      <span class="lieu">${echapper(e.lieu || "")}</span>
      <p>${echapper(e.texte || "")}</p>
    </div>`)
  .join("");

/* ---------- Contact ---------- */
$("liens-contact").innerHTML = `
  <a href="mailto:${encodeURI(CONFIG.email)}">✉️ ${echapper(CONFIG.email)}</a>
  <a href="${encodeURI(CONFIG.instagram)}" target="_blank" rel="noopener">📸 Instagram</a>`;

/* ---------- Projets ---------- */
const grille = $("projets-liste");
if (PROJETS.length === 0) {
  grille.innerHTML = `<p class="vide">Les premiers projets arrivent bientôt… reviens vite !</p>`;
} else {
  grille.innerHTML = PROJETS.map((p) => `
    <button class="carte-projet" data-id="${echapper(p.id)}" type="button">
      <img src="${encodeURI(p.image)}" alt="Aperçu : ${echapper(p.titre)}" loading="lazy" />
      <div class="carte-corps">
        <h3>${echapper(p.titre)}</h3>
        <p>${echapper(p.description)}</p>
        <ul class="tags">${(p.tags || []).map((t) => `<li>${echapper(t)}</li>`).join("")}</ul>
      </div>
    </button>`).join("");
  grille.querySelectorAll("img").forEach(imageSecours);
}

/* ---------- Fenêtre de détail d'un projet ---------- */
const modal = $("modal-projet");

function ouvrirProjet(id) {
  const p = PROJETS.find((x) => x.id === id);
  if (!p) return;
  $("modal-image").src = p.image;
  $("modal-image").alt = "Aperçu : " + p.titre;
  imageSecours($("modal-image"));
  $("modal-titre").textContent = p.titre;
  $("modal-description").textContent = p.description;
  $("modal-tags").innerHTML = (p.tags || []).map((t) => `<li>${echapper(t)}</li>`).join("");
  $("modal-role").textContent = p.role || "";
  $("modal-liens").innerHTML = (p.liens || [])
    .map((l) => `<a href="${encodeURI(l.url)}" target="_blank" rel="noopener">${echapper(l.texte)} ↗</a>`)
    .join("");
  $("champ-projet").value = p.titre;
  $("form-projet").reset();
  $("champ-projet").value = p.titre;   // reset() vide aussi ce champ caché, on le remet
  $("statut-projet").textContent = "";
  modal.showModal();
}

grille.addEventListener("click", (e) => {
  const carte = e.target.closest(".carte-projet");
  if (carte) ouvrirProjet(carte.dataset.id);
});
$("modal-fermer").addEventListener("click", () => modal.close());
// Clic en dehors de la fenêtre = fermeture
modal.addEventListener("click", (e) => {
  const r = modal.getBoundingClientRect();
  const dehors = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  if (dehors) modal.close();
});

/* ---------- Envoi des formulaires vers ton e-mail ----------
   Mode 1 (recommandé) : Formspree, si CONFIG.formspreeEndpoint est rempli.
   Mode 2 (secours)    : ouverture de la messagerie du visiteur (mailto). */
async function envoyerFormulaire(form, statut, sujet) {
  const d = Object.fromEntries(new FormData(form).entries());
  statut.className = "statut";

  // Anti-spam : un robot a rempli le champ caché → on fait semblant d'accepter
  if (d._gotcha) { statut.textContent = "Merci !"; statut.classList.add("ok"); return; }

  // Vérifications simples
  if (!d.nom || !d.nom.trim() || !d.message || !d.message.trim()) {
    statut.textContent = "Merci de remplir les champs obligatoires (*).";
    statut.classList.add("erreur"); return;
  }
  if (form.id === "form-contact" && (!d.email || !/^\S+@\S+\.\S+$/.test(d.email))) {
    statut.textContent = "Merci d'indiquer une adresse e-mail valide.";
    statut.classList.add("erreur"); return;
  }
  if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) {
    statut.textContent = "L'adresse e-mail semble invalide.";
    statut.classList.add("erreur"); return;
  }

  const note = d.note ? `${d.note}/5` : "non renseignée";
  const corps =
    `Projet : ${d.projet || "(message général)"}\n` +
    `Nom : ${d.nom}\nE-mail : ${d.email || "-"}\nTéléphone : ${d.telephone || "-"}\n` +
    `Appréciation : ${note}\n\n${d.message}`;

  if (CONFIG.formspreeEndpoint) {
    statut.textContent = "Envoi en cours…";
    try {
      const rep = await fetch(CONFIG.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: sujet, ...d, appreciation: note }),
      });
      if (!rep.ok) throw new Error("Réponse " + rep.status);
      statut.textContent = "Merci ! Ton message a bien été envoyé.";
      statut.classList.add("ok");
      form.reset();
      if (d.projet) $("champ-projet").value = d.projet;
    } catch (err) {
      statut.textContent = "Échec de l'envoi. Réessaie plus tard ou écris-moi directement par e-mail.";
      statut.classList.add("erreur");
    }
  } else {
    // Mode de secours : on ouvre la messagerie du visiteur avec le message pré-rempli
    window.location.href =
      `mailto:${CONFIG.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    statut.textContent = "Ta messagerie s'ouvre : il ne reste qu'à cliquer sur « Envoyer ».";
    statut.classList.add("ok");
  }
}

$("form-contact").addEventListener("submit", (e) => {
  e.preventDefault();
  envoyerFormulaire(e.target, $("statut-contact"), "Message depuis ton portfolio");
});
$("form-projet").addEventListener("submit", (e) => {
  e.preventDefault();
  envoyerFormulaire(e.target, $("statut-projet"), "Avis sur ton projet : " + $("champ-projet").value);
});

/* ---------- Animations au défilement ---------- */
const observateur = new IntersectionObserver((entrees) => {
  entrees.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("visible");
    en.target.querySelectorAll(".barre-remplie").forEach((b) => (b.style.width = b.dataset.niveau + "%"));
    observateur.unobserve(en.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((s) => observateur.observe(s));
