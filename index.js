'use strict'

const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/myapp') // Permet d'établir une connexion avec une base MongoDB
mongoose.connection.once('open', () => {
  console.log('Connection to mongo OK') // Affiché dans la console une fois la connexion à mongo ouverte
})

/**
 * Middlewares
 * body-parser : parse le corps des requêtes en objet JS et l'attache à l'objet request via la propriété 'body'
 * morgan : ajoute des logs côté serveur, utile pour le développement, notamment les requêtes HTTP
 */
const bodyParser = require('body-parser')
const morgan = require('morgan')

const controller = require('./controller')

/**
 * Ici on utilise une nouveauté de ES6, la destructuration d'objet, c'est l'inverse de 'const controller = { allInit, allAuth, ... }'
 * https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
 * On peut ainsi appeler les fonctions simplement, au lieu de devoir faire controller.allInit ou controller.allAuth
 */
const { allInit, allAuth, getIndex, getForm, postForm, deleteData } = controller

app.use(morgan('combined')) // On active le middleware morgan avec le profil de log prédéfini 'dev'
app.use(bodyParser.json()) // Pour parser le format 'application/json'
app.use(bodyParser.urlencoded({ extended: true })) // Pour parser le format 'application/x-www-form-urlencoded'

/**
 * On précise qu'Express ne devra pas traiter les fichiers statiques (images, css, js...) du dossier 'public'
 * Ils seront retournés directement, ce qui permet d'y accéder via .../script.js par exemple
 */
app.use(express.static('public'))

app.set('view engine', 'pug') // Définit Pug (ex-Jade) comme le moteur de template à utiliser pour rendre les vues
app.use(router) // On indique qu'on va utiliser le router créé, à placer APRES les autres middlewares

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
 * Le DELETE est utilisé pour supprimer une propriété de la session
 * 'propkey' est un paramètre (précédé par ':') optionnel (suivi par '?'), il est utilisé lors d'un DELETE
 */
router.route('/form/:prop?')
  .get(getForm)
  .post(postForm)
  .delete(deleteData)

app.listen(8080) // Indispensable pour mettre le serveur en écoute sur le port spécifié
