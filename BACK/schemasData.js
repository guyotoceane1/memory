/**
 * Schémas de données pour la sauvegarde en bdd
 * Pour chaque champs, on va déterminer le type de donnée attendu, ainsi que si le champs est obligatoire ou non. 
 * Dans notre cas, nous avons besoin de deux champs (qui sont obligatoire), le pseudo de la personne qui a joué, ainsi que le temps qu'il a mis pour gagner.
 * + vient se rajouter un id qui sera généré automatiquement, donc pas besoin de le préciser dans le schemas de données
 */
const mongoose = require("mongoose");

const schemas = mongoose.Schema({
    pseudo : {type:'string', required:true},
    temps : {type:'string', required:true},
})

module.exports = mongoose.model('Resultats', schemas);