// app.js

// import des modules npm
const express = require('express');
const app = express();

const bodyParser = require("body-parser")

const helmet = require("helmet");

const userRoutes = require('./routes/user');


app.use((req, res, next) => {  // We declare all the headers to allow :
    res.setHeader('Access-Control-Allow-Origin', '*'); // Connection from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Access to any of these routes
    next();
});

app.use(helmet());

app.use( bodyParser.urlencoded({ extended : false }))

app.use(bodyParser.json())

app.use('/api/auth', userRoutes); 




// Export de l'application express
module.exports = app;