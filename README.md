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

## step-2

Utilisation des middlewares [morgan](https://github.com/expressjs/cookie-session), [body-parser](https://github.com/expressjs/body-parser) et [cookie-session](https://github.com/expressjs/cookie-session), et récupération des données via un endpoint '/data' pour affichage sur une page web via jQuery
