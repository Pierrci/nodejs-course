'use strict'

const express = require('express');
const config = require('../../config')
const Customer = require('../models/customer')

const apiRouter = express.Router()

apiRouter
  .route('/customers')

  // GET sur /customers : on doit retourner tous les customers
  .get((req, res) => {
    Customer
      .find() // On récupère tous les customers
      .then(users => res.json(users)) // Succès : on les retourne en JSON
      .catch(error => res.send(error)) // Echec : on retourne l'erreur
  })

  // POST sur /customers : on ajoute le customer passé dans la requête 
  .post((req, res) => {
    const customer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      creationDate: new Date(), // La date de création est créée directement côté serveur avec la date courante
      website: req.body.website
    })

    customer
      .save() // On enregistre le nouveau customer
      .then(() => res.json('Customer created')) // Message de succès si OK
      .catch(error => res.send(error)) // On renvoie l'erreur le cas échéant
  })

apiRouter
  .route('/customers/:customerId')

  // GET sur /customers/:customerId : si on a un id dans la requête, on retourne le customer concerné
  .get((req, res) => {
    Customer
      .findById(req.params.customerId) // On récupère le customer avec son id
      .then(customer => res.json(customer)) // Succès : on renvoie le customer en JSON
      .catch(error => res.send(error)) // Erreur : on retourne l'erreur
  })

  // PUT sur /customers/:customerId : On met à jour le customer avec les infos de la requête
  .put((req, res) => {

    // On crée un objet avec les propriétés qui doivent être mises à jour
    const updatedCustomer = {};
    if (req.body.firstName) updatedCustomer.firstName = req.body.firstName
    if (req.body.lastName) updatedCustomer.lastName = req.body.lastName
    if (req.body.website) updatedCustomer.website = req.body.website

    Customer
      .findByIdAndUpdate(req.params.customerId, { $set: updatedCustomer }) // Update avec l'objet créé
      .then(customer => res.json(customer)) // Succès : on renvoie le customer modifié
      .catch(error => res.send(error)) // Erreur : on retourne l'erreur
  })

  // DELETE sur /customers/:customerId : suppression du customer dont l'id est en paramètre
  .delete((req, res) => {
    Customer
      .remove({ _id: req.params.customerId })
      .then(result => console.log(result))
      .catch(error => res.send(error))
  })

module.exports = apiRouter // Ne pas oublier de retourner le router pour pouvoir l'utiliser !!
