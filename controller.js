'use strict'

let path = require('path') // Utilisé pour récupérer les chemins des fichiers

/**
 * On a séparé les fichiers front (html et js) dans un dossier spécifique 'public'
 * '__dirname' retourne le chemin du dossier dans lequel le script node est exécuté
 * path.join se charge de retourné un chemin valide en concaténant correctement l'ensemble des arguments
 */
let publicPath = path.join(__dirname, 'public')

function allInit(req, res, next) {
  console.log("All init")
  next() // allInit est utilisé en tant que 'middleware' et doit rendre la main une fois terminé pour que le handler suivant puisse s'exécuter
}

function allAuth(req, res, next) {
  console.log("All auth")
  next() // Même chose que allInit
}

function getIndex(request, response) {
  response.sendFile(path.join(publicPath, 'index.html'))
}

function getForm(request, response) {
  response.sendFile(path.join(publicPath, 'form.html'))
}

function postForm(request, response) {
  let body = request.body // On accède à l'objet 'body' créé par body-parser qui contient le corps de la requête

  // On affecte les deux variables de la requête au cookie fourni par cookie-session  
  request.session.name = body.name
  request.session.age = body.age

  // On retourne un fichier html
  response.sendFile(path.join(publicPath, 'postform.html'))
}

// ES6 nous permet d'éviter d'avoir un objet sous la forme { allInit: allInit, allAuth: allAuth, ... }
module.exports = {
  allInit,
  allAuth,
  getIndex,
  getForm,
  postForm
}
