// app.js

// Imports
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
//const path = require('path');
const apiRouter = require('./apiRouter').router;

const app = express();

// utilisation du module 'helmet' 
app.use(helmet());
app.use(cors());
  
// Setting du header des requêtes pour la gestion des erreurs CORS
app.use((req, res, next) =>{
    // Autorisation d'acceder a l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers suivants au requete envoyées à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Autoriser les methodes mentionnées pour les requêtes API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Utilisation de bodyparser pour transformer le corps des requêtes en objet json exploitable.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Chemins d'accès des différents endpoints
//app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', apiRouter);


// Export de l'application express
module.exports = app;