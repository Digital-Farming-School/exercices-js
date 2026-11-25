# Exercice 11 — Des fiches qui viennent d'un fichier : JSON et fetch

**Niveau 3 · Arbre** · ★★★☆ · Durée : 1 h · Notions : JSON, `fetch`, `async` / `await`, `response.ok`, `try … catch … finally`, `<template>`, `filter`, `sort`, `includes`, `normalize`, anti-rebond avec `setTimeout`, Live Server (`file://` contre `http://`)

> La ferme-école veut un **herbier numérique** : quinze plantes cultivées au jardin, avec leur famille, leur cycle, leurs besoins en eau et en lumière. Écrire quinze fiches à la main dans le HTML serait long et pénible à corriger. Mieux : les données vivent dans **un fichier** (`data/plantes.json`) et JavaScript construit les fiches. Votre mission : charger ce fichier, **gérer les pannes**, puis permettre de **chercher, filtrer et trier**.

## Objectifs

- Lire et comprendre un fichier **JSON** (tableau d'objets).
- Charger des données avec **`fetch`** et **`async` / `await`**.
- Gérer les **trois sortes de pannes** : réseau, erreur HTTP (404), données abîmées.
- Ne jamais faire confiance à des données venues de l'extérieur : les **vérifier**.
- Construire des fiches avec un **`<template>`** et `textContent`.
- **Chercher** (sans se soucier des majuscules et des accents), **filtrer** et **trier** un tableau, sans abîmer l'original.
- Comprendre pourquoi `fetch` ne marche **pas** avec `file://`.

## Fichiers fournis

```
11-donnees-fetch/
├── README.md              ← cette consigne
├── index.html             ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css          ← complète (le sujet est le JavaScript)
├── data/
│   ├── plantes.json       ← les 15 fiches (à lire !)
│   └── plantes-abime.json ← un fichier volontairement cassé, pour tester les pannes
├── js/
│   └── script.js          ← les éléments de la page sont fournis ; les TODO attendent votre code
└── images/
    └── fruit.svg  feuille.svg  racine.svg  graine.svg  aromatique.svg
```

## Consigne

**Étape 0 — Observation (10 min).**

1. Ouvrez `data/plantes.json` dans VS Code. Combien y a-t-il de plantes ? Quelles **propriétés** a chaque plante ? Quelle différence avec un objet JavaScript (indice : les guillemets autour des noms de propriétés, et l'absence de virgule finale) ?
2. Ouvrez `data/plantes-abime.json` : repérez les deux fautes qui le rendent invalide. Le validateur [jsonlint.com](https://jsonlint.com) les montre aussi.
3. **Lancez Live Server.** Dans VS Code, installez l'extension *Live Server* (Ritwick Dey) si besoin. Ouvrez le dossier de l'exercice (*Fichier → Ouvrir le dossier…*), clic droit sur `index.html` → **Open with Live Server**, ou cliquez sur **Go Live** en bas à droite. Le navigateur s'ouvre sur une adresse du type `http://127.0.0.1:5500/index.html`. 
4. **Observez la différence** avec `file://` : ouvrez maintenant `index.html` par **double-clic** dans l'explorateur de fichiers (l'adresse commence par `file:///`). Gardez les deux fenêtres côte à côte pour la suite.

> **Pas de Live Server ?** N'importe quel petit serveur local convient. Dans le dossier de l'exercice, tapez `python3 -m http.server 8000` (puis allez sur `http://localhost:8000`) ou `npx serve`. L'important est que l'adresse commence par `http://`.

**Pourquoi `file://` ne marche pas ?** Pour lire un fichier avec `fetch`, le navigateur envoie une **requête** (comme pour une page Web). Avec `file://`, il n'y a pas de serveur pour répondre, et, par sécurité, le navigateur interdit à une page locale de lire d'autres fichiers de votre disque (**politique CORS**). Quand vous ouvrirez la page en `file://` à l'étape 2, la console affichera quelque chose comme :

```
Access to fetch at 'file:///…/data/plantes.json' from origin 'null' has been blocked by CORS policy
Uncaught (in promise) TypeError: Failed to fetch
```

C'est **normal** : ce n'est pas un bug de votre code. Reconnaissez ce message : vous le reverrez ! Avec Live Server, tout fonctionne.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO`). Testez à chaque étape **avec Live Server**.

1. **Le message d'état.** Écrivez `afficherStatut(message, type)` : un seul endroit de la page affiche « Chargement… », les erreurs et « Aucun résultat ». Puis, si `location.protocol` vaut `"file:"`, affichez l'alerte jaune `alerteFichier` (retirez-lui la classe `cache`). Ouvrez la page en `file://` pour la voir.
2. **Le premier `fetch`.** Écrivez `async function chargerPlantes()` : `const reponse = await fetch(URL_DONNEES);`, affichez `reponse.status` et `reponse.ok` dans la console, puis `const donnees = await reponse.json();` et `console.table(donnees)`. Appelez la fonction à la fin du fichier. Dans la console, vous devez voir un joli tableau de 15 lignes.
3. **Gérer les pannes.** Ajoutez `afficherStatut("Chargement des fiches…")` en haut, puis entourez le code d'un `try … catch … finally` :
   - **`if (!reponse.ok) throw new Error(…)`** : `fetch` ne rejette **pas** sur une erreur 404 ou 500, il faut tester `reponse.ok` soi-même ;
   - **dans le `try`** : stockez les données dans `plantes`, effacez le message, activez les outils (`outils.disabled = false`) ;
   - **dans le `catch`** : `console.error`, message d'erreur rouge, et montrez le bouton « Réessayer » (qui relance `chargerPlantes`) ;
   - **dans le `finally`** : retirez l'attribut `aria-busy` de la liste (posé au début avec `setAttribute("aria-busy", "true")`) ;
   - écrivez `expliquerErreur(erreur)` pour donner un message **différent** selon le type : `SyntaxError` (JSON invalide), `TypeError` (réseau ou `file://`), sinon `erreur.message`.

   **Testez trois pannes**, en changeant `URL_DONNEES` à chaque fois (remettez la bonne valeur après) :
   | Panne | Comment la provoquer | Message attendu |
   |---|---|---|
   | Fichier introuvable (404) | `"data/inexistant.json"` | « le serveur a répondu 404… » |
   | Fichier abîmé | `"data/plantes-abime.json"` | « fichier abîmé (JSON invalide) » |
   | Pas de serveur | ouvrir en `file://` | « ouvrez la page avec Live Server » |

   Pour **voir** l'état de chargement : F12 → onglet **Réseau** → liste « Sans limitation » → **3G lente** (*Slow 3G*), puis rechargez.
4. **Vérifier les données.** Un fichier de données est une **entrée externe** : il peut être incomplet ou modifié par quelqu'un d'autre. Écrivez `validerDonnees(donnees)` : erreur si ce n'est pas un tableau, et `filter` pour ne garder que les plantes qui ont un `nom` (texte), une `categorie` connue (`Object.hasOwn(CATEGORIES, …)`) et deux nombres `cycleMin` / `cycleMax` (`Number.isFinite`). Prévenez avec `console.warn` si des fiches sont ignorées. **Test** : dans `plantes.json`, supprimez le `nom` d'une plante (sans oublier de remettre le fichier après) : elle disparaît, la page ne plante pas.
5. **Les fiches avec `<template>`.** Écrivez `creerFiche(plante)` : `modeleFiche.content.cloneNode(true)`, puis remplissez chaque élément avec `textContent`. Écrivez `mettreAJourAffichage()` qui vide la liste puis ajoute les fiches avec `replaceChildren`. Les 15 fiches s'affichent.
6. **La recherche.** Écrivez `normaliser(texte)` (retire les accents avec `normalize("NFD")` et `replace(/\p{Diacritic}/gu, "")`, puis `toLowerCase()`). Écrivez `plantesAffichees()` qui garde les plantes dont le nom, le nom latin ou la famille **contient** (`includes`) le mot cherché. Branchez le champ sur l'événement `input`. **Entrée dans le champ** recharge la page (rappelez-vous l'exercice 10) : ajoutez un écouteur `submit` avec `preventDefault()` sur le formulaire. Testez `niebe`, `SOLAN`, `xyz`.
7. **Le filtre par catégorie.** Combinez-le avec la recherche dans **la même condition** (`&&`). Événement `change` sur la liste déroulante.
8. **Le tri.** Trois choix : nom (`localeCompare(…, "fr")`), cycle le plus court d'abord, cycle le plus long d'abord. **Piège** : `sort()` **modifie** le tableau sur lequel on l'appelle. Triez le résultat du `filter` (une copie), jamais `plantes`. Vérifiez dans la console : après plusieurs tris, `plantes[0].nom` vaut toujours `"Tomate"`.
9. **Le compteur et l'état vide.** Écrivez « 3 plantes sur 15 » (singulier si une seule) dans `compteur`. Sans résultat, écrivez « Aucune plante ne correspond à « xyz ». » avec `afficherStatut`. Testez en cherchant `<img src=x onerror=alert(1)>` : le texte s'affiche tel quel, il ne s'exécute pas (c'est la même leçon que l'exercice 10).
10. **L'anti-rebond.** Au lieu de tout refaire à chaque lettre, attendez 250 ms de calme avec `clearTimeout` + `setTimeout`. Mettez un `console.log` dans `mettreAJourAffichage`, tapez « piment » rapidement, et comptez les messages avec puis sans anti-rebond.
11. **Validez.** Console sans erreur rouge (hors tests de panne), et `plantes.json` / `index.html` remis dans leur état d'origine.

### Mémo — JSON, fetch et asynchrone

| Notion | À retenir |
|---|---|
| JSON | du texte qui **ressemble** à du JavaScript : noms de propriétés **entre guillemets doubles**, pas de commentaires, pas de virgule finale, pas de `undefined` |
| `fetch(url)` | renvoie une **promesse** de réponse. Elle est **rejetée** seulement si la requête n'aboutit pas (réseau coupé, `file://`…). Un 404 est une réponse « réussie » : testez `reponse.ok` |
| `reponse.json()` | lit le corps et le convertit en objet. **Asynchrone aussi** : il faut un `await`. Plante (`SyntaxError`) si le JSON est abîmé |
| `async function` | une fonction qui a le droit d'utiliser `await` ; elle renvoie toujours une promesse |
| `await` | « attends le résultat de cette promesse » avant de passer à la ligne suivante, sans bloquer la page |
| `try { … } catch (erreur) { … } finally { … }` | `catch` : en cas d'erreur ; `finally` : **toujours**, succès ou non (idéal pour retirer un « chargement… ») |

| Erreur | Type | Cause typique |
|---|---|---|
| `TypeError: Failed to fetch` | `TypeError` | pas de réseau, mauvaise adresse, ouverture en `file://` |
| `Error: … 404` (lancée par vous) | `Error` | fichier introuvable (`response.ok` faux) |
| `SyntaxError: Unexpected token …` | `SyntaxError` | JSON invalide (virgule oubliée, guillemets simples…) |

| Méthode de tableau | Rôle | Modifie l'original ? |
|---|---|---|
| `filter(f)` | garde les éléments pour lesquels `f` renvoie `true` | non (nouveau tableau) |
| `map(f)` | transforme chaque élément | non (nouveau tableau) |
| `sort(f)` | trie | **OUI** |
| `includes(x)` | « le texte / tableau contient-il `x` ? » | non |

## Critères de réussite

- [ ] Avec Live Server, les 15 fiches s'affichent, avec le compteur « 15 plantes sur 15 ».
- [ ] Les outils de recherche sont **désactivés** tant que les données ne sont pas là, puis actifs.
- [ ] Les 3 pannes (404, JSON abîmé, `file://`) affichent trois messages **différents**, jamais une page blanche.
- [ ] Le bouton « Réessayer » apparaît en cas d'erreur et recharge les données.
- [ ] `niebe` trouve « Niébé » ; `solan` trouve 3 plantes ; la recherche ne tient compte ni des majuscules ni des accents.
- [ ] Recherche, filtre et tri se **combinent** correctement.
- [ ] Le tri ne modifie pas le tableau `plantes`.
- [ ] « Aucune plante ne correspond à … » apparaît quand il n'y a aucun résultat, et un texte HTML tapé n'est pas exécuté.
- [ ] La page ne se recharge pas quand on appuie sur Entrée dans la recherche.
- [ ] Un seul rendu après la frappe (anti-rebond).

## Indices

<details>
<summary>Indice 1 — « Unexpected token < in JSON » ou « undefined » partout</summary>

Vous avez sans doute oublié un `await` : `reponse.json()` (ou `fetch`) renvoie une **promesse**, pas les données. Sans `await`, vous manipulez la promesse (`Promise {<pending>}`), pas le résultat. Si le message parle de `<`, le serveur a renvoyé une page **HTML** (souvent une page d'erreur 404) au lieu du JSON : vérifiez l'adresse du fichier.

</details>

<details>
<summary>Indice 2 — Mon <code>catch</code> ne se déclenche pas sur une erreur 404</summary>

C'est le piège classique de `fetch` : une erreur 404 est une **réponse** valide du serveur (« je n'ai pas ce fichier »). La promesse n'est pas rejetée. Écrivez vous-même `if (!reponse.ok) { throw new Error(…); }`, qui envoie l'erreur vers votre `catch`.

</details>

<details>
<summary>Indice 3 — « Failed to fetch » alors que Live Server est lancé</summary>

Regardez l'adresse dans la barre du navigateur : commence-t-elle par `http://127.0.0.1:5500` ou `http://localhost…` ? Si vous voyez `file:///`, vous n'utilisez pas Live Server (vous avez double-cliqué sur le fichier). Vérifiez aussi le chemin : `"data/plantes.json"` est **relatif** à la page `index.html`, pas au fichier JavaScript.

</details>

<details>
<summary>Indice 4 — « Cannot read properties of undefined » dans <code>creerFiche</code></summary>

Une propriété n'existe pas pour une plante (faute de frappe : `plante.nomlatin` au lieu de `plante.nomLatin`, les noms respectent les majuscules). Affichez la plante avec `console.log(plante)` dans la fonction : vous verrez ses vraies propriétés. Pour une propriété **facultative**, l'opérateur `??` donne une valeur de remplacement : `plante.nomLatin ?? ""`.

</details>

<details>
<summary>Indice 5 — Après un tri, l'ordre de départ est perdu</summary>

`plantes.sort(…)` réorganise `plantes` lui-même. Triez plutôt le résultat de `plantes.filter(…)` : `filter` fabrique **un nouveau tableau**, vous pouvez donc le trier sans danger. Si vous devez trier tout le tableau, copiez-le d'abord : `[...plantes].sort(…)`.

</details>

<details>
<summary>Indice 6 — « Épinard » ou « Niébé » mal classé / non trouvé</summary>

Pour **chercher**, `"é"` et `"e"` sont deux lettres différentes : normalisez **les deux** textes (le champ et la fiche) avec `normaliser`. Pour **trier**, un `a.nom > b.nom` classe les lettres accentuées après `z` : utilisez `a.nom.localeCompare(b.nom, "fr")`.

</details>

## Bonus

- **Annulez** un chargement trop long avec `AbortController` : `const controle = new AbortController(); fetch(URL, { signal: controle.signal });` puis `setTimeout(() => controle.abort(), 5000)`. L'erreur reçue s'appelle `AbortError` : affichez « Le chargement est trop long ».
- Ajoutez une **liste déroulante « Eau »** (faible / moyen / élevé) et un filtre « lumière » : combien de conditions dans votre `filter` ?
- **Surlignez** le mot cherché dans les noms avec un élément `<mark>` (sans `innerHTML` : construisez des nœuds de texte avec `createTextNode`).
- Mémorisez la recherche et la catégorie choisies dans `localStorage` (exercice 10) pour les retrouver au rechargement.
- Ajoutez une **plante à vous** dans `plantes.json` (avec des informations **exactes** : vérifiez-les !), sans toucher au JavaScript : la fiche apparaît toute seule. C'est tout l'intérêt de séparer les données de l'affichage.

## Questions de compréhension

1. Quelle différence entre un objet JavaScript et du JSON ? Citez deux règles d'écriture propres au JSON.
2. Pourquoi `fetch("data/plantes.json")` échoue-t-il avec `file://` mais marche avec Live Server ?
3. Que renvoie `fetch` quand le serveur répond 404 ? Comment détecter cette erreur ?
4. À quoi sert le bloc `finally` ? Donnez un exemple concret de cet exercice.
5. Que veut dire `await` ? Pourquoi la page ne se fige-t-elle pas pendant l'attente ?
6. Quelle différence entre `filter`, `map` et `sort` ? Lesquelles modifient le tableau d'origine ?
7. Pourquoi vérifie-t-on le contenu du fichier JSON (étape 4) alors que « c'est notre fichier » ?
8. Quel est l'intérêt d'un fichier de données séparé du code ? (Pensez à qui peut le modifier.)

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande une page où le **contenu biologique doit être exact** et où l'on présente plusieurs **étapes** de la conduite d'une pépinière. Si vous stockez ces étapes (titre, durée, image, texte) dans un fichier `etapes.json`, vous pourrez les corriger sans toucher au code, et générer le menu **et** les sections avec la même boucle. Attention : le brief veut aussi **80 % d'images et 20 % de texte** et des pages **statiques** : un `fetch` local est cohérent (c'est un fichier de votre dépôt, pas un serveur), mais **testez toujours avec Live Server** et prévoyez un message clair si le chargement échoue. Si vous préférez rester simple, un tableau JavaScript dans `script.js` (exercice 04) est tout aussi valable : choisissez, puis **justifiez-le** à l'oral.

## Ressources

- MDN : [`fetch()`](https://developer.mozilla.org/fr/docs/Web/API/Window/fetch) · [Utiliser Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch) · [`Response.ok`](https://developer.mozilla.org/fr/docs/Web/API/Response/ok) · [`Response.json()`](https://developer.mozilla.org/fr/docs/Web/API/Response/json)
- MDN : [`async function`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function) · [`await`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await) · [`try…catch`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch) · [Travailler avec JSON](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON)
- MDN : [`<template>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template) · [`Array.prototype.filter()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) · [`Array.prototype.sort()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) · [`String.prototype.normalize()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
- MDN : [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/CORS) · [Extension Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) · [JSONLint](https://jsonlint.com)

---

Exercice suivant : [12 — Chasse aux bugs JavaScript et régime minceur](../12-debogage-js/README.md)
