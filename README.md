#This my Backend rep
# Initialisation de BackendDev


# Test sur la route POST
    La route POST permet d'ajouter des livres dans la base de données par défaut , l'application crée la table  books dans la 
    database. Pour les tests soumettre les requêtes au format JSON avec obligation de fournir un titre.


# Test sur les routes GET
    ===>/books
    Pour les tests envoyer la requête au moyen de Postman sur l'url 'http://127.0.0.1:3000/books';
    ====>/books/id
    Même chose et préciser l'id du livre recherché 


# Test sur la route PUT
    Il faut fournir des requêtes de type JSON en s'assurant de préciser l'ID du livre qui est la clé primaire dans la base de données mysql et on peut ajouter les attributs de l'objet i.e du livre à  modifier.

# Test sur la route DELETE
    Il faut fournir l'ID du livre à supprimer et tester au moyen de l'URL.

# La configuration Docker est terminée mais les tests de fonctionnement sont incomplets.