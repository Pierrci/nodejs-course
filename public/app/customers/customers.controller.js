(function () {
  'use strict';

  angular
    .module('meanApp.customers')
    .controller('CustomersController', CustomersController);

  CustomersController.$inject = ['customersService', '$mdDialog', '$mdToast'];
  function CustomersController(customersService, $mdDialog, $mdToast) {
    const vm = this;
    vm.tableOptions = { order: 'firstName' };
    vm.confirmDeleteModal = confirmDeleteModal;

    activate();

    ////////////////

    function activate() {
      getAll();
    }

    /**
     * Récupère la liste des customers et les injecte dans le viewmodel
     */
    function getAll() {
      vm.customers = customersService.getAll();
      vm.customersPromise = vm.customers.$promise;
    }

    function confirmDeleteModal(event, customer) {
      // Création de l'objet modal
      let confirmModal = $mdDialog.confirm()
        .title(`Etes-vous sûr(e) ?`)
        .textContent(`Vous allez supprimer le client ${customer.firstName} ${customer.lastName}.`)
        .ariaLabel('Popup de confirmation de suppression')
        .targetEvent(event)
        .ok('Je confirme')
        .cancel('Annuler');

      $mdDialog
        .show(confirmModal) // Affichage de la modal
        .then(() => {
          // Si confirmation de la suppression
          return customersService.deleteCustomer(customer);
        })

        // On rentre ici si la suppression s'est bien déroulée
        .then(result => {
          $mdToast.show($mdToast.simple().textContent('Client supprimé')); // Notification de l'utilisateur
          vm.customers.splice(vm.customers.indexOf(customer), 1); // On supprime l'élément de la liste de clients
        });
    }
  }

})();
