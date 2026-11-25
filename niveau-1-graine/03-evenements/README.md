# Exercice 03 — Réagir aux actions de l'utilisateur

**Niveau 1 · Graine** · ★★☆☆ · Durée : 45 min · Notions : `addEventListener`, `click`, `input`, `keydown`, `mouseover`, `focus`, `submit`, `event.target` / `currentTarget`, `preventDefault`, `removeEventListener`, `aria-expanded`, `aria-pressed`

> La fiche pratique « Réussir son paillage » est prête, mais elle ne réagit à rien : impossible de dérouler les étapes, d'agrandir le texte pour la lire de loin, ni de savoir combien de paille acheter. Votre mission : **faire réagir la page** aux clics, à la frappe, au survol et au clavier, sans jamais laisser de côté les personnes qui n'ont pas de souris.

## Objectifs

- Brancher une fonction sur un événement avec `addEventListener`.
- Utiliser l'**objet événement** : `target`, `currentTarget`, `key`, `preventDefault()`.
- Afficher / masquer un élément avec une **classe**, et tenir à jour `aria-expanded` et `aria-pressed`.
- Réagir à la **frappe** (`input`), au **survol** (`mouseover`) **et** au **focus clavier**, à une touche (`keydown`), à l'envoi d'un formulaire (`submit`).
- Retirer un écouteur avec `removeEventListener`.

## Fichiers fournis

```
03-evenements/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← la feuille de style (complète)
├── js/
│   └── script.js      ← VOTRE fichier : les sélections sont faites, les TODO attendent vos écouteurs
└── images/
    └── paillage.svg
```

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- cliquez sur tous les boutons : que se passe-t-il ? (rien… ou presque)
- tapez un prénom dans le formulaire du bas et envoyez-le : que se passe-t-il ? Regardez l'adresse et le contenu de la page. **Remarquez-le**, vous l'expliquerez à l'étape 8.
- appuyez sur `Tab` plusieurs fois : le focus passe d'un bouton à l'autre. La plupart des visiteurs ne se servent pas que de la souris.
- dans `script.js`, repérez la section « SÉLECTION DES ÉLÉMENTS » : les éléments dont vous avez besoin sont déjà rangés dans des constantes (comme à l'exercice 02).

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO`) :

1. **Afficher / masquer les étapes.** Au **clic** sur `boutonEtapes` :
   - `listeEtapes.classList.toggle("cache")` bascule la classe. `toggle` **renvoie `true` si la classe vient d'être ajoutée** : gardez ce résultat dans `const estMasquee = …`.
   - mettez à jour l'attribut `aria-expanded` du bouton (`"true"` quand la liste est visible, `"false"` sinon) avec `setAttribute("aria-expanded", String(!estMasquee))` ;
   - changez le texte du bouton : « Afficher les étapes » ↔ « Masquer les étapes ».
2. **L'objet événement.** Branchez un `click` sur la `fiche` entière. La fonction reçoit un paramètre (appelez-le `evenement`) : affichez dans la console `evenement.target.tagName` et `evenement.currentTarget.tagName`. Cliquez sur l'image, un paragraphe, un titre : quelle valeur change, laquelle ne change jamais ? (réponse à la fin de l'exercice, dans les questions)
3. **Taille du texte.** Créez `let niveauTaille = 0;`.
   - Au clic sur `A+` : `niveauTaille = Math.min(2, niveauTaille + 1);`. Au clic sur `A−` : `niveauTaille = Math.max(-1, niveauTaille - 1);` (`Math.min` / `Math.max` empêchent de dépasser les limites).
   - Écrivez le niveau dans l'attribut `data-taille` du `<body>` : `document.body.dataset.taille = niveauTaille;`. Le CSS fournit les tailles pour `-1`, `1` et `2`.
   - Rangez cette instruction dans une fonction `appliquerTaille()` utilisée par les deux boutons.
4. **Mode lecture.** Au clic sur `boutonLecture`, basculez la classe `mode-lecture` sur le `<body>` (`document.body.classList.toggle(…)`) et mettez à jour `aria-pressed` du bouton (`"true"` / `"false"`). Mettez ce code dans une fonction `basculerModeLecture()` : vous la réutiliserez à l'étape 7.
5. **Calculateur (événement `input`).** `input` se déclenche à **chaque frappe**. Dans la fonction :
   - lisez `champSurface.value` (toujours du **texte**) et convertissez-le avec `Number(…)` ;
   - si le champ est vide, si le nombre est invalide (`Number.isNaN(surface)`) ou si `surface <= 0`, écrivez une phrase d'aide dans `resultatPaillage` puis arrêtez-vous avec `return` ;
   - sinon, calculez `litres = surface * 50` (5 cm de paillage = 50 L par m²) et `brouettes = Math.ceil(litres / 80)` (une brouette = 80 L), puis écrivez « Il vous faut environ … litres de paillage, soit … brouette(s). ».
6. **Survol et focus.** Pour **chaque** bouton de `boutonsMateriaux` (parcourez-les avec `forEach`), écrivez dans `descriptionMateriau` le contenu de `bouton.dataset.description` :
   - au `mouseover` (survol à la souris) ;
   - **et** au `focus` (arrivée au clavier avec `Tab`).

   Écrivez **une seule** fonction `afficherDescription(evenement)` qui utilise `evenement.currentTarget`, et branchez-la deux fois. Testez à la souris, puis au clavier.
7. **Le clavier.** Branchez un `keydown` sur `document` :
   - **Échap** (`evenement.key === "Escape"`) : masquez les étapes (ajoutez `cache`, remettez `aria-expanded="false"` et le texte « Afficher les étapes ») ;
   - **la touche `l`** : appelez `basculerModeLecture()` ;
   - **mais pas pendant que l'on tape dans un champ** : au début de la fonction, `if (evenement.target.matches("input, textarea")) { return; }`. Sans cela, écrire « sel » dans le champ de surface activerait le mode lecture !
8. **Envoi d'un formulaire.** Branchez un `submit` sur `formulaireQuestion`. Premier test : sans rien ajouter, envoyez le formulaire (étape 0) : la page se recharge ou se perd, c'est le comportement par défaut du navigateur. Pour l'annuler : `evenement.preventDefault();` en **première** ligne. Puis lisez `champPrenom.value.trim()`, écrivez « Merci … ! Un animateur vous répondra bientôt. » dans `confirmation` (avec `textContent`) et videz le formulaire avec `formulaireQuestion.reset()`.
9. **Un écouteur qui se retire.** Le bouton d'astuce ne doit servir qu'**une seule fois**.
   - Écrivez une fonction **nommée** `function revelerAstuce() { … }` qui écrit une astuce dans `texteAstuce` (par exemple « Arrosez AVANT de pailler ») et désactive le bouton (`boutonAstuce.disabled = true`) ;
   - dans cette fonction, retirez l'écouteur : `boutonAstuce.removeEventListener("click", revelerAstuce);`.
   - Branchez-la : `boutonAstuce.addEventListener("click", revelerAstuce);`. Pourquoi la fonction doit-elle avoir un **nom** ? Que se passe-t-il avec une fonction anonyme ?
10. **Test sans souris.** Parcourez toute la page avec `Tab`, `Maj + Tab`, `Entrée`, `Espace` et `Échap` : tout doit rester utilisable. Vérifiez que la console ne montre aucune erreur.

### Mémo — les événements

| Événement | Se déclenche quand… | Exemple d'usage |
|---|---|---|
| `click` | clic **ou** `Entrée` / `Espace` sur un bouton | afficher / masquer |
| `input` | le contenu d'un champ change (à chaque frappe) | calcul en direct |
| `keydown` | une touche est enfoncée | `evenement.key` : `"Escape"`, `"l"`, `"ArrowRight"` |
| `mouseover` | la souris entre sur l'élément | afficher une description |
| `focus` | l'élément reçoit le focus (clavier ou clic) | équivalent clavier du survol |
| `submit` | un formulaire est envoyé | valider, afficher un message |

| Outil | Exemple | À retenir |
|---|---|---|
| `addEventListener` | `bouton.addEventListener("click", fonction);` | Branche une fonction. Le **nom** de la fonction, **sans** parenthèses. |
| `evenement.target` | `evenement.target.matches("input")` | L'élément **réellement touché** (peut être un enfant de celui qui écoute). |
| `evenement.currentTarget` | `evenement.currentTarget.dataset.description` | L'élément **qui porte l'écouteur**. |
| `evenement.preventDefault()` | dans un `submit` | Annule le comportement par défaut du navigateur. |
| `removeEventListener` | `bouton.removeEventListener("click", maFonction);` | Exige **la même fonction** (donc nommée). |
| `classList.toggle` | `const estMasquee = el.classList.toggle("cache");` | Renvoie `true` si la classe vient d'être **ajoutée**. |
| `aria-expanded` / `aria-pressed` | `bouton.setAttribute("aria-expanded", "true")` | Dit aux lecteurs d'écran si un bouton est déplié / enfoncé. Toujours du **texte** (`"true"`). |

## Critères de réussite

- [ ] Le bouton « Afficher les étapes » déroule et replie la liste, son texte change, et `aria-expanded` vaut `"true"` / `"false"` dans l'onglet Éléments.
- [ ] A− et A+ changent la taille du texte, sans jamais dépasser les limites.
- [ ] Le mode lecture se bascule à la souris **et** avec la touche `l`, `aria-pressed` suit.
- [ ] Le calculateur se met à jour à chaque frappe, sans afficher `NaN` ni de valeur négative.
- [ ] La description d'un matériau s'affiche au survol **et** quand on y arrive avec `Tab`.
- [ ] `Échap` replie les étapes ; taper la lettre `l` dans le champ de surface ne déclenche rien.
- [ ] L'envoi du formulaire ne recharge pas la page et affiche un message avec le prénom.
- [ ] Le bouton d'astuce ne fonctionne qu'une fois (et son écouteur est retiré).
- [ ] Aucun attribut `onclick=` dans le HTML ; la console ne montre aucune erreur.

## Indices

<details>
<summary>Indice 1 — Mon écouteur s'exécute dès le chargement de la page</summary>

Vous avez écrit `bouton.addEventListener("click", maFonction());` avec des parenthèses : la fonction est **appelée tout de suite** et c'est son résultat (`undefined`) qui est branché. On donne **le nom** de la fonction, sans parenthèses : `addEventListener("click", maFonction)`. Avec une fonction anonyme : `addEventListener("click", function () { … })`.

</details>

<details>
<summary>Indice 2 — « Cannot read properties of null (reading 'addEventListener') »</summary>

Une des constantes de la section « SÉLECTION » vaut `null` : l'`id` n'existe pas dans le HTML (faute de frappe ?) ou le script s'exécute avant la page (vérifiez `defer`). Affichez la constante avec `console.log` pour trouver laquelle.

</details>

<details>
<summary>Indice 3 — Le bouton A+ fait grandir sans fin, ou la taille ne change pas</summary>

Pour la limite : `Math.min(2, niveauTaille + 1)` renvoie le plus petit des deux nombres, donc jamais plus de 2. Si rien ne change, regardez dans l'onglet Éléments l'attribut `data-taille` du `<body>` : bouge-t-il ? Sinon l'écouteur n'est pas branché ; si oui, la valeur n'est pas dans `-1, 0, 1, 2` (ou vous avez écrit `"+1"`).

</details>

<details>
<summary>Indice 4 — Le calculateur affiche « NaN litres »</summary>

`NaN` apparaît quand `Number(…)` reçoit un texte qui n'est pas un nombre, ou quand le champ est vide pendant la saisie d'un « - ». Traitez ce cas **avant** le calcul avec un `if` et un `return`, comme demandé à l'étape 5. Testez en tapant `abc` (le champ `type="number"` l'empêche, mais pas le script) puis en effaçant le contenu.

</details>

<details>
<summary>Indice 5 — Mon formulaire se recharge quand même</summary>

`preventDefault()` doit être appelé sur l'**objet événement** (le paramètre de la fonction), et **avant** toute instruction qui pourrait planter. Si une erreur se produit au-dessus, la ligne n'est jamais atteinte et la page se recharge. Vérifiez aussi que vous écoutez `submit` sur le **formulaire** (pas `click` sur le bouton) : ainsi la touche `Entrée` dans le champ marche aussi.

</details>

## Bonus

- Ajoutez les touches `+` et `-` du clavier pour agrandir / diminuer le texte (sans oublier de ne rien faire dans un champ de saisie).
- Remplacez l'étape 9 par `{ once: true }` : `addEventListener("click", revelerAstuce, { once: true })`. Pourquoi cette variante est-elle plus courte ? Quand préférer `removeEventListener` ?
- Ajoutez un événement `mouseout` pour effacer la description quand la souris quitte un matériau. Que faire pour le clavier (`blur`) ?
- Affichez le nombre de caractères du prénom pendant la saisie (`input`), et refusez un prénom de moins de 2 lettres avec `confirmation.textContent` au lieu d'une alerte.

## Questions de compréhension

1. Quelle est la différence entre `evenement.target` et `evenement.currentTarget` ? Dans l'étape 2, laquelle change quand on clique sur l'image ?
2. Pourquoi écoute-t-on aussi `focus` (et pas seulement `mouseover`) à l'étape 6 ?
3. Quelle différence entre les événements `input` et `change` ?
4. À quoi sert `evenement.preventDefault()` dans un `submit` ? Que se passe-t-il sans lui ?
5. Pourquoi faut-il une fonction **nommée** pour utiliser `removeEventListener` ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande une page « interactive » avec un **menu** et un **lien de retour au menu** à chaque étape. Tout cela repose sur des événements : un clic ouvre ou ferme un panneau, une touche (`Échap`) le referme, `aria-expanded` renseigne les lecteurs d'écran. En cas d'**évaluation**, vous devrez pouvoir **expliquer** votre code : savoir dire quel événement déclenche quelle fonction (« au clic sur le bouton, on bascule la classe `cache` ») est exactement la question qu'on vous posera pendant la revue du code source.

## Ressources

- MDN : [`addEventListener`](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener) · [Introduction aux événements](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/Events) · [`removeEventListener`](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/removeEventListener)
- MDN : [`Event.target`](https://developer.mozilla.org/fr/docs/Web/API/Event/target) · [`currentTarget`](https://developer.mozilla.org/fr/docs/Web/API/Event/currentTarget) · [`preventDefault`](https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault)
- MDN : [`input`](https://developer.mozilla.org/fr/docs/Web/API/Element/input_event) · [`keydown`](https://developer.mozilla.org/fr/docs/Web/API/Element/keydown_event) · [`submit`](https://developer.mozilla.org/fr/docs/Web/API/HTMLFormElement/submit_event) · [`aria-expanded`](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)

---

Exercice suivant : [04 — Créer des éléments à partir de données](../04-creer-elements/README.md)
