// =========================================================
// Tableau d'affichage de la ferme-école — exercice 01
// Chaque TODO correspond à une étape du README.
// Après chaque étape : enregistrez (Ctrl + S) et regardez
// la page ET la console (F12 → onglet « Console »).
// =========================================================

// ===== ÉTAPE 1 : PARLER À LA CONSOLE =====
// TODO 1 : affichez un message avec console.log(), puis un avertissement
// avec console.warn() et une erreur avec console.error().


// ===== ÉTAPE 2 : DES VARIABLES =====
// TODO 2 : déclarez nomFerme (texte), nombreApprenants (nombre) et
// recolteTerminee (booléen) avec const. Affichez leur type avec typeof.
// Puis déclarez compteur avec let, augmentez-le de 1 et affichez-le.


// ===== ÉTAPE 3 : UN MESSAGE D'ACCUEIL =====
// TODO 3 : fabriquez une phrase avec un gabarit (accents graves) qui
// utilise nomFerme et nombreApprenants, puis écrivez-la dans la page :
//   document.querySelector("#message-accueil").textContent = ...


// ===== ÉTAPE 4 : LA DATE DU JOUR =====
// TODO 4 : créez la date du jour avec new Date(), mettez-la en forme avec
// toLocaleDateString("fr-FR", { ... }) et écrivez-la dans #date-du-jour.


// ===== ÉTAPE 5 : COMPTER LES JOURS AVANT LA RÉCOLTE =====
// La date de la récolte vous est fournie (le 15 décembre 2026, à minuit).
const dateRecolte = new Date("2026-12-15T00:00:00");

// TODO 5 : écrivez la fonction joursAvant(dateCible) qui renvoie le nombre
// de jours (entier) entre maintenant et dateCible, puis affichez le résultat
// dans #jours-restants.


// ===== ÉTAPE 6 : DES MESSAGES SELON LA SITUATION =====
// TODO 6 : avec if / else if / else, écrivez dans #message-recolte un
// message adapté, et mettez « jour » ou « jours » dans #unite-jours.


// ===== ÉTAPES 7 ET 8 : ERREURS ET POINTS D'ARRÊT =====
// TODO 7 : provoquez volontairement deux erreurs, lisez-les dans la
// console, puis corrigez-les (voir le README).
// TODO 8 : aucun code ici — posez un point d'arrêt dans l'onglet « Sources »
// (voir le README).

// ===== ÉTAPE 9 : RELECTURE =====
// TODO 9 : relisez votre fichier (commentaires, indentation de 2 espaces,
// const / let) et vérifiez que la console n'affiche aucune erreur involontaire.
