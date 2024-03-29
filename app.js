const express = require('express');
const Book = require('./book');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

/* Middleware de définition des entêtes autoriser entre le serveur et le client */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE'); 
    //Autorisation des méthodes GEGT, POST, PUT et DELETE
    next();
});


app.get('/test', (req, res) =>{
    console.log('Fonctionnement réussi');
    res.send("L'interface fonctionne");
});

app.post('/books', (req, res, next) => {
    const { title, author, genre, year } = req.body; // Récupérer les données du livre depuis la requête
    // Créer un nouveau livre
    const book = new Book({
        title: title,
        author: author,
        genre: genre,
        year: year
    });
    // Enregistrer le livre dans la base de données
    book.save()
        .then(() => res.status(201).send("Livre ajouté à la librairie avec succès."))
        .catch(error => res.status(400).json({ error }));

});


/* Route pour récupérer tous les livres */
app.get('/books', async (req, res) => {
    try {
        const books = await Book.findAll(); // Récupérer tous les livres de la base de données
        res.status(200).json(books); // Renvoyer les livres en tant que réponse JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des livres' }); // Envoyer un message d'erreur en cas de problème de récupération des livres
    }

});

/* Route pour afficher un livre grâce à son ID */
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id; // Récupérer l'ID du livre depuis la requête

    // Utiliser la méthode findByPk pour récupérer le livre correspondant dans la base de données
    Book.findByPk(bookId) 
        .then((book) => {
            if (book) {
                res.status(200).json(book); // Détails du livre en tant que réponse JSON
            } else {
                //Message d'erreur;
                res.status(404).json({ error: 'Livre non trouvé' }); 
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Erreur lors de la récupération du livre' }); // Envoyer un message d'erreur en cas d'erreur de base de données
        });

});

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id; //Récupération de l'ID du livre depuis la requête
    const { title, author, genre, year } = req.body; // Récupération des nouvelles données du livre depuis la requête

    Book.findByPk(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).send("Livre non trouvé. Veuillez réessayer."); // Si le livre n'est pas trouvé, renvoyer une erreur 404
            }

            // Mettre à jour les données du livre avec les nouvelles valeurs
           if (title) book.title = title;
           if (author) book.author = author;
           if (genre) book.genre = genre;
           if (year) book.year = year;

            // Enregistrer les modifications dans la base de données
            return book.save();
        })
        .then(() => {
            res.status(200).send('Livre mis à jour avec succès')
        })
        .catch((error) => {
            res.status(500).send('Erreur lors de la mise à jour du livre'); 
            // Renvoyer une erreur 500 en cas d'erreur lors de la mise à jour
        });
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id; // Récupérer l'ID du livre depuis la requête

    // Utiliser la méthode findByPk pour trouver le livre à supprimer dans la base de données
    Book.findByPk(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).send('Livre non trouvé'); // Si le livre n'est pas trouvé, renvoyer une erreur 404
            }

            // Supprimer le livre de la base de données
            return book.destroy();
        })
        .then(() => {
            res.status(200).send('Livre supprimé avec succès'); // Renvoyer un message de succès si la suppression est réussie
        })
        .catch((error) => {
            res.status(500).send('Erreur lors de la suppression du livre'); // Renvoyer une erreur 500 en cas d'erreur lors de la suppression
        });
});

module.exports = app;
