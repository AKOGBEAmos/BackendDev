require('dotenv').config();

const Sequelize = require('sequelize');

// Définir les variables d'environnement pour les informations sensibles
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Créer une instance Sequelize avec les informations de connexion
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
});

// Définir le modèle de données pour les livres
const Book = sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 255] // Limite la longueur du titre entre 1 et 255 caractères
    }
  },
  author: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 255] // Limite la longueur de l'auteur entre 1 et 255 caractères
    }
  },
  genre: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 255] // Limite la longueur du genre entre 1 et 255 caractères
    }
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0 // L'année doit être un entier positif ou nul
    }
  }
});

//Synchroniser le modèle avec la base de données sans forcer
Book.sync().then(() => {
  console.log('Table "library" créée avec succès !');
}).catch(err => {
  console.error('Erreur lors de la création de la table :', err);
});

// sequelize.sync().then(() => {
//   console.log('Modèle synchronisé avec la base de données.');
// }).catch(err => {
//   console.error('Erreur lors de la synchronisation du modèle avec la base de données :', err);
// });


module.exports = Book;

