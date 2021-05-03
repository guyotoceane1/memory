/**
 * Class pour gérer la base de donnée,elle contient différentes fonction :
 *  - la connexion à la bdd
 *  - la déconnexion (non utilisé ici)
 *  - l'insertion de données
 *  - la récupération de donnée
 * Pour les deux dernière fonction, j'ai fait le choix qu'elles soient générique, cela permet de pouvoir les réutiliser facilement si on souhaitais ajouter de nouvelles fonctionalités au back-end
 */
 var mysql = require('mysql2');
const config = require("../config/config");

class Database {
    constructor() {
        this.mysql = mysql;
        this.config = config;
        this.pool = this.connect();
        this.promisePool = this.pool.promise(); //Permettre d'éxécuter les requêtes en asynchrone
    }

    //Connexion à la base de données, on choisit d'utiliser Pool car il permet de réduire le temps de connexion en utilisant une précédente connexion
    connect() {
        let dbUser = encodeURIComponent(this.config.db.username);
        let dbPass = encodeURIComponent(this.config.db.pwd);
        let dbHost = this.config.db.host;
        let dbDatabase = this.config.db.database;

        return this.mysql.createPool({
            host: dbHost,
            user: dbUser,
            password : dbPass,
            database: dbDatabase,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
          });
    }

    //Déconnexion de la base de données
    disconnect() {
        this.pool.end();
    }

    //Fonction pour récupérer la donnée
    async query(sql, inserts=null){try {
            const [ROWS, FIELDS] = await this.promisePool.execute(sql, inserts);
            return ROWS;
        } catch (error) {
            throw(error);
        }
    }

}

module.exports = Database;