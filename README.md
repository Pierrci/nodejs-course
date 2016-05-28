# nodejs-course

Repository fil rouge utilisé dans le cadre d'une introduction à NodeJS

## Pré-requis

[Typings](https://github.com/typings/typings) (> 1.0.0) doit être installé sur le système pour que le script de post-install fonctionne :

```bash
npm install -g typings
```

## Installation

Toutes les dépendances nécessaires sont listées dans le fichier `package.json`. Pour les installer :

```bash
npm install
```

## step-4

Utilisation du moteur de template [Pug](https://github.com/pugjs/pug) (ex-Jade) en lieu et place du HTML. [L'étape 3](https://github.com/Pierrci/nodejs-course/tree/step-3) doit fonctionner normalement avant de pouvoir éxecuter cette étape !

### Changements principaux par rapport à l'étape 3

Dans `index.js`, on indique à Express qu'on utilise le moteur de template Pug (ligne 43) :

```javascript
app.set('view engine', 'pug')
```

Dans `controller.js` on ne retourne plus directement des fichiers html mais on utilise la méthode de Express [.render(...)](http://expressjs.com/fr/api.html#res.render) pour indiquer qu'on va retourner des fichiers .pug qui devront être "compilés" en html avant d'être envoyés au navigateur.  

On peut directement passer à la méthode .render(...) en second paramètre un objet qui sera directement accessible dans les fichiers de template. Dans la méthode `postForm`, on peut ainsi directement passer à la vue les données du formulaire sans avoir besoin d'utiliser jquery pour les récupérer.
