# Jeu du Memory

Jeu de Memory avec sauvegarde des scores dans une base de données

Ce repository contient 2 dossiers : 
- FRONT : partie front-end du projet qui correspond à la partie jeu du memory
- BACK : partie back-end du projet pour sauvegarder les scores des utilisateurs

J'ai fais le choix de séparer le front et le back, car en situation réèlle/pro, les 2 projets auraient été créés chacun dans leur propre repo git, puisque on peut considérer le backend comme une API REST. J'ai donc fais le choix d'avoir 2 package.json comme si c'était réellement 2 projets distinct

Il contient également 2 branches:
- main : utilisation de mongoDB pour la partie base de données
- main_sql : utilisation de mysql pour la partie base de données

Chaque dossier contient son propre readme pour expliquer son fonctionnement.