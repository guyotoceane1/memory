//Import des librairies
const express = require('express');
const mongoose = require('mongoose');
//fichier de config
const config = require('./config/config');
//Bdd
const Database = require('./database');

class App {
    constructor() {
        this.app = express();
        this.database = new Database();
        this.database.connect();
        // this.m_routes = new AppRouting();
        // this.m_routes.routes(this.app);

        
    }
}

module.exports = new App().app;
