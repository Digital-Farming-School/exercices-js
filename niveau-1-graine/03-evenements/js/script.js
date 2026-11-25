// =========================================================
// Fiche pratique : réussir son paillage — exercice 03
// Chaque TODO correspond à une étape du README.
// Rappel : un événement = un type (« click ») + une fonction à exécuter.
//   element.addEventListener("click", function (evenement) { ... });
// =========================================================

// ===== SÉLECTION DES ÉLÉMENTS (fournie, comme à l'exercice 02) =====
const fiche = document.querySelector("#fiche");
const boutonEtapes = document.querySelector("#bouton-etapes");
const listeEtapes = document.querySelector("#etapes");
const boutonDiminuer = document.querySelector("#bouton-diminuer");
const boutonAgrandir = document.querySelector("#bouton-agrandir");
const boutonLecture = document.querySelector("#bouton-lecture");
const champSurface = document.querySelector("#surface");
const resultatPaillage = document.querySelector("#resultat-paillage");
const boutonsMateriaux = document.querySelectorAll(".materiau");
const descriptionMateriau = document.querySelector("#description-materiau");
const formulaireQuestion = document.querySelector("#formulaire-question");
const champPrenom = document.querySelector("#prenom");
const confirmation = document.querySelector("#confirmation");
const boutonAstuce = document.querySelector("#bouton-astuce");
const texteAstuce = document.querySelector("#texte-astuce");


// ===== ÉTAPE 1 : AFFICHER / MASQUER LES ÉTAPES =====
// TODO 1 : au clic sur boutonEtapes, basculez la classe « cache » de
// listeEtapes, mettez à jour aria-expanded et le texte du bouton.


// ===== ÉTAPE 2 : L'OBJET ÉVÉNEMENT =====
// TODO 2 : écoutez le clic sur toute la fiche et affichez dans la console
// evenement.target et evenement.currentTarget. Que remarquez-vous ?


// ===== ÉTAPE 3 : TAILLE DU TEXTE =====
// TODO 3 : boutons A− et A+ : faites évoluer une variable niveauTaille
// (de -1 à 2) et écrivez-la dans data-taille du <body>.


// ===== ÉTAPE 4 : MODE LECTURE =====
// TODO 4 : au clic sur boutonLecture, basculez la classe « mode-lecture »
// sur le <body> et mettez à jour aria-pressed.


// ===== ÉTAPE 5 : CALCULATEUR (ÉVÉNEMENT input) =====
// TODO 5 : à chaque frappe dans champSurface, calculez les litres de
// paillage (50 L par m²) et le nombre de brouettes (80 L), et écrivez-les
// dans resultatPaillage.


// ===== ÉTAPE 6 : SURVOL ET FOCUS =====
// TODO 6 : pour chaque bouton de matériau, affichez sa description
// (data-description) dans descriptionMateriau au survol et au focus.


// ===== ÉTAPE 7 : LE CLAVIER =====
// TODO 7 : sur document, touche Échap = masquer les étapes ; touche « l » =
// mode lecture (sauf quand on écrit dans un champ).


// ===== ÉTAPE 8 : ENVOI D'UN FORMULAIRE =====
// TODO 8 : à l'envoi du formulaire, empêchez le rechargement de la page et
// affichez un message de remerciement dans confirmation.


// ===== ÉTAPE 9 : UN ÉCOUTEUR QUI SE RETIRE =====
// TODO 9 : le bouton d'astuce ne doit fonctionner qu'une fois : écrivez une
// fonction nommée revelerAstuce et retirez-la avec removeEventListener.
