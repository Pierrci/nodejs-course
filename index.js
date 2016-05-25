'use strict'

let express = require('express')
let app = express()
let router = express.Router()

/**
 * Middlewares
 * body-parser : parse le corps des requêtes en objet JS et l'attache à l'objet request via la propriété 'body'
 * cookie-session : utilisé pour stocker les infos du formulaire le temps de la session dans un cookie
 * morgan : ajoute des logs côté serveur, utile pour le développement, notamment les requêtes HTTP
 */
let bodyParser = require('body-parser')
let cookieSession = require('cookie-session')
let morgan = require('morgan')

let controller = require('./controller')

/**
 * Ici on utilise une nouveauté de ES6, la destructuration d'objet, c'est l'inverse de 'let controller = { allInit, allAuth, ... }'
 * https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
 * On peut ainsi appeler les fonctions simplement, au lieu de devoir faire controller.allInit ou controller.allAuth
 */
let { allInit, allAuth, getIndex, getForm, postForm } = controller

app.use(morgan('dev')) // On active le middleware morgan avec le profil de log prédéfini 'dev'
app.use(bodyParser.json()); // Pour parser le format 'application/json'
app.use(bodyParser.urlencoded({ extended: true })); // Pour parser le format 'application/x-www-form-urlencoded'

// cookie-session attache une propriété 'session' à l'objet request où l'on pourra stocker et retrouver les données du formulaire
app.use(cookieSession({
  keys: ['fafe', 'grzgaez'] // liste de clés, obligatoire pour signer et vérifier le cookie (au moins une)
}))

/**
 * On précise qu'Express ne devra pas traiter les fichiers statiques (images, css, js...) du dossier 'public'
 * Ils seront retournés directement, ce qui permet d'y accéder via .../postform.js par exemple
 */
app.use(express.static('public'));

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
 * Point d'entrée de notre très simple API pour récupérer et supprimer les données saisies dans le formulaire
 * 'key' est un paramètre (précédé par ':') optionnel (suivi par '?'), il est utilisé lors d'un DELETE mais pas pour un GET
 */
router
  .route('/data/:key?')
  .get((req, res) => {
    res.json(req.session) // Pour un verbe GET, on retourne simplement un objet JSON avec le contenu du cookie 'session'
  })

  // Cas d'un verbe DELETE
  .delete((req, res) => {
    let key = req.params.key // On récupère le paramètre via son nom dans l'objet 'params' de la requête

    delete req.session[key] // On supprime simplement dans l'objet 'session' la valeur de la clé récupérée en paramètre
    res.end() // On retourne une réponse vide, le code HTTP sera automatiquement 200 (succès)
  })

app.listen(8080) // Indispensable pour mettre le serveur en écoute sur le port spécifié
