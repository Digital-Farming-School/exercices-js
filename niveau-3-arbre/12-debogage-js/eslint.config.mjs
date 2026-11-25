// Configuration ESLint (facultative, pour le bonus) : un « relecteur automatique » du code.
// Utilisation, dans ce dossier :  npx eslint js/script.js
export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        setTimeout: "readonly"
      }
    },
    rules: {
      "no-undef": "error",       // variable ou fonction inconnue (fautes de frappe)
      "no-unused-vars": "warn",  // code mort : déclaré mais jamais utilisé
      "eqeqeq": "error",         // toujours === et !==
      "no-var": "error",         // let / const uniquement
      "no-console": "warn"       // console.log oubliés
    }
  }
];
