/* =========================================================
   Le carnet du jardin — script
   Les éléments de la page et deux petites fonctions utiles sont fournis.
   Votre mission : formulaire, validation et mémoire (localStorage).
   Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE (fournis) =====
const boutonTheme = document.querySelector("#bouton-theme");

const listeTaches = document.querySelector("#liste-taches");
const casesTaches = document.querySelectorAll("#liste-taches input[type='checkbox']");
const barreProgression = document.querySelector("#progression");
const progressionTexte = document.querySelector("#progression-texte");

const formulaire = document.querySelector("#formulaire-observation");
const champPlante = document.querySelector("#champ-plante");
const champDate = document.querySelector("#champ-date");
const champHauteur = document.querySelector("#champ-hauteur");
const champNote = document.querySelector("#champ-note");
const compteurNote = document.querySelector("#compteur-note");
const messageFormulaire = document.querySelector("#message-formulaire");

const listeObservations = document.querySelector("#liste-observations");
const messageVide = document.querySelector("#message-vide");
const compteurObservations = document.querySelector("#compteur-observations");
const boutonToutEffacer = document.querySelector("#bouton-tout-effacer");

// ===== CONSTANTES ET ÉTAT (fournis) =====
const CLE_THEME = "carnet-theme";
const CLE_TACHES = "carnet-taches";
const CLE_OBSERVATIONS = "carnet-observations";

const champsDuFormulaire = [champPlante, champDate, champHauteur, champNote];

// Les observations du carnet : un tableau d'objets { id, plante, date, hauteur, note }
let observations = [];

// La date du jour au format AAAA-MM-JJ, en heure locale
function aujourdhui() {
  return new Date().toLocaleDateString("fr-CA");
}

// "2026-11-25" -> "25 novembre 2026"
function formaterDate(texteDate) {
  return new Date(`${texteDate}T12:00:00`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// ===== 1. LIRE ET ÉCRIRE DANS LE STOCKAGE (avec filet de sécurité) =====
// TODO 1 : écrire deux fonctions.
//   lireStockage(cle, valeurParDefaut) : localStorage.getItem(cle) renvoie du texte, ou null si la
//     clé n'existe pas (renvoyez alors la valeur par défaut). Sinon JSON.parse(texte).
//     Le tout dans un try … catch : si le texte est abîmé, renvoyez la valeur par défaut.
//   ecrireStockage(cle, valeur) : localStorage.setItem(cle, JSON.stringify(valeur)),
//     dans un try … catch (le stockage peut être plein ou bloqué). Renvoyez true ou false.
// Puis, juste après, remplacez la ligne « let observations = []; » plus haut : au démarrage, lisez
// CLE_OBSERVATIONS (valeur par défaut : []). Vérifiez avec Array.isArray que c'est bien un tableau.


// ===== 2. LE MODE SOMBRE MÉMORISÉ =====
// TODO 2 : écrire appliquerTheme(theme) : document.documentElement.dataset.theme = theme ;
//   aria-pressed du bouton (String(true/false)) et son texte. Au chargement, appliquez le thème
//   mémorisé (CLE_THEME), à défaut celui du système : window.matchMedia("(prefers-color-scheme: dark)").matches.
//   Au clic sur boutonTheme : basculer "clair" / "sombre" et mémoriser le choix.


// ===== 3. LA LISTE DE TÂCHES ET SA BARRE DE PROGRESSION =====
// TODO 3 : chaque case a un data-tache (« arroser », « desherber »…).
//   afficherProgression() : compter les cases cochées, mettre le nombre dans barreProgression.value
//     et un texte comme « 2 tâches sur 5 » dans progressionTexte.
//   restaurerTaches() : lire CLE_TACHES (un tableau d'identifiants), recocher les bonnes cases,
//     ajouter la classe "faite" au <li> des tâches cochées (c.closest("li")), puis afficherProgression().
//   Un SEUL écouteur "change" sur listeTaches (délégation) : mettre à jour la classe "faite",
//     enregistrer le tableau des identifiants cochés, mettre à jour la progression.
//   Appelez restaurerTaches() au chargement. Rechargez la page : les cases doivent rester cochées.


// ===== 4. ENVOYER LE FORMULAIRE SANS RECHARGER LA PAGE =====
// TODO 4 : écouter "submit" sur formulaire. Première ligne : evenement.preventDefault().
//   Récupérez les valeurs : const donnees = Object.fromEntries(new FormData(formulaire));
//   Affichez-les avec console.table(donnees) et regardez leurs types : la hauteur est du TEXTE.
//   (On finira cet écouteur à l'étape 7.)


// ===== 5. VALIDER AVEC L'API DE VALIDATION =====
// TODO 5 : écrire messageErreur(champ), validerChamp(champ) et validerFormulaire().
//   messageErreur : lit champ.validity (valueMissing, tooShort, rangeUnderflow, rangeOverflow,
//     badInput, customError) et renvoie un message en français, ou "" si tout va bien.
//   validerChamp : commence par champ.setCustomValidity("") ; ajoute la règle « la date ne peut pas
//     être dans le futur » avec setCustomValidity ; affiche le message dans #erreur-<name>
//     (document.querySelector(`#erreur-${champ.name}`)) ; met aria-invalid à "true"/"false".
//   validerFormulaire : valide tous les champs, met le focus sur le premier champ invalide,
//     renvoie true ou false. Appelez-la dans l'écouteur de l'étape 4 : arrêtez-vous si c'est false.
//   Une fois un champ en erreur, revalidez-le à chaque événement "input".


// ===== 6. LE COMPTEUR DE CARACTÈRES =====
// TODO 6 : écrire afficherCompteur() : « 12 / 200 » dans compteurNote (champNote.value.length et
//   champNote.maxLength). Ajoutez la classe "limite" quand il reste 20 caractères ou moins
//   (classList.toggle). Appelez-la à chaque événement "input" de champNote.


// ===== 7. AJOUTER UNE OBSERVATION =====
// TODO 7 : dans l'écouteur "submit", une fois le formulaire valide, construire l'objet
//   { id: Date.now(), plante, date, hauteur: Number(…), note } (avec .trim() sur les textes),
//   l'ajouter AU DÉBUT du tableau (unshift), l'enregistrer (ecrireStockage), appeler afficherObservations()
//   (étape 8), vider le formulaire (formulaire.reset()), remettre le compteur à zéro,
//   écrire « Observation ajoutée au carnet ✔ » dans messageFormulaire et remettre le focus sur champPlante.


// ===== 8. AFFICHER LES OBSERVATIONS (sans innerHTML) =====
// TODO 8 : écrire creerCarteObservation(observation) qui construit un <li class="observation">
//   avec createElement : un <h3> (la plante), un <p class="meta"> (« 25 novembre 2026 · 40 cm »,
//   avec formaterDate), un <p> (la note) et un <button type="button" class="bouton bouton-clair supprimer">.
//   Le <li> reçoit data-id = l'identifiant. TOUS les textes passent par textContent.
//   Écrire afficherObservations() : listeObservations.replaceChildren(...observations.map(creerCarteObservation)),
//   met à jour compteurObservations, cache messageVide (classe "cache") s'il y a des observations
//   et désactive boutonToutEffacer quand la liste est vide. Appelez-la au chargement.
//   Test de sécurité : enregistrez la note  <img src=x onerror="alert('piraté')">  : rien ne doit s'exécuter.


// ===== 9. SUPPRIMER =====
// TODO 9 : un SEUL écouteur "click" sur listeObservations (délégation) : trouver le bouton avec
//   evenement.target.closest("button.supprimer"), l'identifiant dans son <li> (dataset.id),
//   retirer l'observation avec filter, enregistrer, réafficher.
//   boutonToutEffacer : window.confirm("…") puis vider le tableau et localStorage.removeItem(CLE_OBSERVATIONS).


// ===== 10. SYNCHRONISER LES ONGLETS : l'événement storage =====
// TODO 10 : window.addEventListener("storage", (evenement) => { … }). Il ne se déclenche que dans
//   les AUTRES onglets. evenement.key est la clé modifiée (ou null après localStorage.clear()).
//   Rechargez les observations (et réaffichez) quand c'est CLE_OBSERVATIONS ; faites de même pour
//   les tâches et le thème. Testez avec deux onglets côte à côte.
