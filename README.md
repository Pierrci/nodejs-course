# nodejs-course

Repository fil rouge utilisée dans le cadre d'une introduction à NodeJS. Les différentes différentes branches correspondent aux étapes du cours.

## Pré-requis

* [NodeJS](https://nodejs.org/) (version LTS 6.x.x) doit être installé sur le système (en téléchargeant le programme d'installation sur le site).

## Installation

Toutes les dépendances nécessaires sont listées dans le fichier `package.json`. Pour les installer :

```bash
npm install
```

## step-4

Utilisation d'un [service worker](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API) pour permettre l'affichage hors-ligne du site, et plus précisément de la page d'accueil et du formulaire.

Le script du service worker est `sw.js`, situé dans le dossier `public`. Le service worker est instancié depuis la page d'accueil avec l'instruction `navigator.serviceWorker.register('/sw.js')`.

Pour consulter l'état du support de la technologie par les principaux navigateurs : [http://caniuse.com/#feat=serviceworkers](http://caniuse.com/#feat=serviceworkers)

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
```
