'use strict'

const path = require('path') // Utilisé pour récupérer les chemins des fichiers

function allInit(req, res, next) {
  console.log("All init")
  next() // allInit est utilisé en tant que 'middleware' et doit rendre la main une fois terminé pour que le handler suivant puisse s'exécuter
}

function allAuth(req, res, next) {
  console.log("All auth")
  next() // Même chose que allInit
}

function getIndex(request, response) {
  // __dirname retourne le chemin du dossier dans lequel le script node est exécuté
  // path.join se charge de retourné un chemin valide en concaténant correctement l'ensemble des arguments
  response.sendFile(path.join(__dirname, 'index.html'))
}

function getForm(request, response) {
  response.sendFile(path.join(__dirname, 'form.html'))
}

function postForm(request, response) {
  // Express ajoute une méthode 'json' à l'objet 'response' qui permet de retourner simplement un objet JSON
  response.json({ result: 'success '})
}

// ES6 nous permet d'éviter d'avoir un objet sous la forme { allInit: allInit, allAuth: allAuth, ... }
module.exports = {
  allInit,
  allAuth,
  getIndex,
  getForm,
  postForm
}
