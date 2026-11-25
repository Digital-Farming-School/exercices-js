# Exercice 04 — Créer des éléments à partir de données

**Niveau 1 · Graine** · ★★★☆ · Durée : 1 h · Notions : `createElement`, `append`, `remove`, `replaceChildren`, `<template>`, tableaux d'objets, `forEach` / `map` / `filter`, délégation d'événements, `closest`, `textContent` ou `innerHTML` (sécurité XSS)

> La banque de semences de la ferme-école veut un **catalogue en ligne**. Les informations existent (nom, saisons de semis, durée avant la récolte), mais la page HTML est **vide** : c'est à votre script de fabriquer les fiches. Plus besoin de recopier 8 fois le même bloc HTML : il suffit de modifier une donnée pour que la page se mette à jour. Votre mission : **générer les cartes depuis un tableau**, les **filtrer par saison**, en **ajouter** et en **retirer**.

## Objectifs

- Lire un **tableau d'objets** et le parcourir avec `forEach`.
- **Créer** des éléments (`createElement`), les remplir (`textContent`) et les **insérer** (`append`), puis les **retirer** (`remove`).
- Utiliser un **`<template>`** HTML comme moule pour fabriquer des cartes.
- **Filtrer** une liste avec `filter` + `includes`, transformer une liste avec `map`.
- **Déléguer** un événement : un seul écouteur sur le parent pour des éléments créés après coup.
- Comprendre pourquoi un texte saisi par un utilisateur ne passe **jamais** par `innerHTML`.

## Fichiers fournis

```
04-creer-elements/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← la feuille de style (complète)
├── js/
│   └── script.js      ← les données et les sélections sont fournies ; les TODO attendent votre code
└── images/
    ├── tomate.svg  carotte.svg  laitue.svg  courgette.svg
    └── radis.svg  haricot.svg  epinard.svg  petit-pois.svg  sachet.svg
```

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- que voit-on ? Un compteur « Le catalogue est vide », des boutons de filtre qui ne font rien, un formulaire. Cliquez sur « Été » : rien ne change.
- dans VS Code, ouvrez `index.html` : la liste `<ul id="catalogue">` est **vide**. Repérez aussi la balise `<template id="modele-carte">` : le navigateur ne l'affiche pas, il la garde comme **moule**.
- ouvrez `js/script.js` : le tableau `semences` contient 8 objets. Chaque objet a des **propriétés** (`nom`, `saisons`, `joursRecolte`…). `semences[0].nom` donne `"Tomate"`.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO`) :

1. **Explorer les données.** Affichez `console.table(semences);` (un tableau lisible dans la console), puis `semences.length`, puis `semences[0].nom` et `semences[0].saisons`. Que contient `saisons` ? (un **tableau** dans un objet)
2. **Créer un élément à la main.** Pour la **première** semence seulement :
   - `const carte = document.createElement("li");` crée un `<li>` qui n'est **pas encore dans la page** ;
   - `carte.classList.add("carte");`
   - créez un `<h3>`, mettez-y `semences[0].nom` avec `textContent`, puis `carte.append(titre);`
   - **enfin** `catalogue.append(carte);` : la carte apparaît. Regardez l'onglet Éléments.
3. **Une fonction et une boucle.** Remplacez l'étape 2 :
   - écrivez `function creerCarte(semence) { … return carte; }` qui construit la carte **et la renvoie** (avec, pour l'instant, le nom, les saisons et les jours) ;
   - affichez toutes les semences : `semences.forEach(function (semence) { catalogue.append(creerCarte(semence)); });`
4. **Un modèle `<template>`.** Construire chaque carte à la main devient long. Réécrivez `creerCarte(semence)` à partir du modèle :
   - `const copie = modeleCarte.content.cloneNode(true);` copie le modèle et tout son contenu ;
   - `const carte = copie.querySelector(".carte");` (on cherche **dans la copie**) ;
   - remplissez : `.carte__image` (`src` et `alt` = « Sachet de graines de … »), `.carte__nom`, `.carte__saisons`, `.carte__jours`, `.carte__description` ;
   - pour les saisons, `semence.saisons.map(function (saison) { return libellesSaisons[saison]; })` transforme `["printemps", "ete"]` en `["Printemps", "Été"]`, puis `.join(" · ")` ;
   - ajoutez `carte.dataset.id = semence.id;` : l'étape 8 en aura besoin.
5. **Filtrer par saison.**
   - Écrivez `filtrerSemences(saison)` : si `saison === "toutes"`, renvoyez tout le tableau ; sinon `semences.filter(function (semence) { return semence.saisons.includes(saison); })`.
   - Écrivez `afficherCatalogue()` qui : (1) récupère la liste filtrée d'après la variable `saisonActive` (`let saisonActive = "toutes";`), (2) **vide** le catalogue avec `catalogue.replaceChildren();`, (3) ajoute une carte par semence, (4) met à jour le compteur (« 5 variété(s) affichée(s) sur 8 »), (5) affiche `messageVide` quand la liste est vide (`messageVide.classList.toggle("cache", nombre > 0)`).
   - Appelez `afficherCatalogue();` une fois au chargement. Remplacez la boucle de l'étape 3.
6. **Les boutons de filtre (délégation).** Branchez **un seul** `click` sur `conteneurFiltres` (le parent des 5 boutons) :
   - `const bouton = evenement.target.closest("button");` (si `null`, `return` : on a cliqué à côté d'un bouton) ;
   - `saisonActive = bouton.dataset.saison;` puis `afficherCatalogue();`
   - mettez à jour `aria-pressed` : `"true"` pour le bouton choisi, `"false"` pour les autres ;
   - **test** : testez chaque saison. L'été doit donner 2 variétés ; l'hiver, 2 aussi (épinard, petit pois).
7. **Ajouter une semence.** Branchez un `submit` sur `formulaireAjout` :
   - `evenement.preventDefault();` ;
   - lisez les 3 champs (`#nom-semence`, `#saison-semence`, `#jours-semence`) avec `.value` ; convertissez les jours avec `Number(…)` ;
   - `semences.push({ id: Date.now(), nom: nom, saisons: [saison], joursRecolte: jours, image: "images/sachet.svg", description: "Semence ajoutée par un apprenant." });`
   - videz le formulaire (`reset()`) et réaffichez le catalogue avec le filtre « Toutes » (mettez le code des boutons de l'étape 6 dans une fonction `selectionnerSaison(saison)` pour la réutiliser).
8. **Retirer une semence.** Les cartes n'existent pas au chargement : impossible de brancher un écouteur sur leur bouton « Retirer » dès le début. C'est le rôle de la **délégation** : branchez **un seul** `click` sur `catalogue`.
   - `const bouton = evenement.target.closest(".bouton-retirer");` (si `null`, `return`) ;
   - retrouvez la carte : `bouton.closest(".carte")`, puis son identifiant `Number(carte.dataset.id)` ;
   - retirez la semence du **tableau** : `semences = semences.filter(function (semence) { return semence.id !== identifiant; });`
   - retirez la carte de la **page** : `carte.remove();` puis mettez à jour le compteur.
9. **Sécurité : texte ou HTML ?** Une **expérience** (à ne pas garder) :
   - dans le gestionnaire de l'étape 7, remplacez temporairement l'ajout par ``catalogue.insertAdjacentHTML("beforeend", `<li class="carte"><h3>${nom}</h3></li>`);`` (le texte entre accents graves est un gabarit, comme à l'exercice 01) ;
   - dans le champ « Nom de la semence », saisissez exactement : `<img src=x onerror="console.log('piraté !')">` puis ajoutez ;
   - ouvrez la console : le message « piraté ! » s'affiche : le navigateur a créé une vraie balise et **exécuté le code** de l'attribut. C'est une faille **XSS** : un visiteur malveillant pourrait voler des données ou défigurer la page.
   - **remettez** la version sûre (`textContent` via `creerCarte`) et recommencez : le nom est affiché comme du texte, aucun code ne s'exécute. Écrivez un commentaire qui explique la règle.
10. **Vérifiez** la console (aucune erreur), la navigation au clavier (`Tab` atteint les filtres, les boutons « Retirer » et le formulaire) et le compteur après chaque action.

### Mémo — créer et retirer des éléments

| Action | Code | À retenir |
|---|---|---|
| Créer | `const li = document.createElement("li");` | L'élément existe en mémoire mais **n'est pas dans la page**. |
| Remplir | `li.textContent = "…"` · `li.classList.add("carte")` | `textContent` : texte sûr. |
| Insérer | `parent.append(li)` | Ajoute **à la fin** du parent. `prepend` : au début. |
| Retirer | `element.remove()` | Retire l'élément de la page. |
| Vider | `parent.replaceChildren()` | Retire tous les enfants. |
| Modèle | `modele.content.cloneNode(true)` | Copie le `<template>` et tout son contenu. |
| Parcourir | `tableau.forEach(function (x) { … })` | Exécute une fonction pour chaque élément. |
| Transformer | `tableau.map(function (x) { return … })` | Renvoie un **nouveau tableau** de même taille. |
| Filtrer | `tableau.filter(function (x) { return … })` | Renvoie un **nouveau tableau** avec les éléments qui passent le test. |
| Chercher dans un tableau | `tableau.includes("ete")` | `true` ou `false`. |
| Déléguer | `parent.addEventListener("click", function (e) { const b = e.target.closest("button"); … })` | Un écouteur sur le parent, valable aussi pour les enfants créés plus tard. |
| Texte vs HTML | `textContent` ✔ · `innerHTML` ✘ | Jamais `innerHTML` avec un texte saisi par un utilisateur (faille XSS). |

## Critères de réussite

- [ ] Au chargement, les 8 cartes sont affichées (image, nom, saisons, jours, description) et le compteur indique « 8 variété(s) affichée(s) sur 8 ».
- [ ] Le HTML de `index.html` n'a pas changé : la liste est remplie par le script.
- [ ] Chaque filtre affiche les bonnes semences, le bouton actif a `aria-pressed="true"`, et le message « Aucune semence… » apparaît quand la liste est vide.
- [ ] Il n'y a qu'**un seul** écouteur pour les 5 boutons de filtre et **un seul** pour tous les boutons « Retirer ».
- [ ] Une semence ajoutée apparaît dans le catalogue et peut être retirée.
- [ ] Retirer une semence met à jour la liste, la page **et** le compteur.
- [ ] Les textes saisis par l'utilisateur sont écrits avec `textContent` ; l'expérience de l'étape 9 est retirée.
- [ ] Je sais expliquer la différence entre `forEach`, `map` et `filter`.
- [ ] La console ne montre aucune erreur.

## Indices

<details>
<summary>Indice 1 — Mes cartes ne s'affichent pas</summary>

Un élément créé avec `createElement` n'est **pas** dans la page tant qu'on ne l'a pas inséré (`append`). Vérifiez aussi que vous **appelez** `afficherCatalogue()` (la définir ne suffit pas) et regardez la console : une erreur dans `creerCarte` interrompt tout.

</details>

<details>
<summary>Indice 2 — « Cannot read properties of null » dans creerCarte</summary>

`copie.querySelector(".carte__nom")` renvoie `null` si le sélecteur ne correspond à rien dans le modèle (faute de frappe ? deux tirets bas `__` à respecter). Vérifiez aussi que vous lisez bien `modeleCarte.content` (le **contenu** du `<template>`) et pas `modeleCarte` lui-même.

</details>

<details>
<summary>Indice 3 — Toutes les cartes sont dupliquées à chaque clic sur un filtre</summary>

Vous ajoutez des cartes sans avoir **vidé** le catalogue. Au début de `afficherCatalogue`, écrivez `catalogue.replaceChildren();` (ou `catalogue.innerHTML = ""`, acceptable ici car aucune donnée utilisateur n'est insérée).

</details>

<details>
<summary>Indice 4 — « Retirer » ne fait rien, ou retire tout</summary>

Si rien ne se passe : l'écouteur a été branché sur les boutons **avant** qu'ils existent (ils sont créés après). Branchez-le sur le parent `catalogue`. Si tout disparaît : vous comparez les identifiants avec `===` entre un **nombre** (`semence.id`) et un **texte** (`carte.dataset.id`). Convertissez avec `Number(…)`.

</details>

<details>
<summary>Indice 5 — Le clic sur une icône du bouton ne marche pas</summary>

`evenement.target` est l'élément **réellement cliqué**, qui peut être un enfant du bouton (une icône, un `<span>`). `evenement.target.closest("button")` remonte jusqu'au bouton le plus proche : c'est pourquoi on l'utilise plutôt que `evenement.target` seul.

</details>

## Bonus

- Ajoutez une propriété `bio: true` à deux semences et un filtre « Bio uniquement » (`filter` avec `semence.bio`).
- Triez le catalogue par durée avant la récolte : `[...liste].sort(function (a, b) { return a.joursRecolte - b.joursRecolte; })`. Pourquoi copier le tableau avant de trier ?
- Ajoutez un champ de recherche : un événement `input` + `nom.toLowerCase().includes(texte.toLowerCase())`.
- Calculez et affichez dans la page la durée moyenne avant récolte du catalogue avec `reduce` (hors programme : cherchez sur MDN).

## Questions de compréhension

1. Quelle différence entre `forEach`, `map` et `filter` ? Lequel a été utilisé pour afficher les cartes, pour les libellés, pour le filtre ?
2. Pourquoi vide-t-on le catalogue avant de le remplir à nouveau ?
3. Qu'est-ce que la **délégation d'événements** ? Pourquoi est-elle indispensable pour le bouton « Retirer » ?
4. Quelle est la différence entre `textContent` et `innerHTML` ? Pourquoi ne faut-il jamais mettre un texte saisi par un utilisateur dans `innerHTML` ?
5. À quoi sert `<template>` ? Qu'est-ce qui le distingue d'un `<div class="cache">` ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande des **étapes de la mise en œuvre** avec images, vidéos et textes : plutôt que de dupliquer le même bloc HTML plusieurs fois, vous pouvez décrire vos étapes dans un tableau d'objets (titre, image, texte) et laisser le script fabriquer les sections du menu et des étapes. Votre code est alors plus **court**, plus **lisible** et plus facile à **expliquer** pendant la revue de code. Gardez cependant du **HTML statique** là où c'est possible : si JavaScript échoue, la page doit rester lisible.

## Ressources

- MDN : [`createElement`](https://developer.mozilla.org/fr/docs/Web/API/Document/createElement) · [`append`](https://developer.mozilla.org/fr/docs/Web/API/Element/append) · [`remove`](https://developer.mozilla.org/fr/docs/Web/API/Element/remove) · [`replaceChildren`](https://developer.mozilla.org/fr/docs/Web/API/Element/replaceChildren)
- MDN : [`<template>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template) · [`cloneNode`](https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode)
- MDN : [`Array.forEach`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) · [`map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map) · [`filter`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) · [`includes`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- MDN : [`closest`](https://developer.mozilla.org/fr/docs/Web/API/Element/closest) · [Délégation d'événements](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/Event_bubbling#délégation_dévénements) · [`innerHTML` et sécurité](https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML#considérations_de_sécurité) · [XSS](https://developer.mozilla.org/fr/docs/Web/Security/Attacks/XSS)

---

Exercice suivant : [05 — Menu et défilement](../../niveau-2-pousse/05-menu-defilement/README.md)
