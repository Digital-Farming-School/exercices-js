// =========================================================
// Catalogue de semences — exercice 04
// Chaque TODO correspond à une étape du README.
// =========================================================

// ===== LES DONNÉES (fournies) : un tableau d'objets =====
// Chaque objet décrit une semence. « saisons » est un tableau : les saisons
// de semis possibles. La liste est une variable (let) car on ajoutera et on
// retirera des semences.
let semences = [
  { id: 1, nom: "Tomate", saisons: ["printemps"], joursRecolte: 80, image: "images/tomate.svg", description: "Semis en pépinière au chaud, repiquage quand le froid est passé." },
  { id: 2, nom: "Carotte", saisons: ["printemps", "automne"], joursRecolte: 80, image: "images/carotte.svg", description: "Semis direct dans un sol meuble et profond, sans cailloux." },
  { id: 3, nom: "Laitue", saisons: ["printemps", "automne"], joursRecolte: 50, image: "images/laitue.svg", description: "Craint la chaleur : semez à la mi-ombre quand il fait chaud." },
  { id: 4, nom: "Courgette", saisons: ["printemps", "ete"], joursRecolte: 55, image: "images/courgette.svg", description: "Semis après les dernières gelées, beaucoup d'eau et de compost." },
  { id: 5, nom: "Radis", saisons: ["printemps", "automne"], joursRecolte: 30, image: "images/radis.svg", description: "Le plus rapide du potager, idéal pour apprendre à semer." },
  { id: 6, nom: "Haricot vert", saisons: ["printemps", "ete"], joursRecolte: 60, image: "images/haricot.svg", description: "Semis direct quand la terre est bien réchauffée." },
  { id: 7, nom: "Épinard", saisons: ["automne", "hiver"], joursRecolte: 45, image: "images/epinard.svg", description: "Aime la fraîcheur ; monte en graines quand les jours rallongent." },
  { id: 8, nom: "Petit pois", saisons: ["automne", "hiver"], joursRecolte: 90, image: "images/petit-pois.svg", description: "Semis direct en sol frais ; prévoir des tuteurs pour les variétés hautes." }
];

// Pour afficher « Été » plutôt que « ete » (accents et majuscules).
const libellesSaisons = {
  printemps: "Printemps",
  ete: "Été",
  automne: "Automne",
  hiver: "Hiver"
};

// ===== SÉLECTION DES ÉLÉMENTS (fournie) =====
const catalogue = document.querySelector("#catalogue");
const compteur = document.querySelector("#compteur");
const messageVide = document.querySelector("#message-vide");
const conteneurFiltres = document.querySelector("#filtres");
const formulaireAjout = document.querySelector("#formulaire-ajout");
const modeleCarte = document.querySelector("#modele-carte");


// ===== ÉTAPE 1 : EXPLORER LES DONNÉES =====
// TODO 1 : affichez le tableau avec console.table, son nombre d'éléments,
// puis le nom et les saisons de la première semence.


// ===== ÉTAPE 2 : CRÉER UN ÉLÉMENT À LA MAIN =====
// TODO 2 : avec document.createElement, construisez une carte (<li class="carte">
// contenant un <h3>) pour la PREMIÈRE semence et ajoutez-la à catalogue.


// ===== ÉTAPE 3 : UNE FONCTION ET UNE BOUCLE =====
// TODO 3 : écrivez creerCarte(semence) qui renvoie une carte (nom, saisons,
// jours), puis affichez TOUTES les semences avec forEach. Remplacez l'étape 2.


// ===== ÉTAPE 4 : UN MODÈLE <template> =====
// TODO 4 : réécrivez creerCarte avec modeleCarte.content.cloneNode(true) et
// remplissez les éléments du modèle (image, nom, saisons, jours, description).


// ===== ÉTAPE 5 : FILTRER PAR SAISON =====
// TODO 5 : écrivez filtrerSemences(saison) avec filter et includes, puis
// afficherCatalogue(saison) qui vide la liste, la remplit, met à jour le
// compteur et le message « aucune semence ».


// ===== ÉTAPE 6 : LES BOUTONS DE FILTRE (DÉLÉGATION) =====
// TODO 6 : UN seul écouteur sur conteneurFiltres ; utilisez
// evenement.target.closest("button") et dataset.saison ; mettez à jour
// aria-pressed.


// ===== ÉTAPE 7 : AJOUTER UNE SEMENCE =====
// TODO 7 : à l'envoi de formulaireAjout, créez un objet, ajoutez-le avec
// push et réaffichez le catalogue.


// ===== ÉTAPE 8 : RETIRER UNE SEMENCE =====
// TODO 8 : UN seul écouteur sur catalogue (délégation) pour les boutons
// « Retirer » : retirez la carte (remove) et la semence du tableau (filter).


// ===== ÉTAPE 9 : SÉCURITÉ — TEXTE OU HTML ? =====
// TODO 9 : expérience avec innerHTML (voir le README), puis retour à une
// version sûre.
