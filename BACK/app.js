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

class App {
    constructor() {
        this.app = express();
        this.database = new Database();
        this.database.connect();
        // this.database.saveData('test',55);
        this.database.getData();
        this.app.get('/', (req, res) => res.send('Hello, World!'))
        // this.m_routes = new AppRouting();
        // this.m_routes.routes(this.app);

        
    }
}

module.exports = new App().app;
