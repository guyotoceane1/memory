/**
 * Class pour gérer la base de donnée
 */
const mongoose = require("mongoose");
const config = require("./config/config");
const Resultats = require("./schemasData");

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

    saveData(pseudo, temps){
        const data = new Resultats({
            pseudo : pseudo,
            temps : temps
        });
        data.save(function(err) {
            console.log('this fires after the `post` hook');
          });
    }

}

module.exports = Database;