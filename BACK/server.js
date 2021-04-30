/**
 * 
 * Fichier serveur, qui a juste pour but de le lancer, tous se passe dans le fichier app.js
 * 
 */
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);