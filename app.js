const express = require('express');
const Book = require('./book');

const app = express();

/* Middleware de définition des entêtes autoriser entre le serveur et le client */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE'); //Autorisation des méthodes GEGT, POST, PUT et DELETE
    next();
});

app.post ('/books', (req, res, next) =>{
    const book= new Book ({
        ...req.body
    });
    book.save() //Enregistrement du livre ajouté dans la database
    //Message de succès du serveur.
        .then(() => res.status(201).json({ message: 'Livre ajouté à la librairie !'}))
        .catch(error => res.status(400).json({ error }));

    next();
});

app.get('/books', (req, res, next) =>{
    //Utilisation de la méthode find pour récupérer tous les livres de la base de données.
    book.find()
      .then(() => res.status(200).json({message: 'Voici les livres de la bibliothèque'}))
      .catch(()=> res.status(404).json({error}));
});

app.get('/books/:id', (req, res, next) => {
    const bookId = req.body.id; // Récupérer l'ID du livre depuis la requête

    // Utilisation de la méthode find pour récupérer le livre correspondant dans la base de données 
    const book = books.findOne(book => book.id === bookId);

    if (book) {
        // Si le livre est trouvé, renvoyer les détails du livre en tant que réponse JSON
        res.json({
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year
        });
    } else {
        // Si le livre n'est pas trouvé, renvoyer une réponse JSON avec un statut 404
        res.status(404).json({
            error: 'Livre non trouvé'
        });
    }
});

module.exports =app;
