'use strict'

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
  /**
   * On accède à l'objet 'body' créé par body-parser qui contient le corps de la requête
   * On affecte cet objet dans une nouvelle propriété de notre cookie de session
   */
  request.session.form = request.body; 

  // On retourne la vue avec en paramètre les infos stockées précédemment en session
  response.render('postform', { data: request.session.form })
}

function deleteData(request, response) {
  const propToDelete = request.params.prop // On accède au nom de la propriété via l'url qui est au format /form/:prop
  delete request.session.form[propToDelete] // On supprime la propriété dans le cookie de session

  response.end() // On indique au client que le traitement de la requête est terminée en renvoyant un simple code 200 (implicite avec response.end())
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
