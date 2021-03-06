/**
 * Schémas de données pour la sauvegarde en bdd
 * Pour chaque champs, on va déterminer le type de données attendu, ainsi que si le champs est obligatoire ou non. 
 * Dans notre cas, nous avons besoin de trois champs (qui sont obligatoire), le pseudo de la personne qui a joué, le temps qu'il a mis pour gagner (qui sera sauvegardé en type nombre, car sauvegardé en secondes) et la difficulté choisis.
 * + vient se rajouter un id qui sera généré automatiquement, donc pas besoin de le préciser dans le schemas de données
 */
const mongoose = require("mongoose");

const Resultats = mongoose.Schema({
    pseudo : {type:'string', required:true},
    temps : {type:'number', required:true},
    difficulte : {type:'string', required:true},
})

module.exports = mongoose.model('Resultats', Resultats);