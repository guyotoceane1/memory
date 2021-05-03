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

class ScoreController{
    constructor() {
        this.database = new Database();
    }

    // Récupération des données
    async getScore(req, res){
        let SQL = "SELECT * FROM resultats ORDER BY temps";
        let getData = await this.database.query(SQL);
        if(getData){
            res.status(200).send(getData);
        } else {
            console.log(error)
            res.status(500).send(error);
        }
    }

    //Enregistrement de nouvelles données
    async saveScore(req, res){
        const data = [req.body.pseudo, req.body.temps,req.body.difficulte];
        let SQL = "INSERT INTO resultats (pseudo, temps, difficulte) VALUES (?,?,?)";
        let insert = await this.database.query(SQL, data);
        if(insert){
            res.status(201).send({"etat" : "succes"});
        } else {
            res.status(500).send(error);
        }
    }
}

module.exports = ScoreController;