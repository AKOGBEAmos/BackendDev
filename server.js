const http = require('http');
const app = require('./app');
const book = require('./book');

var mysql=  require ('mysql');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
/* Choix du port de connexion au serveur*/ 
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


const server = http.createServer(app);

server.listen(port);

/* Paramètres de connexion à la base de données.*/
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'd@tabase',
    database: 'Books',
  });

  // Établit la connexion à la base de données
connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connexion à la base de données réussie !');
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
