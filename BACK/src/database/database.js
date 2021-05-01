/**
 * Class pour gérer la base de donnée,elle contient différentes fonction :
 *  - la connexion à la bdd
 *  - la déconnexion (non utilisé ici)
 *  - l'insertion de données
 *  - la récupération de donnée
 * Pour les deux dernière fonction, j'ai fait le choix qu'elles soient générique, cela permet de pouvoir les réutiliser facilement si on souhaitais ajouter de nouvelles fonctionalités au back-end
 */
const mongoose = require("mongoose");
const config = require("../config/config");

class Database {
    constructor() {
        this.mongoose = mongoose;
        this.config = config;
    }

    //Connexion à la base de données
    connect() {
        let dbUser = encodeURIComponent(this.config.db.username);
        let dbPass = encodeURIComponent(this.config.db.pwd);
        let dbHost = this.config.db.host;
        let dbDatabase = this.config.db.database;

        let mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbDatabase}?retryWrites=true&w=majority`;
        this.mongoose.connect(mongoUrl,
        { useNewUrlParser: true,
          useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
    }

    //Déconnexion de la base de données
    disconnect() {
        this.mongoose.connection.close(function(error) {
            if(error) {
                console.error(error);
                return false;
            }

            return true;
        });
    }

    //Fonction pour sauvegarder la donnée en bdd
    saveData(data){
       return data.save();
    }

    //Fonction pour récupérer la donnée
    getData(schemasName, orderBy=null){
        const schemas = mongoose.model(schemasName); //On récupère le model qui nous interesse
        return schemas.find().sort(orderBy).exec();
    }

}

module.exports = Database;