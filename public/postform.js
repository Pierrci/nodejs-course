(function () {
  'use strict'

  $.get('/data') // Appel http GET au serveur pour chercher les données envoyées via le formulaire
    .then(data => { // L'appel retourne une Promise qui nous renvoie les données
      let dataTable = $('#dataTable')
      dataTable.empty()

      /**
       * On utilise les 'template strings' introduites dans ES6 : https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/
       * On peut saisir une string sur plusieurs lignes et inclure des variables JS via la notation ${myVar}
       */
      dataTable.html(`
        <tr>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td>${data.age}</td>
        </tr>
      `)
    })

})();
