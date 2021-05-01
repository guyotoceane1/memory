/**
 * 
 * Création de l'application avec l'utilisation de express.
 * 
 */

//Import des librairies
const express = require('express');
cors = require('cors');
//fichier de config
const config = require('./src/config/config');
//Bdd
const Database = require('./src/database/database');
//Fichiers de routage
const Routes = require('./src/app-routing')

class App {
    constructor() {
        this.app = express();
        this.useBodyParser();
        this.app.use(cors()); //L'utilisation de cors permet d'accéder à de la donnéé tout en venant d'un autre domaine
        this.database = new Database();
        this.database.connect();
        this.app.use('/', Routes);
        
    }

    //cette fonction va permettre de lire les données en entrée et va les stoquer dans les infos de la requete http req.body
    useBodyParser(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : true}));
    }
}

module.exports = new App().app;
