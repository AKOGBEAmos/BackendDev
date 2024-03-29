const http = require('http');
const app = require('./app');
const book = require('./book');
require('dotenv').config();

const cors = require("cors");
const  expressSession = require('express-session');

var mysql=  require ('mysql');

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
/* Choix du port de connexion au serveur*/ 
const port = normalizePort(process.env.PORT || '3000');


/* Paramètres de connexion à la base de données.*/
const databaseUrl = process.env.DATABASE_URL;

// Créer une connexion à la base de données MySQL
const connection = mysql.createConnection(databaseUrl);

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

// Connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL !');
});

  
  // Gestion des erreurs de connexion
  connection.on('error', (err) => {
    console.error('Erreur de connexion à la base de données :');
  });
  
  // Ferme la connexion à la base de données lors de la fermeture de l'application
  process.on('SIGINT', () => {
    connection.end();
    console.log('Connexion à la base de données fermée.');
  });
