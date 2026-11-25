# Exercice 05 — Un menu qui suit le défilement

**Niveau 2 · Pousse** · ★★☆☆ · Durée : 1 h · Notions : `window.scrollY`, événement `scroll`, `scrollTo()`, `getBoundingClientRect()`, `classList.toggle()`, `aria-expanded`, `aria-current`, `window.innerWidth`, événement `resize`, `requestAnimationFrame()`

> La ferme-école publie son « guide de la saison des pluies » : cinq gestes à faire dans l'ordre. La page est longue, et le menu collé en haut de l'écran ne dit jamais **où l'on est**. Sur téléphone, il prend la moitié de l'écran, et il n'y a aucun moyen de remonter rapidement. Votre mission : un menu qui s'allume tout seul, un bouton « retour en haut » et un menu burger, avec du JavaScript.

## Objectifs

- Lire la position de défilement de la page (`window.scrollY`) et réagir à l'événement `scroll`.
- Mesurer la position d'un élément avec `getBoundingClientRect()`.
- Remonter en haut de la page avec `window.scrollTo()`.
- Afficher, cacher et mettre en valeur des éléments en changeant des **classes** (`classList.toggle`).
- Rendre un menu burger **accessible** : `aria-expanded`, touche Échap.
- Réagir au changement de taille de la fenêtre (`resize`).

## Fichiers fournis

```
05-menu-defilement/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← complet : il contient déjà les classes .actif, .ouvert et .cache
├── js/
│   └── script.js      ← les éléments sont déjà sélectionnés ; les TODO attendent votre code
└── images/
    ├── sol.svg  semis.svg  arrosage.svg  paillage.svg  recolte.svg
```

> **Le CSS n'est pas le sujet de cet exercice.** Il décrit l'apparence ; c'est le JavaScript qui décide *quand* une classe est posée ou retirée. Ouvrez-le quand même pour repérer les règles `.actif`, `.ouvert` et `.cache`.

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- faites défiler la page : le menu reste collé en haut (c'est le CSS), mais est-ce qu'il vous indique l'étape en cours ?
- réduisez la fenêtre (ou `F12` puis `Ctrl + Maj + M`, mode appareil) en dessous de 700 px : un bouton à trois barres remplace le menu. Cliquez dessus : rien ne se passe ;
- ouvrez la console (`F12` → *Console*) et lisez `window.scrollY` en haut de la page, puis en bas (tapez-le directement dans la console). Que vaut-il tout en haut ?
- ouvrez `js/script.js` : lisez les constantes déjà écrites en haut.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO` du fichier) :

1. **Observer le défilement.** Ajoutez `window.addEventListener('scroll', …)` et affichez `window.scrollY` dans la console avec `console.log`. Faites défiler : vous voyez la valeur monter. Notez combien de lignes s'affichent pour un seul coup de molette. Vous remplacerez ce `console.log` plus tard.
2. **Le bouton « retour en haut » apparaît.** Écrivez une fonction `majBoutonRetourHaut()` : si `window.scrollY` dépasse `SEUIL_BOUTON`, le bouton perd la classe `cache` ; sinon il la reprend. Appelez-la depuis votre listener de l'étape 1. Aide : `classList.toggle('cache', condition)` fait les deux en une ligne.
3. **Le clic remonte en douceur.** Au clic sur `boutonRetourHaut`, appelez `window.scrollTo({ top: 0, behavior: 'smooth' })`. Testez au milieu de la page.
4. **Le menu indique la section visible.** Écrivez `majMenuActif()` :
   - parcourez les `sections` avec `forEach` et gardez la **dernière** dont `getBoundingClientRect().top` est inférieur ou égal à `entete.offsetHeight + 40` ;
   - pour chaque lien du menu, comparez son `href` (`"#semis"`) avec `"#" + section.id` ;
   - sur le lien courant : ajoutez la classe `actif` **et** `aria-current="true"` ; sur les autres, retirez les deux ;
   - appelez cette fonction depuis le listener `scroll`.
5. **Le menu burger.** Au clic sur `boutonBurger` : basculez la classe `ouvert` sur `menu` et mettez à jour `aria-expanded` (`"true"` ou `"false"`). Faites aussi se refermer le menu : après un clic sur un lien, et avec la touche **Échap** (qui redonne alors le focus au bouton).
6. **La fenêtre change de taille.** Écrivez `majLargeur()` : elle écrit `window.innerWidth` dans `affichageLargeur` (en bas de page). Branchez-la sur l'événement `resize` de `window`. Quand la largeur atteint `LARGEUR_ORDINATEUR`, refermez le menu (classe **et** `aria-expanded`), pour ne pas le retrouver « ouvert » en revenant sur petit écran.
7. **Pas trop de calculs.** Votre code tourne à chaque événement `scroll`, c'est-à-dire des dizaines de fois par seconde. Regroupez tout dans **un seul** listener et limitez-le avec `requestAnimationFrame` (voir le mémo : une variable `calculEnAttente`). Retirez le `console.log` de l'étape 1. Appelez enfin `majLargeur()`, `majBoutonRetourHaut()` et `majMenuActif()` **une fois** au chargement : rechargez la page au milieu du guide, tout doit être déjà dans le bon état.
8. **Test final.** Testez avec la souris, puis **uniquement au clavier** (`Tab`, `Entrée`, `Échap`). Testez aussi à 375 px de large. Chaque lien du menu mène-t-il au bon titre, sans qu'il soit caché derrière l'en-tête ?

### Mémo — défilement et fenêtre (BOM)

| Outil | Ce que c'est | Exemple |
|---|---|---|
| `window.scrollY` | de combien de pixels la page a défilé (0 = tout en haut) | `if (window.scrollY > 400) …` |
| `window.scrollTo(options)` | fait défiler la page | `window.scrollTo({ top: 0, behavior: 'smooth' })` |
| `window.innerWidth` | largeur visible de la fenêtre, en pixels | `affichage.textContent = window.innerWidth` |
| événement `scroll` / `resize` | la page défile / la fenêtre change de taille | `window.addEventListener('scroll', fonction)` |
| `element.getBoundingClientRect()` | position et taille **par rapport à la fenêtre** (`top` vaut 0 quand le haut de l'élément touche le haut de l'écran) | `section.getBoundingClientRect().top` |
| `element.offsetHeight` | hauteur d'un élément, en pixels | `entete.offsetHeight` |

| Technique | Exemple | À retenir |
|---|---|---|
| `classList.toggle(classe, condition)` | `bouton.classList.toggle('cache', scrollY < 400)` | ajoute la classe si `condition` est vraie, la retire sinon |
| `setAttribute` / `removeAttribute` | `lien.setAttribute('aria-current', 'true')` | les attributs `aria-*` informent les lecteurs d'écran |
| `aria-expanded` | `"true"` ou `"false"` sur le **bouton** qui ouvre le menu | à mettre à jour à chaque clic |
| `requestAnimationFrame` | voir ci-dessous | demande « fais ce calcul juste avant la prochaine image » |

```js
let calculEnAttente = false;

window.addEventListener('scroll', () => {
  if (calculEnAttente) {
    return;               // un calcul est déjà prévu : on ignore cet événement
  }
  calculEnAttente = true;
  window.requestAnimationFrame(() => {
    // … vos fonctions ici …
    calculEnAttente = false;
  });
});
```

## Critères de réussite

- [ ] Le bouton « retour en haut » est invisible en haut de page, apparaît après 400 px et remonte en douceur.
- [ ] Le lien du menu correspondant à la section visible est mis en valeur, **y compris après un rechargement au milieu de la page**.
- [ ] Un seul lien du menu porte `aria-current="true"` à la fois (vérifiez dans l'onglet *Éléments* de F12).
- [ ] Sur téléphone, le burger ouvre et ferme le menu ; `aria-expanded` change de valeur à chaque clic.
- [ ] Le menu se referme après un clic sur un lien et avec la touche Échap.
- [ ] La largeur de la fenêtre s'affiche en bas de page et se met à jour quand on redimensionne.
- [ ] Il n'y a plus de `console.log` dans le code final, et un seul listener `scroll`.
- [ ] Tout fonctionne au clavier.

## Indices

<details>
<summary>Indice 1 — Mon bouton « retour en haut » n'apparaît jamais</summary>

Vérifiez trois choses : (1) la classe à retirer s'appelle bien `cache` (sans accent, sans point) ; (2) vous comparez bien `window.scrollY` à `SEUIL_BOUTON` et pas à une chaîne de caractères ; (3) votre fonction est **appelée** dans le listener, pas seulement écrite. Affichez `window.scrollY` avec `console.log` pour voir sa valeur réelle.

</details>

<details>
<summary>Indice 2 — Un mauvais lien est mis en valeur (ou aucun)</summary>

`lien.href` renvoie l'adresse **complète** (`http://127.0.0.1:5500/index.html#semis`), alors que `lien.getAttribute('href')` renvoie exactement ce qui est écrit dans le HTML (`#semis`). Utilisez `getAttribute`. Autre piège : avant la première section, aucune section n'a dépassé la limite : la variable doit rester `null`, et aucun lien ne doit être actif.

</details>

<details>
<summary>Indice 3 — Pourquoi « + 40 » dans le calcul de la section courante ?</summary>

Quand on clique sur « 3. L'arrosage », la page saute pour que le **haut** de la section arrive juste sous l'en-tête. Si votre limite était exactement la hauteur de l'en-tête, des différences d'un pixel feraient s'allumer le lien **précédent**. Les 40 pixels de marge évitent ce clignotement.

</details>

<details>
<summary>Indice 4 — Le menu burger reste « ouvert » quand j'élargis la fenêtre</summary>

Le CSS affiche le menu en ligne dès 700 px, mais la classe `ouvert` est toujours posée : en rétrécissant à nouveau, le menu réapparaît déroulé. Dans `majLargeur()`, si `window.innerWidth >= LARGEUR_ORDINATEUR`, refermez le menu comme à l'étape 5 (classe **et** `aria-expanded`). Mettez cette fermeture dans une petite fonction réutilisable, `fermerMenu()`.

</details>

<details>
<summary>Indice 5 — Mon menu s'ouvre puis se referme aussitôt</summary>

Vous avez sans doute branché la fermeture sur un événement trop large (par exemple un clic sur tout le `document`), qui se déclenche aussi quand on clique sur le burger. Branchez la fermeture uniquement sur **les liens** (`liensMenu.forEach`) et sur la touche Échap.

</details>

## Bonus

- Ajoutez une **barre de progression** de lecture en haut de l'écran : sa largeur vaut `window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100` pour cent.
- Fermez le menu burger quand on clique **en dehors** de lui (en vérifiant avec `event.target.closest('.entete')`).
- Respectez les personnes sensibles aux animations : `window.matchMedia('(prefers-reduced-motion: reduce)').matches` vaut `true` pour elles. Dans ce cas, utilisez `behavior: 'auto'` à l'étape 3.
- Ajoutez l'option `{ passive: true }` en troisième argument du listener `scroll` (`addEventListener('scroll', f, { passive: true })`). Que dit la documentation sur son intérêt ?

## Questions de compréhension

1. Que vaut `window.scrollY` tout en haut de la page ? Et tout en bas ?
2. Quelle différence entre `lien.href` et `lien.getAttribute('href')` ?
3. Pourquoi cherche-t-on les éléments (`querySelector`) **une fois** au début plutôt que dans la fonction appelée à chaque défilement ?
4. À quoi sert `aria-expanded` ? Pourquoi le changer en JavaScript plutôt que d'écrire la valeur à la main dans le HTML ?
5. Qu'est-ce que `requestAnimationFrame` change au comportement de l'événement `scroll` ?
6. `window.innerWidth` et `screen.width` sont-ils la même chose ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande « un menu statique avec des liens permettant de se déplacer vers les différentes étapes de la mise en œuvre de la pépinière » et, depuis chaque étape, « un lien permettant de revenir au menu ». Vous savez maintenant aller plus loin que de simples ancres : un menu qui **indique l'étape en cours**, un bouton qui ramène au menu à tout moment et une version téléphone confortable. Gardez les ancres HTML (`href="#etape"`) : elles continuent de fonctionner si le JavaScript ne se charge pas, et le JavaScript ne fait que les améliorer.

## Ressources

- MDN : [`Window.scrollY`](https://developer.mozilla.org/fr/docs/Web/API/Window/scrollY) · [`Window.scrollTo()`](https://developer.mozilla.org/fr/docs/Web/API/Window/scrollTo) · [`Window.innerWidth`](https://developer.mozilla.org/fr/docs/Web/API/Window/innerWidth)
- MDN : [`Element.getBoundingClientRect()`](https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect) · [`Element.classList`](https://developer.mozilla.org/fr/docs/Web/API/Element/classList) · [`requestAnimationFrame()`](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame)
- MDN : [`aria-expanded`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) · [`aria-current`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

Exercice suivant : [06 — Animations déclenchées par le défilement](../06-animations-scroll/README.md)
