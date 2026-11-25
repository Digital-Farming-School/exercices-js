# Exercice 02 — Sélectionner et modifier la page

**Niveau 1 · Graine** · ★★☆☆ · Durée : 45 min · Notions : DOM, `querySelector`, `querySelectorAll`, `NodeList`, `textContent`, `classList`, `getAttribute` / `setAttribute`, `dataset`, `style` ou classe, `parentElement`, `children`, `closest`

> La ferme-école publie une **fiche plante** pour chaque légume du potager. Celle de la tomate est en ligne, mais elle n'est pas terminée : l'image n'a pas de vraie description, le conseil est caché, la pastille d'état ne dit rien d'utile et personne n'a compté les caractéristiques. Votre mission : **retrouver les bons éléments de la page avec JavaScript, puis les modifier**.

## Objectifs

- Comprendre que le navigateur transforme la page en un **arbre d'éléments** (le **DOM**) que le script peut parcourir.
- **Sélectionner** un élément (`querySelector`) ou plusieurs (`querySelectorAll`) avec des sélecteurs CSS.
- Modifier un **texte** (`textContent`), des **classes** (`classList`), des **attributs** (`setAttribute`, `dataset`).
- Choisir entre **style en ligne** et **classe**, et savoir pourquoi la classe est préférable.
- **Naviguer** d'un élément à son parent, à ses frères et à ses enfants.
- Reconnaître et éviter l'erreur la plus fréquente : `null` quand le sélecteur ne trouve rien.

## Fichiers fournis

```
02-selectionner-modifier/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← la feuille de style (complète)
├── js/
│   └── script.js      ← VOTRE fichier : les TODO attendent votre code
└── images/
    └── tomate.svg
```

## Consigne

**Étape 0 — Observation (10 min).** Ouvrez `index.html` avec Live Server, puis ouvrez `F12` → onglet **Éléments**.

- Dépliez l'arbre : vous voyez les balises de `index.html`, imbriquées. C'est le **DOM**. Chaque balise est un **nœud** : le `<ul>` est le **parent** des `<li>`, qui sont ses **enfants** et sont **frères** entre eux.
- Dans la page, la liste de caractéristiques est visible mais le « Conseil » est absent : trouvez-le dans l'onglet Éléments (`<div class="alerte cache" …>`). Quelle classe le cache ?
- Cliquez sur la pastille « En croissance » dans l'arbre : repérez ses attributs `data-etat` et `data-jours`.
- Dans l'onglet **Console**, tapez `document.querySelector("h1")` puis `Entrée` : la console renvoie l'élément. Tapez `document.querySelectorAll("li")` : combien en trouve-t-elle ?

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO`) :

1. **Sélectionner un élément.**
   - `const titreFiche = document.querySelector("#titre-fiche");` : le sélecteur est **le même qu'en CSS** (`#` pour un `id`, `.` pour une classe). `querySelector` renvoie le **premier** élément trouvé.
   - Affichez `titreFiche` avec `console.log` : la console montre l'élément (survolez-le : il se surligne dans la page).
   - Changez son texte : `titreFiche.textContent = "La tomate cerise";`. Rechargez la page : que se passe-t-il ?
2. **Sélectionner plusieurs éléments.**
   - `const caracteristiques = document.querySelectorAll(".caracteristiques li");` renvoie une **NodeList** (une liste d'éléments).
   - Affichez `caracteristiques.length` avec un gabarit : `` `Il y a ${caracteristiques.length} caractéristiques` ``.
   - Parcourez-les avec `caracteristiques.forEach(function (caracteristique, index) { … });` et affichez dans la console l'`index` et le `textContent` de chacune.
3. **Les classes.**
   - Ajoutez la classe `mise-en-avant` au **premier** `<li>` : `caracteristiques[0].classList.add("mise-en-avant");` (les indices commencent à **0**).
   - Sélectionnez `#conseil` et **retirez** la classe `cache` avec `classList.remove("cache")` : le conseil apparaît.
   - Testez `classList.toggle("mise-en-avant")` deux fois de suite sur le premier `<li>`, puis `console.log(…classList.contains("mise-en-avant"))`. Qu'affiche la console, et pourquoi ?
4. **Les attributs et les données.**
   - Lisez l'attribut `alt` de la photo (`#photo-plante`) avec `getAttribute("alt")` : « tomate » n'aide pas une personne qui ne voit pas l'image. Remplacez-le par une vraie description avec `setAttribute("alt", "…")`.
   - Sur le lien `#lien-source`, changez `href` (par exemple vers `https://fr.wikipedia.org/wiki/Tomate#Culture`), puis ajoutez `target="_blank"` **et** `rel="noopener noreferrer"` avec `setAttribute`.
   - Les attributs `data-…` se lisent avec `dataset` : `pastille.dataset.etat` correspond à `data-etat`, `pastille.dataset.jours` à `data-jours`. Affichez les deux dans la console.
5. **Style en ligne ou classe ?**
   - Essayez `photo.style.border = "4px solid green";` : regardez dans l'onglet Éléments, un attribut `style="…"` est apparu sur l'`<img>`.
   - Supprimez cette ligne (mettez-la en commentaire avec la raison) et obtenez le même résultat avec **la classe** `contour` : `photo.classList.add("contour");`. Le CSS de la page définit déjà cette classe.
6. **Naviguer dans l'arbre.** À partir de `caracteristiques[0]`, affichez dans la console :
   - `parentElement` (le `<ul>`) et `children.length` du parent (le nombre d'enfants éléments) ;
   - `nextElementSibling` (le frère suivant) ;
   - `closest("article")` (l'ancêtre `<article>` le plus proche).

   Écrivez ensuite dans `#nb-caracteristiques` : « Nombre de caractéristiques : 5 », en utilisant `liste.children.length` et un gabarit.
7. **La pastille d'état.**
   - `pastille.dataset.jours` contient `"5"` : c'est un **texte**, pas un nombre. Convertissez-le avec `Number(…)`.
   - Avec `if` / `else if` / `else`, selon ce nombre de jours : **0 ou moins** → texte « Prête à cueillir » et `dataset.etat = "pret"` ; **de 1 à 7** → texte « Récolte dans N jours » et `dataset.etat = "bientot"` ; **plus de 7** → « En croissance » et `"en-croissance"`.
   - Le CSS change la couleur de la pastille tout seul d'après `data-etat`. **Test** : changez `data-jours` dans `index.html` (0, 5, 30), rechargez, puis remettez 5.
8. **Texte ou HTML ? Et si l'élément n'existe pas ?**
   - Testez `titreFiche.innerHTML = "La <em>tomate</em> cerise";` : la balise est interprétée (« tomate » en italique). Avec `textContent`, la balise s'afficherait telle quelle. Remettez `textContent` : c'est le choix **sûr** (l'exercice 04 explique pourquoi).
   - Écrivez `const elementAbsent = document.querySelector("#titre-inexistant");` et affichez-le : `null`. Essayez ensuite `elementAbsent.textContent = "x";` : quelle erreur ? (lisez bien le message). Protégez l'instruction avec `if (elementAbsent !== null) { … }` et supprimez votre essai fautif.
9. **Validez** : la console ne doit afficher **aucune erreur rouge** (seul le `console.warn` éventuel de l'étape 8 est accepté). Contrôlez la page en navigation au clavier : le lien « En savoir plus » doit rester atteignable avec `Tab`.

### Mémo — sélectionner et modifier

| Ce que je veux | Code | À retenir |
|---|---|---|
| Un élément | `document.querySelector("#id")` · `("h1")` · `(".classe")` | Sélecteur CSS. Renvoie le **premier** élément, ou `null`. |
| Plusieurs éléments | `document.querySelectorAll("li")` | Renvoie une **NodeList** (`length`, `forEach`, `[0]`). Même vide, ce n'est jamais `null`. |
| Le texte | `element.textContent = "…"` | Remplace le texte. Sûr : aucune balise n'est interprétée. |
| Les classes | `classList.add` · `remove` · `toggle` · `contains` | Ne touche pas aux autres classes. À préférer à `style`. |
| Un attribut | `getAttribute("alt")` · `setAttribute("alt", "…")` | Pour `href`, `src`, `alt`, `target`, `aria-*`… |
| Une donnée | `element.dataset.jours` | Lit `data-jours`. Toujours du **texte** : `Number(…)` pour calculer. |
| Le parent | `element.parentElement` | Un seul parent. |
| Les enfants | `element.children` | Collection des enfants **éléments**. |
| Le frère suivant | `element.nextElementSibling` | `null` s'il n'y en a pas. |
| L'ancêtre le plus proche | `element.closest("article")` | Remonte dans l'arbre jusqu'à trouver ce sélecteur. |

## Critères de réussite

- [ ] Le titre de la page affiche « La tomate cerise » grâce au script (le fichier HTML n'a pas changé).
- [ ] La console affiche le nombre de caractéristiques et leur texte, une par une.
- [ ] Le premier élément de la liste est mis en avant et le conseil est visible.
- [ ] L'attribut `alt` de la photo est une phrase qui décrit vraiment l'image.
- [ ] Le lien s'ouvre dans un nouvel onglet **avec** `rel="noopener noreferrer"`.
- [ ] La photo est encadrée grâce à une **classe**, pas à un attribut `style`.
- [ ] « Nombre de caractéristiques : 5 » est affiché, calculé par le script (pas écrit à la main).
- [ ] La pastille change de texte et de couleur selon `data-jours`, et j'ai testé les trois cas.
- [ ] Je sais expliquer pourquoi `document.querySelector("#titre-inexistant")` donne `null` et ce que provoque `null.textContent`.
- [ ] La console ne montre aucune erreur rouge.

## Indices

<details>
<summary>Indice 1 — « Cannot set properties of null (setting 'textContent') »</summary>

`querySelector` n'a rien trouvé et a renvoyé `null`. Causes habituelles : faute de frappe dans le sélecteur, `#` oublié (pour un `id`) ou `.` oublié (pour une classe), ou bien le script s'exécute avant que la page soit lue (vérifiez `defer` dans le `<head>`). Affichez la variable avec `console.log` : si la console répond `null`, le problème est le sélecteur.

</details>

<details>
<summary>Indice 2 — « querySelectorAll(...).textContent » ne donne rien d'utile</summary>

`querySelectorAll` renvoie une **liste** d'éléments, pas un élément. Il faut soit choisir un élément (`liste[0]`), soit **parcourir** la liste avec `forEach` et agir sur chaque élément.

</details>

<details>
<summary>Indice 3 — Mon <code>classList.add("mise en avant")</code> plante</summary>

`classList.add` n'accepte pas d'espace dans un nom de classe (`InvalidCharacterError`). Utilisez le nom exact du CSS : `mise-en-avant`, avec des tirets. Pour ajouter deux classes : `classList.add("a", "b")`.

</details>

<details>
<summary>Indice 4 — La pastille ne change jamais de couleur</summary>

Vérifiez que vous écrivez `pastille.dataset.etat = "bientot";` (sans accent, avec exactement les mêmes valeurs que dans la feuille de style : `en-croissance`, `bientot`, `pret`). Regardez l'attribut dans l'onglet Éléments : a-t-il changé ? Si oui mais pas la couleur, la valeur ne correspond à aucun sélecteur CSS.

</details>

<details>
<summary>Indice 5 — Ma comparaison avec <code>data-jours</code> donne un résultat bizarre</summary>

`dataset.jours` vaut `"5"` (texte). La comparaison `"5" <= 7` fonctionne par conversion automatique, mais `"5" + 2` donne `"52"`. Convertissez toujours **d'abord** : `const jours = Number(pastille.dataset.jours);`. Un texte non numérique (`Number("abc")`) donne `NaN`.

</details>

## Bonus

- Remplacez le `forEach` de l'étape 2 par une boucle `for (const caracteristique of caracteristiques) { … }` : laquelle trouvez-vous la plus lisible ?
- Ajoutez dans le HTML une classe `important` aux deux `<strong>` de votre choix et sélectionnez-les tous avec `querySelectorAll(".important")`. Puis sélectionnez le premier `<strong>` de **chaque** `<li>` avec un seul sélecteur (`.caracteristiques li strong`) et ajoutez-leur la classe `important`.
- Utilisez `classList.replace("cache", "visible")` : que se passe-t-il si `visible` n'existe pas dans le CSS ?
- Écrivez une fonction `changerEtat(pastille, jours)` qui regroupe l'étape 7 et appelez-la avec 0, 5 et 30.

## Questions de compréhension

1. Qu'est-ce que le DOM ? Quelle différence avec le fichier HTML que vous écrivez ?
2. Quelle différence entre `querySelector` et `querySelectorAll` ? Que renvoie chacun quand rien ne correspond ?
3. Pourquoi préfère-t-on `classList.add("contour")` à `element.style.border = "…"` ?
4. Pourquoi `dataset.jours` doit-il être converti avec `Number()` avant un calcul ?
5. Que signifie `TypeError: Cannot read properties of null` et comment l'éviter ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande de « **manipuler le DOM avec JS** ». Toutes les fonctionnalités de votre page (afficher une étape, mettre en valeur la rubrique active du menu, afficher un conseil, ouvrir une légende d'image) commencent par ces deux gestes : **sélectionner** un élément, puis **modifier** son texte, ses classes ou ses attributs. Habituez-vous à toujours faire changer une **classe** au JavaScript et à laisser le CSS décider de l'apparence : c'est aussi ce qui garde votre code lisible, comme le demandent les critères de performance du brief (conventions de nommage, code organisé).

## Ressources

- MDN : [Introduction au DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction) · [`querySelector`](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector) · [`querySelectorAll`](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll)
- MDN : [`textContent`](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent) · [`classList`](https://developer.mozilla.org/fr/docs/Web/API/Element/classList) · [`setAttribute`](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute) · [`dataset`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset)
- MDN : [`parentElement`](https://developer.mozilla.org/fr/docs/Web/API/Node/parentElement) · [`children`](https://developer.mozilla.org/fr/docs/Web/API/Element/children) · [`closest`](https://developer.mozilla.org/fr/docs/Web/API/Element/closest) · [`NodeList`](https://developer.mozilla.org/fr/docs/Web/API/NodeList)

---

Exercice suivant : [03 — Réagir aux actions de l'utilisateur](../03-evenements/README.md)
