# nodejs-course

Repository fil rouge utilisée dans le cadre d'une introduction à NodeJS. Les différentes différentes branches correspondent aux étapes du cours.

## Pré-requis

* [NodeJS](https://nodejs.org/) (version LTS 6.x.x) doit être installé sur le système (en téléchargeant le programme d'installation sur le site).

## Installation

Toutes les dépendances nécessaires sont listées dans le fichier `package.json`. Pour les installer :

```bash
npm install
```

## Les différentes étapes

Le repository est divisé en plusieurs branches qui correspondent aux différentes étapes du cours :

* [step-1](https://github.com/Pierrci/nodejs-course/tree/step-1) : routage simple avec Express
* [step-2](https://github.com/Pierrci/nodejs-course/tree/step-2) : utilisation de middlewares et Pug (ex-Jade)
* [step-3](https://github.com/Pierrci/nodejs-course/tree/step-3) : utilisation de MongoDB
* [step-4](https://github.com/Pierrci/nodejs-course/tree/step-4) : ajout d'un service worker pour consultation hors-ligne basique
* [step-5](https://github.com/Pierrci/nodejs-course/tree/step-5) : MEAN app complète (MongoDB, Express, AngularJS, NodeJS)

Pour récupérer toutes les branches localement :

```bash
git pull --all
```

Pour changer de branche localement (remplacer avec l'étape voulue) :

```bash
git checkout step-1
```

__Bien penser à lancer un `npm install` à chaque passage à l'étape suivante !__

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
```
