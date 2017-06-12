(function() {
  'use strict'
  
  $.get('/data') // Appel http GET au serveur pour chercher les données envoyées via le formulaire
      .then(data => { // L'appel retourne une Promise qui nous renvoie les données
        let dataTable = $('#dataTable')
        dataTable.empty()

        let dataTableHtml = ''

        for (let prop in data) { // On parcours l'objet JSON retourné par le serveur
          if (data.hasOwnProperty(prop)) {
            /**
             * On utilise les 'template strings' introduites dans ES6 : https://hacks.mozilla.org/2015/05/es6-in-depth-template-strings-2/
             * On peut saisir une string sur plusieurs lignes et inclure des variables JS via la notation ${myVar}
             */
            dataTableHtml +=
              `<tr>
                <td>${data[prop]}</td>
                <td><button onclick="deleteCookie('${prop}', this)">Delete</button></td>
              </tr>`
          }
        }

        dataTable.html(dataTableHtml)
      })

  function deleteCookie(name, btn) {
    // Il n'y a pas de $.delete dans jquery, on passe donc par la méthode 'ajax' avec un type 'DELETE' pour supprimer un élément
    $.ajax({
      url: `/data/${name}`,
      type: 'DELETE',
      success: result => {
        // Callback appelée une fois la réponse OK du serveur reçue : on supprime la ligne correspondante du tableau
        $(btn).closest('tr').remove()
      }
    })
  }
  
})();