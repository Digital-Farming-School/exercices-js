/* =========================================================
   Le guide de la saison des pluies — script
   La page HTML et le CSS sont fournis. Votre mission : écrire
   le JavaScript qui rend le menu et le défilement intelligents.
   Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE (déjà sélectionnés pour vous) =====
const entete = document.querySelector('.entete');
const boutonBurger = document.querySelector('.burger');
const menu = document.querySelector('#menu-principal');
const liensMenu = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.etape');
const boutonRetourHaut = document.querySelector('.retour-haut');
const affichageLargeur = document.querySelector('#largeur');

const SEUIL_BOUTON = 400; // en pixels : au-delà, le bouton « retour en haut » apparaît
const LARGEUR_ORDINATEUR = 700; // même valeur que la media query du CSS

// ===== TODO 1 : OBSERVER LE DÉFILEMENT =====
// Écoutez l'événement « scroll » de window et affichez window.scrollY dans la console.


// ===== TODO 2 : LE BOUTON « RETOUR EN HAUT » APPARAÎT =====
// Écrivez une fonction majBoutonRetourHaut() qui retire la classe « cache »
// quand window.scrollY dépasse SEUIL_BOUTON, et la remet sinon.


// ===== TODO 3 : LE CLIC REMONTE EN DOUCEUR =====
// Au clic sur boutonRetourHaut : window.scrollTo avec top: 0 et behavior: 'smooth'.


// ===== TODO 4 : LE MENU INDIQUE LA SECTION VISIBLE =====
// Écrivez une fonction majMenuActif() : trouvez la dernière section dont
// getBoundingClientRect().top est passé sous « entete.offsetHeight + 40 »,
// puis posez la classe « actif » ET aria-current="true" sur le lien correspondant
// (et retirez-les des autres liens).


// ===== TODO 5 : LE MENU BURGER (TÉLÉPHONE) =====
// Clic sur boutonBurger : basculer la classe « ouvert » sur menu
// et mettre à jour aria-expanded. Refermer le menu après un clic sur un lien
// et avec la touche Échap.


// ===== TODO 6 : LA FENÊTRE CHANGE DE TAILLE =====
// Écrivez majLargeur() : écrire window.innerWidth dans affichageLargeur.
// Quand la largeur atteint LARGEUR_ORDINATEUR, refermer le menu (classe + aria-expanded).


// ===== TODO 7 : PAS TROP DE CALCULS =====
// Regroupez les appels dans UN SEUL listener « scroll » qui utilise
// requestAnimationFrame (voir le mémo), puis appelez une fois chaque fonction
// au chargement pour initialiser la page.
