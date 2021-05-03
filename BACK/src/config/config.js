/**
 * Fichier de config du projet. Le but de ce fichier est de pouvoir retrouver les éléments variables du projet qui peuvent changer suivant l'environnement où le projet est lu.
 * 
 * On peut notemment avoir les connexions à la (ou les) bases de donnes du projet, le port sur lequel on veut lancer le projet
 * 
 * Par exemple, dans le cas d'un projet en entreprise, on pourrait avoir 2 fichiers de configs (à minima):
 *  - La version de développement, pour pouvoir travailler
 *  - La version de production, une fois en ligne chez le client
 *  (- on peut également imaginer une version de recette)
 * 
 * Et, pour avoir le bon fichier au bon endroit, au moment de monter le projet sur le serveur, il suffit de remplacer le fichier config (qui est par défaut séléctionné dans tous les fichiers du projets), par celui qui nous interesse.
 * 
 * (J'ai fait le choix d'un fichier de config en js, mais cela aurait très bien pu se faire dans un fichier .env)
 * 
 */

const config = {
    db : {
        username : "oguyot",
        pwd : "QETwNlYXzrmWTMmH",
        database : "oguyot_memory",
        host : "mysql-oguyot.alwaysdata.net",
    },
    port : 3000
}

module.exports = config;