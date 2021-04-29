const mongoose = require("mongoose");
const config = require("./config/config");

class Database {
    constructor() {
        this.mongoose = mongoose;
        this.config = config;
    }

    connect() {
        let dbUser = encodeURIComponent(this.config.db.username);
        let dbPass = encodeURIComponent(this.config.db.pwd);
        let dbHost = this.config.db.host;
        let dbDatabase = this.config.db.database;

        let mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbDatabase}?retryWrites=true&w=majority`;
        console.log(mongoUrl)
        this.mongoose.connect(mongoUrl,
        { useNewUrlParser: true,
          useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
    }

    disconnect() {
        this.mongoose.connection.close(function(error) {
            if(error) {
                console.error(error);
                return false;
            }

            return true;
        });
    }
}

module.exports = Database;