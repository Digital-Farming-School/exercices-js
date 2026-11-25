/* =========================================================
   L'herbier de la ferme-école — script
   Les éléments de la page, la liste des catégories et une fonction utile sont fournis.
   Votre mission : charger les fiches depuis data/plantes.json, puis les chercher, les filtrer, les trier.
   Les numéros TODO correspondent aux étapes du README.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE =====
const alerteFichier = document.querySelector("#alerte-fichier");
const formulaireRecherche = document.querySelector("#formulaire-recherche");
const outils = document.querySelector("#outils");
const champRecherche = document.querySelector("#champ-recherche");
const filtreCategorie = document.querySelector("#filtre-categorie");
const choixTri = document.querySelector("#choix-tri");
const statut = document.querySelector("#statut");
const boutonReessayer = document.querySelector("#bouton-reessayer");
const compteur = document.querySelector("#compteur");
const listePlantes = document.querySelector("#liste-plantes");
const modeleFiche = document.querySelector("#modele-fiche");

// ===== CONSTANTES ET ÉTAT =====
const URL_DONNEES = "data/plantes.json";

// Libellé de chaque catégorie. Cette liste sert aussi de « liste blanche » :
// on ne fabrique jamais un nom de fichier image à partir d'une valeur inconnue.
const CATEGORIES = {
  fruit: "Légume-fruit",
  feuille: "Légume-feuille",
  racine: "Racine, bulbe ou rhizome",
  graine: "Légumineuse ou céréale",
  aromatique: "Plante aromatique"
};

// Les plantes chargées depuis le fichier (vide tant que le chargement n'est pas terminé)
let plantes = [];

// "240 à 300 jours" devient "8 à 10 mois" : plus lisible pour les cultures longues
function formaterCycle(min, max) {
  if (min >= 150) {
    return `${Math.round(min / 30)} à ${Math.round(max / 30)} mois`;
  }
  return `${min} à ${max} jours`;
}

// ===== 1. LE MESSAGE D'ÉTAT ET L'ALERTE file:// =====
// TODO 1 : écrire afficherStatut(message, type = "info") : met le message dans statut (textContent),
//   ajoute la classe "erreur" seulement si type vaut "erreur" (classList.toggle) et cache l'élément
//   (classe "cache") quand le message est vide.
//   Puis : si location.protocol vaut "file:", retirez la classe "cache" de alerteFichier.


// ===== 2. LE PREMIER fetch : une fonction async =====
// TODO 2 : écrire async function chargerPlantes() qui :
//   - fait const reponse = await fetch(URL_DONNEES);
//   - affiche reponse dans la console (console.log(reponse.status, reponse.ok)) et regardez l'objet ;
//   - lit les données avec const donnees = await reponse.json(); puis console.table(donnees).
//   Appelez chargerPlantes() à la fin du fichier. Testez avec Live Server, puis (pour voir l'erreur
//   rouge) en double-cliquant sur index.html : « Failed to fetch » ou « blocked by CORS policy ».


// ===== 3. GÉRER LES ERREURS : try / catch / finally, reponse.ok =====
// TODO 3 : dans chargerPlantes :
//   - tout en haut : afficherStatut("Chargement des fiches…") ;
//   - entourer le code d'un try … catch (erreur) … finally ;
//   - après le fetch : if (!reponse.ok) { throw new Error(`… ${reponse.status} …`); }
//     (fetch ne rejette PAS sur une erreur 404 : il faut tester reponse.ok soi-même) ;
//   - dans le try, une fois les données lues : stocker dans plantes, afficherStatut(""),
//     activer les outils (outils.disabled = false) ;
//   - dans le catch : console.error(erreur), afficherStatut(message, "erreur") et montrer
//     boutonReessayer (retirer "cache") ; le bouton relance chargerPlantes ;
//   - dans le finally : retirer l'attribut aria-busy de listePlantes (posé au début avec setAttribute).
//   Écrire aussi expliquerErreur(erreur) : SyntaxError → « fichier abîmé », TypeError → « impossible de
//   joindre le fichier (essayez Live Server) », sinon erreur.message.
//   Testez 3 pannes : URL_DONNEES = "data/inexistant.json" (404), "data/plantes-abime.json" (JSON invalide)
//   et l'ouverture en file://. Chaque panne doit afficher un message DIFFÉRENT.


// ===== 4. VÉRIFIER LES DONNÉES =====
// TODO 4 : écrire validerDonnees(donnees) : lancez une erreur si ce n'est pas un tableau
//   (Array.isArray), puis gardez avec filter seulement les plantes qui ont un nom (string), une
//   catégorie connue (Object.hasOwn(CATEGORIES, plante.categorie)) et deux nombres cycleMin / cycleMax
//   (Number.isFinite). Affichez un console.warn avec le nombre de fiches ignorées.
//   Utilisez-la dans chargerPlantes : plantes = validerDonnees(donnees);


// ===== 5. AFFICHER UNE FICHE AVEC LE <template> =====
// TODO 5 : écrire creerFiche(plante) : const fiche = modeleFiche.content.cloneNode(true); puis remplir
//   chaque élément (.fiche-nom, .fiche-latin, .fiche-categorie, .fiche-cycle…) avec textContent.
//   Utilisez CATEGORIES[plante.categorie] et formaterCycle(…). L'image : src = `images/${plante.categorie}.svg`
//   et un alt descriptif. Renvoyez la fiche.
//   Écrire mettreAJourAffichage() : listePlantes.replaceChildren(...plantes.map(creerFiche)) ;
//   appelez-la quand les données sont chargées. Les 15 fiches doivent apparaître.


// ===== 6. LA RECHERCHE =====
// TODO 6 : écrire normaliser(texte) : texte.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().
//   Écrire plantesAffichees() qui renvoie les plantes dont normaliser(`${nom} ${nomLatin} ${famille}`)
//   contient (includes) le mot cherché normalisé (champRecherche.value.trim()). Utilisez-la dans
//   mettreAJourAffichage à la place de « plantes ». Branchez champRecherche sur l'événement "input".
//   Ajoutez aussi sur formulaireRecherche un écouteur "submit" qui fait preventDefault()
//   (la touche Entrée dans le champ recharge sinon la page !). Testez « niebe », « SOLAN », « xyz ».


// ===== 7. FILTRER PAR CATÉGORIE =====
// TODO 7 : dans plantesAffichees, ne gardez que les plantes de la catégorie choisie
//   (filtreCategorie.value ; la valeur "toutes" les garde toutes). Événement "change" sur la liste déroulante.
//   Le filtre et la recherche doivent se COMBINER (une seule condition avec &&).


// ===== 8. TRIER =====
// TODO 8 : trier le résultat selon choixTri.value : "nom" avec a.nom.localeCompare(b.nom, "fr"),
//   "cycle-croissant" avec a.cycleMin - b.cycleMin, "cycle-decroissant" avec b.cycleMax - a.cycleMax.
//   ATTENTION : sort() MODIFIE le tableau sur lequel on l'appelle. Triez le résultat du filter
//   (une copie), pas le tableau plantes lui-même. Événement "change" sur la liste déroulante.


// ===== 9. LE COMPTEUR ET L'ÉTAT « AUCUN RÉSULTAT » =====
// TODO 9 : dans mettreAJourAffichage, écrire dans compteur « 3 plantes sur 15 » (singulier si 1).
//   S'il n'y a aucun résultat, utiliser afficherStatut pour écrire « Aucune plante ne correspond à « xyz ». »
//   (avec textContent : le mot tapé par l'utilisateur ne doit jamais être interprété comme du HTML) ;
//   sinon effacer le message.


// ===== 10. ANTI-REBOND : ne chercher qu'une fois la frappe terminée =====
// TODO 10 : pour la recherche, au lieu d'appeler mettreAJourAffichage à chaque lettre, utilisez
//   let minuteurRecherche = null; puis dans l'écouteur "input" : clearTimeout(minuteurRecherche);
//   minuteurRecherche = setTimeout(mettreAJourAffichage, 250);
//   Ajoutez un console.log("recherche !") dans mettreAJourAffichage, tapez « piment » vite : combien de
//   messages avec, puis sans anti-rebond ?
