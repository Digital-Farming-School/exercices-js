# Exercice 01 — Mon premier script

**Niveau 1 · Graine** · ★☆☆☆ · Durée : 30 min · Notions : `<script defer>`, console (`console.log`, `warn`, `error`), variables (`const`, `let`), types (`typeof`), gabarits de texte, `Date`, fonctions, `if` / `else`, erreurs courantes, point d'arrêt

> Le tableau d'affichage de la ferme-école est affiché dans le hall… mais il est **figé** : le message d'accueil est vide, le compteur indique « -- » et la date n'est pas à jour. Votre mission : écrire votre tout premier script pour que la page calcule **combien de jours il reste avant la récolte du maïs** et s'adapte toute seule.

## Qu'est-ce que JavaScript dans un navigateur ?

- **HTML** décrit le contenu, **CSS** décrit l'apparence, **JavaScript** décrit le **comportement** : réagir à un clic, calculer, modifier la page sans la recharger.
- Le navigateur lit votre HTML, construit un arbre d'éléments appelé le **DOM** (*Document Object Model*), puis exécute votre script. Le script peut **lire et modifier** cet arbre : c'est ce que le brief appelle « *manipulation du DOM avec JS* ».
- Dans cette série, on n'utilise **aucune bibliothèque** : du JavaScript « pur ».

**Ouvrir la console** : touche `F12` (ou `Ctrl + Maj + J` sous Chrome, `Ctrl + Maj + K` sous Firefox), onglet **Console**. C'est le carnet de bord du script : il y écrit des messages et y signale ses erreurs. Vous pouvez aussi **taper du JavaScript directement dans la console** pour essayer une idée (par exemple `2 + 2`, ou `document.title`).

## Objectifs

- Relier un script à une page avec `<script src="…" defer>`.
- Utiliser la **console** pour afficher des valeurs et lire des messages d'erreur.
- Déclarer des **variables** avec `const` et `let`, connaître les types de base (texte, nombre, booléen).
- Fabriquer une phrase avec un **gabarit** (`` `…${variable}…` ``) et l'écrire dans la page.
- Calculer avec une **date** et regrouper un calcul dans une **fonction**.
- Choisir entre plusieurs messages avec `if` / `else if` / `else`.
- Lire une erreur, trouver sa ligne, la corriger, et poser un **point d'arrêt**.

## Règles du jeu

- **Tapez le code vous-même.** Pas de copier-coller depuis Internet ou une IA : c'est en tapant qu'on retient.
- **Pas de bibliothèque** (jQuery, etc.) : le brief l'interdit.
- **Commentez votre code** en français, avec `//`, et indentez de **2 espaces**.
- **`const` par défaut, `let` si la valeur doit changer**, jamais `var`.
- **Noms en français, en `camelCase`** : `nomFerme`, `joursRestants` (pas `nom_ferme`, pas `x`).

## Fichiers fournis

```
01-premier-script/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← la feuille de style (complète)
├── js/
│   └── script.js      ← VOTRE fichier : les TODO attendent votre code
└── images/
    └── mais.svg
```

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- lisez la page : qu'est-ce qui est « vide » ou faux ? (message d'accueil, « -- », date…)
- ouvrez `index.html` dans VS Code et repérez la ligne `<script src="js/script.js" defer></script>` dans le `<head>`. Le mot `defer` demande au navigateur d'attendre que **toute la page soit lue** avant d'exécuter le script. Sans lui, le script chercherait des éléments qui n'existent pas encore.
- ouvrez la console (`F12`) : elle est vide. Tapez `2 + 2` puis `Entrée`, puis `document.title`. Que répond-elle ?

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO`) :

1. **Parler à la console.** Écrivez `console.log("Bonjour depuis le script de la ferme-école !");`, enregistrez, regardez la console. Ajoutez ensuite `console.warn("…")` (message jaune) et `console.error("…")` (message rouge) avec le texte de votre choix. Un `console.error` n'arrête **pas** le script : c'est seulement un message.
2. **Des variables.**
   - Avec `const`, déclarez `nomFerme` (le texte `"Ferme-école des Trois Collines"`), `nombreApprenants` (un nombre, par exemple `24`) et `recolteTerminee` (le booléen `false`).
   - Affichez le **type** de chacune avec `console.log(typeof nomFerme);` (et les deux autres). Vous devez voir `string`, `number`, `boolean`.
   - Avec `let`, déclarez `compteur` à `0`, ajoutez-lui `1` (`compteur = compteur + 1;`) et affichez-le. Puis essayez de modifier `nomFerme` : que dit la console ? Supprimez cet essai.
3. **Un message d'accueil.** Fabriquez, dans une variable `messageAccueil`, une phrase avec un **gabarit** entre accents graves (`` ` ``) : `` `Bienvenue à la ${nomFerme} : ${nombreApprenants} apprenants sont inscrits cette saison.` ``. Écrivez-la dans la page avec `document.querySelector("#message-accueil").textContent = messageAccueil;` (le sens de cette ligne sera expliqué à l'exercice 02 : pour l'instant, recopiez-la en remplaçant la valeur à droite du `=`).
4. **La date du jour.** `const aujourdhui = new Date();` donne la date et l'heure de l'ordinateur. Mettez-la en forme avec `aujourdhui.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })` et écrivez le résultat dans l'élément `#date-du-jour` (même méthode qu'à l'étape 3).
5. **Compter les jours avant la récolte.** `dateRecolte` (le 15 décembre 2026) est déjà déclarée.
   - Écrivez une **fonction** `joursAvant(dateCible)` : elle crée `const maintenant = new Date();`, calcule `const difference = dateCible - maintenant;` (une durée en **millisecondes**), puis `return Math.ceil(difference / MILLISECONDES_PAR_JOUR);`. Déclarez avant la constante `MILLISECONDES_PAR_JOUR` : `24 * 60 * 60 * 1000`.
   - Appelez-la : `const joursRestants = joursAvant(dateRecolte);` et affichez le résultat avec `console.log("Jours restants :", joursRestants);`.
   - Écrivez ce nombre dans l'élément `#jours-restants`.
6. **Des messages selon la situation.** Avec `if` / `else if` / `else`, écrivez dans `#message-recolte` :
   - plus de 7 jours : « Il reste du temps : continuez l'arrosage et le désherbage. » ;
   - de 1 à 7 jours : « C'est bientôt ! Préparez les caisses et les couteaux. » ;
   - exactement 0 : « C'est aujourd'hui : à la récolte ! » ;
   - sinon (la date est passée) : « La récolte est terminée… » et affichez **0** (jamais un nombre négatif) dans `#jours-restants`.

   Écrivez aussi « jour » ou « jours » dans `#unite-jours` avec l'opérateur ternaire : `joursRestants > 1 ? "jours" : "jour"`. **Test** : changez `dateRecolte` pour une date de la semaine prochaine, puis pour une date passée, et vérifiez chaque message. Remettez la date d'origine.
7. **Provoquer et lire des erreurs.** Une erreur n'est pas un échec : c'est une **indication**. À la fin du fichier, ajoutez ces deux lignes **l'une après l'autre** (une seule à la fois), enregistrez, ouvrez la console :
   - `console.log(nomFerm);` → quelle erreur ? Lisez le nom (`ReferenceError`), le message, et le **nom du fichier avec le numéro de ligne** à droite : cliquez dessus. Corrigez la faute de frappe.
   - `const phrase = "Bonjour;` (guillemet jamais fermé) → quelle erreur ? (`SyntaxError`). Corrigez-la.
   Supprimez ensuite ces lignes de test (ou laissez-les en commentaire, comme dans la solution).
8. **Poser un point d'arrêt.** Dans les outils de développement, onglet **Sources** (Chrome) ou **Débogueur** (Firefox) : ouvrez `script.js`, cliquez sur le **numéro de ligne** de `const difference = …` dans `joursAvant`, puis rechargez la page. Le script **s'arrête** sur cette ligne. Survolez `dateCible` et `maintenant` pour lire leur valeur, puis cliquez sur le bouton ▶ (reprendre). Cliquez à nouveau sur le numéro de ligne pour retirer le point d'arrêt.
9. **Relecture.** Votre console ne doit afficher **aucune erreur rouge involontaire**. Vérifiez que chaque partie du fichier est précédée de son commentaire et que l'indentation est régulière.

### Mémo — les premières briques de JavaScript

| Brique | Exemple | À retenir |
|---|---|---|
| `console.log(…)` | `console.log("Bonjour", nomFerme);` | Affiche des valeurs dans la console : l'outil n° 1 du développeur. |
| `const` | `const nomFerme = "…";` | Valeur qui ne sera pas réaffectée. À utiliser **par défaut**. |
| `let` | `let compteur = 0;` | Valeur qui va changer. |
| Types | `"texte"` · `24` · `true` / `false` | `string`, `number`, `boolean`. `typeof x` donne le type. |
| Gabarit | `` `Il reste ${jours} jours` `` | Accents graves + `${…}` : insère une valeur dans un texte. |
| Date | `new Date()` | Date et heure actuelles. Soustraire deux dates donne des **millisecondes**. |
| Fonction | `function joursAvant(date) { … return … }` | Un bloc de code réutilisable, qui peut **renvoyer** une valeur. |
| Condition | `if (…) { … } else if (…) { … } else { … }` | Choisit quoi faire selon une situation. |
| Comparaison | `===` · `!==` · `>` · `<` | Utilisez `===` (égalité stricte), pas `==`. |
| Erreurs | `ReferenceError` · `SyntaxError` · `TypeError` | Le nom dit le **type** du problème ; la console donne le fichier et la ligne. |

## Critères de réussite

- [ ] La console affiche mes trois messages (`log`, `warn`, `error`) et les trois `typeof`.
- [ ] Le message d'accueil de l'en-tête est une phrase construite avec mes variables.
- [ ] La date du jour est écrite en français (par exemple « mercredi 25 novembre 2026 »).
- [ ] Le compteur indique le bon nombre de jours et « jour » est au singulier quand il en reste 1 ou 0.
- [ ] J'ai testé les 4 cas de message (plus de 7 jours, de 1 à 7, aujourd'hui, date passée).
- [ ] La fonction `joursAvant` renvoie une valeur (elle contient `return`) et n'écrit rien dans la page.
- [ ] J'ai provoqué, lu puis corrigé un `ReferenceError` et un `SyntaxError`.
- [ ] Le script utilise `const` / `let` (pas de `var`), des noms en français et des commentaires.
- [ ] La console ne montre aucune erreur rouge involontaire.

## Indices

<details>
<summary>Indice 1 — La page n'a pas changé</summary>

Trois suspects, dans cet ordre : (1) avez-vous **enregistré** (`Ctrl + S`) ? (2) la console affiche-t-elle une erreur rouge, par exemple « Failed to load resource » (chemin du `<script>` faux) ? (3) l'erreur est-elle plus haut dans le fichier ? Quand une ligne plante, **les lignes suivantes ne sont pas exécutées**.

</details>

<details>
<summary>Indice 2 — « Uncaught TypeError: Cannot set properties of null »</summary>

`document.querySelector("#mesage-accueil")` n'a trouvé aucun élément (faute de frappe dans l'identifiant) et a donc renvoyé `null`. Comparez avec l'attribut `id` dans `index.html` : le `#` du sélecteur correspond à `id="…"`. Vous retrouverez cette erreur à l'exercice 02.

</details>

<details>
<summary>Indice 3 — Le compteur affiche NaN</summary>

`NaN` signifie « *Not a Number* » : un calcul a reçu autre chose qu'un nombre. Vérifiez que `dateRecolte` est bien écrite `"2026-12-15T00:00:00"` (format `AAAA-MM-JJ`) et que vous soustrayez deux **dates**, pas des textes. Affichez chaque morceau avec `console.log` pour trouver l'intrus.

</details>

<details>
<summary>Indice 4 — Je vois « -0 » ou un nombre négatif</summary>

Si la date de récolte est passée, la différence est négative : c'est le rôle du dernier `else` de l'étape 6 d'afficher `0` à la place. Pensez aussi à l'ordre des conditions : la plus précise (`=== 0`) doit être testée **avant** les plus larges.

</details>

<details>
<summary>Indice 5 — Pourquoi <code>Math.ceil</code> ?</summary>

Entre aujourd'hui à 10 h et le 15 décembre à minuit, il reste par exemple 19,6 jours. `Math.ceil` arrondit **vers le haut** (20) ; `Math.floor` arrondirait vers le bas (19) et `Math.round` au plus proche. Pour un compte à rebours « jours entamés », on arrondit vers le haut : essayez les trois et comparez.

</details>

## Bonus

- Affichez dans la console `console.table({ nomFerme, nombreApprenants, recolteTerminee })` : que remarquez-vous ?
- Ajoutez une deuxième culture (par exemple l'arachide, récolte le 2 janvier 2027) et réutilisez `joursAvant` : à quoi sert une **fonction** ?
- Affichez aussi l'heure (`toLocaleTimeString("fr-FR")`). Elle ne bouge pas toute seule : à quoi faudrait-il recourir pour qu'elle se mette à jour chaque seconde ? (réponse à l'exercice 09)
- Remplacez `nombreApprenants` par `"24"` (avec des guillemets) puis affichez `nombreApprenants + 1` : que se passe-t-il ? Pourquoi ?

## Questions de compréhension

1. À quoi sert l'attribut `defer` sur la balise `<script>` ? Que se passerait-il sans lui ?
2. Quelle différence entre `const` et `let` ? Lequel choisir par défaut ?
3. Que vaut `typeof "24"` ? Et `typeof 24` ? Pourquoi `"24" + 1` donne-t-il `"241"` ?
4. Une fonction qui contient `return` et une fonction qui n'en contient pas : quelle différence ?
5. Que signifie `ReferenceError: nomFerm is not defined` et comment la trouve-t-on dans le code ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 impose la « **manipulation du DOM avec JS** » : ce premier script en est la première pierre. La console est aussi votre meilleur outil pour **déboguer** le menu, les animations et les capsules vidéo de votre page. Vous pourrez, par exemple, calculer l'âge d'une plante ou le nombre de jours depuis le semis à partir d'une date, comme on vient de le faire pour la récolte.

## Ressources

- MDN : [Premiers pas avec JavaScript](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) · [`console`](https://developer.mozilla.org/fr/docs/Web/API/console)
- MDN : [`const`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const) · [`let`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let) · [`typeof`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/typeof) · [Gabarits de chaînes](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Template_literals)
- MDN : [`Date`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date) · [`Math.ceil`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) · [Fonctions](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions) · [`<script>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/script)
- Outils : [Chrome DevTools — console](https://developer.chrome.com/docs/devtools/console) · [Firefox — console web](https://firefox-source-docs.mozilla.org/devtools-user/web_console/index.html)

---

Exercice suivant : [02 — Sélectionner et modifier la page](../02-selectionner-modifier/README.md)
