/**
 * 
 * Création de l'application avec l'utilisation de express.
 * 
 */

//Import des librairies
const express = require('express');
//fichier de config
const config = require('./src/config/config');
//Bdd
const Database = require('./src/database/database');
//Fichiers de routage
const Routes = require('./src/app-routing')

class App {
    constructor() {
        this.app = express();
        this.database = new Database();
        this.database.connect();
        // this.database.saveData('test',55);
        // this.m_routes = new AppRouting();
        // this.m_routes.routes(this.app);
        this.app.use('/', Routes);


        
    }
}

module.exports = new App().app;
