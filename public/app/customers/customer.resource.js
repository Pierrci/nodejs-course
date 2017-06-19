(function () {
  'use strict';

  angular
    .module('meanApp.customers')
    .factory('Customer', Customer);

  Customer.$inject = ['API_PREFIX', '$resource'];
  function Customer(API_PREFIX, $resource) {
    const CustomerResource = $resource(
      API_PREFIX + 'customers/:customerId', // Définition de l'url de note API REST pour les customers
      { customerId: '@_id' }, // La valeur du paramètre customerId sera celle de la propriété '_id' de l'objet customer (si présente)
      { 'update': { method: 'PUT' } } // Le service $resource ne fournit pas de méthode par défaut pour un PUT, on en crée une manuellement
    )

    /*
      Méthodes diponibles nativement sur une $resource :
      { 'get':    {method:'GET'}, // Retourne un customer en particulier
        'save':   {method:'POST'},
        'query':  {method:'GET', isArray:true}, // Retoure la liste des customers
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'} };
      https://code.angularjs.org/1.4.10/docs/api/ngResource/service/$resource
     */

    return CustomerResource; // On retourne cette resource
  }

})();
