# Sprint 1 — Exercices JavaScript (DOM + BOM)

Bienvenue ! Votre page est **structurée** (HTML) et **habillée** (CSS). Place à la **vie** : réagir aux clics, modifier la page, la faire défiler et s'animer, mémoriser des choix, lire des données. Ces **13 exercices** vous accompagnent en parallèle du brief **Plant Digital Nursery** (24 novembre → 4 décembre). Ils sont classés en **4 niveaux**, comme une plante qui pousse : commencez par le niveau 1 et avancez à votre rythme.

> **Prérequis** : les séries HTML et CSS du brief 1 (au minimum : balises sémantiques, `id` / `class`, feuille de style externe, Flexbox). Le JavaScript agit sur du HTML : si la structure est mauvaise, le script devient vite un casse-tête.

| Niveau | Difficulté | Exercices | À la fin, vous saurez… |
|---|---|---|---|
| **1 · Graine** | ★☆☆☆ | 01 → 04 | lier un script, sélectionner et modifier des éléments, réagir aux événements, créer des éléments à partir de données |
| **2 · Pousse** | ★★☆☆ | 05 → 08 | faire un menu qui suit le défilement, déclencher des animations CSS, écrire une galerie avec visionneuse, piloter une vidéo |
| **3 · Arbre** | ★★★☆ | 09 → 12 | utiliser le navigateur (BOM), valider un formulaire et mémoriser des données, charger un fichier JSON, déboguer |
| **4 · Récolte** | ★★★★ | 13 | donner vie à un site complet à partir d'un cahier des charges |

## Liste des exercices

### Niveau 1 · Graine — les bases

| N° | Exercice | Durée | Notions |
|---|---|---|---|
| 01 | [Mon premier script](niveau-1-graine/01-premier-script/README.md) | 30 min | `<script defer>`, console, `const` / `let`, types, gabarits de texte, `Date`, fonctions, erreurs courantes |
| 02 | [Sélectionner et modifier la page](niveau-1-graine/02-selectionner-modifier/README.md) | 45 min | DOM, `querySelector(All)`, `textContent`, `classList`, `setAttribute`, `dataset`, `closest` |
| 03 | [Réagir aux actions de l'utilisateur](niveau-1-graine/03-evenements/README.md) | 45 min | `addEventListener`, `click` / `input` / `keydown`, `event.target`, `preventDefault`, `aria-expanded` |
| 04 | [Créer des éléments à partir de données](niveau-1-graine/04-creer-elements/README.md) | 1 h | `createElement`, `<template>`, tableaux d'objets, `forEach` / `map` / `filter`, délégation, XSS |

### Niveau 2 · Pousse — interactivité et animations

| N° | Exercice | Durée | Notions |
|---|---|---|---|
| 05 | [Un menu qui suit le défilement](niveau-2-pousse/05-menu-defilement/README.md) | 1 h | `scrollY`, `scroll`, `scrollTo`, `getBoundingClientRect`, menu actif, bouton burger, `resize` |
| 06 | [Des animations déclenchées par le défilement](niveau-2-pousse/06-animations-scroll/README.md) | 1 h | `transition`, `@keyframes`, `IntersectionObserver`, `animationend`, `matchMedia`, `prefers-reduced-motion` |
| 07 | [Une galerie photo avec visionneuse](niveau-2-pousse/07-galerie-lightbox/README.md) | 1 h | délégation, `dataset`, `<dialog>`, clavier, focus, filtre par catégorie |
| 08 | [Une capsule vidéo avec ses propres commandes](niveau-2-pousse/08-capsule-video/README.md) | 1 h | `<video>`, `play()` / `pause()`, `currentTime`, `timeupdate`, chapitres, sous-titres |

### Niveau 3 · Arbre — navigateur, données, débogage

| N° | Exercice | Durée | Notions |
|---|---|---|---|
| 09 | [Le navigateur sait tout : le BOM](niveau-3-arbre/09-bom-navigateur/README.md) | 1 h | `window`, `screen`, `navigator`, `location`, `URLSearchParams`, `history`, minuteurs |
| 10 | [Le carnet du jardin : formulaires et stockage](niveau-3-arbre/10-carnet-stockage/README.md) | 1 h 15 | `submit`, `FormData`, validation, `localStorage`, JSON, `try … catch` |
| 11 | [Des fiches qui viennent d'un fichier : JSON et fetch](niveau-3-arbre/11-donnees-fetch/README.md) | 1 h | `fetch`, `async` / `await`, gestion d'erreur, recherche, tri, Live Server |
| 12 | [Chasse aux bugs JavaScript et régime minceur](niveau-3-arbre/12-debogage-js/README.md) | 1 h | console, points d'arrêt, `debugger`, onglet Réseau, nettoyage du code |

### Niveau 4 · Récolte — le défi

| N° | Exercice | Durée | Notions |
|---|---|---|---|
| 13 | [Défi : « Le potager connecté »](niveau-4-recolte/13-defi-potager-connecte/README.md) | 3 h | tout ! cahier des charges → JavaScript → tests → documentation |

## Comment travailler

1. **Ouvrez le dossier de l'exercice** dans VS Code (*Fichier → Ouvrir le dossier…*).
2. **Lisez tout le `README.md`** avant d'écrire la moindre ligne de code.
3. **Ouvrez la page avec Live Server** (clic droit sur `index.html` → *Open with Live Server*). Certains exercices (11, 13) ne marchent **pas** en ouvrant le fichier directement : `fetch` exige `http://`.
4. **Gardez la console ouverte** (`F12` → onglet *Console*). Une erreur rouge vous dit le fichier, la ligne et la nature du problème : **lisez-la avant de chercher ailleurs**. Pour comprendre un comportement, `console.log(...)` est votre meilleur ami.
5. **Faites les étapes dans l'ordre** : les commentaires `// TODO n` de `js/script.js` correspondent aux étapes de la consigne. Testez après **chaque** étape (`Ctrl + S`, puis rechargez).
6. **Cochez les critères de réussite** un par un.
7. **Bloqué ?** Dans l'ordre : relisez l'erreur de la console → relisez la consigne → ouvrez un indice (cliquez dessus pour le déplier) → demandez à votre binôme → appelez le coach.

## Règles du jeu

- **Tapez le code vous-même.** Pas de copier-coller depuis Internet ou une IA : c'est en tapant (et en se trompant) qu'on retient. Le brief évalue votre **explication du code source** à l'oral.
- **Pas de bibliothèque ni de framework** (jQuery, React, GSAP…) : le brief demande de manipuler le DOM **avec JavaScript pur**.
- **Un script externe**, rangé dans `js/script.js` et chargé avec `<script src="js/script.js" defer></script>` dans le `<head>`. Pas de `onclick="…"` dans le HTML : on utilise `addEventListener`.
- **`const` par défaut, `let` si la valeur change, jamais `var`.** Indentation de 2 espaces, points-virgules, une instruction par ligne.
- **Commentez et rangez votre code** : une bannière `// ===== SECTION =====` par partie, des fonctions courtes avec un nom qui dit ce qu'elles font. Identifiants en français et en `camelCase` (`boutonMenu`, `afficherFiche`), comme les classes CSS.
- **Préférez les classes aux styles** : `element.classList.toggle('actif')` plutôt que `element.style.color = …`. Le JavaScript décide **quand**, le CSS décide **comment**.
- **`textContent` plutôt que `innerHTML`** pour tout texte qui ne vient pas de vous (faille XSS, voir exercices 04 et 10).
- **Pensez à tout le monde** : tout ce qui se fait à la souris doit se faire au clavier ; mettez à jour les attributs `aria-*` ; respectez « réduire les animations ».
- **Console propre** : avant de rendre un travail, plus aucune erreur ni `console.log` oublié.
- **Entraidez-vous** : expliquer à un camarade est la meilleure façon de vérifier qu'on a compris.

## Outils

| Outil | À quoi ça sert |
|---|---|
| [VS Code](https://code.visualstudio.com/) + extension *Live Server* | Écrire le code et voir le résultat en direct |
| Chrome ou Firefox + **F12** | Console, inspecteur d'éléments, points d'arrêt (*Sources*), requêtes (*Réseau*), stockage (*Application*) |
| [MDN en français — JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) | La référence du langage |
| [MDN en français — API Web](https://developer.mozilla.org/fr/docs/Web/API) | La référence du DOM et du BOM |
| [javascript.info](https://javascript.info/) (en anglais) | Un cours complet et très clair |
| [Validateur HTML du W3C](https://validator.w3.org/#validate_by_input) | Vérifier votre HTML après avoir modifié le DOM à la main |

Bon courage, et belle floraison !
