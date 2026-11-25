/* =========================================================
   La ferme-école en chiffres — script
   Le HTML et le CSS sont fournis (regardez les classes .ouvert,
   .visible, .pulse et la variable --delai dans le CSS).
   Votre mission : déclencher les animations avec JavaScript.
   Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE (déjà sélectionnés pour vous) =====
const boutonMeteo = document.querySelector('.bouton-meteo');
const panneauMeteo = document.querySelector('#meteo');
const chiffres = document.querySelectorAll('.chiffre');
const elementsApparents = document.querySelectorAll('.apparait');

// Objet « vivant » : mouvementReduit.matches vaut true si l'utilisateur a demandé de réduire les animations
const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)');

// ===== TODO 1 : OUVRIR / FERMER LE PANNEAU MÉTÉO =====
// Au clic sur boutonMeteo : basculer la classe « ouvert » sur panneauMeteo,
// mettre à jour aria-expanded et le texte du bouton
// (« Afficher la météo du jardin » / « Masquer la météo du jardin »).


// ===== TODO 2 : REJOUER UNE ANIMATION @keyframes =====
// Écrivez jouerPulse(element) : ajoute la classe « pulse », puis la retire
// à la fin de l'animation (événement « animationend »).
// Branchez-la sur le clic de chaque élément de « chiffres ».


// ===== TODO 3 : APPARAÎTRE QUAND ON ARRIVE À L'ÉLÉMENT =====
// Créez un IntersectionObserver (seuil 0.2) : quand une entrée est visible
// (isIntersecting), ajoutez la classe « visible » à entree.target puis
// arrêtez de l'observer (unobserve). Observez chaque élément de elementsApparents.


// ===== TODO 4 : APPARITIONS EN CASCADE =====
// Pour chaque élément de elementsApparents, calculez son rang parmi ses frères
// et posez la variable CSS --delai avec style.setProperty (rang × 120 ms).


// ===== TODO 5 : NETTOYER APRÈS L'APPARITION =====
// Écoutez « transitionend » sur chaque élément ; quand l'opacité a fini
// d'apparaître (evenement.propertyName === 'opacity'), retirez --delai.


// ===== TODO 6 : COMPTEUR ANIMÉ =====
// Écrivez animerCompteur(chiffre) avec requestAnimationFrame : le nombre
// (.nombre, valeur finale dans data-cible) monte de 0 à la cible en 1,5 s.
// Appelez-la quand un chiffre devient visible (TODO 3).


// ===== TODO 7 : RESPECTER « RÉDUIRE LES ANIMATIONS » =====
// Si mouvementReduit.matches : tout afficher tout de suite, sans compteur ni pulse.
// Écoutez aussi l'événement « change » de mouvementReduit.
