'use strict'

let express = require('express')
let app = express()
let router = express.Router()
let mongoose = require('mongoose')

/**
 * mongoose.connect() permet d'établir une connexion avec une base MongoDB, ici un container docker
 * Avec une installation classique de MongoDB, remplacer '192.168.99.100' par 'localhost'
 */
mongoose.connect('192.168.99.100', 'test')
let db = mongoose.connection
db.once('open', () => console.log('connection ok'))

/**
 * Middlewares
 * body-parser : parse le corps des requêtes en objet JS et l'attache à l'objet request via la propriété 'body'
 * morgan : ajoute des logs côté serveur, utile pour le développement, notamment les requêtes HTTP
 */
let bodyParser = require('body-parser')
let morgan = require('morgan')

let controller = require('./controller')

/**
 * Ici on utilise une nouveauté de ES6, la destructuration d'objet, c'est l'inverse de 'let controller = { allInit, allAuth, ... }'
 * https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
 * On peut ainsi appeler les fonctions simplement, au lieu de devoir faire controller.allInit ou controller.allAuth
 */
let { allInit, allAuth, getIndex, getForm, postForm, getLastFormData } = controller

app.use(morgan('dev')) // On active le middleware morgan avec le profil de log prédéfini 'dev'
app.use(bodyParser.json()) // Pour parser le format 'application/json'
app.use(bodyParser.urlencoded({ extended: true })) // Pour parser le format 'application/x-www-form-urlencoded'

/**
 * On précise qu'Express ne devra pas traiter les fichiers statiques (images, css, js...) du dossier 'public'
 * Ils seront retournés directement, ce qui permet d'y accéder via .../postform.js par exemple
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
 */
router
  .route('/form')
  .get(getForm)
  .post(postForm)

/**
 * Point d'entrée de notre très simple API pour récupérer la dernière saisie de formulaire
 * N'est plus utilisé avec Pug puisqu'on n'a pas besoin de récupérer les données depuis le JS
 */
router
  .route('/data')
  .get((req, res) => {
    getLastFormData()
      .then(document => res.json(document)) // On retourne le document récupéré sous format JSON
      .catch(() => res.status(500).end()) // En cas d'erreur on retourne une erreur serveur (statut 500) 
  })

app.listen(8080) // Indispensable pour mettre le serveur en écoute sur le port spécifié
