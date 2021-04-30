/**
 * 
 * Fichier serveur, qui a juste pour but de le lancer, tous se passe dans le fichier app.js
 * 
 */
const http = require('http');
const app = require('./app');
const config = require('./config/config');

const server = http.createServer(app);

server.listen(config.port);