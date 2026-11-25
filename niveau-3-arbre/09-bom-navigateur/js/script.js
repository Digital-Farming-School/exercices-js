/* =========================================================
   Tableau de bord du visiteur — script
   Les éléments de la page et les données sont fournis.
   Votre mission : faire parler le BOM (window, screen, navigator,
   location, history…). Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE =====
const fenetreLargeur = document.querySelector("#fenetre-largeur");
const fenetreHauteur = document.querySelector("#fenetre-hauteur");
const ecranTaille = document.querySelector("#ecran-taille");
const ecranDensite = document.querySelector("#ecran-densite");

const langue = document.querySelector("#langue");
const etatConnexion = document.querySelector("#etat-connexion");
const themePrefere = document.querySelector("#theme-prefere");
const agent = document.querySelector("#agent");

const adresseComplete = document.querySelector("#adresse-complete");
const adresseProtocole = document.querySelector("#adresse-protocole");
const adresseHote = document.querySelector("#adresse-hote");
const adresseHash = document.querySelector("#adresse-hash");
const adresseRecherche = document.querySelector("#adresse-recherche");
const alerteProtocole = document.querySelector("#alerte-protocole");

const boutonsPlante = document.querySelectorAll("[data-plante]");
const planteImage = document.querySelector("#plante-image");
const planteTitre = document.querySelector("#plante-titre");
const planteTexte = document.querySelector("#plante-texte");
const boutonPrecedent = document.querySelector("#bouton-precedent");
const boutonSuivant = document.querySelector("#bouton-suivant");

const minuteurAffichage = document.querySelector("#minuteur-affichage");
const minuteurDemarrer = document.querySelector("#minuteur-demarrer");
const minuteurPause = document.querySelector("#minuteur-pause");
const minuteurReinitialiser = document.querySelector("#minuteur-reinitialiser");
const minuteurMessage = document.querySelector("#minuteur-message");

const boutonCopier = document.querySelector("#bouton-copier");
const copieMessage = document.querySelector("#copie-message");

// ===== DONNÉES : les plantes que l'on peut choisir =====
const PLANTES = {
  piment: {
    titre: "Piment",
    texte: "Il adore la chaleur et le plein soleil. Semé en pépinière, il est repiqué après six semaines environ.",
    image: "images/piment.svg",
    alt: "Piment rouge vif avec sa queue verte"
  },
  gingembre: {
    titre: "Gingembre",
    texte: "On plante un morceau de rhizome qui porte des bourgeons. Il préfère l'ombre légère et un sol frais.",
    image: "images/gingembre.svg",
    alt: "Rhizome de gingembre d'où sortent deux pousses vertes"
  },
  basilic: {
    titre: "Basilic",
    texte: "Pincez le bout des tiges pour qu'il reste touffu. Il pousse très bien dans un pot de 20 cm.",
    image: "images/basilic.svg",
    alt: "Plant de basilic dans un pot en terre"
  }
};

// ===== 1. LA FENÊTRE : window.innerWidth / innerHeight + événement resize =====
// TODO 1 : écrire une fonction afficherFenetre() qui met window.innerWidth dans
// fenetreLargeur et window.innerHeight dans fenetreHauteur (propriété textContent).
// Appelez-la une fois tout de suite, puis à chaque événement "resize" de window.


// ===== 2. L'ÉCRAN : l'objet screen =====
// TODO 2 : dans ecranTaille, écrire la taille de l'écran avec screen.width et screen.height
// (par exemple « 1920 × 1080 px », avec un gabarit `…`) ; dans ecranDensite, window.devicePixelRatio.


// ===== 3. LE NAVIGATEUR : navigator =====
// TODO 3 : afficher navigator.language dans langue et navigator.userAgent dans agent.
// Puis écrire afficherConnexion() : navigator.onLine donne true ou false ; mettez
// « En ligne » / « Hors ligne » dans etatConnexion et basculez les classes
// "badge-ok" / "badge-alerte" avec classList.toggle(nom, condition).
// Appelez la fonction au chargement et sur les événements "online" et "offline" de window.


// ===== 4. LE THÈME PRÉFÉRÉ : window.matchMedia =====
// TODO 4 : const requeteSombre = window.matchMedia("(prefers-color-scheme: dark)");
// requeteSombre.matches vaut true ou false. Affichez « sombre » ou « clair » dans
// themePrefere, et mettez à jour l'affichage quand l'événement "change" de requeteSombre se produit.


// ===== 5. L'ADRESSE : l'objet location =====
// TODO 5 : écrire afficherAdresse() qui remplit adresseComplete (location.href),
// adresseProtocole (location.protocol), adresseHote (location.hostname),
// adresseHash (location.hash) et adresseRecherche (location.search).
// Quand une valeur est vide, affichez un texte de remplacement avec l'opérateur ||.
// Si location.protocol vaut "file:", retirez la classe "cache" de alerteProtocole.
// Appelez la fonction au chargement et sur l'événement "hashchange" de window.


// ===== 6. LIRE UN PARAMÈTRE D'URL : URLSearchParams =====
// TODO 6 : écrire lirePlanteDansUrl() qui renvoie new URLSearchParams(location.search).get("plante").
// Puis afficherPlante(cle) : si la clé n'est pas une plante connue de PLANTES, cachez l'image
// (classe "cache") et affichez le message « Aucune plante choisie » ; sinon remplissez
// planteImage (src, alt), planteTitre et planteTexte, et montrez l'image.
// Appelez afficherPlante(lirePlanteDansUrl()) au chargement.
// Testez avec index.html?plante=piment puis ?plante=ananas.


// ===== 7. L'HISTORIQUE : history.pushState, popstate, back, forward =====
// TODO 7 : sur chaque bouton de boutonsPlante, au clic :
//   - construire l'adresse : const adresse = new URL(location.href); adresse.searchParams.set("plante", cle);
//   - history.pushState({ plante: cle }, "", adresse);  (changer l'adresse sans recharger)
//   - appeler afficherPlante(cle) puis afficherAdresse().
// Écoutez "popstate" sur window pour réafficher la plante de l'adresse (et l'adresse) quand
// l'utilisateur clique sur « Précédent » du navigateur.
// Enfin : boutonPrecedent appelle history.back(), boutonSuivant appelle history.forward().


// ===== 8. LE MINUTEUR : setInterval / clearInterval =====
// TODO 8 : le minuteur compte à rebours depuis DUREE_ARROSAGE secondes.
const DUREE_ARROSAGE = 30; // secondes (20 minutes dans la vraie vie)
let secondesRestantes = DUREE_ARROSAGE;
let idMinuteur = null; // null = le minuteur ne tourne pas

// Écrire : afficherMinuteur() (met « 00:30 » dans minuteurAffichage ; astuce : padStart(2, "0")),
// tic() (retire 1 seconde puis réaffiche), demarrerMinuteur() (setInterval(tic, 1000), et on
// garde l'identifiant dans idMinuteur ; ne rien faire s'il tourne déjà), mettreEnPause()
// (clearInterval) et reinitialiserMinuteur(). Reliez les trois boutons.


// ===== 9. LA FIN DU MINUTEUR : setTimeout =====
// TODO 9 : quand secondesRestantes arrive à 0, écrire terminerArrosage() : arrêter le minuteur,
// ajouter la classe "termine" à minuteurAffichage, écrire un message dans minuteurMessage et
// changer document.title. Avec setTimeout(…, 5000), effacez le message 5 secondes plus tard.
// (Appelez terminerArrosage() depuis tic().)


// ===== 10. COPIER L'ADRESSE : navigator.clipboard =====
// TODO 10 : au clic sur boutonCopier, utiliser await navigator.clipboard.writeText(location.href)
// dans une fonction async, entourée d'un try … catch. Succès → « Adresse copiée ✔ » dans
// copieMessage ; échec → un message qui indique erreur.name. Testez avec file:// puis avec Live Server.
