// routes user

const express = require('express');
const router = express.Router();


//const authentication = require('../middleware/auth');

//nécessite le fichier user du dossier controllers
const userCtrl = require('../controllers/user');

//Enregistrement d'un utilisateur     

router.post('/signup', userCtrl.signup);

//Connection d'un utilisateur

router.post('/login', userCtrl.login);


module.exports = router;