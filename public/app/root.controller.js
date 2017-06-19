(function () {
  'use strict';

  angular
    .module('meanApp')
    .controller('RootController', RootController);

  RootController.$inject = ['$translate'];
  function RootController($translate) {
    const vm = this;
    vm.switchLanguage = switchLanguage;
    vm.getCurrentLanguage = getCurrentLanguage;

    activate();

    ////////////////

    function activate() { }

    /**
     * Change la langue entre français et anglais
     */
    function switchLanguage() {
      $translate.use() == 'fr' ? $translate.use('en') : $translate.use('fr');
    }

    /**
     * Retourne la clé du langage courant
     * @returns {String} Clé du langage courant
     */
    function getCurrentLanguage() {
      return $translate.use();
    }
  }

})();
