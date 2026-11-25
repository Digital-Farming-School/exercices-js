/* =========================================================
   Le marché de la ferme-école — script
   Page de commande : produits, panier, favoris, validation.
   ========================================================= */

// ===== ÉLÉMENTS DE LA PAGE =====
const listeProduits = document.querySelector("#liste-produits");
const filtreSaison = document.querySelector("#filtre-saison");
const listePanier = document.querySelector("#liste-panier");
const panierVide = document.querySelector("#panier-vide");
const nombreArticles = document.querySelector("#nombre-articles");
const totalPanier = document.querySelector("#total");
const boutonVider = document.querySelector("#bouton-vider");
const boutonValider = document.querySelector("#bouton-valider");
const messageCommande = document.querySelector("#message-commande");
const listeFavoris = document.querySelector("#liste-favoris");
const favorisVide = document.querySelector("#favoris-vide");

// ===== DONNÉES ET ÉTAT =====
const DEBUG = true;
const produits = [
  { id: 1, nom: "Tomates", prix: 8, unite: "le kilo", enSaison: false },
  { id: 2, nom: "Carottes", prix: 6, unite: "le kilo", enSaison: true },
  { id: 3, nom: "Oignons", prix: 5, unite: "le kilo", enSaison: true },
  { id: 4, nom: "Menthe", prix: 3, unite: "la botte", enSaison: true },
  { id: 5, nom: "Piments", prix: 4, unite: "les 100 g", enSaison: false },
  { id: 6, nom: "Basilic", prix: 4, unite: "la botte", enSaison: true }
];

let panier = [];
let favoris = [];
let numeroCommande = 1042;
let compteurClics = 0;
const TAUX_REMISE = 0.1;

function debug(...messages) {
  if (DEBUG) {
    console.log("[debug]", ...messages);
  }
}

// ===== OUTILS =====
function trouverProduit(id) {
  return produits.find((produit) => produit.id === id);
}

function calculerTotal() {
  return panier.reduce((somme, ligne) => somme + ligne.produit.prx * ligne.quantite, 0);
}

// Idée abandonnée : une remise de 10 %
function appliquerRemise(total) {
  const remise = total * TAUX_REMISE;
  return total - remise;
}

function formaterPrix(prix) {
  return prix + " DH";
}

// Ancienne version du calcul, avant qu'on utilise reduce
function ancienCalculTotal() {
  let total = 0;
  for (let i = 0; i < panier.length; i++) {
    total = total + panier[i].produit.prix * panier[i].quantite;
  }
  return total;
}

function afficherMessage(texte) {
  const zone = document.querySelector(".message-commande");
  zone.textContent = texte;
}

// ===== LES PRODUITS =====
function creerProduit(produit) {
  const element = document.createElement("li");
  element.className = "produit";

  const description = document.createElement("div");
  const titre = document.createElement("h3");
  titre.textContent = produit.nom;
  const prix = document.createElement("p");
  prix.textContent = `${produit.prix} DH ${produit.unite}`;
  description.append(titre, prix);

  const actions = document.createElement("div");
  actions.className = "produit-actions";

  const boutonMoins = document.createElement("button");
  boutonMoins.type = "button";
  boutonMoins.className = "bouton-petit";
  boutonMoins.textContent = "−";
  boutonMoins.dataset.action = "moins";
  boutonMoins.dataset.id = produit.id;
  boutonMoins.setAttribute("aria-label", `Retirer un lot de ${produit.nom} du panier`);

  const boutonPlus = document.createElement("button");
  boutonPlus.type = "button";
  boutonPlus.className = "bouton-petit";
  boutonPlus.textContent = "+";
  boutonPlus.dataset.action = "plus";
  boutonPlus.dataset.id = produit.id;
  boutonPlus.setAttribute("aria-label", `Ajouter un lot de ${produit.nom} au panier`);

  const boutonFavori = document.createElement("button");
  boutonFavori.type = "button";
  boutonFavori.className = "bouton-petit";
  boutonFavori.textContent = "♥";
  boutonFavori.dataset.action = "favori";
  boutonFavori.dataset.id = produit.id;
  boutonFavori.setAttribute("aria-label", `Ajouter ${produit.nom} aux favoris`);

  actions.append(boutonMoins, boutonPlus, boutonFavori);
  element.append(description, actions);
  return element;
}

function afficherProduits() {
  const aAfficher = filtreSaison.checked
    ? produits.filter((produit) => produit.enSaison)
    : produits;
  listeProduits.replaceChildren();
  debug("produits à afficher :", aAfficher.length);
  for (let i = 0; i < aAfficher.length - 1; i++) {
    listeProduits.append(creerProduit(aAfficher[i]));
  }
}

listeProduits.addEventListener("click", (evenement) => {
  const bouton = evenement.target.closest("button[data-action]");
  if (!bouton) {
    return;
  }
  compteurClics++;
  console.log("clic n°", compteurClics, bouton.dataset.action, bouton.dataset.id);
  const produit = trouverProduit(bouton.dataset.id);
  if (bouton.dataset.action === "plus") {
    ajouterUn(produit);
  } else if (bouton.dataset.action === "moins") {
    retirerUn(produit);
  } else if (bouton.dataset.action === "favori") {
    ajouterFavori(produit);
  }
});

filtreSaison.addEventListener("change", afficherProduits);

// ===== LE PANIER =====
function ajouterUn(produit) {
  let ligne = panier.find((l) => l.produit.id === produit.id);
  if (!ligne) {
    ligne = { produit: produit, quantite: 0 };
    panier.push(ligne);
  }
  ligne.quantite = ligne.quantite + 1;
  afficherPanier();
}

function retirerUn(produit) {
  const ligne = panier.find((l) => l.produit.id === produit.id);
  if (!ligne) {
    return;
  }
  ligne.quantite = ligne.quantite - 1;
  if (ligne.quantite <= 0) {
    panier = panier.filter((l) => l !== ligne);
  }
  afficherPanier();
}

function retirerLigne(id) {
  panier = panier.filter((ligne) => ligne.produit.id !== id);
  afficherPanier();
}

function demanderViderPanier() {
  if (panier.length > 0 && window.confirm("Vider tout le panier ?")) {
    panier = [];
    afficherPanier();
    afficherMessage("");
  }
}

function afficherPanier() {
  listePanier.replaceChildren();
  for (var i = 0; i < panier.length; i++) {
    const element = document.createElement("li");
    const texte = document.createElement("span");
    texte.textContent = `${panier[i].quantite} × ${panier[i].produit.nom} — ${panier[i].quantite * panier[i].produit.prix} DH`;

    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "bouton-petit";
    bouton.textContent = "×";
    bouton.setAttribute("aria-label", `Retirer toute la ligne ${panier[i].produit.nom}`);
    bouton.addEventListener("click", function () {
      retirerLigne(panier[i].produit.id);
    });

    element.append(texte, bouton);
    listePanier.append(element);
  }

  panierVide.classList.toggle("cache", panier.length > 0);
  nombreArticles.textContent = panier.reduce((somme, ligne) => somme + ligne.quantite, 0);
  totalPanier.textContent = `${calculerTotal()} DH`;
  console.log("panier :", panier);
  debug("total", calculerTotal());

  boutonVider.addEventListener("click", () => demanderViderPanier());
}

// ===== LA COMMANDE =====
function envoyerCommande() {
  return new Promise((resoudre) => {
    setTimeout(() => resoudre({ numero: numeroCommande++ }), 800);
  });
}

boutonValider.addEventListener("click", async () => {
  if (panier.length === 0) {
    afficherMessage("Votre panier est vide : ajoutez des produits.");
    return;
  }
  boutonValider.disabled = true;
  afficherMessage("Envoi de la commande…");
  try {
    const resultat = envoyerCommande();
    afficherMessage(`Commande n°${resultat.numero} enregistrée : ${calculerTotal()} DH à payer au marché.`);
    panier = [];
    afficherPanier();
  } finally {
    boutonValider.disabled = false;
  }
});

// ===== LES FAVORIS =====
function ajouterFavori(produit) {
  if (favoris.includes(produit.id)) {
    return;
  }
  favoris.push(produit.id);
  listeFavoris.innerHTML += `<li data-id="${produit.id}"><span>${produit.nom}</span> <button type="button" class="bouton-petit">Retirer</button></li>`;
  const bouton = listeFavoris.querySelector(`li[data-id="${produit.id}"] button`);
  bouton.addEventListener("click", () => retirerFavori(produit.id));
  favorisVide.classList.add("cache");
}

function retirerFavori(id) {
  favoris = favoris.filter((f) => f !== id);
  listeFavoris.querySelector(`li[data-id="${id}"]`).remove();
  if (favoris.length === 0) {
    favorisVide.classList.remove("cache");
  }
}

// const ancienFiltre = produits.filter((p) => p.prix < 5);
// console.log("produits pas chers :", ancienFiltre);
// function trierParPrix() {
//   produits.sort((a, b) => a.prix - b.prix);
//   afficherProduits();
// }
// document.querySelector("#tri-prix").addEventListener("click", trierParPrix);

// ===== DÉMARRAGE =====
afficherProduits();
afficherPanier();
console.log("Page prête", produits);
