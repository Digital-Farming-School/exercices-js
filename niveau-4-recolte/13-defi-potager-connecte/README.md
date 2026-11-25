# Exercice 13 — Défi : « Le potager connecté »

**Niveau 4 · Récolte** · ★★★★ · Durée : 3 h · Notions : toutes celles des exercices 01 à 12 — `querySelector`, `classList`, `dataset`, événements et délégation, `createElement` / `<template>`, `fetch` + `async` / `await`, `IntersectionObserver`, `scrollTo`, `matchMedia`, `localStorage`, `<dialog>`, Constraint Validation API, `aria-*`, débogage

> La ferme-école a un beau potager… et un site qui ne bouge pas. Le designer a livré le **HTML et le CSS** : tout est en place, la page est jolie, mais **rien ne fonctionne** : le menu mobile reste fermé, les fiches des plantes sont vides, les filtres ne filtrent rien, le formulaire accepte n'importe quoi. Votre mission : écrire **le JavaScript** qui donne vie au site, en respectant un cahier des charges de 10 « user stories ». Seule la page est fournie : la logique, c'est vous.

Ce défi est une **répétition générale de la partie JavaScript du brief Plant Digital Nursery** : même démarche (cahier des charges → script commenté et organisé → tests → documentation), sur un autre sujet. Le brief exige la « **manipulation du DOM avec JS** » et une page « interactive » : ici, vous le faites sur un site complet de deux pages.

## Prérequis

- Avoir fait les **exercices 01 à 12** de cette série (au minimum le parcours prioritaire indiqué par votre coach).
- **Live Server obligatoire.** Le site charge ses données avec `fetch` : cela ne marche **pas** si vous double-cliquez sur `index.html` (adresse `file://…`). Clic droit sur `index.html` → *Open with Live Server* : l'adresse doit commencer par `http://127.0.0.1:…`.
- Un navigateur à jour (Chrome, Edge ou Firefox) avec les outils de développement (`F12`) ouverts **en permanence**, onglet *Console*.

## Objectifs

- Passer d'un **cahier des charges** (user stories) à un script complet, découpé en petites fonctions.
- Réutiliser **seul** toutes les notions de la série : sélection et modification du DOM, événements, création d'éléments à partir de données, `fetch`, observateurs, BOM, stockage local, formulaires.
- Garder le code **propre** : une seule source de vérité (l'objet `etat`), des fonctions courtes, une console sans erreur.
- Penser à **tous** les visiteurs : clavier, lecteurs d'écran (`aria-*`), réglage « réduire les animations ».
- Tester le site de bout en bout, le déboguer et le documenter.

## Fichiers fournis

```
13-defi-potager-connecte/
├── README.md              ← cette consigne (à renommer en CONSIGNE.md)
├── index.html             ← page d'accueil, COMPLÈTE : vous ne la modifiez pas
├── pages/
│   └── contact.html       ← page contact avec formulaire, COMPLÈTE
├── css/
│   └── style.css          ← feuille de style COMPLÈTE (lisez son en-tête : liste des classes à poser)
├── js/
│   └── script.js          ← LE SEUL FICHIER À COMPLÉTER : des fonctions vides et des TODO numérotés
├── data/
│   └── potager.json       ← les 12 plantes (nom, famille, saisons, exposition, arrosage, jours, image, alt…)
├── images/
│   ├── logo.svg  potager.svg
│   └── tomate.svg  piment.svg  aubergine.svg  carotte.svg  laitue.svg  courgette.svg
│       haricot-vert.svg  gombo.svg  oignon.svg  chou.svg  concombre.svg  radis.svg
└── captures/              ← le rendu attendu (ordinateur, téléphone, mode sombre, formulaire en erreur)
```

Regardez d'abord les quatre captures du dossier `captures/` : c'est le site terminé. Puis ouvrez `index.html` avec Live Server : vous voyez la même page, mais figée (« Chargement des fiches… » ne finit jamais).

> **Règle** : vous ne modifiez **ni** `index.html`, **ni** `contact.html`, **ni** `style.css` (sauf pour un bonus, signalé). Tout se règle depuis `js/script.js` : le HTML contient déjà tous les `id`, les `aria-*`, le `<template>` d'une fiche et le `<dialog>`, et le CSS contient déjà toutes les classes à ajouter. Les commentaires `US…` dans le HTML indiquent où chaque user story agit.

## Cahier des charges

### Les 10 user stories

Chaque story porte le numéro de ses `TODO` dans `js/script.js` (les sous-étapes s'appellent 1a, 1b…). Les « critères d'acceptation » sont ce que le coach vérifiera à la démonstration.

| N° | En tant que visiteur, je veux… | Critères d'acceptation |
|---|---|---|
| **US1** | **Un menu qui me situe, et qui s'adapte au téléphone** | Sur téléphone, le bouton burger ouvre et ferme le menu ; `aria-expanded` vaut toujours `"true"` ou `"false"` selon l'état ; un clic sur un lien ou la touche **Échap** referme le menu (et Échap rend le focus au burger). Sur la page d'accueil, le lien de la section affichée à l'écran porte la classe `actif` et `aria-current="location"` — y compris **Conseils** quand la page est tout en bas. |
| **US2** | **Voir les fiches des plantes, chargées depuis `data/potager.json`** | 12 fiches sont créées à partir du `<template>` (sans `innerHTML`) ; pendant le chargement, le message « Chargement… » est visible ; si le fichier est introuvable (testez avec une mauvaise adresse), un message d'erreur et un bouton **Réessayer** apparaissent ; le bouton relance le chargement. |
| **US3** | **Chercher, filtrer par saison, trier** | La recherche agit **en direct**, sans tenir compte des accents ni des majuscules (« solanacees » trouve 3 plantes) ; le filtre de saison, le tri (nom, récolte la plus rapide, la plus longue) et la case « Favoris seulement » se combinent ; le compteur annonce « 3 plantes sur 12 » (singulier correct) ; « Aucune plante… » s'affiche quand rien ne correspond ; **Réinitialiser** remet tout à zéro. |
| **US4** | **Des apparitions et des animations agréables** | Les fiches (au premier affichage) et les trois conseils apparaissent en douceur quand on arrive dessus en défilant (classes `a-reveler` puis `revele`) ; le cœur « bat » quand on ajoute un favori (classe `battement` posée par le script, retirée à la fin de l'animation) ; **rien ne bouge** si l'utilisateur a demandé « réduire les animations ». |
| **US5** | **Agrandir une image dans une visionneuse** | Un clic (ou **Entrée** au clavier) sur l'image ouvre le `<dialog>` avec la bonne plante ; boutons précédent / suivant et flèches ← → du clavier (navigation circulaire) ; fermeture par le bouton ×, par **Échap** ou par un clic sur le fond sombre ; à la fermeture, le **focus revient** sur l'image qui avait ouvert la visionneuse. |
| **US6** | **Mettre des plantes en favoris, et les retrouver** | Un clic sur le cœur ajoute ou retire la plante ; `aria-pressed` et `aria-label` suivent (« Ajouter aux favoris : Tomate » / « Retirer des favoris : Tomate ») ; le compteur de l'en-tête est à jour (sur **les deux pages**) ; les favoris sont **encore là** après rechargement de la page. |
| **US7** | **Choisir le mode sombre, et le retrouver** | Le bouton lune/soleil bascule `data-theme` sur `<html>` ; `aria-pressed` est à jour ; le choix est mémorisé ; à la première visite (rien en mémoire), le thème suit la préférence du système (`prefers-color-scheme`). |
| **US8** | **Voir ma progression de lecture et la reprendre** | Une barre en haut de page se remplit de 0 à 100 % pendant le défilement ; le pourcentage est mémorisé (sans écrire dans le stockage à chaque pixel) ; au rechargement, si l'on avait lu au moins 10 %, un message propose **Reprendre la lecture** (qui défile jusqu'au bon endroit) ou le ferme. |
| **US9** | **Un formulaire de contact qui m'aide à le remplir** | Pas de bulle du navigateur : vos messages en français, sous chaque champ (`aria-invalid` posé sur le champ en erreur) ; chaque champ est vérifié quand on le quitte, et l'erreur disparaît dès qu'il est corrigé ; le compteur « 34 / 500 caractères » suit la saisie ; à l'envoi, un **résumé des erreurs** (avec un lien vers chaque champ) reçoit le focus ; formulaire valide → message de confirmation, formulaire vidé. |
| **US10** | **Remonter en haut de la page** | Le bouton « ↑ » n'apparaît qu'après 600 px de défilement (classe `visible`) ; il remonte en douceur (sans animation si « réduire les animations ») ; le focus clavier n'est pas perdu (il passe au logo). |

### Exigences transversales

| N° | Exigence |
|----|----------|
| E1 | **Console propre** : aucune erreur, aucun avertissement, aucun `console.log` oublié (supprimez celui du début du fichier). |
| E2 | **Aucune bibliothèque**, aucun lien externe, aucun attribut `onclick="…"` : tous les écouteurs sont dans `script.js` avec `addEventListener`. |
| E3 | **Pas d'`innerHTML` avec des données** (`textContent`, `createElement`, `<template>`) : une description contenant `<img onerror=…>` ne doit rien exécuter. |
| E4 | **Code organisé** : bannières `// ===== SECTION =====` conservées, une fonction = une tâche, noms en français explicites, indentation de 2 espaces, `const` / `let` (jamais `var`), point-virgule partout, commentaires qui expliquent le **pourquoi**. |
| E5 | **Accessibilité** : tout se fait au clavier ; le focus n'est jamais perdu ; les changements d'état sont portés par des attributs `aria-*` (pas seulement par la couleur). |
| E6 | **Robustesse** : le site fonctionne si le `localStorage` est vide ou illisible (essayez `localStorage.setItem("potager-favoris", "n'importe quoi")` dans la console, puis rechargez). |

## Étapes conseillées

Le fichier de départ est volontairement rangé dans **l'ordre de la page**, pas dans l'ordre du travail. Voici l'ordre conseillé (≈ 2 h 50, le reste est une marge pour déboguer).

1. **Préparation (10 min)** — Renommez cette consigne en `CONSIGNE.md`. Ouvrez les captures, puis le site avec Live Server et la console. Lisez l'en-tête de `style.css` et le haut de `script.js` (`etat`, outils fournis). Dans `index.html`, repérez les commentaires `US…`.
2. **Stockage et chargement (25 min)** — `TODO 6a` (`lireStockage`, `ecrireStockage`), puis `TODO 2` : `afficherEtat`, `chargerPlantes`, `creerFiche`. Avec un `mettreAJourListe` minimal (`TODO 3c`), les 12 fiches apparaissent.
3. **Recherche, filtre, tri (15 min)** — `TODO 3`. Testez chaque combinaison, y compris « aucun résultat ».
4. **Favoris et visionneuse (25 min)** — `TODO 6b` à `6g`, puis `TODO 5` : un seul écouteur sur la liste gère les cœurs **et** les agrandissements.
5. **Menu (15 min)** — `TODO 1`. Testez en mode appareil (`Ctrl + Maj + M`, 375 px), puis au clavier.
6. **Apparitions, animation, retour en haut (15 min)** — `TODO 4` et `TODO 10`.
7. **Thème et progression de lecture (20 min)** — `TODO 7` et `TODO 8`. Pour tester la reprise : défilez à mi-page, rechargez, regardez le message.
8. **Formulaire (25 min)** — `TODO 9`. Testez les 5 champs en erreur, puis un envoi réussi.
9. **Tests et documentation (20 min)** — grille de test, console propre, `README.md` de votre projet (voir plus bas).

### Mémo — les outils du défi

| Besoin | Outil | Exemple |
|---|---|---|
| Cloner une fiche | `<template>` + `cloneNode` | `modele.content.firstElementChild.cloneNode(true)` |
| Remplacer tout le contenu d'un parent | `replaceChildren` | `liste.replaceChildren(...fiches)` |
| Lire un fichier JSON | `fetch` + `await` + `.ok` | `const r = await fetch(url); if (!r.ok) throw new Error(r.status);` |
| Un écouteur pour des éléments recréés | délégation | `liste.addEventListener("click", e => e.target.closest(".favori"))` |
| Savoir qu'un élément est à l'écran | `IntersectionObserver` | `new IntersectionObserver(callback, { threshold: 0.15 })` |
| Mémoriser un tableau | `localStorage` + JSON | `localStorage.setItem(cle, JSON.stringify([...monSet]))` |
| Déclencher une animation CSS | `classList` + `animationend` | `el.addEventListener("animationend", retirer, { once: true })` |
| Valider un champ | Constraint Validation | `champ.checkValidity()`, `champ.validity.valueMissing` |
| Modale native | `<dialog>` | `dialogue.showModal()` / `dialogue.close()` / événement `close` |
| Respecter l'utilisateur | `matchMedia` | `window.matchMedia("(prefers-reduced-motion: reduce)").matches` |

## Grille de test

Cochez quand le comportement est correct. Tout doit marcher **à la souris et au clavier**, avec la console ouverte.

| Test | Ordinateur | Téléphone 375 px |
|---|---|---|
| Menu : lien actif selon la section (accueil, plantes, conseils, y compris tout en bas) | ☐ | — |
| Burger : ouvrir, fermer (clic, Échap, clic sur un lien), `aria-expanded` | — | ☐ |
| 12 fiches affichées ; message d'erreur et **Réessayer** si on casse l'adresse du JSON | ☐ | ☐ |
| Recherche « solanacees » → 3 plantes ; « zzz » → message ; Réinitialiser | ☐ | ☐ |
| Filtre « hiver » → Laitue et Oignon ; tri « récolte la plus rapide » → Radis en premier | ☐ | ☐ |
| Favoris : ajouter, retirer, compteur, rechargement, case « Favoris seulement » | ☐ | ☐ |
| Visionneuse : ouvrir au clavier, ← →, Échap, fond, focus rendu | ☐ | ☐ |
| Mode sombre : bascule, mémorisation, première visite avec système en mode sombre | ☐ | ☐ |
| Barre de lecture, mémorisation, **Reprendre la lecture** | ☐ | ☐ |
| Retour en haut : apparition après 600 px, remontée, focus | ☐ | ☐ |
| Formulaire : 5 erreurs, corrections une par une, envoi valide | ☐ | ☐ |
| « Réduire les animations » émulé (F12 → `Ctrl + Maj + P` → *Emulate CSS prefers-reduced-motion*) : plus rien ne bouge, tout fonctionne | ☐ | — |
| Aucun défilement horizontal | ☐ | ☐ |
| `localStorage` corrompu (voir E6) : le site fonctionne | ☐ | ☐ |

Et aussi :

- [ ] Console : **0 erreur, 0 avertissement, 0 `console.log`** après un parcours complet des deux pages.
- [ ] Onglet *Réseau* : aucune requête en erreur (404).
- [ ] `node --check js/script.js` (si Node.js est installé) ou l'extension ESLint de VS Code : aucune erreur de syntaxe.
- [ ] Lighthouse, catégorie *Accessibilité*, sur l'accueil : score ≥ 90.

## Grille d'auto-évaluation (/20)

| Critère | Points | Mon score |
|---|---|---|
| **US1 Menu** — burger et `aria-expanded` (1), lien actif selon la section (1) | 2 | |
| **US2 Chargement** — fiches créées depuis le JSON avec le `<template>` (1), états chargement et erreur + Réessayer (1) | 2 | |
| **US3 Recherche, filtre, tri** — recherche et filtre qui se combinent (1), tri, compteur, « aucun résultat » et réinitialisation (1) | 2 | |
| **US4 Animations** — apparition au défilement et animation du cœur | 1 | |
| **US5 Visionneuse** — ouverture, navigation, fermetures (1), clavier et retour du focus (1) | 2 | |
| **US6 Favoris** — bascule, `aria-*`, mémorisation | 1 | |
| **US7 Mode sombre** — bascule, mémorisation, préférence du système | 1 | |
| **US8 Progression** — barre, mémorisation limitée, reprise | 1 | |
| **US9 Formulaire** — messages et `aria-invalid` (1), résumé, confirmation et compteur (1) | 2 | |
| **US10 Retour en haut** | 1 | |
| **Qualité du code** — structure en fonctions et en sections, noms, commentaires, un `etat` central, pas d'`innerHTML` avec des données (E3, E4) | 2 | |
| **Accessibilité et robustesse** — console propre, clavier, `prefers-reduced-motion`, `localStorage` illisible (E1, E5, E6) | 2 | |
| **Documentation** — partie « Choix JavaScript » complète | 1 | |
| **Total** | **20** | |

## Documentation : le `README.md` de votre projet

Créez un `README.md` (après avoir renommé cette consigne) avec ces titres. La partie « Choix JavaScript » est la plus importante : c'est ce que vous expliquerez à l'oral.

```markdown
# Le potager connecté

## Description
(2 ou 3 phrases : à quoi sert le site, pour qui)

## Arborescence
(l'arbre des fichiers, avec une ligne d'explication par fichier)

## Fonctionnalités
(une ligne par user story : ce que fait le visiteur, et dans quelle fonction cela se passe)

## Choix JavaScript
- Organisation du script : (sections, rôle des fonctions init…, pourquoi un seul fichier pour deux pages)
- État de l'application : (que contient l'objet etat, pourquoi tout y passe)
- Événements : (où avez-vous utilisé la délégation, et pourquoi)
- Données : (fetch, gestion des erreurs, textContent plutôt qu'innerHTML)
- Stockage : (quelles clés du localStorage, quel format, que se passe-t-il si c'est vide ou corrompu)
- Animations : (ce que fait le CSS, ce que fait le JS, comment est géré prefers-reduced-motion)
- Accessibilité : (aria-expanded, aria-pressed, aria-invalid, gestion du focus…)
- Performances : (ce que vous avez limité : écritures dans le stockage, calculs au défilement…)

## Tests réalisés
(la grille de test, console, Lighthouse)

## Difficultés rencontrées et solutions
(au moins 3 : le symptôme, la cause, la correction)

## Crédits
```

## Indices

<details>
<summary>Indice 1 — « Chargement… » ne finit jamais, ou la console affiche une erreur <code>fetch</code></summary>

Regardez l'adresse dans la barre : si elle commence par `file://`, `fetch` est bloqué par le navigateur. Utilisez Live Server (`http://127.0.0.1:…`). Sinon, ouvrez l'onglet **Réseau** de `F12` : la ligne `potager.json` est-elle en 404 ? Le chemin `data/potager.json` part de la page qui contient le script, donc de `index.html`. Souvenez-vous aussi que `fetch` **ne rejette pas** sur un 404 : c'est à vous de tester `reponse.ok`.

</details>

<details>
<summary>Indice 2 — Les cœurs et les images ne réagissent plus après un filtre</summary>

À chaque filtre, vous **recréez** les fiches : les écouteurs posés sur les anciens éléments disparaissent avec eux. Posez **un seul** écouteur sur `#liste-plantes`, qui n'est jamais recréé, et retrouvez le bon bouton avec `evenement.target.closest(".favori")`. C'est la délégation d'événements (exercice 07).

</details>

<details>
<summary>Indice 3 — <code>aria-expanded</code> ne se met pas à jour correctement</summary>

`classList.toggle("ouvert")` renvoie un **booléen** (`true` si la classe vient d'être ajoutée). Servez-vous de ce résultat plutôt que de relire le DOM, et convertissez-le en chaîne : `setAttribute("aria-expanded", String(ouvert))`. Les attributs HTML contiennent toujours des chaînes de caractères.

</details>

<details>
<summary>Indice 4 — Le lien « Conseils » n'est jamais actif</summary>

Votre détection regarde une fine bande au milieu de l'écran. Quand la page est tout en bas, la section Conseils (courte) se trouve plus bas que cette bande : elle n'y entre jamais. Détectez le **bas de page** (`window.innerHeight + window.scrollY` comparé à `document.documentElement.scrollHeight`) et activez alors la dernière section. Attention : l'observateur ne signale que les **changements** ; si vous gardez en mémoire les sections qui sont dans la bande, vous pouvez recalculer à chaque défilement.

</details>

<details>
<summary>Indice 5 — Après rechargement, les favoris sont perdus ou le script plante</summary>

Un `Set` ne se convertit pas en JSON : `JSON.stringify(new Set(["a"]))` donne `{}`. Enregistrez `[...etat.favoris]` (un tableau) et, au chargement, refabriquez le `Set` avec `new Set(tableau)`. Si le contenu du stockage n'est pas du JSON valide, `JSON.parse` lance une erreur : c'est le rôle du `try / catch` de `lireStockage` (exigence E6). Vérifiez dans `F12` → *Application* → *Stockage local*.

</details>

<details>
<summary>Indice 6 — Le cœur ne bat qu'une seule fois</summary>

Une animation CSS ne démarre que lorsque la classe **apparaît**. Si vous ne la retirez jamais, elle ne peut plus apparaître. Retirez-la à la fin avec l'événement `animationend` (option `{ once: true }` pour que l'écouteur disparaisse tout seul). Et si l'utilisateur a demandé moins d'animations, le CSS les coupe déjà.

</details>

<details>
<summary>Indice 7 — Après la fermeture de la visionneuse, le focus est perdu</summary>

Échap ferme le `<dialog>` **sans passer par votre code** : vous ne pouvez donc pas rendre le focus dans le gestionnaire du bouton ×. Écoutez l'événement `close` du dialogue, qui se produit quelle que soit la cause de la fermeture, et appelez `focus()` sur le bouton mémorisé dans `etat.declencheur`.

</details>

<details>
<summary>Indice 8 — Le message « Reprendre la lecture » propose un mauvais pourcentage, ou jamais</summary>

Au démarrage du script, la page est courte : les fiches ne sont pas encore chargées. Un pourcentage calculé à ce moment-là n'a aucun sens. La fonction `proposerReprise` doit être appelée **une fois les fiches affichées** (c'est déjà fait dans `initPlantes`, mais elle doit lire la bonne clé, avec la bonne valeur par défaut).

</details>

<details>
<summary>Indice 9 — Mon formulaire affiche les bulles du navigateur (ou n'affiche rien)</summary>

Le HTML contient déjà `novalidate` : le navigateur n'affiche aucune bulle, mais **la validation existe toujours** : `champ.checkValidity()` et `champ.validity` fonctionnent. C'est à vous d'afficher les messages. Pour un champ vide obligatoire : `validity.valueMissing` ; pour un e-mail mal formé : `validity.typeMismatch` ; pour un texte trop court : `validity.tooShort`. N'oubliez pas `evenement.preventDefault()` dans le gestionnaire de `submit`.

</details>

## Bonus

- **Les filtres dans l'adresse** : à chaque changement, écrivez-les dans l'URL avec `history.replaceState` et `URLSearchParams` (`?saison=hiver&tri=jours-asc`), et relisez-les au chargement pour qu'un lien partage une recherche (exercice 09).
- **Anti-clignotement du thème** : le thème sombre ne s'applique qu'après le chargement du script. Comment éviter un éclair blanc ? (Piste : un tout petit script dans le `<head>`, **sans `defer`** — c'est un des rares cas où c'est justifié ; vous devrez modifier `index.html`.)
- **Recherche retardée** : n'actualisez la liste que 250 ms après la dernière frappe (`setTimeout` / `clearTimeout`, technique du *debounce*).
- **Notification** : après l'envoi du formulaire, affichez un message qui disparaît tout seul au bout de 6 s.
- **Minification et ESLint** : minifiez `script.js`, comparez les poids, et installez ESLint (`npx eslint js/script.js`) pour traquer les variables inutilisées.
- **GitHub Pages** : publiez le site et testez-le sur un **vrai téléphone** (le `fetch` fonctionne : c'est du `https://`).
- **Oral** : préparez 3 minutes sur **un** choix JavaScript de votre code (par exemple : « comment fonctionne ma visionneuse au clavier »). C'est un entraînement à la soutenance du brief.

## Questions de compréhension

1. Pourquoi un seul objet `etat` plutôt que de relire le DOM pour savoir quels filtres sont actifs ?
2. Pourquoi la délégation d'événements est-elle indispensable pour les boutons des fiches ?
3. Pourquoi `textContent` et pas `innerHTML` pour afficher les données du JSON ? Que se passerait-il avec une description piégée ?
4. `fetch` renvoie une réponse 404 : y a-t-il une erreur à attraper ? Qu'est-ce qui change avec `reponse.ok` ?
5. Pourquoi faut-il convertir le `Set` en tableau avant de l'enregistrer ? Que fait le `try / catch` de `lireStockage` ?
6. Pourquoi n'écrit-on pas dans le `localStorage` à chaque événement `scroll` ? Quel est le rôle de `requestAnimationFrame` dans `surDefilement` ?
7. Pourquoi `aria-pressed`, `aria-expanded` et `aria-invalid` ? Que perdrait un utilisateur de lecteur d'écran si on ne changeait que la couleur ?
8. Que fait `window.matchMedia("(prefers-reduced-motion: reduce)")` et pourquoi le CSS **et** le JavaScript doivent-ils le respecter ?

## Lien avec le brief Plant Digital Nursery

Tout y est : la **manipulation du DOM avec JS** (création de contenu à partir de données, classes, attributs), une page **interactive** (menu qui s'adapte et qui indique où l'on est, filtres, visionneuse d'images), des **animations** CSS pilotées proprement par le JavaScript, un **menu** et un **retour en haut** de page, une interface agréable sur **téléphone**, un **code commenté et organisé** avec des noms cohérents (« convention d'appellation » du brief), et une **documentation technique** avec des choix justifiés. Pour le brief, vous n'aurez pas besoin de tout : choisissez ce qui sert votre page (menu actif, apparition des étapes, visionneuse d'images, retour au menu…), et soyez capable de l'expliquer ligne à ligne pendant la **revue du code source** et le **Q/R technique** de la soutenance.

## Ressources

- MDN : [Introduction au DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction) · [`classList`](https://developer.mozilla.org/fr/docs/Web/API/Element/classList) · [`dataset`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset) · [`<template>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template)
- MDN : [Délégation d'événements](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/Event_bubbling#délégation_dévénements) · [`Element.closest`](https://developer.mozilla.org/fr/docs/Web/API/Element/closest)
- MDN : [`fetch`](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch) · [`async` / `await`](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Async_JS/Introducing) · [`localStorage`](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)
- MDN : [`IntersectionObserver`](https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API) · [`window.scrollTo`](https://developer.mozilla.org/fr/docs/Web/API/Window/scrollTo) · [`matchMedia`](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia)
- MDN : [`<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) · [Validation des formulaires](https://developer.mozilla.org/fr/docs/Learn_web_development/Extensions/Forms/Form_validation) · [`ValidityState`](https://developer.mozilla.org/fr/docs/Web/API/ValidityState)
- MDN : [`aria-expanded`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded) · [`aria-pressed`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed) · [`aria-invalid`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid)
- [Mode appareil et outils de développement de Chrome](https://developer.chrome.com/docs/devtools/)

---

Bravo, vous avez terminé la série ! Retour au [sommaire des exercices](../../README.md).
