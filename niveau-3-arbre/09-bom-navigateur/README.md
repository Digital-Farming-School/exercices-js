# Exercice 09 — Le navigateur sait tout : le BOM

**Niveau 3 · Arbre** · ★★★☆ · Durée : 1 h · Notions : `window`, `innerWidth` / `resize`, `screen`, `navigator`, `online` / `offline`, `matchMedia`, `location`, `URLSearchParams`, `history.pushState` / `popstate` / `back`, `setInterval` / `clearInterval`, `setTimeout`, `navigator.clipboard`

> Les visiteurs de la ferme-école consultent la page depuis des téléphones, des tablettes et des vieux ordinateurs, parfois avec une connexion qui saute. Le coach veut un **tableau de bord du visiteur** : la taille de son écran, sa langue, l'état de sa connexion, l'adresse de la page… et un **minuteur d'arrosage** pour la planche de piments. Tout ça, c'est le **BOM** (*Browser Object Model*) : les objets que le **navigateur** met à disposition de JavaScript, en plus du DOM (le contenu de la page).

## Objectifs

- Distinguer le **DOM** (la page : `document`) du **BOM** (le navigateur : `window`, `screen`, `navigator`, `location`, `history`).
- Lire des informations sur l'**écran**, le **navigateur** et l'**adresse** de la page.
- **Réagir** à des événements du navigateur : `resize`, `online` / `offline`, `popstate`, `hashchange`.
- Lire un **paramètre d'URL** (`?plante=piment`) et changer l'adresse **sans recharger** la page avec l'historique.
- Programmer dans le temps avec `setInterval` et `setTimeout`, et savoir **arrêter** un minuteur.
- Comprendre pourquoi certaines fonctions marchent différemment avec `file://` et avec `http://`.

## Fichiers fournis

```
09-bom-navigateur/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← complète (le sujet est le JavaScript)
├── js/
│   └── script.js      ← les éléments et les données sont fournis ; les TODO attendent votre code
└── images/
    ├── piment.svg  gingembre.svg  basilic.svg
```

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec **Live Server** (clic droit sur le fichier dans VS Code → *Open with Live Server*). Tous les champs affichent « … » : c'est normal, le script ne fait encore rien. Ouvrez **F12 → Console** et tapez, un par un :

```js
window.innerWidth
screen.width
navigator.language
location.href
history.length
```

Chaque ligne affiche une valeur : vous venez d'interroger le BOM **sans écrire une seule ligne dans le fichier**. Tapez aussi `window === globalThis` : `window` est l'objet global, c'est pourquoi on peut écrire `innerWidth` ou `window.innerWidth`, `location` ou `window.location`.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO` du fichier). Après chaque étape, **enregistrez et regardez la page** avant de passer à la suivante.

1. **La fenêtre.** Écrivez `afficherFenetre()` qui affiche `window.innerWidth` et `window.innerHeight`. Appelez-la une fois, puis à chaque événement `resize` de `window`. Testez en redimensionnant la fenêtre, puis avec le mode appareil de F12 (`Ctrl + Maj + M`).
2. **L'écran.** Affichez `screen.width × screen.height` et `window.devicePixelRatio`. Comparez avec la fenêtre : lequel des deux change quand vous redimensionnez ? Pourquoi ?
3. **Le navigateur.** Affichez `navigator.language` et `navigator.userAgent`. Écrivez ensuite `afficherConnexion()` : `navigator.onLine` vaut `true` ou `false`. Remplissez le badge « En ligne » (vert) ou « Hors ligne » (rouge) avec `classList.toggle("badge-ok", enLigne)`. Écoutez `online` et `offline` sur `window`. Pour tester : **F12 → onglet Réseau → liste « Sans limitation » → Hors connexion**.
4. **Le thème préféré.** `window.matchMedia("(prefers-color-scheme: dark)")` pose en JavaScript la même question qu'une *media query* CSS. Lisez sa propriété `matches` et affichez « sombre » ou « clair ». Écoutez son événement `change`. Pour tester : **F12 → `Ctrl + Maj + P` → « Emulate CSS prefers-color-scheme: dark »**.
5. **L'adresse.** Écrivez `afficherAdresse()` qui remplit les cinq champs de la carte « L'adresse de la page » avec `location.href`, `.protocol`, `.hostname`, `.hash` et `.search`. Quand une valeur est vide, affichez un texte de remplacement (`location.hash || "(vide)"`). Si le protocole est `file:`, retirez la classe `cache` de `alerteProtocole`. Rappelez la fonction sur `hashchange`. Testez : cliquez sur « Retour aux informations » dans le pied de page (l'ancre `#carte-ecran` apparaît dans l'adresse **sans recharger la page**), puis ajoutez `?plante=piment` à la main dans la barre d'adresse.
6. **Lire un paramètre d'URL.** Écrivez `lirePlanteDansUrl()` avec `new URLSearchParams(location.search).get("plante")`. Écrivez ensuite `afficherPlante(cle)` : si `cle` n'est pas une plante connue de `PLANTES`, cachez l'image et affichez « Aucune plante choisie » ; sinon affichez la fiche. Appelez `afficherPlante(lirePlanteDansUrl())` au chargement. Testez `index.html?plante=gingembre`, puis `?plante=ananas`, puis `?plante=constructor` (!).
7. **L'historique.** Au clic sur un bouton de plante (`data-plante`), changez l'adresse **sans recharger** avec `history.pushState(état, "", adresse)`, puis affichez la fiche. Écoutez `popstate` pour réagir au bouton « Précédent » du navigateur. Reliez les boutons « Page précédente » / « Page suivante » à `history.back()` et `history.forward()`. Testez : choisissez Piment, Gingembre, Basilic, puis reculez avec le bouton « Précédent » du navigateur : la fiche suit-elle ?
8. **Le minuteur.** Complétez les fonctions `afficherMinuteur`, `tic`, `demarrerMinuteur`, `mettreEnPause` et `reinitialiserMinuteur`. `setInterval(tic, 1000)` renvoie un **identifiant** : gardez-le dans `idMinuteur`, il est indispensable pour appeler `clearInterval(idMinuteur)`. Cliquez deux fois sur « Démarrer » : le décompte va-t-il deux fois plus vite ? (Si oui, il manque une vérification au début de `demarrerMinuteur`.)
9. **La fin du minuteur.** Écrivez `terminerArrosage()`, appelée par `tic()` quand il reste 0 seconde : arrêt du minuteur, chrono en rouge (classe `termine`), message dans `minuteurMessage`, nouveau `document.title` (visible dans l'onglet, même quand on est sur une autre page !). Utilisez `setTimeout(…, 5000)` pour effacer le message 5 secondes plus tard. *Astuce de test* : dans la console, tapez `secondesRestantes = 3` puis cliquez sur « Démarrer ».
10. **Copier l'adresse.** Au clic sur « Copier l'adresse », appelez `await navigator.clipboard.writeText(location.href)` dans une fonction `async`, entourée de `try … catch`. En cas d'échec, affichez le nom de l'erreur (`erreur.name`). Collez ensuite (`Ctrl + V`) dans la barre de recherche pour vérifier.
11. **Le test `file://` contre `http://`.** Ouvrez le fichier `index.html` **sans** Live Server (double-clic dans l'explorateur de fichiers : l'adresse commence par `file:///`) et remplissez le tableau ci-dessous avec ce que vous observez (✔ marche / ✖ ne marche pas / ≈ différent). Quelle information de la carte « L'adresse de la page » est vide avec `file://` ?

    | Fonction | `http://localhost` (Live Server) | `file://` (double-clic) |
    |---|---|---|
    | Taille de la fenêtre / de l'écran | | |
    | `navigator.language`, `onLine` | | |
    | `location.hostname` | | |
    | `pushState` (étape 7) | | |
    | Copie dans le presse-papiers (étape 10) | | |
12. **Validez** : ouvrez la console (F12) : **aucune erreur rouge**. Relisez votre script : chaque section a-t-elle son bandeau `// ===== … =====` ?

### Mémo — le BOM

| Objet | À quoi il sert | Exemples |
|---|---|---|
| `window` | la fenêtre du navigateur, objet **global** | `innerWidth`, `innerHeight`, `scrollY`, `matchMedia()`, `setTimeout()` |
| `screen` | l'écran physique | `screen.width`, `screen.height` |
| `navigator` | le navigateur et l'appareil | `language`, `onLine`, `userAgent`, `clipboard` |
| `location` | l'adresse de la page (on peut la lire **et** la changer) | `href`, `protocol`, `hostname`, `search`, `hash`, `reload()` |
| `history` | les pages visitées dans l'onglet | `back()`, `forward()`, `pushState()`, `length` |

| Événement (sur `window`) | Se produit quand… |
|---|---|
| `resize` | la taille de la fenêtre change |
| `online` / `offline` | la connexion revient / disparaît |
| `hashchange` | l'ancre `#…` de l'adresse change |
| `popstate` | l'utilisateur utilise « Précédent » / « Suivant » |

| Outil de temps | Rôle | Pour l'arrêter |
|---|---|---|
| `setTimeout(fonction, ms)` | exécute la fonction **une fois**, dans `ms` millisecondes | `clearTimeout(id)` |
| `setInterval(fonction, ms)` | l'exécute **toutes les** `ms` millisecondes | `clearInterval(id)` |

**DOM ou BOM ?** Le DOM décrit le **contenu** de la page (`document.querySelector`, `textContent`…). Le BOM décrit **l'environnement** de la page (fenêtre, écran, adresse, historique). Le BOM n'a pas de norme unique aussi stricte que le DOM : certaines fonctions varient d'un navigateur à l'autre. C'est pourquoi on consulte [MDN](https://developer.mozilla.org/fr/docs/Web/API) en cas de doute.

## Critères de réussite

- [ ] La largeur et la hauteur se mettent à jour en direct quand on redimensionne la fenêtre.
- [ ] Le badge de connexion passe de vert à rouge en mode « Hors connexion » de F12, et inversement.
- [ ] Le thème préféré change quand j'émule `prefers-color-scheme` dans F12.
- [ ] `?plante=piment`, `?plante=gingembre` et `?plante=basilic` affichent la bonne fiche ; `?plante=ananas` et `?plante=constructor` affichent « Aucune plante choisie ».
- [ ] Les boutons de plantes changent l'adresse **sans recharger la page**, et le bouton « Précédent » du navigateur ramène à la fiche précédente.
- [ ] Le minuteur décompte une seconde à la fois, même si je clique deux fois sur « Démarrer » ; la pause et la remise à zéro fonctionnent.
- [ ] À la fin du minuteur, le chrono devient rouge, un message s'affiche puis disparaît tout seul au bout de 5 secondes.
- [ ] Le bouton « Copier l'adresse » affiche un message de succès **ou** d'échec clair (jamais d'erreur dans la console).
- [ ] J'ai rempli le tableau `file://` / `http://` et je sais l'expliquer.
- [ ] Le code utilise `textContent` (jamais `innerHTML`) pour afficher des valeurs.

## Indices

<details>
<summary>Indice 1 — « Cannot read properties of null » dans la console</summary>

Un `document.querySelector("#…")` a renvoyé `null` : l'`id` n'existe pas dans `index.html` (faute de frappe, `#` oublié…). Les éléments de la page sont **déjà récupérés** en haut du script : utilisez les constantes fournies (`fenetreLargeur`, `etatConnexion`…) sans les redéclarer.

</details>

<details>
<summary>Indice 2 — La largeur ne se met pas à jour quand je redimensionne</summary>

Appeler `afficherFenetre()` **une fois** ne suffit pas : il faut aussi la brancher sur l'événement : `window.addEventListener("resize", afficherFenetre);`. Attention : on passe le **nom** de la fonction, sans parenthèses (sinon on l'exécute tout de suite, au lieu de la donner au navigateur).

</details>

<details>
<summary>Indice 3 — <code>?plante=constructor</code> affiche n'importe quoi</summary>

`PLANTES["constructor"]` n'est pas `undefined` : tous les objets JavaScript **héritent** de propriétés comme `constructor` ou `toString`. Un test `if (!PLANTES[cle])` se laisse donc tromper. Utilisez `Object.hasOwn(PLANTES, cle)`, qui ne regarde que les propriétés **propres** à l'objet. Moralité : une valeur lue dans l'adresse vient du visiteur, **jamais** de vous. On la vérifie avant de s'en servir.

</details>

<details>
<summary>Indice 4 — Le minuteur va de plus en plus vite</summary>

Chaque clic sur « Démarrer » crée **un nouveau** `setInterval`, alors que l'ancien tourne encore. Deux minuteurs = le temps passe deux fois plus vite. Avant d'en créer un, vérifiez que `idMinuteur` vaut `null`, et remettez-le à `null` après chaque `clearInterval`.

</details>

<details>
<summary>Indice 5 — Le bouton « Précédent » ne change pas la fiche</summary>

`pushState` change l'adresse et l'historique, mais **n'affiche rien** : c'est à vous d'appeler `afficherPlante`. Au retour en arrière, le navigateur ne recharge pas non plus la page : il déclenche seulement l'événement `popstate`. Écoutez-le et relisez l'adresse avec `lirePlanteDansUrl()`.

</details>

<details>
<summary>Indice 6 — « Copie impossible » alors que je suis avec Live Server</summary>

Le navigateur n'autorise la copie que si la page a le **focus** et si le geste vient d'un **clic de l'utilisateur** (pas d'un code qui se lance tout seul au chargement). Vérifiez aussi que vous êtes bien sur `http://localhost` ou `http://127.0.0.1` : avec une adresse du réseau local du type `http://192.168.x.x`, l'API presse-papiers est **absente** (`navigator.clipboard` vaut `undefined`) parce que le contexte n'est pas « sécurisé ».

</details>

## Bonus

- Ajoutez un bouton « Partager » avec `navigator.share({ title, url })` (disponible surtout sur téléphone) : testez d'abord `if (navigator.share)` avant de montrer le bouton.
- Ajoutez un bouton « Où suis-je ? » avec `navigator.geolocation.getCurrentPosition(succes, erreur)` : affichez latitude et longitude. Le navigateur demande l'autorisation : que se passe-t-il si vous refusez ? (Pensez à la parcelle de repiquage du brief : une position GPS est utile !)
- Changez `DUREE_ARROSAGE` pour qu'elle soit lue dans l'adresse : `?minutes=2`. Que faire si le visiteur tape `?minutes=abc` ?
- Affichez aussi `window.outerWidth` et `window.scrollY`. Quand ces valeurs changent-elles ?
- Avec `setTimeout`, faites clignoter le chrono 3 fois à la fin du minuteur.

## Questions de compréhension

1. Quelle est la différence entre le **DOM** et le **BOM** ? Donnez un objet de chaque.
2. Quelle différence entre `window.innerWidth` et `screen.width` ?
3. Pourquoi faut-il garder l'identifiant renvoyé par `setInterval` ? Que se passe-t-il si on ne le garde pas ?
4. Quelle différence entre `setTimeout` et `setInterval` ?
5. Que fait `history.pushState` ? Que ne fait-il **pas** (indice : l'affichage) ?
6. Pourquoi ne faut-il pas décider d'une fonctionnalité à partir de `navigator.userAgent` ? Que faire à la place (`if (navigator.share)`) ?
7. Avec `file://`, `location.hostname` est vide. Pourquoi ? Que change `http://localhost` ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande une page « interactive » **utilisable sur un stand** : sur le téléphone du visiteur comme sur l'ordinateur du salon. Le BOM vous aide à : adapter l'affichage à la taille de la fenêtre (`innerWidth`, `matchMedia`), prévenir le visiteur quand la connexion tombe (les vidéos de 40 secondes ne se chargeront pas), **ouvrir directement la bonne étape** de la pépinière depuis une adresse comme `index.html?etape=repiquage` (QR code sur un panneau découpé au laser !), ou **programmer un rappel** (`setTimeout`) pour l'arrosage. Attention : ces fonctions doivent rester des **plus** ; la page doit rester lisible sans elles.

## Ressources

- MDN : [`window`](https://developer.mozilla.org/fr/docs/Web/API/Window) · [`screen`](https://developer.mozilla.org/fr/docs/Web/API/Screen) · [`navigator`](https://developer.mozilla.org/fr/docs/Web/API/Navigator) · [`location`](https://developer.mozilla.org/fr/docs/Web/API/Location) · [`history`](https://developer.mozilla.org/fr/docs/Web/API/History)
- MDN : [`URLSearchParams`](https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams) · [`matchMedia`](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia) · [`History.pushState()`](https://developer.mozilla.org/fr/docs/Web/API/History/pushState) · [`setInterval`](https://developer.mozilla.org/fr/docs/Web/API/setInterval) · [`setTimeout`](https://developer.mozilla.org/fr/docs/Web/API/setTimeout)
- MDN : [`Clipboard.writeText()`](https://developer.mozilla.org/fr/docs/Web/API/Clipboard/writeText) · [Contextes sécurisés](https://developer.mozilla.org/fr/docs/Web/Security/Secure_Contexts)

---

Exercice suivant : [10 — Le carnet de pépinière : formulaires et stockage](../10-carnet-stockage/README.md)
