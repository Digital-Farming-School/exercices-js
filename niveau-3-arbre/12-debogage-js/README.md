# Exercice 12 — Chasse aux bugs JavaScript et régime minceur

**Niveau 3 · Arbre** · ★★★☆ · Durée : 1 h · Notions : lire une erreur de la console, `console.log` / `table` / `error` / `count` / `group`, onglet **Sources** (points d'arrêt, pas à pas, *Watch*, pile d'appels), `debugger`, onglet **Réseau**, erreurs classiques (`TypeError`, `ReferenceError`, `NaN`), `var` / `let`, `===`, `await`, `innerHTML +=`, nettoyage du code, JSDoc, ESLint (bonus)

> La page de commande du marché de la ferme-école a été écrite en vitesse… et **rien ne marche comme prévu** : la page reste vide, des produits manquent, des boutons ne répondent pas, le total affiche un mot étrange. Un collègue a laissé du code de test partout. Votre mission : **retrouver tous les bugs** (1 dans le HTML, 8 dans le JavaScript) avec les outils du navigateur, puis **alléger** le code.

## Objectifs

- Adopter une **méthode** de débogage : reproduire, lire, localiser, corriger **un seul** bug à la fois, retester.
- Lire un message d'erreur de la **console** : type, texte, **fichier et ligne**, pile d'appels.
- Utiliser les **points d'arrêt** et le pas à pas de l'onglet *Sources* pour regarder les variables **pendant** l'exécution.
- Reconnaître les bugs **qui ne font pas d'erreur** (silencieux) : ceux-là, il faut les chercher par les tests.
- Nettoyer un code : retirer le code mort et les `console.log`, supprimer les doublons, **documenter** avec JSDoc.

## Fichiers fournis

```
12-debogage-js/
├── README.md              ← cette consigne
├── index.html             ← la page (contient 1 bug)
├── css/
│   └── style.css          ← correcte (ne la modifiez pas)
├── js/
│   └── script.js          ← contient 8 bugs ET beaucoup de code inutile
├── images/
│   └── marche.svg  tomates.svg
├── apercu-attendu.png     ← à quoi la page doit ressembler quand tout marche
└── eslint.config.mjs      ← pour le bonus (relecteur automatique)
```

> Cette fois, **aucun `TODO`** : le fichier ne vous dit pas où chercher. Les bugs sont volontairement cassés, **ne les réparez pas avant de les avoir compris** : l'intérêt de l'exercice est de les *trouver*.

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, ouvrez la **console** (`F12` → onglet *Console*) et comparez avec `apercu-attendu.png`. Que voyez-vous ? Que dit la console (en rouge) ? Ne touchez à rien pour l'instant.

**Méthode à suivre à chaque bug** (5 minutes par bug en moyenne) :

1. **Reproduire** : quelle action provoque le problème ? (« je clique sur + de Tomates »)
2. **Lire** le message de la console en entier : le **type** (`TypeError`…), le **texte**, et le lien `script.js:123` à droite (cliquez dessus : l'onglet *Sources* s'ouvre sur la ligne).
3. **Localiser** : quelle ligne ? quelle variable vaut autre chose que prévu ? (`console.log`, point d'arrêt)
4. **Formuler une hypothèse**, puis **corriger une seule chose**.
5. **Retester** le même scénario **et** les précédents (une correction peut en révéler un autre).

Tenez un **carnet de bugs** (dans un fichier `bugs.md` à côté du projet, ou sur papier) avec ce tableau, une ligne par bug :

| N° | Symptôme (ce que je vois) | Message de la console | Fichier : ligne | Cause | Correction |
|---|---|---|---|---|---|
| 1 | | | | | |

Complétez ensuite les étapes suivantes :

1. **Le bug du HTML.** La liste des produits est vide et la console affiche une erreur dès le chargement. Lisez-la : sur quelle ligne ? Quel élément vaut `null` ? Pourtant, l'`id` existe bien dans le HTML… **Pourquoi `document.querySelector` ne le trouve-t-il pas à ce moment-là ?** Corrigez **une seule ligne de `index.html`**, puis rechargez.
2. **Les tests de scénario.** Passez en revue la page comme un testeur. Pour chaque scénario, notez ce qui se passe et ce qui devrait se passer :
   - a. Combien y a-t-il de produits dans le fichier `script.js` ? Combien en voit-on à l'écran ? Et avec la case « produits de saison » ?
   - b. Cliquer sur **+** d'un produit.
   - c. Cliquer sur **−** d'un produit absent du panier, puis présent.
   - d. Cliquer sur le **×** d'une ligne du panier.
   - e. Ajouter plusieurs fois des produits, puis cliquer sur **Vider le panier**.
   - f. Regarder le **total** du panier.
   - g. Ajouter **deux favoris** (♥), puis cliquer sur **Retirer** sur le **premier**.
   - h. Cliquer sur **Valider la commande** panier vide, puis panier plein.
3. **Chasse aux 8 bugs.** Pour chaque scénario qui échoue : méthode en 5 étapes ci-dessus. Certains bugs **font une erreur rouge**, d'autres **n'affichent rien** de spécial dans la console : il faut les chercher avec les tests et `console.log` / `console.table`. Aidez-vous de la **boîte à outils** ci-dessous. Après **chaque** correction : rechargez et refaites **tous** les scénarios.
4. **Tour des outils** (à faire avec au moins un des bugs) :
   - **Point d'arrêt** : dans *Sources*, cliquez sur le numéro d'une ligne de `script.js` : un point bleu apparaît. Refaites l'action : le navigateur **s'arrête** sur cette ligne. Survolez une variable pour voir sa valeur. Avancez avec **F10** (ligne suivante) et **F11** (entrer dans la fonction).
   - **Watch** : dans le panneau de droite, ajoutez une expression (`panier.length`, `produit`) : elle est réévaluée à chaque pas.
   - **Pile d'appels** (*Call Stack*) : regardez **qui a appelé** la fonction où vous êtes arrêté.
   - **`debugger;`** : écrire cette instruction dans le code déclenche un point d'arrêt (si F12 est ouvert). À retirer ensuite !
   - **Console** : `console.table(panier)` (un tableau lisible), `console.count("clic")` (compte les passages), `console.group("panier")` … `console.groupEnd()`, `console.error("…")`.
   - **Réseau** : rechargez avec l'onglet *Réseau* ouvert : combien de fichiers sont chargés ? Quelle est la taille de `script.js` ?
5. **Le régime minceur.** Une fois **les 9 bugs corrigés** et tous les scénarios au vert, faites un grand ménage :
   - supprimez le code qui n'est **jamais appelé** (fonctions inutilisées, constantes inutilisées, anciennes versions, blocs mis en commentaire) ;
   - supprimez les **`console.log`** de test et la variable de débogage (`DEBUG`) ;
   - **regroupez les doublons** : deux fonctions presque identiques deviennent une seule avec un paramètre (`changerQuantite(produit, variation)`), trois blocs de création de bouton deviennent une fonction ;
   - ajoutez un **commentaire JSDoc** (`/** … */` avec `@param` et `@returns`) à au moins **4 fonctions importantes** ;
   - mesurez : combien de **lignes de code** (sans les commentaires ni les lignes vides) **avant** le ménage (bugs corrigés) et **après** ? Objectif : **−15 %** au moins.
   ```bash
   wc -l js/script.js        # nombre de lignes
   wc -c js/script.js        # nombre d'octets
   grep -c "console\." js/script.js   # combien de console.* restent ? (objectif : 0)
   ```
   Après chaque suppression : **retestez tous les scénarios**.
6. **Comparez** votre page finale avec `apercu-attendu.png` (même rendu avec un panier de 5 articles).
7. **Bilan** : relisez votre carnet de bugs. Pour chaque bug, écrivez en une phrase **comment l'éviter à l'avenir** (ex. : « toujours mettre `defer` »). Gardez ce carnet : il servira pour la présentation orale du brief.

### Boîte à outils — messages d'erreur courants

| Message | Ce que ça veut dire | Où chercher |
|---|---|---|
| `Cannot read properties of null (reading 'x')` | vous utilisez `.x` sur quelque chose qui vaut `null` (un `querySelector` qui n'a rien trouvé) | le sélecteur, l'`id`/la classe dans le HTML, le **moment** où le script s'exécute |
| `Cannot read properties of undefined (reading 'x')` | idem, mais la valeur vaut `undefined` (variable jamais remplie, mauvais index, `find` sans résultat) | d'où vient la valeur ? `console.log` juste avant |
| `x is not defined` (`ReferenceError`) | un nom n'existe pas (faute de frappe, variable hors de portée) | l'orthographe, la **portée** (`let` dans un bloc `{ }`) |
| `x is not a function` (`TypeError`) | on appelle comme une fonction quelque chose qui n'en est pas une | le nom, l'import, un `await` oublié |
| `NaN` affiché | un calcul avec quelque chose qui n'est pas un nombre (`undefined * 2`, `"abc" - 1`) | une propriété mal écrite, un texte au lieu d'un nombre |
| `Unexpected token` (`SyntaxError`) | le code est mal écrit : parenthèse, accolade, virgule… | la ligne **juste avant** celle indiquée |
| Aucune erreur, mais rien ne se passe | un écouteur n'est pas là, ou pas sur le bon élément, ou une condition est fausse | `console.log` dans la fonction : est-elle appelée ? |

| Famille de bug | Exemples | Comment la trouver |
|---|---|---|
| **Syntaxe** | accolade oubliée, guillemet | l'éditeur la souligne ; la console l'affiche **au chargement** |
| **Exécution** (erreur rouge) | `null`, `undefined`, nom inconnu | le message + la ligne + la pile d'appels |
| **Logique** (aucune erreur) | mauvaise boucle, mauvais calcul, mauvais test | les **scénarios de test**, `console.table`, points d'arrêt |

## Critères de réussite

- [ ] Au chargement, la page affiche les **6** produits et la console est **vide** (aucune erreur, aucun message).
- [ ] **+**, **−**, **×**, « Vider », « Valider » et les favoris fonctionnent dans **tous** les scénarios a → h de l'étape 2.
- [ ] Le total est un nombre exact (ex. : 2 tomates + 1 carotte = **22 DH**), jamais `NaN`.
- [ ] Après plusieurs ajouts, « Vider le panier » ne demande confirmation qu'**une seule fois**.
- [ ] Je retire **n'importe quel** favori, pas seulement le dernier.
- [ ] « Valider » affiche un vrai numéro de commande (`n°1042`, puis `n°1043`).
- [ ] Mon carnet de bugs est rempli pour **9 bugs** (symptôme, message, ligne, cause, correction).
- [ ] J'ai utilisé **au moins un point d'arrêt** et **`console.table`**.
- [ ] Après le régime : **0** `console.*`, **0** `var`, **0** fonction jamais appelée, **au moins 4** commentaires JSDoc, **−15 %** de lignes de code par rapport à la version « bugs corrigés ».
- [ ] La page ressemble à `apercu-attendu.png`.

## Indices

<details>
<summary>Indice 1 — Je ne comprends pas pourquoi le HTML pose problème</summary>

Le navigateur lit la page **de haut en bas**. Quand il rencontre `<script src="…">` dans le `<head>`, il l'exécute **tout de suite**… avant d'avoir lu le `<body>`. À ce moment-là, la liste des produits n'existe pas encore : `querySelector` renvoie `null`. Il existe un **attribut** de la balise `<script>` qui dit « attends que la page soit lue avant de m'exécuter ». (Vous l'avez vu dans les exercices précédents.)

</details>

<details>
<summary>Indice 2 — Il manque un produit, et la console ne dit rien</summary>

Un bug **silencieux** : aucune erreur, le résultat est simplement faux. Comparez deux nombres : `produits.length` et le nombre de `<li>` affichés. Si la boucle s'arrête **trop tôt**, regardez la **condition d'arrêt** de la boucle `for`. Cherchez un « + 1 » ou un « − 1 » suspect.

</details>

<details>
<summary>Indice 3 — Le bouton + ne marche pas : « Cannot read properties of undefined »</summary>

Regardez dans quelle fonction l'erreur arrive, puis **posez un point d'arrêt** au début de la fonction qui lit `bouton.dataset.id`. Dans *Watch*, ajoutez `typeof bouton.dataset.id` et `typeof produits[0].id`. Sont-ce les mêmes types ? Que renvoie `"1" === 1` dans la console ?

</details>

<details>
<summary>Indice 4 — Le bouton × plante, mais « i » a l'air correct…</summary>

Mettez un point d'arrêt **dans la fonction du clic** (celle qui s'exécute quand on clique), pas dans la boucle. Regardez la valeur de `i` **à ce moment-là**, et comparez avec `panier.length`. Pourquoi `i` a-t-il cette valeur ? Quand a fini la boucle ? Que change le mot-clé `let` à la place de `var` ?

</details>

<details>
<summary>Indice 5 — « Vider le panier » ouvre la boîte de dialogue plusieurs fois</summary>

Combien de fois la ligne `addEventListener` est-elle exécutée ? Mettez-y un `console.count("écouteur posé")` et ajoutez trois produits. Dans quelle fonction se trouve-t-elle, et combien de fois cette fonction est-elle appelée ? Un écouteur doit être posé **une seule fois**, au chargement.

</details>

<details>
<summary>Indice 6 — Le total affiche NaN, sans erreur rouge</summary>

`NaN` (*Not a Number*) apparaît quand on calcule avec `undefined`. Dans la fonction qui calcule le total, affichez `console.log(ligne.produit)` : lisez **chaque** nom de propriété et comparez-les **lettre par lettre** avec ceux du tableau `produits`.

</details>

<details>
<summary>Indice 7 — Le premier favori ne se retire pas, le dernier si</summary>

Regardez comment la ligne du favori est **ajoutée** à la liste : avec `innerHTML +=`. Que fait `+=` sur `innerHTML` ? Il lit **tout** le HTML de la liste sous forme de texte, y ajoute le nouveau morceau, puis **recrée tous les éléments** à partir de ce texte. Que deviennent alors les écouteurs posés sur les anciens boutons ? Cherchez une autre façon d'ajouter un élément (`createElement` + `append`).

</details>

<details>
<summary>Indice 8 — Valider : « Cannot set properties of null », puis « n°undefined »</summary>

Ce sont **deux bugs différents**, l'un derrière l'autre. Le premier : comparez le sélecteur utilisé avec le HTML (`.` = classe, `#` = id). Le second : la fonction `envoyerCommande` renvoie une **promesse** (elle met 0,8 s à répondre). Que contient `resultat` juste après l'appel ? (`console.log(resultat)` : vous verrez `Promise {<pending>}`.) Relisez l'exercice 11 : quel mot-clé permet d'attendre la réponse ?

</details>

## Bonus

- **ESLint**, le relecteur automatique : dans le dossier de l'exercice, `npx eslint js/script.js` (Node.js requis, la configuration `eslint.config.mjs` est fournie). Quels bugs ou quelles saletés détecte-t-il **sans exécuter** la page ? Lesquels échappent à l'outil ? Après le régime, la sortie doit être vide.
- Ajoutez `console.assert(calculerTotal() >= 0, "total négatif")` : une assertion n'affiche quelque chose **que si** la condition est fausse.
- Dans *Réseau*, choisissez la vitesse « 3G lente » : le bouton « Valider » attend 0,8 s, mais est-il protégé contre un double clic ? (Regardez la ligne `boutonValider.disabled`.)
- **Points d'arrêt conditionnels** : clic droit sur le numéro d'une ligne → *Ajouter un point d'arrêt conditionnel* → `produit.id === 3`.
- Écrivez un **vrai test** : une fonction `verifier()` qui simule trois clics sur + et vérifie que `calculerTotal()` donne la bonne valeur, et affiche `console.assert` en cas d'écart.
- Ajoutez un **scénario de plus** (un bug que le coach n'a pas prévu ?) : le bouton « − » sur la dernière unité d'un produit en retire-t-il bien la ligne ?

## Questions de compréhension

1. Quelle différence entre une erreur de **syntaxe**, une erreur d'**exécution** et un bug de **logique** ? Lequel est le plus dur à trouver ? Pourquoi ?
2. Pourquoi un script placé dans le `<head>` sans `defer` ne trouve-t-il pas les éléments du `<body>` ?
3. Que se passe-t-il quand une exception n'est pas rattrapée : le reste du script continue-t-il ?
4. Pourquoi `"3" === 3` est-il faux ? Quelles sources de nombres sous forme de **texte** connaissez-vous (`dataset`, `input.value`, `FormData`, `localStorage`) ?
5. Pourquoi, avec `var` dans une boucle, tous les écouteurs utilisent-ils la même valeur de `i` ? En quoi `let` règle-t-il le problème ?
6. Pourquoi `innerHTML += …` casse-t-il les écouteurs des éléments déjà présents ?
7. Qu'est-ce que `await` attend ? Que contient la variable si on l'oublie ?
8. Pourquoi ne faut-il pas laisser des `console.log` dans une page livrée ? Et du code mort ?
9. Qu'est-ce qu'un point d'arrêt apporte de plus qu'un `console.log` ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 se termine par une **présentation individuelle** : « démonstration de la page, **revue et explication du code source**, évaluation des savoirs techniques (Q/A) », et il note « la **bonne maîtrise et compréhension** des concepts techniques implémentés ». Un jury peut vous demander d'expliquer une erreur dans la console, ou d'ouvrir F12 pour trouver pourquoi un bouton ne répond pas : vous venez de vous entraîner exactement à cela. Avant de rendre votre brief : **console vide** (aucune erreur, aucun `console.log` oublié), pas de code mort, fonctions commentées, noms de variables clairs (critère « convention d'appellation »). Gardez aussi à portée de main votre **carnet de bugs** : « voici un bug que j'ai rencontré, voici comment je l'ai trouvé » est une excellente réponse à l'oral.

## Ressources

- Chrome DevTools : [Déboguer JavaScript](https://developer.chrome.com/docs/devtools/javascript) · [Référence de la console](https://developer.chrome.com/docs/devtools/console/api) · Firefox : [Débogueur](https://firefox-source-docs.mozilla.org/devtools-user/debugger/index.html)
- MDN : [Erreurs courantes JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Errors) · [`console`](https://developer.mozilla.org/fr/docs/Web/API/console) · [`debugger`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/debugger) · [`<script defer>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/script#defer)
- MDN : [`var`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/var) · [`let`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let) · [Égalité stricte `===`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Strict_equality) · [`Element.innerHTML`](https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML) · [`NaN`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/NaN)
- [JSDoc](https://jsdoc.app/) · [ESLint](https://eslint.org/)

---

Exercice suivant : [13 — Défi : « Le potager connecté »](../../niveau-4-recolte/13-defi-potager-connecte/README.md)
