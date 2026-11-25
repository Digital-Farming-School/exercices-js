# Exercice 08 — Une capsule vidéo avec ses propres commandes

**Niveau 2 · Pousse** · ★★☆☆ · Durée : 1 h · Notions : `<video>` et `HTMLMediaElement` (`play()`, `pause()`, `currentTime`, `duration`, `volume`, `muted`, `playbackRate`), événements `loadedmetadata`, `timeupdate`, `play`, `pause`, `volumechange`, `ended`, `<track>` et `textTracks`, `<input type="range">`, amélioration progressive

> La ferme-école a filmé une capsule de 14 secondes : « Planter une bouture ». Le lecteur natif du navigateur fonctionne, mais il est gris, différent d'un navigateur à l'autre, et ne propose pas les **chapitres** que les apprenants réclament. Votre mission : fabriquer vos propres commandes (lecture, barre de progression, volume, vitesse, chapitres, sous-titres) avec JavaScript.

## Objectifs

- Piloter une vidéo en JavaScript : lecture, pause, position, volume, vitesse.
- Réagir aux **événements** du média (`loadedmetadata`, `timeupdate`, `play`, `pause`, `ended`, `volumechange`).
- Fabriquer une barre de progression avec `<input type="range">`.
- Utiliser des **chapitres** cliquables et des **sous-titres** (`<track>`).
- Vérifier par programme que la capsule respecte la **limite de 40 secondes**.

## Fichiers fournis

```
08-capsule-video/
├── README.md          ← cette consigne
├── index.html         ← la page (complète : vous ne la modifiez pas)
├── css/
│   └── style.css      ← complet
├── js/
│   └── script.js      ← les éléments sont déjà sélectionnés ; les TODO attendent votre code
├── images/
│   └── poster.svg     ← l'image affichée avant la lecture (attribut poster)
└── videos/
    ├── bouture.mp4  bouture.webm   ← la capsule, en deux formats (14 s, très légère)
    ├── bouture.fr.vtt              ← les sous-titres en français
    └── semis.mp4  semis.webm       ← une seconde capsule (12 s) pour les bonus
```

> **Le CSS n'est pas le sujet.** Dans `index.html`, observez la balise `<video>` : plusieurs `<source>` (le navigateur prend le premier format qu'il sait lire), un `<track>` pour les sous-titres, un `poster`, et surtout l'attribut `controls` : sans JavaScript, la vidéo reste donc utilisable. C'est l'**amélioration progressive**. Les commandes personnalisées sont cachées (`hidden`) : c'est votre script qui les montrera.

## Consigne

**Étape 0 — Observation (5 min).** Ouvrez `index.html` avec Live Server, puis :

- utilisez les commandes natives : lancez la vidéo, avancez, activez les sous-titres (la roue crantée ou le bouton « CC » selon le navigateur) ;
- cliquez sur les boutons de chapitres : rien ne se passe ;
- dans la console de `F12`, tapez `document.querySelector('video').duration`, puis `document.querySelector('video').currentTime = 8` et `document.querySelector('video').play()`. Vous venez de piloter la vidéo en JavaScript ;
- dans l'onglet *Réseau*, regardez quel format (`mp4` ou `webm`) votre navigateur a téléchargé.

Complétez ensuite `js/script.js` (les numéros correspondent aux commentaires `TODO` du fichier) :

1. **Prendre le contrôle.** Retirez les commandes natives avec `video.controls = false` et affichez les vôtres avec `commandes.hidden = false`. Écoutez l'événement `loadedmetadata` (la durée est connue) et affichez `video.duration` dans la console. **Piège** : si la vidéo a déjà chargé ses métadonnées quand le script s'exécute, l'événement ne se produira plus. Testez `video.readyState >= 1` (« métadonnées disponibles ») et appelez votre fonction tout de suite dans ce cas.
2. **Lecture / pause.** Au clic sur `boutonLecture` (et au clic sur la vidéo elle-même), appelez `video.play()` si `video.paused` est vrai, sinon `video.pause()`. Attention : `play()` renvoie une **promesse** ; ajoutez `.catch(...)` pour afficher l'erreur dans la console. Changez le texte du bouton (`▶ Lecture` / `⏸ Pause`) dans les événements **`play`** et **`pause`** de la vidéo, **pas** dans le clic. Pourquoi ? (Voir les questions.)
3. **Temps et progression.** À chaque événement `timeupdate`, mettez à jour `barreProgression.value` (un nombre de 0 à 100 : `currentTime / duration * 100`) et `affichageTemps` (par exemple `0:05 / 0:14`, avec la fonction fournie `formaterTemps`). Faites-le aussi quand les métadonnées arrivent, pour que « 0:14 » s'affiche avant la lecture. Évitez de diviser par une durée inconnue (`NaN`).
4. **Se déplacer.** Quand l'utilisateur déplace la barre (événement `input` de `barreProgression`), calculez l'instant correspondant (`value / 100 * duration`) et écrivez-le dans `video.currentTime`. Testez à la souris **et** au clavier (flèches gauche/droite sur la barre).
5. **Volume et son coupé.** Un `<input type="range">` fournit toujours du **texte** : convertissez `reglageVolume.value` avec `Number` avant de l'écrire dans `video.volume` (entre 0 et 1). Le bouton « Son » inverse `video.muted`. Mettez à jour son texte (`🔊 Son` / `🔇 Muet`) et son `aria-pressed` dans l'événement **`volumechange`**, qui se produit quand le volume **ou** `muted` change.
6. **Vitesse et chapitres.** Sur l'événement `change` du `<select>`, écrivez `Number(choixVitesse.value)` dans `video.playbackRate`. Pour les chapitres, un seul écouteur sur `listeChapitres` (délégation, comme à l'exercice 07) : retrouvez le bouton avec `closest('button')`, placez `video.currentTime` sur `Number(bouton.dataset.temps)` et lancez la lecture.
7. **Sous-titres.** La balise `<track>` crée une piste, accessible avec `video.textTracks[0]`. Au clic sur `boutonSousTitres`, faites passer sa propriété `mode` de `'hidden'` à `'showing'` (et inversement), et mettez à jour `aria-pressed`. Rappelez-vous que `mode = 'showing'` affiche les sous-titres.
8. **Fin de la vidéo et limite de 40 s.**
   - Sur l'événement `ended`, changez le texte du bouton en `↺ Rejouer` (un nouveau clic sur « play » repart du début).
   - Quand la durée est connue, écrivez dans `verdict` si la capsule respecte `DUREE_MAX` : « ✔ Durée conforme au brief : 0:14 (maximum 0:40) » avec la classe `ok`, ou « ⚠ Capsule trop longue… » avec la classe `alerte`. **Expérience** : passez `DUREE_MAX` à `10` et rechargez : le message d'alerte s'affiche-t-il ? Remettez ensuite `40`.
9. **Test final.** Testez **tout au clavier** (`Tab` entre les commandes, `Espace` sur un bouton, flèches sur les barres), puis à la souris, puis à 375 px de large. Aucune erreur dans la console.

### Mémo — piloter une vidéo

| Propriété / méthode | Rôle | Exemple |
|---|---|---|
| `video.play()` | lance la lecture ; **renvoie une promesse** | `video.play().catch(console.error)` |
| `video.pause()` | met en pause | |
| `video.paused` | `true` si la vidéo est en pause (ou pas encore lancée) | `if (video.paused) …` |
| `video.currentTime` | position actuelle, en secondes (on peut l'**écrire**) | `video.currentTime = 8` |
| `video.duration` | durée totale en secondes ; `NaN` tant qu'elle est inconnue | `Number.isFinite(video.duration)` |
| `video.volume` | de `0` à `1` | `video.volume = 0.5` |
| `video.muted` | son coupé ou non | `video.muted = !video.muted` |
| `video.playbackRate` | vitesse (`1` = normale) | `video.playbackRate = 1.5` |
| `video.readyState` | état du chargement (`1` : métadonnées, `4` : prête) | `if (video.readyState >= 1) …` |
| `video.textTracks[0].mode` | `'disabled'`, `'hidden'` (chargée, non affichée) ou `'showing'` | `piste.mode = 'showing'` |

| Événement | Quand ? |
|---|---|
| `loadedmetadata` | la durée et les dimensions sont connues |
| `timeupdate` | la position change (quelques fois par seconde) |
| `play` / `pause` | la lecture démarre / s'arrête, **quelle qu'en soit la raison** |
| `volumechange` | `volume` ou `muted` a changé |
| `ended` | la lecture est arrivée à la fin |

**Préparer VOTRE vidéo pour le brief** (limite : 40 secondes) avec [FFmpeg](https://ffmpeg.org/) (ou HandBrake, interface graphique) :

```bash
# Couper à 40 s, passer en 720p, compresser (mp4 lisible partout)
ffmpeg -i ma-video.mov -t 40 -vf scale=-2:720 -c:v libx264 -crf 28 -preset slow \
       -c:a aac -b:a 96k -movflags +faststart capsule.mp4

# Une version webm, plus légère (facultatif)
ffmpeg -i capsule.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -c:a libopus capsule.webm

# L'image « poster » prise à 3 secondes
ffmpeg -i capsule.mp4 -ss 3 -frames:v 1 poster.jpg
```

Visez moins de 10 Mo par capsule : une vidéo de téléphone brute pèse souvent 100 Mo et alourdit tout le site.

## Critères de réussite

- [ ] Les commandes natives ont disparu ; les commandes personnalisées sont affichées.
- [ ] Le bouton lance et arrête la vidéo ; son texte reste juste même quand la vidéo se termine.
- [ ] La barre de progression avance toute seule et permet de se déplacer, à la souris et au clavier.
- [ ] Le temps s'affiche (`0:05 / 0:14`), y compris la durée **avant** la lecture.
- [ ] Le volume, le bouton « muet » et la vitesse fonctionnent ; le bouton « muet » indique son état.
- [ ] Un clic sur un chapitre saute à l'instant correspondant et lance la lecture.
- [ ] Le bouton « Sous-titres » affiche et masque les sous-titres ; `aria-pressed` est à jour.
- [ ] Le message de durée est correct, et passe à l'alerte quand on met `DUREE_MAX` à 10.
- [ ] Aucune erreur dans la console.

## Indices

<details>
<summary>Indice 1 — « Uncaught (in promise) DOMException: play() failed »</summary>

Le navigateur refuse parfois de lancer une vidéo (lecture automatique bloquée, source illisible). `video.play()` renvoie alors une promesse **rejetée**. Ajoutez `.catch((erreur) => console.error(erreur))` : l'erreur n'est plus « non interceptée », et vous voyez la vraie raison.

</details>

<details>
<summary>Indice 2 — Le temps affiche « NaN:NaN » ou la barre ne bouge pas</summary>

Avant le chargement des métadonnées, `video.duration` vaut `NaN` (*Not a Number*) : `NaN` contamine tous les calculs. Utilisez `Number.isFinite(video.duration)` avant de diviser, et appelez votre mise à jour aussi à l'événement `loadedmetadata`. Vérifiez enfin que vous écrivez dans `barreProgression.value`, pas dans `.valueAsNumber` ou `.textContent`.

</details>

<details>
<summary>Indice 3 — Le volume reste bloqué ou la vidéo plante en « RangeError »</summary>

`video.volume` n'accepte que des nombres de 0 à 1 : écrire la **chaîne** `"0.5"` fonctionne, mais `"50"` provoque une erreur. Vérifiez les attributs `min`, `max` et `step` de l'`<input type="range">` dans le HTML, et convertissez avec `Number()`.

</details>

<details>
<summary>Indice 4 — Le texte « Lecture / Pause » est faux quand on clique sur la vidéo ou à la fin</summary>

Si vous changez le texte dans l'écouteur du **clic**, il ne reflète que ce clic. La vidéo peut s'arrêter pour d'autres raisons (fin, erreur, autre onglet). Les événements `play` et `pause` sont déclenchés dans **tous** les cas : c'est là qu'il faut mettre à jour l'affichage. De même pour `volumechange`.

</details>

<details>
<summary>Indice 5 — Les sous-titres ne s'affichent pas</summary>

Vérifiez l'adresse du fichier `.vtt` dans la balise `<track>` et ouvrez l'onglet *Réseau* (il doit être chargé, code 200). Vérifiez que vous écrivez bien `'showing'` (pas `'show'`). Avec Live Server c'est facile ; en ouvrant le fichier directement (`file://`), certains navigateurs refusent de charger les sous-titres.

</details>

## Bonus

- Ajoutez un bouton **Plein écran** : `conteneur.requestFullscreen()` sur le `<figure>` (et `document.exitFullscreen()` pour sortir). Pourquoi pas sur la `<video>` elle-même ? (Réfléchissez à vos commandes personnalisées.)
- Ajoutez un bouton **Picture-in-Picture** avec `video.requestPictureInPicture()` (vérifiez `document.pictureInPictureEnabled` d'abord).
- Ajoutez des **raccourcis clavier** : `Espace` (lecture), `←` / `→` (−5 s / +5 s), `M` (muet), `C` (sous-titres), sans casser la saisie dans les champs.
- Proposez un second bouton qui change de capsule (`semis.mp4`) : modifiez les `<source>` ou `video.src`, puis appelez `video.load()`.
- Mémorisez la position de lecture quand on quitte la page (voir l'exercice 10, `localStorage`).

## Questions de compréhension

1. Pourquoi laisse-t-on l'attribut `controls` dans le HTML alors que le JavaScript le retire ?
2. Pourquoi plusieurs `<source>` ? Qui choisit celle qui sera lue ?
3. Pourquoi met-on à jour le texte du bouton dans les événements `play` et `pause` plutôt que dans le clic ?
4. Que vaut `video.duration` avant `loadedmetadata` ? Quelles précautions faut-il prendre ?
5. Pourquoi convertir `reglageVolume.value` avec `Number` ?
6. Pourquoi une vidéo brute de téléphone (100 Mo) est-elle un problème pour un site, surtout en Afrique où le débit est souvent limité ?

## Lien avec le brief Plant Digital Nursery

Le brief 2 demande « des capsules vidéo de **40 secondes au maximum** » réalisées par vous-mêmes, pour **chaque étape** de la pépinière. Cet exercice vous donne un lecteur sur mesure, des chapitres pour sauter à un geste précis, des sous-titres (utiles en plein salon, sans le son !) et un contrôle automatique de la durée. Compressez vos vidéos avant de les mettre sur GitHub, ajoutez un `poster`, et gardez les commandes natives en secours (`controls`) si JavaScript ne se charge pas.

## Ressources

- MDN : [`<video>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/video) · [`HTMLMediaElement`](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement) · [`<track>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/track)
- MDN : [Événements des médias](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement#%C3%A9v%C3%A9nements) · [`TextTrack.mode`](https://developer.mozilla.org/fr/docs/Web/API/TextTrack/mode) · [`<input type="range">`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/range)
- MDN : [`Promise`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise) · [Picture-in-Picture](https://developer.mozilla.org/fr/docs/Web/API/Picture-in-Picture_API)
- Hors MDN : [documentation de FFmpeg](https://ffmpeg.org/documentation.html)

---

Exercice suivant : [09 — Le navigateur et la fenêtre (BOM)](../../niveau-3-arbre/09-bom-navigateur/README.md)
