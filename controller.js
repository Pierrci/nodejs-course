'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  name: String,
  age: Number,
});

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
  const form = new Form(request.body)
  form.save();

  // On retourne la vue avec en paramètre les infos stockées précédemment en session
  response.render('postform', { data: request.body })
}

function deleteData(request, response) {
  const propToDelete = request.params.prop // On accède au nom de la propriété via l'url qui est au format /form/:prop
  Form.findOne().sort({ _id: -1 })
    .then(doc => {
      const update = {}
      update[propToDelete] = ''

      return doc.update({ $unset: update })
    })
    .then(resp => {
      // On indique au client que le traitement de la requête est terminée en renvoyant un simple code 200 (implicite avec response.end())
      response.end()
    })
}

// ES6 nous permet d'éviter d'avoir un objet sous la forme { allInit: allInit, allAuth: allAuth, ... }
module.exports = {
  allInit,
  allAuth,
  getIndex,
  getForm,
  postForm,
  deleteData
}
