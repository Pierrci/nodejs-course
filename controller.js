'use strict'

let mongoose = require('mongoose')
let path = require('path') // Utilisé pour récupérer les chemins des fichiers

/**
 * On a séparé les fichiers front (html et js) dans un dossier spécifique 'public'
 * '__dirname' retourne le chemin du dossier dans lequel le script node est exécuté
 * path.join se charge de retourner un chemin valide en concaténant correctement l'ensemble des arguments
 */
let publicPath = path.join(__dirname, 'public')

// On crée un nouveau schéma, qu'on nomme formSchema, et qui contiendra les infos récupérées via le formulaire
let Schema = mongoose.Schema
let formSchema = new Schema({
  name: String,
  age: String
})

/**
 * On instancie un modèle à partir du schéma créé
 * Dans MongoDB, le modèle 'Form' correspondra à une collection 'forms' générée par mongoose
 */
let Form = mongoose.model('Form', formSchema)

function allInit(req, res, next) {
  console.log("All init")
  next() // allInit est utilisé en tant que 'middleware' et doit rendre la main une fois terminé pour que le handler suivant puisse s'exécuter
}

function allAuth(req, res, next) {
  console.log("All auth")
  next() // Même chose que allInit
}

function getIndex(request, response) {
  response.render(path.join(publicPath, 'index'))
}

function getForm(request, response) {
  response.render(path.join(publicPath, 'form'))
}

function postForm(request, response) {
  let body = request.body // On accède à l'objet 'body' créé par body-parser qui contient le corps de la requête

  // On crée un nouveau document à partir du modèle 'Form' et des infos du formulaire
  let form = new Form({
    name: body.name,
    age: body.age
  })

  form
    .save() // On enregistre le document dans MongoDB et on récupère une promise : http://mongoosejs.com/docs/promises.html
    .then(value => {
      console.log(value)
      // On retourne la vue Pug avec les données en cas de succès de l'écriture dans MongoDB
      response.render(path.join(publicPath, 'postform'), {form})
    })
    .catch(() => response.status(500).end()) // En cas d'erreur on retourne une erreur serveur (statut 500) 
}

/**
 * @deprecated Ne sert plus avec Pug, peut être utilisée dans le cadre d'une API rest
 * 
 * Récupère le dernier document inséré dans la collection 'forms' dans MongoDB
 * @returns {Promise<Document>} Promise correspondant au résultat de la requête en BDD
 */
function getLastFormData() {
  return Form
    .find() // find() sans arguments retourne la liste complète des documents de la collection 'forms'
    .sort({ _id: -1 }) // On trie par '_id' descendant. '_id' est l'id unique généré automatiquement à partir de la date par MongoDB pour chaque document
    .limit(1) // On limite le résultat du tri précédent à un seul document
    .then(values => values[0]) // On récupère un tableau avec un seul élément, et on retourne donc cet élément
}

// ES6 nous permet d'éviter d'avoir un objet sous la forme { allInit: allInit, allAuth: allAuth, ... }
module.exports = {
  allInit,
  allAuth,
  getIndex,
  getForm,
  postForm,
  getLastFormData
}
