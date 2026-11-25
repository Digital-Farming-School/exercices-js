# Exercice 07 — Une galerie photo avec visionneuse

**Niveau 2 · Pousse** · ★★☆☆ · Durée : 1 h · Notions : délégation d'événements (`closest()`), `dataset`, `<dialog>` (`showModal()`, `close()`), événement `keydown`, gestion du **focus**, filtre par catégorie, `aria-pressed`, `aria-live`

> La ferme-école veut montrer ses plus belles récoltes. Les huit photos sont là, mais elles sont toutes petites et on ne peut ni les agrandir ni les trier. Votre mission : une **visionneuse** (clic, flèches du clavier, touche Échap), des **filtres** par catégorie, le tout utilisable à la souris, au clavier et avec un lecteur d'écran.

## Objectifs

- Écouter **tous** les clics d'une liste avec un **seul** écouteur (délégation d'événements).
- Lire des données cachées dans le HTML avec `data-*` (`dataset`).
- Ouvrir et fermer une **fenêtre modale** native avec `<dialog>`.
- Naviguer avec le clavier (`keydown`, `event.key`) et gérer le **focus**.
- Filtrer une liste et annoncer le résultat aux lecteurs d'écran (`aria-pressed`, `aria-live`).

## Fichiers fournis

```
07-galerie-lightbox/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← complet : galerie, <dialog>, filtres, classe .cache
├── js/
│   └── script.js      ← les éléments sont déjà sélectionnés ; les TODO attendent votre code
└── images/
    ├── tomates.svg  courges.svg  mais.svg  piments.svg
    └── aubergines.svg  oignons.svg  mangues.svg  gombos.svg
```

> **Le CSS n'est pas le sujet.** Regardez dans `index.html` : chaque vignette est un `<button>` (on peut le toucher au clavier sans rien faire), avec un attribut `data-legende`, et chaque `<li>` porte un `data-categorie`. La visionneuse est un `<dialog>`. Tout est prêt : il manque le comportement.

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- appuyez sur **Tab** : le focus passe de filtre en filtre, puis de vignette en vignette. Appuyez sur **Entrée** sur une vignette : rien ne se passe encore ;
- dans la console de `F12`, tapez `document.querySelector('#visionneuse').showModal()` puis appuyez sur **Échap**. Que remarquez-vous (fond, focus, touche Échap) sans une ligne de code de votre part ?
- inspectez une vignette : repérez `data-legende` ; inspectez un `<li>` : repérez `data-categorie`.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO` du fichier) :

1. **Un seul écouteur pour toute la galerie.** Ajoutez un écouteur `click` sur `galerie` (et non sur chaque vignette). Dans la fonction, retrouvez le bouton cliqué avec `evenement.target.closest('.vignette')` : `closest` remonte de l'élément cliqué (souvent l'`<img>`) jusqu'au bouton. S'il renvoie `null` (clic entre deux photos), sortez avec `return`. Pour l'instant, affichez `vignette.dataset.legende` dans la console et testez en cliquant sur chaque photo.
2. **Remplir et ouvrir la visionneuse.** Écrivez `afficherPhoto(index)` : elle va chercher la vignette numéro `index` dans `vignettesVisibles()` (fonction fournie) et recopie dans la visionneuse : la source de l'image (`src`), son **texte alternatif** (`alt`), la légende (avec `textContent`) et la position (`"3 / 8"`). Dans l'écouteur de l'étape 1, mémorisez l'indice de la photo cliquée dans `indexCourant` (`vignettesVisibles().indexOf(vignette)`), appelez `afficherPhoto(indexCourant)`, puis `visionneuse.showModal()`.
3. **Fermer.** Au clic sur le bouton `×`, appelez `visionneuse.close()`. Faites aussi fermer la visionneuse par un clic sur le **fond gris** : dans l'écouteur `click` du `<dialog>`, si `evenement.target === visionneuse`, fermez. Pourquoi un clic sur la photo ne ferme-t-il pas ? Vérifiez : la touche **Échap** ferme déjà la fenêtre, sans code.
4. **Photo précédente / suivante.** Écrivez `allerA(decalage)` (`-1` ou `+1`) : elle modifie `indexCourant` en **revenant au début** après la dernière photo, et à la fin avant la première, puis appelle `afficherPhoto`. Attention : en JavaScript, `-1 % 8` vaut `-1`, pas `7` ! Ajoutez le nombre total avant de faire le modulo. Branchez `boutonPrecedent` et `boutonSuivant`.
5. **Les flèches du clavier.** Écoutez `keydown` sur la visionneuse : `evenement.key === 'ArrowLeft'` appelle `allerA(-1)`, `'ArrowRight'` appelle `allerA(1)`. Testez sans souris : **Tab** jusqu'à une vignette, **Entrée**, puis les flèches, puis **Échap**.
6. **Rendre le focus.** Quand on ferme la visionneuse, le focus doit revenir sur la vignette de la **dernière photo regardée** (pas forcément celle de départ : essayez d'avancer de trois photos avant de fermer). Écoutez l'événement `close` du `<dialog>` (il se produit quelle que soit la façon de fermer) et appelez `.focus()` sur `vignettesVisibles()[indexCourant]`.
7. **Filtrer.** Ajoutez un écouteur sur `zoneFiltres` (délégation encore !) :
   - retrouvez le bouton cliqué avec `closest('.filtre')` et sa catégorie avec `dataset.filtre` (`"tout"`, `"legume"`…) ;
   - mettez `aria-pressed="true"` sur ce bouton et `"false"` sur les autres ;
   - pour chaque `<li>` de la galerie : ajoutez la classe `cache` si sa catégorie (`dataset.categorie`) ne correspond pas (sauf pour « tout »), retirez-la sinon (`classList.toggle('cache', condition)`) ;
   - écrivez « *N* photos affichées » (« 1 photo affichée » au singulier) dans `compte` : cet élément a `aria-live="polite"`, un lecteur d'écran annoncera la phrase.
   
   Testez : filtrez sur « Légumes », ouvrez une photo et naviguez avec les flèches : vous ne devez voir **que** des légumes, avec la bonne position (« 2 / 5 »).
8. **Test final.** Testez tout **uniquement au clavier**, puis avec la souris. Vérifiez qu'après chaque filtre, la position et le nombre de photos sont corrects. Aucune erreur dans la console.

### Mémo — événements et fenêtre modale

| Outil | Rôle | Exemple |
|---|---|---|
| `evenement.target` | l'élément **exact** sur lequel on a cliqué (souvent un enfant : l'`<img>`) | `evenement.target.tagName` |
| `element.closest('selecteur')` | remonte vers les parents jusqu'à trouver ce sélecteur ; `null` sinon | `evenement.target.closest('.vignette')` |
| `element.dataset.nom` | lit `data-nom="…"` | `vignette.dataset.legende` |
| `dialog.showModal()` / `dialog.close()` | ouvre / ferme la fenêtre modale (focus piégé, fond, touche Échap) | `visionneuse.showModal()` |
| événement `close` (sur `<dialog>`) | la fenêtre vient de se fermer, quelle que soit la raison | `visionneuse.addEventListener('close', …)` |
| `evenement.key` | la touche pressée (`keydown`) | `'ArrowLeft'`, `'ArrowRight'`, `'Escape'`, `'Enter'` |
| `element.focus()` | donne le focus clavier à un élément | `vignette.focus()` |
| `aria-pressed` | état d'un bouton à bascule (`"true"` / `"false"`) | `bouton.setAttribute('aria-pressed', 'true')` |
| `aria-live="polite"` | un lecteur d'écran annonce le **nouveau** texte de la zone | `compte.textContent = '5 photos affichées'` |

```js
// Revenir au début après la dernière, et inversement (modulo)
indexCourant = (indexCourant + decalage + total) % total;
```

## Critères de réussite

- [ ] Un clic (ou **Entrée**) sur une vignette ouvre la visionneuse avec la bonne image, la bonne légende, le bon texte alternatif et la bonne position.
- [ ] Le bouton `×`, un clic sur le fond et la touche Échap ferment la visionneuse ; un clic sur la photo ne la ferme pas.
- [ ] Les boutons et les flèches du clavier font défiler les photos en boucle, dans les deux sens.
- [ ] À la fermeture, le focus revient sur la vignette de la dernière photo regardée.
- [ ] Les filtres masquent les autres photos ; le bouton actif a `aria-pressed="true"` ; le nombre de photos est écrit.
- [ ] Après un filtre, la visionneuse ne montre que les photos visibles, avec la bonne position.
- [ ] Il y a **un seul** écouteur sur la galerie (pas un par vignette).
- [ ] Aucune erreur dans la console.

## Indices

<details>
<summary>Indice 1 — Rien ne se passe quand je clique sur une photo</summary>

Ajoutez un `console.log(evenement.target)` au tout début de l'écouteur : vous verrez que la cible est l'`<img>`, pas le `<button>`. Si votre code teste `evenement.target.classList.contains('vignette')`, il échoue. Utilisez `closest('.vignette')` qui trouve le bouton même quand on clique sur son contenu.

</details>

<details>
<summary>Indice 2 — La légende affiche « undefined »</summary>

Le nom après `dataset.` doit correspondre à celui de l'attribut HTML : `data-legende` devient `dataset.legende`. Un attribut `data-categorie-photo` deviendrait `dataset.categoriePhoto` (camelCase). Vérifiez aussi que vous lisez `dataset` sur le **bouton**, pas sur l'image.

</details>

<details>
<summary>Indice 3 — Une erreur « showModal is not a function »</summary>

`showModal()` est une méthode du `<dialog>`, pas de la galerie ni de l'image. Vérifiez que vous l'appelez bien sur la constante `visionneuse`, et que `document.querySelector('#visionneuse')` ne renvoie pas `null` (une faute de frappe dans l'identifiant).

</details>

<details>
<summary>Indice 4 — En filtrant, la visionneuse montre des photos masquées</summary>

`document.querySelectorAll('.vignette')` renvoie **toutes** les photos, masquées ou non. Utilisez la fonction fournie `vignettesVisibles()` (elle exclut les `<li class="cache">`) et **rappelez-la** à chaque fois, sans stocker son résultat dans une variable globale : la liste change à chaque filtre.

</details>

<details>
<summary>Indice 5 — La flèche gauche de la première photo plante</summary>

`(0 - 1) % 8` vaut `-1`, donc `vignettesVisibles()[-1]` est `undefined`. Écrivez `(indexCourant + decalage + total) % total` : en ajoutant `total` avant le modulo, le résultat n'est jamais négatif.

</details>

## Bonus

- Ajoutez la touche **Début** (`Home`) et **Fin** (`End`) pour aller à la première et à la dernière photo.
- Ajoutez un **zoom** : un clic sur la grande image alterne entre l'affichage normal et agrandi (classe `zoom` à créer dans le CSS, avec `classList.toggle`).
- Mémorisez le filtre choisi dans l'adresse (`#legume`) avec `location.hash`, et appliquez-le au chargement (voir l'exercice 09).
- Quand on filtre, ajoutez une petite animation de disparition en CSS avant d'appliquer `cache`. Que doit-on attendre avec `transitionend` (exercice 06) ?

## Questions de compréhension

1. Qu'est-ce que la **délégation d'événements** ? Donnez deux avantages.
2. Quelle différence entre `evenement.target` et `evenement.currentTarget` ?
3. Qu'apporte `<dialog>` + `showModal()` par rapport à une `<div>` positionnée en CSS ? Citez trois choses que vous n'avez pas eu à coder.
4. Pourquoi faut-il **rendre le focus** à un élément quand on ferme une fenêtre ?
5. Pourquoi recopier aussi `alt` quand on change l'image de la visionneuse ?
6. À quoi sert `aria-live="polite"` ? Qui en a besoin ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande des « images illustratives » pour **chaque étape** de la conduite de la pépinière, avec des descriptions. Une visionneuse permet de montrer vos photos de terrain (semis, repiquage, drone) en grand, avec la légende de l'image, sans quitter la page. Le filtre peut trier vos photos par étape (semis, arrosage, repiquage…). Pensez à écrire de vrais textes alternatifs et à tester au clavier : le critère « page intuitive et facile à utiliser » commence par là.

## Ressources

- MDN : [`<dialog>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/dialog) · [`HTMLDialogElement.showModal()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLDialogElement/showModal) · [`Element.closest()`](https://developer.mozilla.org/fr/docs/Web/API/Element/closest)
- MDN : [`HTMLElement.dataset`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset) · [`KeyboardEvent.key`](https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key) · [`HTMLElement.focus()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus)
- MDN : [`aria-pressed`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) · [`aria-live`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-live)

---

Exercice suivant : [08 — Une capsule vidéo avec ses propres commandes](../08-capsule-video/README.md)
