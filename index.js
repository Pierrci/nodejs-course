'use strict'

const express = require('express')
const app = express()
const router = express.Router()

const controller = require('./controller')

// Ici on utilise une nouveauté de ES6, la destructuration d'objet, c'est l'inverse de 'const controller = { allInit, allAuth, ... }'
// https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
// On peut ainsi appeler les fonctions simplement, au lieu de devoir faire controller.allInit ou controller.allAuth
const { allInit, allAuth, getIndex, getForm, postForm } = controller

// On indique qu'on va utiliser le router créé
app.use(router)

/**
 * Agit comme un middleware, puisqu'intercepte toutes les requêtes sur toutes les routes
 * La fonction allInit appelle bien next(), ce qui permet de rendre la main au handler suivant
 */
router
  .route('*')
  .all(allInit)

/**
 * GET sur la page d'accueil
 */
router
  .route('/')
  .get(getIndex)

/**
 * Url '/form'
 * Le GET retourne la page de saisie du formulaire
 * Le POST traite les données envoyées via la fonction postForm
 */
router
  .route('/form')
  .get(getForm)
  .post(postForm)

// Indispensable pour mettre le serveur en écoute sur le port spécifié
app.listen(8080)
