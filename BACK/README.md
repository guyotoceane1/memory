# Memory - Back-end

Le but du backend est de récupérer le temps qu'un utilisateur à réaliser le jeu du Memory. 

## Spécification tehnique du projet
Le back-end est développé en nodejs avec l'utilisation du framework Express (son utilisation va permettre une simplification du déploiement de l'application). 
Au niveau de la base de donnée, le choix c'est porté sur Musql avec l'utilisation de mysql2 avec l'utilisation des Pool, pour augmenter les performances d'exécutions

## Initialisation du projet
Toutes les librairies ont été installées grâce à npm. Afin de pouvoir y accéder dans le projet exécuter la commande suivante dans un terminal : 
`npm i`
Le projet fonctionne nodemon (ce qui permet une recomplilation en live quand on développe). Pour lancer le projet, il suffit de lancer la commande `npm run dev`
