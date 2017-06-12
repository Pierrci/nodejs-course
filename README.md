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

Utilisation des middlewares [morgan](https://github.com/expressjs/cookie-session), [body-parser](https://github.com/expressjs/body-parser) et [cookie-session](https://github.com/expressjs/cookie-session), et récupération des données via un endpoint '/data' pour affichage sur une page web via jQuery

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
```
