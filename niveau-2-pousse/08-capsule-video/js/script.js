/* =========================================================
   Planter une bouture — script
   Le HTML et le CSS sont fournis. Votre mission : remplacer les
   commandes natives de la vidéo par les vôtres, avec JavaScript.
   Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE (déjà sélectionnés pour vous) =====
const video = document.querySelector('#capsule');
const commandes = document.querySelector('#commandes');
const boutonLecture = document.querySelector('#bouton-lecture');
const barreProgression = document.querySelector('#progression');
const affichageTemps = document.querySelector('#temps');
const boutonMuet = document.querySelector('#bouton-muet');
const reglageVolume = document.querySelector('#volume');
const choixVitesse = document.querySelector('#vitesse');
const boutonSousTitres = document.querySelector('#bouton-soustitres');
const verdict = document.querySelector('#verdict');
const listeChapitres = document.querySelector('.chapitres');

const DUREE_MAX = 40; // en secondes : limite imposée par le brief

// Fonction fournie : transforme 74.2 secondes en « 1:14 »
function formaterTemps(secondes) {
  if (!Number.isFinite(secondes)) {
    return '0:00'; // avant le chargement, video.duration vaut NaN
  }
  const minutes = Math.floor(secondes / 60);
  const reste = Math.floor(secondes % 60);
  return `${minutes}:${String(reste).padStart(2, '0')}`;
}

// ===== TODO 1 : PRENDRE LE CONTRÔLE =====
// Retirez les commandes natives (video.controls = false) et montrez les vôtres
// (commandes.hidden = false). Écoutez « loadedmetadata » et affichez
// video.duration dans la console. Attention : si les métadonnées sont déjà
// chargées quand le script s'exécute, l'événement ne viendra jamais (readyState).


// ===== TODO 2 : LECTURE / PAUSE =====
// Clic sur boutonLecture (et sur la vidéo) : video.play() ou video.pause()
// selon video.paused. Le texte du bouton change dans les événements « play » et « pause ».


// ===== TODO 3 : TEMPS ÉCOULÉ ET BARRE DE PROGRESSION =====
// À chaque « timeupdate » : barreProgression.value (de 0 à 100) et
// affichageTemps (« 0:05 / 0:14 », avec formaterTemps). Faites-le aussi à « loadedmetadata ».


// ===== TODO 4 : SE DÉPLACER DANS LA VIDÉO =====
// Événement « input » de barreProgression : modifier video.currentTime.


// ===== TODO 5 : VOLUME ET SON COUPÉ =====
// reglageVolume → video.volume ; boutonMuet → video.muted ;
// mettez l'affichage du bouton à jour dans l'événement « volumechange ».


// ===== TODO 6 : VITESSE ET CHAPITRES =====
// choixVitesse → video.playbackRate ; un clic sur un bouton de listeChapitres
// va à l'instant de son data-temps et lance la lecture.


// ===== TODO 7 : SOUS-TITRES =====
// boutonSousTitres bascule video.textTracks[0].mode entre 'showing' et 'hidden',
// et met à jour aria-pressed.


// ===== TODO 8 : FIN DE LA VIDÉO ET LIMITE DE 40 SECONDES =====
// « ended » : le bouton propose « ↺ Rejouer ».
// Au chargement des métadonnées : écrire dans « verdict » si la durée respecte DUREE_MAX
// (classe « ok » ou « alerte » sur l'élément).
