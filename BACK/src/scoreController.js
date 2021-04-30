/**
 * Toutes les fonctions qui vont être utile pour pouvoir traiter de la donner. Dans notre cas, nous avons 2 fonctions
 * - celle qui va aller récupérer la donnée en base de donnée
 * - celle qui va ajouter de la donnée
 */

//Import des librairies
const express = require('express');
//fichier de config
const config = require('./config/config');
//Bdd
const Database = require('./database/database');
//Schemas de donnée pour l'enregistrement des scores
const Resultats = require("./database/schemasData"); 

class ScoreController{
    constructor() {
        this.database = new Database();
    }

    // Récupération des données
    async getScore(req, res){
        this.database.getData('Resultats').then(data=>{
            res.status(200).json(data)
        });

        // return this.database.getData();
    }

    //Enregistrement de nouvelles données
    async saveScore(req, res){
        const data = new Resultats({
            pseudo : req.Body.pseudo,
            temps : req.Body.temps,
        });

        this.database.saveData(data).then(data=>{
            console.log(data)
            res.status(201).send('succes');
        }).catch(error => {
            console.log(error)
            res.status(500).send(error);
        });

    }

}


module.exports = ScoreController;