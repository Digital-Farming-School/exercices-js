# Exercice 10 — Le carnet du jardin : formulaires et stockage

**Niveau 3 · Arbre** · ★★★☆ · Durée : 1 h 15 · Notions : `submit` + `preventDefault`, `FormData`, API de validation (`validity`, `setCustomValidity`), événement `input`, `localStorage`, `JSON.stringify` / `JSON.parse`, `try … catch`, délégation d'événements, `textContent` contre `innerHTML`, `window.confirm`, événement `storage`

> Dans le jardin pédagogique de la ferme-école, chaque apprenant note ce qu'il observe : la hauteur du piment, les premières fleurs du basilic… Le papier se mouille et se perd. Votre mission : un **carnet numérique** qui valide ce qu'on écrit et **se souvient de tout**, même quand on ferme l'onglet, sans serveur ni base de données.

## Objectifs

- Intercepter l'envoi d'un **formulaire** et récupérer ses valeurs avec `FormData`.
- **Valider** les champs avec l'API de validation du navigateur et afficher de **vrais messages d'erreur** accessibles.
- **Mémoriser** des données dans le navigateur avec `localStorage` (texte, tableaux, objets) et les retrouver au rechargement.
- Se protéger des données **abîmées** (`try … catch`) et des **injections de code** (`textContent`).
- Gérer une liste dynamique : ajouter, supprimer, tout effacer, avec une **délégation d'événements**.

## Fichiers fournis

```
10-carnet-stockage/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← complète (le sujet est le JavaScript)
├── js/
│   └── script.js      ← les éléments de la page sont fournis ; les TODO attendent votre code
└── images/
    └── carnet.svg
```

## Consigne

**Étape 0 — Observation (10 min).** Ouvrez `index.html` avec Live Server. Puis :

- cochez des tâches, rechargez la page : elles se décochent (la page n'a **aucune mémoire**) ;
- ouvrez **F12 → onglet Application** (Chrome) ou **Stockage** (Firefox) → *Local Storage* → l'adresse de votre page : c'est là que les données seront rangées, sous forme de **paires clé / valeur de texte** ;
- dans la **console**, essayez :
  ```js
  localStorage.setItem("essai", "bonjour");
  localStorage.getItem("essai");          // "bonjour"
  localStorage.setItem("nombre", 42);
  typeof localStorage.getItem("nombre");  // "string" : tout devient du texte !
  localStorage.removeItem("essai");
  ```
  Regardez l'onglet Application : vos clés y sont. Supprimez-les (clic droit → *Delete*).
- Cliquez sur « Ajouter au carnet » avec un formulaire vide : que se passe-t-il ? (Le HTML a `novalidate` : aucun message du navigateur. C'est **vous** qui allez les écrire.)

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO`). Testez à chaque étape.

1. **Lire et écrire en sécurité.** `localStorage` ne sait stocker que du **texte** : on écrit avec `JSON.stringify(valeur)` et on lit avec `JSON.parse(texte)`. Écrivez `lireStockage(cle, valeurParDefaut)` et `ecrireStockage(cle, valeur)`, chacune dans un `try … catch`. Puis faites lire au démarrage les observations enregistrées (`CLE_OBSERVATIONS`, par défaut `[]`) en vérifiant avec `Array.isArray` que c'est bien un tableau. **Test de robustesse** : dans la console, tapez `localStorage.setItem("carnet-observations", "{oops")` et rechargez : la page doit continuer à fonctionner, sans erreur rouge.
2. **Le mode sombre mémorisé.** Écrivez `appliquerTheme(theme)` : elle pose `data-theme` sur `<html>` (`document.documentElement.dataset.theme`), met à jour `aria-pressed` et le texte du bouton. Au chargement, appliquez le thème enregistré ; à défaut, celui du système (`matchMedia`, vu à l'exercice 09). Au clic : basculer et **mémoriser**. Rechargez : le choix doit rester.
3. **Les tâches et la barre de progression.** Écrivez `afficherProgression()` (nombre de cases cochées → `<progress>` et texte « 2 tâches sur 5 »), `restaurerTaches()` (relit le stockage et recoche les cases) et **un seul** écouteur `change` sur la liste (délégation) qui enregistre les identifiants des tâches cochées (`data-tache`). Rechargez : les cases restent cochées et la tâche cochée est barrée.
4. **Envoyer sans recharger.** Écoutez `submit` sur le formulaire. **Première ligne : `evenement.preventDefault()`.** Récupérez les valeurs avec `Object.fromEntries(new FormData(formulaire))` et affichez-les avec `console.table`. Regardez leurs types : la hauteur est du **texte** (`"42.5"`).
5. **Valider.** Écrivez `messageErreur(champ)` (lit `champ.validity` : `valueMissing`, `tooShort`, `rangeUnderflow`, `rangeOverflow`, `badInput`, `customError`), `validerChamp(champ)` et `validerFormulaire()`.
   - `validerChamp` commence par `champ.setCustomValidity("")`, ajoute la règle « la date ne peut pas être dans le futur » avec `setCustomValidity("…")`, écrit le message dans `#erreur-<name>` et règle `aria-invalid`.
   - `validerFormulaire` valide **tous** les champs, met le focus sur le **premier** invalide et renvoie `true` / `false`. Dans l'écouteur de l'étape 4, arrêtez-vous (`return`) si le formulaire est invalide.
   - Une fois un champ signalé en erreur, revalidez-le à chaque frappe (`input`).
   - Testez : champs vides, plante `"ab"`, hauteur `400`, date de l'an 2999, note de 3 lettres, plante faite uniquement d'espaces.
6. **Le compteur de caractères.** Écrivez `afficherCompteur()` : « 12 / 200 », avec la classe `limite` quand il reste 20 caractères ou moins. Branchez-la sur l'événement `input` de la zone de note.
7. **Ajouter l'observation.** Dans l'écouteur `submit`, une fois le formulaire valide : construisez `{ id: Date.now(), plante, date, hauteur: Number(…), note }` (avec `.trim()` sur les textes), ajoutez-la **au début** du tableau avec `unshift`, enregistrez, réaffichez, videz le formulaire (`reset()`), remettez le compteur à zéro, annoncez « Observation ajoutée au carnet ✔ » et remettez le focus sur le premier champ.
8. **Afficher les observations.** Écrivez `creerCarteObservation(observation)` avec `createElement` et `textContent` (**jamais** `innerHTML`), puis `afficherObservations()` avec `replaceChildren`. Elle met aussi à jour le compteur, le message « le carnet est vide » et l'état du bouton « Tout effacer ». **Test de sécurité** : écrivez dans la note `<img src=x onerror="alert('piraté')">` et enregistrez : la balise doit apparaître **comme du texte**, et aucune boîte de dialogue ne doit s'ouvrir.
9. **Supprimer.** Un seul écouteur `click` sur la liste (délégation) : `evenement.target.closest("button.supprimer")` retrouve le bouton, le `<li>` donne l'identifiant (`dataset.id`), `filter` retire l'observation. « Tout effacer » demande d'abord confirmation avec `window.confirm(…)`, puis vide le tableau et supprime la clé avec `localStorage.removeItem`.
10. **Synchroniser les onglets.** Ouvrez la page dans **deux onglets** côte à côte. Écrivez un écouteur `storage` sur `window` : il se déclenche dans les **autres** onglets quand le stockage change. Rechargez les observations, les tâches et le thème selon `evenement.key`. Ajoutez une observation dans un onglet : l'autre se met à jour **tout seul**.
11. **Validez** : console sans erreur rouge, validateur HTML du W3C inchangé (vous n'avez pas modifié `index.html`), code commenté et indenté de 2 espaces.

### Mémo — formulaires et stockage

| Outil | Rôle | Exemple |
|---|---|---|
| `evenement.preventDefault()` | annule le comportement par défaut (ici : l'envoi de la page) | première ligne de l'écouteur `submit` |
| `new FormData(formulaire)` | lit tous les champs **ayant un `name`** | `Object.fromEntries(new FormData(f))` → un objet |
| `champ.validity` | l'état de validation du champ | `.valueMissing`, `.tooShort`, `.rangeOverflow`, `.customError` |
| `champ.setCustomValidity(texte)` | déclare une erreur **personnalisée** ; `""` l'efface | date dans le futur |
| `champ.validationMessage` | le message d'erreur actuel du navigateur | |
| `localStorage.setItem(cle, texte)` | enregistre (texte seulement) | `setItem("a", JSON.stringify(objet))` |
| `localStorage.getItem(cle)` | lit (`null` si absent) | `JSON.parse(getItem("a"))` |
| `localStorage.removeItem(cle)` | efface une clé | |
| `JSON.stringify` / `JSON.parse` | objet ⇄ texte | `parse` **plante** si le texte est abîmé → `try … catch` |

| | `textContent` | `innerHTML` |
|---|---|---|
| Interprète le HTML ? | **Non**, c'est du texte | **Oui**, les balises sont créées |
| Texte tapé par un visiteur | ✔ sûr | ✘ **faille XSS** (exécution de code) |

| | `localStorage` | `sessionStorage` | cookies |
|---|---|---|---|
| Durée | jusqu'à effacement | jusqu'à la fermeture de l'onglet | selon la date d'expiration |
| Taille | ≈ 5 Mo | ≈ 5 Mo | ≈ 4 Ko |
| Partagé entre onglets | oui (même site) | non | oui |
| Envoyé au serveur | non | non | **oui**, à chaque requête |

> ⚠ `localStorage` n'est **pas** un coffre-fort : n'importe qui peut lire et modifier les données avec F12. N'y rangez jamais de mot de passe. Il est aussi propre à **un site et un navigateur** : les données ne suivent pas le visiteur sur un autre appareil.

## Critères de réussite

- [ ] Les tâches cochées et le thème choisi **survivent au rechargement** de la page.
- [ ] Un formulaire vide affiche **quatre messages d'erreur** en français, et le focus va sur le premier champ.
- [ ] Les règles testées sont refusées : plante de 2 lettres ou d'espaces, hauteur 400, date de l'an 2999, note de moins de 10 caractères.
- [ ] Le compteur de caractères suit la frappe et change d'aspect près de la limite.
- [ ] Une observation valide apparaît **en tête** de liste, le formulaire se vide, et elle est toujours là après rechargement.
- [ ] Une note contenant du HTML s'affiche comme du texte (aucune balise créée, aucune alerte).
- [ ] « Supprimer » et « Tout effacer » (avec confirmation) fonctionnent, le carnet vide affiche son message.
- [ ] Si j'abîme les données à la main (`{oops`), la page se charge quand même, sans erreur.
- [ ] Deux onglets ouverts restent synchronisés.
- [ ] Aucun `innerHTML` n'est utilisé avec un texte venant de l'utilisateur.

## Indices

<details>
<summary>Indice 1 — Ma page se recharge quand je clique sur « Ajouter »</summary>

Un formulaire envoie ses données et **recharge la page** par défaut. Il manque `evenement.preventDefault()` : il doit être appelé **en premier** dans l'écouteur `submit`, avant le moindre `return`. Si l'écouteur plante avant cette ligne, la page se recharge aussi.

</details>

<details>
<summary>Indice 2 — Mon objet enregistré s'affiche « [object Object] »</summary>

`localStorage.setItem("cle", objet)` convertit l'objet en texte de la pire façon possible : `"[object Object]"`. Passez toujours par `JSON.stringify(objet)` pour écrire et `JSON.parse(texte)` pour lire.

</details>

<details>
<summary>Indice 3 — Un champ reste « invalide » même après correction</summary>

Une erreur posée avec `setCustomValidity("message")` reste en place **tant qu'on ne l'efface pas** avec `setCustomValidity("")`. Videz-la au début de `validerChamp`, avant de refaire les tests.

</details>

<details>
<summary>Indice 4 — « tooShort » ne se déclenche jamais</summary>

Le navigateur ne signale `tooShort` que si la valeur a été **tapée par l'utilisateur** (pas si elle a été écrite par un script). Dans vos tests à la console, ou pour des espaces seuls, appuyez-vous plutôt sur `champ.value.trim().length`, et signalez l'erreur avec `setCustomValidity`.

</details>

<details>
<summary>Indice 5 — La hauteur est enregistrée entre guillemets ("42.5")</summary>

`FormData` ne renvoie **que du texte**, même pour un champ `type="number"`. Convertissez avec `Number(donnees.hauteur)` avant d'enregistrer, sinon `"9" > "40"` sera vrai (comparaison de textes !) le jour où vous voudrez trier.

</details>

<details>
<summary>Indice 6 — Les boutons « Supprimer » ne réagissent pas</summary>

Les cartes sont créées **après** le chargement de la page : un `querySelectorAll(".supprimer")` écrit au démarrage ne les voit pas. Utilisez la délégation : un écouteur sur la **liste** (qui existe déjà) et `evenement.target.closest("button.supprimer")` pour savoir si le clic vient d'un bouton.

</details>

<details>
<summary>Indice 7 — L'événement <code>storage</code> ne se déclenche pas dans mon onglet</summary>

C'est voulu : il se déclenche dans les **autres** onglets, jamais dans celui qui a écrit. Il faut donc **deux** onglets de la même page ouverts (même adresse, avec Live Server).

</details>

## Bonus

- Ajoutez un bouton **« Exporter »** qui affiche `JSON.stringify(observations, null, 2)` dans un `<pre>` : c'est votre sauvegarde.
- **Triez** les observations par date avec `sort`, et ajoutez une liste déroulante « Plante » pour filtrer avec `filter`.
- Calculez la **croissance** : la différence de hauteur entre la dernière et l'avant-dernière observation d'une même plante.
- Remplacez `localStorage` par `sessionStorage` : que change-t-il quand vous fermez l'onglet ?
- Mesurez l'espace utilisé : `new Blob([JSON.stringify(observations)]).size` (en octets).

## Questions de compréhension

1. Pourquoi `localStorage.setItem("n", 42)` puis `getItem("n")` donne-t-il `"42"` (du texte) ?
2. À quoi sert `preventDefault()` dans un écouteur `submit` ? Que se passe-t-il sans lui ?
3. Pourquoi entoure-t-on `JSON.parse` d'un `try … catch` ?
4. Quelle est la différence entre `textContent` et `innerHTML` ? Pourquoi est-ce important pour un champ de formulaire ?
5. Pourquoi valider les données aussi côté serveur dans un vrai site, alors que le navigateur les a déjà validées ?
6. Que se passe-t-il pour le carnet si le visiteur change de navigateur, d'ordinateur ou vide ses données de navigation ?
7. Pourquoi utiliser la délégation d'événements pour les boutons « Supprimer » ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 vous demande de présenter la conduite d'une pépinière et de **suivre le développement de la plante** (rapport d'activité sur la parcelle). Ce que vous venez d'apprendre peut servir à : **mémoriser l'étape consultée** par le visiteur, garder un **mode sombre** ou une taille de texte, ou proposer un petit **journal de bord** (dates de semis, hauteur des plants). Attention : ce que vous affichez doit rester **juste** (la grille d'évaluation vérifie la pertinence des informations biologiques) et la page doit fonctionner **sans** stockage : si `localStorage` est bloqué, elle doit simplement oublier, pas planter.

## Ressources

- MDN : [`localStorage`](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) · [API Web Storage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API) · [`storage` (événement)](https://developer.mozilla.org/fr/docs/Web/API/Window/storage_event)
- MDN : [`FormData`](https://developer.mozilla.org/fr/docs/Web/API/FormData) · [Validation des formulaires](https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation) · [`setCustomValidity`](https://developer.mozilla.org/fr/docs/Web/API/HTMLObjectElement/setCustomValidity) · [`ValidityState`](https://developer.mozilla.org/fr/docs/Web/API/ValidityState)
- MDN : [`JSON`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON) · [`textContent`](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent) · [`Element.closest()`](https://developer.mozilla.org/fr/docs/Web/API/Element/closest) · [`window.confirm`](https://developer.mozilla.org/fr/docs/Web/API/Window/confirm)

---

Exercice suivant : [11 — Des fiches qui viennent d'un fichier : JSON et fetch](../11-donnees-fetch/README.md)
