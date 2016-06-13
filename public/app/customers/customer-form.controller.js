(function () {
  'use strict';

  angular
    .module('meanApp.customers')
    .controller('CustomerFormController', CustomerFormController);

  CustomerFormController.$inject = ['$routeParams', 'customersService', '$location', '$mdToast'];
  function CustomerFormController($routeParams, customersService, $location, $mdToast) {
    var vm = this;
    vm.submitForm = submitForm;

    activate();

    ////////////////

    function activate() { 
      if (!$routeParams.customerId) {
        vm.title = 'ADD_A_CLIENT';
        vm.buttonAction = 'ADD';
        return;
      }

      // Si il y a un paramètre 'customerId' dans l'url de la page, alors récupération du client à modifier
      vm.title = 'EDIT_A_CLIENT';
      vm.buttonAction = 'MODIFY';
      vm.customer = customersService.getById($routeParams.customerId); // On accède au paramètre 'customerId' de l'url avec $routeParams
    }

    /**
     * Envoie le formulaire
     */
    function submitForm() {
      customersService
        .sendCustomer(vm.customer)
        .$promise

        // Si l'opération s'est correctement déroulée, on retourne sur la liste des clients
        .then(customer => $location.path('/customers'))

        // En cas d'erreur, on affiche un 'toast' avec le contenu de l'erreur
        .catch(error => $mdToast.show($mdToast.simple().textContent('Erreur : ' + JSON.stringify(error))));
    }    
  }

})();
