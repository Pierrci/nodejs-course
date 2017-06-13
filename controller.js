'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * On crée un nouveau schéma, qu'on nomme formSchema,
 * et qui contiendra les infos récupérées via le formulaire
 */
const formSchema = new Schema({
  name: String,
  age: Number,
})

/**
 * On instancie un modèle à partir du schéma créé
 * Dans MongoDB, le modèle 'Form' correspondra à une collection 'forms' générée par mongoose
 */
const Form = mongoose.model('Form', formSchema)

function allInit(req, res, next) {
  console.log("All init")
  next() // allInit est utilisé en tant que 'middleware' et doit rendre la main une fois terminé pour que le handler suivant puisse s'exécuter
}

function allAuth(req, res, next) {
  console.log("All auth")
  next() // Même chose que allInit
}

function getIndex(request, response) {
  response.render('index')
}

function getForm(request, response) {
  response.render('form')
}

function postForm(request, response) {
  // On crée un nouveau document à partir du modèle 'Form' et des infos du formulaire
  const form = new Form(request.body)

  form.save()
    .then(doc => {
      /**
       * On est ici si l'écrite en base de données des infos du formulaire s'est correctement déroulée
       * On retourne donc la vue avec en paramètre les infos reçues dans la requête et sauvegardées en BDD
       */
      response.render('postform', { data: request.body })
    })

    // En cas d'erreur on retourne une erreur serveur (statut 500)     
    .catch(() => response.status(500).end())
}

function deleteData(request, response) {
  // On accède au nom de la propriété à supprimer via l'url qui est au format /form/:prop
  const propToDelete = request.params.prop
  
  /**
   * On choisit ici arbitrairement de considérer que les infos que l'on souhaite modifier
   * correspondent aux dernières écrites en base de données.
   * On récupère donc le dernier document ajouté en faisant un tri ("sort") décroissant sur l'id
   */
  Form.findOne().sort({ _id: -1 })
    .then(doc => {
      // On crée un objet sous la forme { prop: '' }, prop étant la valeur que l'on souhaite supprimer
      const update = {}
      update[propToDelete] = ''

      return doc.update({ $unset: update }) // https://docs.mongodb.com/manual/reference/operator/update/unset/
    })
    .then(resp => {
      // On indique au client que le traitement de la requête est terminée en renvoyant un simple code 200 (implicite avec response.end())
      response.end()
    })
}

// ES6 nous permet d'éviter d'écrire un objet sous la forme { allInit: allInit, allAuth: allAuth, ... }
module.exports = {
  allInit,
  allAuth,
  getIndex,
  getForm,
  postForm,
  deleteData
}
