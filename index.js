'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const config = require('./config') // On a déplacé les informations de configuration dans un fichier dédié

mongoose.connect(config.database) // Permet d'établir une connexion avec une base MongoDB
mongoose.connection.once('open', () => console.log('connection ok'))

/**
 * Middlewares
 * body-parser : parse le corps des requêtes en objet JS et l'attache à l'objet request via la propriété 'body'
 * morgan : ajoute des logs côté serveur, utile pour le développement, notamment les requêtes HTTP
 */
app.use(morgan('dev')) // On active le middleware morgan avec le profil de log prédéfini 'dev'
app.use(bodyParser.json()) // Pour parser le format 'application/json'
app.use(bodyParser.urlencoded({ extended: true })) // Pour parser le format 'application/x-www-form-urlencoded'

/**
 * On précise qu'Express ne devra pas traiter les fichiers statiques (images, css, js...) du dossier 'public'
 * Ils seront retournés directement, ce qui permet d'y accéder via .../postform.js par exemplec
 * C'est ce dossier 'public' qui contient notre application angular 
 */
app.use(express.static(path.join(__dirname, '/public')))

// On importe le router qui définit les routes pour notre api et on l'utilise
const apiRoutes = require('./app/routes/api')
app.use('/api', apiRoutes)

/**
 * Toutes les routes qui ne correspondent pas à notre api doivent être traitées par angular
 * On redirige donc les requêtes qui ne matchent pas /api vers l'application angular
 * Ce routage doit être placé APRES le router /api puisqu'il matche toutes les routes
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(config.port) // Indispensable pour mettre le serveur en écoute sur le port spécifié
