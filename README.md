# nodejs-course

Repository fil rouge utilisée dans le cadre d'une introduction à NodeJS. Les différentes différentes branches correspondent aux étapes du cours.

## Pré-requis

* [NodeJS](https://nodejs.org/) (version LTS 6.x.x) doit être installé sur le système (en téléchargeant le programme d'installation sur le site).

## Installation

Toutes les dépendances nécessaires sont listées dans le fichier `package.json`. Pour les installer :

```bash
npm install
```

## step-3

Utilisation de [MongoDB](https://www.mongodb.com/) avec [Mongoose](http://mongoosejs.com/) pour stocker les éléments du formulaire.

Pour installer MongoDB, 2 possibilités :

* Directement sur le système
* Utiliser [Docker](https://www.docker.com/) et une image de MongoDB pour garder notre système propre

### Installation de MongoDB directement sur le système

[Télécharger](https://www.mongodb.com/download-center) directement le fichier d'installation et l'exécuter sur le système.
Dans le fichier `index.js` du projet, bien penser à modifier la chaîne de connexion en mettant `localhost` à la place de l'ip de la machine docker (ligne 12).

### Installation de MongoDB via Docker

D'abord, installer Docker en suivant les instructions pour [Linux](https://docs.docker.com/linux/), [Mac](https://docs.docker.com/mac/) et [Windows](https://docs.docker.com/windows/). Les personnes sous Mac et Windows peuvent ensuite exécuter la commande `docker-machine env`, puis exécuter dans leur terminal la commande qui est alors proposée pour configurer les variables d'environnement.

Il faut ensuite récupérer [l'image MongoDB](https://hub.docker.com/_/mongo/) qui nous intéresse :

```bash
docker pull mongo
```

On instancie ensuite un container à partir de cette image :

```bash
docker run --name my-mongo -p 27017:27017 -d mongo
```

Après cette étape, on peut exécuter le projet. Pour accéder directement au [shell mongo](https://docs.mongodb.com/manual/mongo/) du container :

```bash
docker exec -it my-mongo mongo
```

### Démarrer docker et le container MongoDB après un redémarrage du système

Sur Mac et Windows, d'abord vérifier que la machine virtuelle docker-machine est lancée :

```bash
docker-machine status
```

Si le statut retourné n'est pas 'Running', lancer la machine virtuelle avec `docker-machine start` puis exécuter `docker-machine env` pour configurer les variables d'environnement, comme à l'installation de docker.

Pour relancer le container 'my-mongo' :

```bash
docker start my-mongo
```

Le projet peut ensuite être exécuté normalement.

## Nettoyage du dossier local

En cas de problèmes ou de conflit entre la version distante (github) et locale, pour remettre au propre la version locale :

```bash
git reset --hard HEAD
git clean -f -d
```
