# nodejs-course

Repository fil rouge utilisé dans le cadre d'une introduction à NodeJS. Les différentes différentes branches correspondent aux étapes du cours.


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

## Les différentes étapes

Le repository est divisé en plusieurs branches qui correspondent aux différentes étapes du cours :

* [step-1](https://github.com/Pierrci/nodejs-course/tree/step-1) : routage simple avec Express
* [step-2](https://github.com/Pierrci/nodejs-course/tree/step-2) : utilisation de middlewares
* [step-3](https://github.com/Pierrci/nodejs-course/tree/step-3) : utilisation de MongoDB
* [step-4](https://github.com/Pierrci/nodejs-course/tree/step-4) : ajout du moteur de template Pug (ex-Jade)

Pour récupérer toutes les branches localement :

```bash
git pull --all
```

Pour changer de branche localement (remplacer avec l'étape voulue) :

```bash
git checkout step-1
```

Bien penser à lancer un `npm install` à chaque passage à l'étape suivante !

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
```
