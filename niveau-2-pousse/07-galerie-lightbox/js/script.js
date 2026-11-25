/* =========================================================
   Les récoltes de la saison — script
   Le HTML et le CSS sont fournis. Votre mission : écrire le
   JavaScript de la galerie (visionneuse, clavier, filtres).
   Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE (déjà sélectionnés pour vous) =====
const galerie = document.querySelector('.galerie');
const visionneuse = document.querySelector('#visionneuse');
const grandeImage = document.querySelector('#grande-image');
const legende = document.querySelector('#legende');
const position = document.querySelector('#position');
const boutonFermer = document.querySelector('.fermer');
const boutonPrecedent = document.querySelector('.precedent');
const boutonSuivant = document.querySelector('.suivant');
const zoneFiltres = document.querySelector('.filtres');
const compte = document.querySelector('#compte');

// Indice (dans la liste des photos VISIBLES) de la photo affichée dans la visionneuse
let indexCourant = 0;

// Liste à jour des vignettes visibles (celles dont le <li> n'a pas la classe « cache »).
// À rappeler à chaque fois : le filtre de l'étape 7 la modifie.
function vignettesVisibles() {
  return Array.from(document.querySelectorAll('.galerie li:not(.cache) .vignette'));
}

// ===== TODO 1 : UN SEUL ÉCOUTEUR POUR TOUTE LA GALERIE =====
// Écoutez le clic sur « galerie » (et pas sur chaque vignette). Avec
// evenement.target.closest('.vignette'), retrouvez le bouton cliqué
// (null si le clic est ailleurs : dans ce cas, return). Affichez sa légende
// (vignette.dataset.legende) dans la console.


// ===== TODO 2 : REMPLIR ET OUVRIR LA VISIONNEUSE =====
// Écrivez afficherPhoto(index) : elle recopie l'image (src ET alt), la légende
// et la position (« 3 / 8 ») dans la visionneuse. Dans l'écouteur de l'étape 1,
// mémorisez indexCourant, appelez afficherPhoto puis visionneuse.showModal().


// ===== TODO 3 : FERMER LA VISIONNEUSE =====
// Bouton « × » : visionneuse.close(). Clic sur le fond gris : fermer aussi
// (indice : sur le fond, evenement.target est le <dialog> lui-même).


// ===== TODO 4 : PHOTO PRÉCÉDENTE / SUIVANTE =====
// Écrivez allerA(decalage) qui change indexCourant en revenant au début après
// la dernière photo (et inversement), puis rappelle afficherPhoto.
// Branchez les deux boutons.


// ===== TODO 5 : LES FLÈCHES DU CLAVIER =====
// Écoutez « keydown » sur la visionneuse : ArrowLeft → précédente, ArrowRight → suivante.


// ===== TODO 6 : RENDRE LE FOCUS À LA FERMETURE =====
// Écoutez l'événement « close » de la visionneuse et redonnez le focus
// à la vignette de la photo qu'on regardait en dernier.


// ===== TODO 7 : FILTRER PAR CATÉGORIE =====
// Un écouteur sur zoneFiltres : mettre aria-pressed="true" sur le bouton cliqué
// (et "false" sur les autres), ajouter/retirer la classe « cache » sur chaque <li>
// de la galerie selon data-categorie, puis écrire « N photos affichées » dans « compte ».
