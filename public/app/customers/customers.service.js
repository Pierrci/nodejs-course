(function () {
  'use strict';

  angular
    .module('meanApp.customers')
    .service('customersService', CustomersService);

  CustomersService.$inject = ['Customer'];
  function CustomersService(Customer) {
    this.getAll = getAll;
    this.getById = getById;
    this.sendCustomer = sendCustomer;
    this.deleteCustomer = deleteCustomer;

    ////////////////

    /**
     * Retourne l'ensemble des customers existants
     * @returns {IResourceArray} Liste des customers
     */
    function getAll() {
      return Customer.query();
    }

    /**
     * Retourne un customer à partir de son id
     * @param {Number} id Id du customer à récupérer
     * @returns {IResource} Customer demandé
     */
    function getById(id) {
      return Customer.get({ customerId: id });
    }

    /**
     * Envoie au serveur un customer pour ajout ou update
     * @param {Object} customer Customer à ajouter/modifier
     * @returns {IResource} Customer ajouté/modifié
     */
    function sendCustomer(customer) {
      if (customer._id != undefined) {
        return Customer.update(customer);
      } else {
        return Customer.save(customer);
      }
    }

    /**
     * Supprime le customer en paramètre sur le serveur
     * @param {Object} customer Customer à supprimer
     * @returns {IResource} Resource du customer supprimé
     */
    function deleteCustomer(customer) {
      return Customer.delete({ customerId: customer._id });
    }
  }

})();
