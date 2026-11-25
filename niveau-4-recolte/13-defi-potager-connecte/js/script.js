// =========================================================
// Le potager connecté — script.js (À COMPLÉTER)
// Un seul fichier pour les deux pages (index.html et pages/contact.html).
// Les numéros « TODO n » correspondent aux user stories US1 à US10 de la consigne.
// Règle : chaque fonction « init… » commence par vérifier que ses éléments existent
// (elle doit pouvoir s'exécuter sur la page où ils sont absents sans rien casser).
// ⚠ Ouvrez le site avec Live Server (http://…), pas en double-cliquant sur le fichier :
//   fetch() ne fonctionne pas avec une adresse file://.
// =========================================================

console.log("[potager] script chargé"); // à SUPPRIMER avant le rendu : la console doit être propre

// ===== CONFIGURATION (fournie) =====
const URL_DONNEES = "data/potager.json";

const CLES = {
  favoris: "potager-favoris",
  theme: "potager-theme",
  lecture: "potager-lecture"
};

const SEUIL_RETOUR_HAUT = 600; // pixels de défilement avant d'afficher le bouton (US10)
const SEUIL_REPRISE = 10;      // pourcentage minimal lu avant de proposer la reprise (US8)

// Préférence système « réduire les animations » (à consulter avec mouvementReduit.matches)
const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)");

// ===== ÉTAT DE L'APPLICATION (fourni) =====
// Une seule source de vérité : l'affichage se recalcule toujours à partir de cet objet.
const etat = {
  plantes: [],                 // toutes les plantes du JSON (US2)
  visibles: [],                // plantes affichées après recherche, filtre et tri (US3)
  favoris: new Set(),          // identifiants des favoris — TODO 6 : le remplir depuis le localStorage
  recherche: "",
  saison: "toutes",
  tri: "nom",
  favorisSeulement: false,
  premierAffichage: true,      // US4 : l'apparition ne joue qu'au premier affichage des fiches
  indexLightbox: 0,            // US5 : position dans etat.visibles
  declencheur: null            // US5 : bouton qui a ouvert la visionneuse
};

// ===== OUTILS FOURNIS =====

// Minuscules et sans accents : « Solanacées » se trouve en tapant « solanacees » (utile pour US3)
function normaliser(texte) {
  return texte.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Appelle `rappel` au plus une fois par image affichée pendant le défilement (utile pour US1, US8, US10)
function surDefilement(rappel) {
  let attente = false;
  window.addEventListener("scroll", () => {
    if (attente) {
      return;
    }
    attente = true;
    requestAnimationFrame(() => {
      attente = false;
      rappel();
    });
  }, { passive: true });
}

// Défilement doux, sauf si l'utilisateur a demandé moins d'animations
function comportementDefilement() {
  return mouvementReduit.matches ? "auto" : "smooth";
}

// ===== TODO 6a : OUTILS DE STOCKAGE (localStorage) =====
// Écrivez ces deux fonctions EN PREMIER : US6, US7 et US8 s'en servent.
function lireStockage(cle, valeurParDefaut) {
  // TODO 6a : lire la clé, convertir le JSON avec JSON.parse ;
  //           renvoyer valeurParDefaut si la clé n'existe pas OU si quelque chose échoue (try/catch)
  return valeurParDefaut;
}

function ecrireStockage(cle, valeur) {
  // TODO 6a : convertir avec JSON.stringify et écrire (try/catch : le stockage peut être plein ou interdit)
}

// ===== US1 / TODO 1 : MENU ACTIF ET BURGER =====
function initMenu() {
  // TODO 1a : récupérer #burger et #menu ; sortir de la fonction s'ils n'existent pas (page sans menu)
  // TODO 1b : au clic sur le burger, basculer la classe « ouvert » sur le menu
  //           ET mettre à jour aria-expanded ("true" / "false", des chaînes !)
  // TODO 1c : fermer le menu après un clic sur un lien (un seul écouteur sur le menu : délégation avec closest("a"))
  // TODO 1d : fermer le menu avec la touche Échap et rendre le focus au burger
  // TODO 1e : appeler initSurveillanceSections(menu) quand tout le reste fonctionne
}

function initSurveillanceSections(menu) {
  // TODO 1e : donner la classe « actif » (et aria-current="location") au lien du menu dont la section est
  //           à l'écran. Pistes : IntersectionObserver sur les sections `main > section[id]`,
  //           option rootMargin: "-40% 0px -55% 0px" pour ne détecter qu'une fine bande au milieu de l'écran.
  // TODO 1f : (piège) quand la page est tout en bas, la dernière section (Conseils) est-elle bien active ?
}

// ===== US2 / TODO 2 : CHARGEMENT DES FICHES (fetch) =====
function afficherEtat(nom) {
  // TODO 2a : « nom » vaut "chargement", "erreur" ou "ok".
  //           Afficher/masquer #etat-chargement et #etat-erreur avec la classe « cache » (classList.toggle).
}

async function chargerPlantes() {
  // TODO 2b : afficher l'état "chargement", puis fetch(URL_DONNEES) dans un try/catch
  // TODO 2c : fetch ne rejette pas sur un 404 : tester reponse.ok et lancer une erreur sinon
  // TODO 2d : ranger le résultat de reponse.json() dans etat.plantes, afficher l'état "ok", appeler mettreAJourListe()
  // TODO 2e : en cas d'erreur, afficher l'état "erreur" (le bouton #reessayer doit relancer chargerPlantes)
  // Cette fonction renvoie true si le chargement a réussi, false sinon.
  return false;
}

function creerFiche(plante) {
  // TODO 2f : cloner le contenu de <template id="modele-fiche"> avec cloneNode(true)
  //           (indice : modele.content.firstElementChild)
  // TODO 2g : remplir la fiche avec textContent (JAMAIS innerHTML avec des données) :
  //           image (src + alt), titre, famille, description, et les 4 [data-info]
  //           (saisons : tableau → texte avec join(", ") ; jours : « 110 jours »)
  // TODO 2h : poser fiche.dataset.id = plante.id et un aria-label sur le bouton .fiche-agrandir
  // TODO 2i : régler le bouton .favori avec majBoutonFavori (TODO 6)
  // Renvoyer l'élément <li> terminé.
  return document.createElement("li");
}

// ===== US3 / TODO 3 : RECHERCHE, FILTRE ET TRI =====
function calculerVisibles() {
  // TODO 3a : à partir de etat.plantes, garder (filter) les plantes qui respectent À LA FOIS :
  //           - la recherche (nom + famille + description, avec normaliser() des deux côtés) ;
  //           - la saison (plante.saisons.includes(etat.saison), sauf si "toutes") ;
  //           - les favoris (etat.favoris.has(plante.id), seulement si la case est cochée).
  // TODO 3b : trier le résultat selon etat.tri : "nom" (localeCompare("fr")), "jours-asc", "jours-desc"
  return [];
}

function mettreAJourListe() {
  // TODO 3c : etat.visibles = calculerVisibles(), puis vider #liste-plantes et y mettre une fiche par plante
  //           (replaceChildren accepte une liste d'éléments)
  // TODO 3d : écrire dans #compteur « 3 plantes sur 12 » (attention au singulier : « 1 plante »)
  // TODO 3e : afficher #aucun-resultat (retirer « cache ») seulement s'il n'y a aucune plante
  // TODO 4a : au tout premier affichage seulement (etat.premierAffichage), appeler preparerApparition(fiches)
}

function initFiltres() {
  // TODO 3f : empêcher l'envoi du formulaire #filtres (événement submit)
  // TODO 3g : écouter #recherche (input), #filtre-saison (change), #tri (change), #filtre-favoris (change) :
  //           mettre à jour etat puis appeler mettreAJourListe()
  // TODO 3h : le bouton « Réinitialiser » (événement reset du formulaire) remet etat à ses valeurs de départ
}

// ===== US4 / TODO 4 : APPARITION AU DÉFILEMENT + ANIMATION DÉCLENCHÉE PAR JS =====
// Les classes CSS existent déjà : .a-reveler (invisible, décalé) puis .revele (visible, avec transition).
function preparerApparition(elements) {
  // TODO 4b : si mouvementReduit.matches, ne rien faire (le contenu reste visible)
  // TODO 4c : sinon, pour chaque élément : ajouter « a-reveler » et l'observer avec un IntersectionObserver
  //           (créé une seule fois, en dehors de la fonction) qui ajoute « revele » puis appelle unobserve
  // TODO 4d : (bonus) décaler les cartes avec element.style.setProperty("--delai", …)
}

function initApparition() {
  // TODO 4e : appeler preparerApparition sur les éléments statiques qui portent l'attribut data-revele
}

function jouerAnimation(element, classe) {
  // TODO 4f : ajouter la classe CSS (l'animation @keyframes « battement » démarre), puis la retirer
  //           quand l'événement animationend arrive ({ once: true }) pour pouvoir la rejouer
}

// ===== US6 / TODO 6 : FAVORIS =====
function majBoutonFavori(bouton, plante) {
  // TODO 6b : régler aria-pressed ("true"/"false") et aria-label (« Ajouter aux favoris : Tomate » /
  //           « Retirer des favoris : Tomate ») selon etat.favoris.has(plante.id)
}

function majCompteurFavoris() {
  // TODO 6c : écrire etat.favoris.size dans #nb-favoris (s'il existe : l'élément est aussi dans contact.html)
}

function basculerFavori(bouton) {
  // TODO 6d : retrouver l'id de la fiche (bouton.closest(".fiche").dataset.id) puis ajouter/retirer l'id de etat.favoris
  // TODO 6e : à l'ajout, jouer l'animation « battement » (jouerAnimation)
  // TODO 6f : enregistrer dans le localStorage — un Set ne se convertit pas en JSON : utiliser [...etat.favoris]
  // TODO 6g : mettre à jour le compteur et le bouton ; si « Favoris seulement » est coché, relancer mettreAJourListe()
}

// ===== US5 / TODO 5 : VISIONNEUSE <dialog> =====
function initLightbox() {
  // TODO 5a : écouter UN SEUL clic sur #liste-plantes (délégation : les fiches sont recréées à chaque filtre).
  //           Si la cible est dans un .favori → basculerFavori(…) ; si elle est dans un .fiche-agrandir → ouvrir.
  // TODO 5b : ouvrir = mémoriser le bouton (etat.declencheur), trouver l'index de la plante dans etat.visibles,
  //           remplir #lightbox-image (src + alt) et #lightbox-legende, puis appeler showModal() sur le <dialog>
  // TODO 5c : boutons Fermer (close()), Précédent et Suivant ; la navigation est circulaire (dernier → premier)
  // TODO 5d : flèches ← et → du clavier quand le <dialog> est ouvert (événement keydown)
  // TODO 5e : un clic sur le fond sombre ferme le dialogue (indice : evenement.target === le <dialog> lui-même)
  // TODO 5f : à la fermeture (événement close, quelle qu'en soit la cause, y compris Échap), rendre le focus
  //           au bouton déclencheur
}

// ===== US7 / TODO 7 : MODE SOMBRE =====
function appliquerTheme(theme) {
  // TODO 7a : « theme » vaut "dark" ou "light". Le poser dans document.documentElement.dataset.theme
  //           (le CSS réagit à [data-theme="dark"]), puis mettre à jour aria-pressed sur #bouton-theme
  //           et l'icône #icone-theme (☀ en mode sombre, ☾ sinon)
}

function initTheme() {
  // TODO 7b : choisir le thème au chargement : celui mémorisé dans le localStorage (CLES.theme),
  //           sinon la préférence du système (window.matchMedia("(prefers-color-scheme: dark)").matches)
  // TODO 7c : au clic sur #bouton-theme, inverser le thème, l'appliquer et le mémoriser
  //           (le bouton existe sur les deux pages ; il peut être absent : vérifier)
}

// ===== US8 / TODO 8 : PROGRESSION DE LECTURE =====
function pourcentageLu() {
  // TODO 8a : pourcentage (0 à 100, entier) de la page déjà parcouru :
  //           window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
  //           (attention à la division par zéro si la page est plus courte que l'écran)
  return 0;
}

function initProgression() {
  // TODO 8b : sortir si #barre-lecture n'existe pas ; sinon, à chaque défilement (surDefilement),
  //           régler la largeur de la barre (style.width = pourcentage + "%")
  // TODO 8c : mémoriser le pourcentage dans le localStorage (CLES.lecture), mais seulement 300 ms après
  //           la fin du défilement (setTimeout + clearTimeout), pas à chaque pixel
  // TODO 8d : boutons de #reprise : « × » (#reprise-fermer) masque le message avec la classe « cache » ;
  //           « Reprendre la lecture » (#reprise-bouton) appelle window.scrollTo({ top, behavior: comportementDefilement() })
}

function proposerReprise() {
  // TODO 8e : si le pourcentage mémorisé est ≥ SEUIL_REPRISE et que la page est tout en haut (window.scrollY < 50),
  //           écrire le pourcentage dans #reprise-pct et retirer la classe « cache » de #reprise.
  //           (Cette fonction est appelée une fois les fiches affichées, quand la page a sa vraie hauteur.)
}

// ===== US10 / TODO 10 : RETOUR EN HAUT =====
function initRetourHaut() {
  // TODO 10a : sortir si #retour-haut n'existe pas ; sinon, au défilement, ajouter/retirer la classe « visible »
  //            selon window.scrollY > SEUIL_RETOUR_HAUT (classList.toggle avec un second argument booléen)
  // TODO 10b : au clic, remonter en haut avec window.scrollTo({ top: 0, behavior: comportementDefilement() })
  // TODO 10c : accessibilité — le bouton va disparaître : donner le focus au logo (.marque) avec { preventScroll: true }
}

// ===== US9 / TODO 9 : FORMULAIRE DE CONTACT =====
function messageErreur(champ) {
  // TODO 9a : renvoyer un message en français selon champ.validity (Constraint Validation API) :
  //           valueMissing (case à cocher : message différent), typeMismatch (e-mail), tooShort
  //           (« au moins 2 caractères (vous en avez 1) » avec champ.minLength et champ.value.length).
  //           Pour tout autre cas : champ.validationMessage.
  return "";
}

function afficherErreur(champ) {
  // TODO 9b : écrire le message dans #erreur-<id du champ>, poser aria-invalid="true" sur le champ
  //           et la classe « invalide » sur son conteneur (.champ)
}

function effacerErreur(champ) {
  // TODO 9b : l'inverse : vider le message, retirer aria-invalid et la classe « invalide »
}

function verifierChamp(champ) {
  // TODO 9c : si champ.checkValidity() → effacerErreur et renvoyer true ; sinon afficherErreur et renvoyer false
  return true;
}

function afficherResume(champsInvalides) {
  // TODO 9d : remplir #resume-titre (« 3 champs sont à corriger », singulier si 1) et #resume-liste
  //           (un <li> par champ avec un lien <a href="#id-du-champ"> + le message), créés avec createElement
  // TODO 9e : retirer « cache » de #resume-erreurs et lui donner le focus (il a tabindex="-1")
}

function initFormulaire() {
  // TODO 9f : sortir si #formulaire-contact n'existe pas
  // TODO 9g : compteur « 34 / 500 caractères » dans #compteur-message à chaque saisie dans #message
  // TODO 9h : valider un champ quand on le quitte (focusout, une seule écoute sur le formulaire) ;
  //           pendant la saisie, ne revalider que les champs déjà en erreur (aria-invalid="true")
  // TODO 9i : à la soumission : preventDefault(), vérifier tous les champs ; s'il y en a d'invalides,
  //           afficherResume ; sinon masquer le résumé, afficher #confirmation (« Merci … », avec textContent),
  //           vider le formulaire (reset), remettre le compteur à zéro
}

// ===== INITIALISATION (fournie) =====
async function initPlantes() {
  if (!document.querySelector("#liste-plantes")) {
    return;
  }
  initFiltres();
  initLightbox();
  document.querySelector("#reessayer").addEventListener("click", async () => {
    if (await chargerPlantes()) {
      proposerReprise();
    }
  });
  if (await chargerPlantes()) {
    proposerReprise();
  }
}

function init() {
  initTheme();
  majCompteurFavoris();
  initMenu();
  initApparition();
  initProgression();
  initRetourHaut();
  initFormulaire();
  initPlantes();
}

init();
