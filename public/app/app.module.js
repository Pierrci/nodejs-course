(function () {
  'use strict'

  angular
    .module('meanApp', [
      'meanApp.customers',

      'ngRoute',
      'ngMaterial',
      'ngSanitize',
      'pascalprecht.translate'
    ])
    .constant('API_PREFIX', 'api/') // Constante disponible dans toute l'application par injection
    .config(routerConfig) // Configuration des routes
    .config(languageConfig) // Configuration de la traduction

  routerConfig.$inject = ['$routeProvider', '$locationProvider']
  function routerConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)

    $routeProvider
      .when('/', {
        templateUrl: 'app/home.html'
      })
      .when('/customers', {
        controller: 'CustomersController',
        controllerAs: 'custsCtrl',
        templateUrl: 'app/customers/customers.html'
      })
      .when('/customers/form/:customerId?', {
        // Cette route peut prendre un paramètre optionnel 'customerId'
        controller: 'CustomerFormController',
        controllerAs: 'custFormCtrl',
        templateUrl: 'app/customers/customer-form.html'
      })
      .otherwise('/')
  }

  languageConfig.$inject = ['$translateProvider']
  function languageConfig($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: 'app/',
      suffix: '.lang.json'
    })

    $translateProvider.preferredLanguage('fr') // Langage par défaut
    $translateProvider.useSanitizeValueStrategy('escape') // Stratégie d'assainissement des strings
    $translateProvider.fallbackLanguage(['fr']) // Langage de secours si une clé n'est pas définie en anglais
  }

})()
