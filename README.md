# nodejs-course

Repository fil rouge utilisée dans le cadre d'une introduction à NodeJS. Les différentes différentes branches correspondent aux étapes du cours.

## Pré-requis

* [NodeJS](https://nodejs.org/) (version LTS 6.x.x) doit être installé sur le système (en téléchargeant le programme d'installation sur le site).

## Installation

Toutes les dépendances nécessaires sont listées dans le fichier `package.json`. Pour les installer :

```bash
npm install
```

## step-2

Utilisation des middlewares [morgan](https://github.com/expressjs/cookie-session), [body-parser](https://github.com/expressjs/body-parser) et [cookie-session](https://github.com/expressjs/cookie-session), et du moteur de template [Pug](https://pugjs.org) (ex-Jade) en lieu et place du HTML.

### Changements liés à Pug

Dans `index.js`, on indique à Express qu'on utilise le moteur de template Pug (ligne 42) :

```javascript
app.set('view engine', 'pug')
```

Dans `controller.js` on ne retourne plus directement des fichiers html mais on utilise la méthode de Express [.render(...)](http://expressjs.com/fr/api.html#res.render) pour indiquer qu'on va retourner des fichiers .pug qui devront être "compilés" en html avant d'être envoyés au navigateur.

On peut directement passer à la méthode `.render(...)` en second paramètre un objet qui sera directement accessible dans les fichiers de template. Dans la méthode `postForm`, on passe ainsi à la vue les données du formulaire.

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
```
