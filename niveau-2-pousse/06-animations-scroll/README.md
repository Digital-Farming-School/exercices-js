# Exercice 06 — Des animations déclenchées par le défilement

**Niveau 2 · Pousse** · ★★☆☆ · Durée : 1 h · Notions : `classList.toggle()`, `transition`, `@keyframes` + `animationend`, `IntersectionObserver`, `transitionend`, `style.setProperty()` (variables CSS), `requestAnimationFrame()`, `matchMedia()` et `prefers-reduced-motion`

> La ferme-école veut présenter ses chiffres-clés à ses visiteurs. Aujourd'hui, tout est affiché d'un coup : personne ne remarque rien. Votre mission : faire **apparaître** les cartes une à une quand on arrive dessus, faire **monter** les chiffres de 0 à leur valeur, et ouvrir un panneau météo en douceur, tout en respectant les personnes qui ne supportent pas les animations.

## Objectifs

- Piloter une **transition CSS** et une **animation `@keyframes`** en ajoutant et en retirant des classes avec JavaScript.
- Détecter qu'un élément **entre dans l'écran** avec `IntersectionObserver` (sans écouter `scroll`).
- Décaler des animations avec une **variable CSS** posée en JavaScript.
- Animer un nombre avec `requestAnimationFrame`.
- Respecter la préférence « réduire les animations » côté JavaScript.

## Fichiers fournis

```
06-animations-scroll/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← complet : transitions, @keyframes pulse, classes .ouvert .visible .pulse
├── js/
│   └── script.js      ← les éléments sont déjà sélectionnés ; les TODO attendent votre code
└── images/
    ├── apprenants.svg  varietes.svg  parcelle.svg  eau.svg
```

> **Le CSS décrit les animations, le JavaScript les déclenche.** Ouvrez `css/style.css` : repérez `.meteo.ouvert`, `.apparait.visible`, `@keyframes pulse` et `transition-delay: var(--delai, 0ms)`. Vous n'avez rien à y changer. Remarquez aussi `@media (scripting: enabled)` : les éléments `.apparait` ne sont cachés **que si JavaScript fonctionne**. Sans lui, la page reste lisible.

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- les cartes et les chiffres sont **invisibles** : c'est normal, la classe `visible` n'est posée par personne pour l'instant. Dans `F12` → *Éléments*, cherchez un élément `.apparait` et ajoutez à la main la classe `visible` (clic droit → *Ajouter un attribut*, ou *Modifier l'attribut* sur `class`). Il apparaît en douceur : c'est la transition CSS ;
- ajoutez de la même façon la classe `pulse` à un `.chiffre` : il rebondit. Retirez-la, puis ajoutez-la de nouveau ;
- cliquez sur le bouton « Afficher la météo » : rien ne se passe.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO` du fichier) :

1. **Ouvrir / fermer le panneau météo.** Au clic sur `boutonMeteo`, basculez la classe `ouvert` sur `panneauMeteo` avec `classList.toggle` (cette méthode **renvoie** `true` si la classe vient d'être ajoutée : gardez la valeur dans une variable). Mettez à jour `aria-expanded` et le texte du bouton (« Afficher… » ou « Masquer la météo du jardin »).
2. **Rejouer une animation `@keyframes`.** Écrivez `jouerPulse(element)` : elle ajoute la classe `pulse` ; quand l'événement `animationend` se produit, elle la retire (vérifiez `evenement.animationName === 'pulse'` et utilisez l'option `{ once: true }`). Branchez-la sur le clic de chaque `.chiffre`. Testez : sans le retrait de la classe, le deuxième clic ne ferait rien. Pourquoi ?
3. **Apparaître en arrivant.** Créez un `IntersectionObserver` avec l'option `{ threshold: 0.2 }`. Dans sa fonction de rappel, pour chaque entrée dont `isIntersecting` est vrai : ajoutez la classe `visible` à `entree.target`, puis appelez `observateur.unobserve(entree.target)` pour ne l'observer qu'une fois. Observez chaque élément de `elementsApparents` avec `observateur.observe(...)`. Les cartes en bas de page doivent apparaître seulement quand on y arrive.
4. **Cascade.** Pour que les cartes d'une même rangée n'apparaissent pas toutes ensemble, donnez un retard croissant : pour chaque élément, calculez son **rang** parmi ses frères (`Array.from(element.parentElement.children).indexOf(element)`) puis posez `element.style.setProperty('--delai', rang * 120 + 'ms')` (utilisez de préférence un gabarit de texte avec des accents graves). Écrivez ce code **avant** de lancer l'observation.
5. **Nettoyer après l'animation.** Survolez une carte en bas de rangée : son ombre met du temps à réagir ! Le retard `--delai` s'applique à **toutes** les transitions de l'élément, y compris l'ombre. Ajoutez un écouteur `transitionend` sur chaque élément `.apparait` : quand `evenement.propertyName === 'opacity'` et que l'élément est `visible`, retirez la variable avec `element.style.removeProperty('--delai')`.
6. **Compteur animé.** Écrivez `animerCompteur(chiffre)` :
   - lisez la valeur finale dans `data-cible` du `.nombre` (`nombre.dataset.cible`, **du texte** : convertissez-le avec `Number`) ;
   - avec `requestAnimationFrame`, calculez à chaque image un `progres` entre 0 et 1 (`(instant - debut) / duree`, plafonné à 1) et écrivez `Math.round(cible * progres)` dans le texte (utilisez `toLocaleString('fr-FR')` pour les espaces : `18 000`) ;
   - durée : 1,5 s. À la fin du compteur, appelez `jouerPulse(chiffre)` ;
   - appelez `animerCompteur` quand un `.chiffre` devient visible (dans votre observateur de l'étape 3).
7. **Respecter « réduire les animations ».** Si `mouvementReduit.matches` est vrai : ajoutez `visible` à **tous** les éléments tout de suite, sans compteur ni pulse (`jouerPulse` doit alors ne rien faire). Branchez aussi l'événement `change` de `mouvementReduit`, au cas où le réglage change pendant la lecture. Pour tester : **F12**, `Ctrl + Maj + P`, tapez `reduced motion`, choisissez **Emulate CSS prefers-reduced-motion: reduce**, puis rechargez.
8. **Test final.** Rechargez la page, faites défiler lentement, puis cliquez sur les chiffres. Testez enfin avec « reduced motion » émulé. Ouvrez la console : aucune erreur ne doit apparaître.

### Mémo — animer avec JavaScript

| Outil | Rôle | Exemple |
|---|---|---|
| `classList.toggle('x')` | ajoute ou retire la classe ; **renvoie** `true` / `false` | `const ouvert = panneau.classList.toggle('ouvert')` |
| `animationend` / `transitionend` | l'animation ou la transition est terminée | `element.addEventListener('animationend', fin, { once: true })` |
| `evenement.animationName` / `.propertyName` | quelle animation / quelle propriété vient de finir | `if (evenement.propertyName === 'opacity') …` |
| `style.setProperty('--nom', valeur)` | pose une **variable CSS** depuis JavaScript | `element.style.setProperty('--delai', '240ms')` |
| `style.removeProperty('--nom')` | la retire | `element.style.removeProperty('--delai')` |
| `element.dataset.cible` | lit l'attribut `data-cible` (toujours du **texte**) | `Number(nombre.dataset.cible)` |
| `window.matchMedia(requête)` | teste une media query en JavaScript | `matchMedia('(prefers-reduced-motion: reduce)').matches` |

```js
// IntersectionObserver : « préviens-moi quand ces éléments entrent dans l'écran »
const observateur = new IntersectionObserver((entrees) => {
  entrees.forEach((entree) => {
    if (entree.isIntersecting) {
      // entree.target est l'élément concerné
    }
  });
}, { threshold: 0.2 });          // 20 % de l'élément doit être visible

observateur.observe(unElement);   // commencer à surveiller
observateur.unobserve(unElement); // arrêter
```

```js
// requestAnimationFrame : une fonction appelée avant chaque image (≈ 60 fois par seconde)
function image(instant) {         // « instant » est un temps en millisecondes
  // … calculer et afficher …
  if (pasFini) {
    window.requestAnimationFrame(image);   // on demande l'image suivante
  }
}
window.requestAnimationFrame(image);
```

## Critères de réussite

- [ ] Le panneau météo s'ouvre et se ferme en douceur ; `aria-expanded` et le texte du bouton suivent.
- [ ] Un clic sur un chiffre le fait rebondir, **autant de fois** qu'on clique (avec une pause d'une demi-seconde).
- [ ] Les cartes et les chiffres apparaissent **quand on arrive dessus**, pas au chargement.
- [ ] Les éléments d'une même rangée apparaissent l'un après l'autre.
- [ ] Après l'apparition, l'ombre au survol réagit immédiatement (pas de retard).
- [ ] Les chiffres montent de 0 à leur valeur, avec des espaces de milliers (`18 000`), puis rebondissent.
- [ ] Avec « reduced motion » émulé : tout est affiché immédiatement, sans compteur ni rebond.
- [ ] Aucune erreur dans la console.

## Indices

<details>
<summary>Indice 1 — Rien n'apparaît jamais</summary>

Vérifiez que vous appelez bien `observateur.observe(element)` pour **chaque** élément (une boucle `forEach`). Créer l'observateur ne suffit pas : il ne surveille rien tant qu'on ne le lui demande pas. Vérifiez aussi l'orthographe de `isIntersecting` (avec un `s` à `Intersecting`).

</details>

<details>
<summary>Indice 2 — Le pulse ne se rejoue pas au deuxième clic</summary>

Une animation CSS ne démarre que quand la classe est **ajoutée**. Si `pulse` est déjà posée, ajouter la classe de nouveau ne change rien. Il faut la retirer quand l'animation est finie. Écoutez `animationend` sur l'élément, **pas** sur `document`.

</details>

<details>
<summary>Indice 3 — Le compteur affiche « NaN » ou « 18 »</summary>

`NaN` (*Not a Number*) apparaît quand on calcule avec du texte : `nombre.dataset.cible` est une **chaîne**, convertissez-la avec `Number(...)`. Si vous voyez `18` au lieu de `18 000`, vous avez sans doute lu le contenu du HTML (`"18 000"`, avec un espace) avec `parseInt` : lisez plutôt `data-cible="18000"`.

</details>

<details>
<summary>Indice 4 — Le compteur saute directement à la valeur finale</summary>

Il manque le `window.requestAnimationFrame(image)` **dans** la fonction `image` : sans lui, la fonction s'exécute une seule fois. Vérifiez aussi que le `progres` est calculé à partir du **temps écoulé** (`instant - debut`) et non du nombre d'appels.

</details>

<details>
<summary>Indice 5 — Les cartes apparaissent toutes en même temps</summary>

La variable `--delai` doit être posée **avant** que la classe `visible` soit ajoutée, et sur **chaque** carte avec un rang différent. Dans l'onglet *Éléments* de F12, vérifiez que l'attribut `style="--delai: 240ms"` est présent. Remarque : toutes les cartes d'un bloc ont le même parent, donc le retard continue de grandir d'une rangée à l'autre (360 ms, 480 ms…) : c'est normal.

</details>

## Bonus

- Remplacez le `threshold: 0.2` par `rootMargin: '0px 0px -10% 0px'` : que change cette option ?
- Faites passer le panneau météo de `display: grid` à `hidden` à la fin de la transition (`transitionend`), pour qu'il sorte vraiment du parcours au clavier. Aujourd'hui, c'est `visibility: hidden` dans le CSS qui s'en charge : pourquoi ne peut-on pas animer `display` ?
- Ajoutez un bouton « Rejouer » qui remet tous les chiffres à 0 et relance les compteurs.
- Remplacez la formule `1 - Math.pow(1 - progres, 3)` par `progres` tout court : quelle différence voyez-vous ? Laquelle trouvez-vous la plus naturelle ?

## Questions de compréhension

1. Pourquoi vaut-il mieux animer avec `transform` et `opacity` plutôt qu'avec `margin` ou `top` ?
2. Pourquoi `IntersectionObserver` est-il préférable à un écouteur `scroll` pour faire apparaître des éléments ?
3. Pourquoi retire-t-on la classe `pulse` à la fin de l'animation ?
4. À quoi sert `unobserve` ?
5. Qu'est-ce que `prefers-reduced-motion` ? Pourquoi est-ce important, et qui est concerné ?
6. Quelle différence entre `setTimeout` et `requestAnimationFrame` pour une animation ? (Cherchez dans la documentation MDN.)

## Lien avec le brief Plant Digital Nursery

Le brief 2 exige « une ou plusieurs animations avec CSS » **et** la manipulation du DOM avec JavaScript. Cet exercice montre comment les marier : le CSS décrit l'animation, le JavaScript décide du moment. Idées pour votre pépinière : faire apparaître chaque étape de la conduite quand le visiteur arrive dessus, animer un chiffre (nombre de jours avant le repiquage, taux de germination), ou ouvrir une fiche de plante en douceur. Une animation doit **aider** à comprendre ; et le brief demande une page « attrayante, intuitive et facile à utiliser » : ne soyez pas excessif.

## Ressources

- MDN : [`IntersectionObserver`](https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserver) · [`requestAnimationFrame()`](https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame) · [`Window.matchMedia()`](https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia)
- MDN : [`animationend`](https://developer.mozilla.org/fr/docs/Web/API/Element/animationend_event) · [`transitionend`](https://developer.mozilla.org/fr/docs/Web/API/Element/transitionend_event) · [`CSSStyleDeclaration.setProperty()`](https://developer.mozilla.org/fr/docs/Web/API/CSSStyleDeclaration/setProperty)
- MDN : [`prefers-reduced-motion`](https://developer.mozilla.org/fr/docs/Web/CSS/@media/prefers-reduced-motion) · [`Number.prototype.toLocaleString()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

---

Exercice suivant : [07 — Une galerie photo avec visionneuse](../07-galerie-lightbox/README.md)
