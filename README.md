# nodejs-course

Repository fil rouge utilisée dans le cadre d'une introduction à NodeJS. Les différentes différentes branches correspondent aux étapes du cours.

## Pré-requis

* [NodeJS](https://nodejs.org/) (version LTS 6.x.x) doit être installé sur le système (en téléchargeant le programme d'installation sur le site).

* [Bower](https://bower.io/) est également nécessaire pour cette dernière étape pour récupérer les dépendances de notre application angularjs :

```bash
npm install -g bower
```

* [Gulp](http://gulpjs.com/) est lui utilisé pour "builder" l'application angularjs (compilation scss -> css, injection automatique des fichiers js/css des dépendances bower et de l'application dans `index.html`,...) :

```bash
npm install -g gulp
```

## Installation

Toutes les dépendances nécessaires sont listées dans les fichiers `package.json` (serveur) et `bower.json` (client). Pour les installer :

```bash
npm install
```

Le script de post-install de npm sera automatiquement exécuté à la suite et installera les dépendances bower pour l'application angularjs.

## step-5

On retrouve à cette étape une application complète utilisant la MEAN stack : MongoDB, Express, AngularJS, NodeJS. Le serveur NodeJS sert uniquement d'API via Express, et retourne à notre application angularjs les données nécessaires sous format JSON.

> *Pour fonctionner correctement, l'application nécessite que le serveur MongoDB soit lancé en arrière-plan. Voir les instructions pour [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#start-mongodb), [Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb) et [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#id7)*

Pour lancer simplement l'application : `node index.js`.  
Pour lancer l'application en mode développement :

```bash
npm start
```

Cette commande lance à la fois un serveur [nodemon](http://nodemon.io/) qui se recharge à chaque modification du code NodeJS, et un `gulp watch` qui se charge d'injecter en continu les nouveaux fichiers js/css et dépendances bower de l'application AngularJS dans `index.html` et de compiler les styles à chaque modification d'un *.scss.

### NodeJS

L'application NodeJS est structurée de la manière suivante :

```
/app
  /models
    customer.js
  /routes
    api.js
/node_modules
index.js
package.json
```

Le dossier `models` correspond au modèles pour notre base de données. Le dossier `routes` contient les scripts utilisés pour définir les différentes routes de notre application NodeJS.  
Par conséquent, le fichier `index.js` se limite à la configuration générale de l'application.

### AngularJS

L'application AngularJS utilise la version 1.6.x, avec [Angular Material](https://material.angularjs.org/latest/) pour ce qui est de l'interface utilisateur. Sa structure est la suivante :

```
/public
  /app
    /customers
      customer.resource.js
      customers.module.js
      customers.controller.js
      customers.html
      ...
  /bower_components
  app.module.js
  index.html
  ...
bower.json
```

On regroupe les fichiers par thème : on a créé un dossier pour le partie gestion des clients.

Le routage est effectué par [ngRoute](https://docs.angularjs.org/api/ngRoute), le router de base d'AngularJS, et les routes sont définies dans app.module.js. La gestion des langues est effectuée avec le module [angular-translate](https://angular-translate.github.io/).

Pour effectuer les requêtes sur l'API REST de notre serveur, on utilise [ngResource](https://docs.angularjs.org/api/ngResource), qui présente une API plus haut niveau que le service $http et qui permet de gérer simplement les requêtes CRUD sur un endpoint précis (ici `api/customers`). On crée ainsi la resource suivante dans une [factory](https://docs.angularjs.org/api/auto/service/$provide#factory) dédiée :

```javascript
$resource(
  API_PREFIX + 'customers/:customerId', // Définition de l'url de note API REST pour les customers
  { customerId: '@_id' }, // La valeur du paramètre customerId sera celle de la propriété '_id' de l'objet customer (si présente)
  { 'update': { method: 'PUT' } } // Le service $resource ne fournit pas de méthode par défaut pour un PUT, on en crée une manuellement
)
```

Il suffit ensuite d'injecter la factory associée dans le service `customers.service.js` qui se charge de faire les différents appels à notre API. Ce service est à son tour injecté dans les controllers qui ont besoin d'interagir avec les customers :

```
CustomerResource <- CustomersService <- CustomersController (ou CustomerFormController)
```

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
>>>>>>> step-4
```
