/**
 * Fichier avec les différentes routes utiles pour le back-end. Ici il n'y a qu'une fonctionalité, donc j'ai fais le choix de simplifier le routage en mettant directement toutes les routes dans ce fichier là, mais on aurait très bien pu immaginer que ce fichier de routage définisse un premier niveau, qui redirigeait pour chaque catégorie vers un autre fichier de routage plus spécifique
 * On a 1 url, mais qui a un traitement spécifique en fonction du verbe HTTP utilisé : 
 * - la méthode GET va permettre d'aller récupérer tous les scores enregistrés
 * - la méthode POST va permettre d'enregistrer un nouveau score.
 * Ici chaque route va faire appel à son controller pour son traitement.
 * 
 */

//Import des librairies
const express = require('express');

const ScoreController = require("./scoreController");
let score = new ScoreController();

let router = express.Router();

router.get('/', function(req, res){
    score.getScore(req, res)
})

router.post('/', function(req, res){
    score.saveScore(req, res);
})

module.exports = router;

