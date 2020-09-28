// Imports
const bcrypt = require('bcrypt');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwtUtils');
const models = require('../models');


// REGEX
const EMAIL_REGEX = /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

//Routes
module.exports = {
    //Enregistrement d'un nouvel utilisateur
    register: function(req, res){
        //Params
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        

        if (username == null || email == null || password == null){
            return res.status(400).json({ 'erreur': 'paramètres manquants'})
        }

        if(username.length >= 20 || username.length <= 2) {
            return res.status(400).json({ 'erreur': 'votre nom d\'utilisateur doit contenir entre 2 et 20 caractères'})
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'erreur': 'email invalide'})
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'erreur': 'mot de passe invalide'})
        }

        //TODO verifier pseudo length, mail regex, password regex.
        
        models.User.findOne({
            attributes: ['email'],
            where: { email: email },
        })
        .then(function(userFound) {
            if (!userFound) {

                bcrypt.hash(password, 10, function( err, bcryptedPassword) {
                    models.User.create({
                        username: username,
                        email: email,
                        password: bcryptedPassword,
                        isadmin: 0,
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'erreur': 'Impossible d\'ajouter l\'utilisateur'})
                    })
                });

            } else {
                return res.status(409).json({ 'erreur': 'l\'utilisateur existe déja'})
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'Erreur': 'Impossible de verifier l\'utilisateur'});
        })
    },

    //Connection d'un utilisateur
    login: function(req, res){
        
        //Params
        let username = req.body.username;
        let password = req.body.password; 

        if (username == null || password == null){
            return res.status(400).json({ 'erreur': 'paramètres manquants'});
        } 

        if(username.length >= 20 || username.length <= 2) {
            return res.status(400).json({ 'erreur': 'votre nom d\'utilisateur doit contenir entre 2 et 20 caractères'})
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'erreur': 'mot de passe invalide'})
        }

        //TODO verifier mail regex& password length

        models.User.findOne({
            where: { username: username }
        })
        .then(function(userFound) {
            if (userFound) {

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    console.log(userFound.password);
                    if(resBycrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateUserToken(userFound)
                        });
                    } else {
                        return res.status(403).json({'erreur': 'Mot de passe invalide'})
                    }
                });
            } else {
                return res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas '})
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'Erreur': 'Impossible de verifier l\'utilisateur'})
        })
    },

    //Affichage du profil utilisateur
    getUserProfil: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
    
        if (userId < 0)
          return res.status(400).json({ 'error': 'Token invalide' });
    
        models.User.findOne({
          attributes: [ 'id', 'email', 'username', 'isadmin' ],
          where: { id: userId }
        }).then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'Utilisateur non trouvé' });
            }
        }).catch(function(err) {
            res.status(500).json({ 'error': 'Erreur lors de la recherche de l\'utilisateur' });
        });
    },

    //Modification des informations utilisateur
    updateUserProfil: function(req, res) {
        // Getting auth header
        const headerAuth  = req.headers['authorization'];
        const userId      = jwtUtils.getUserId(headerAuth);
    
        // Params
        let username = req.body.username;
            
        models.User.findOne({
            attributes: ['id',],
            where: { id: userId }
        }).then(function (userFound) {
            if(userFound) {
                userFound.update({                    
                    username: (username ? username : userFound.username)                    
                }) 
            } else {
                res.status(404).json({ 'error': 'Utilisateur non trouvé' });
            }
        }).catch(function(err) {
            return res.status(500).json({ 'error': 'Impossible de vérifier l\'utilisateur' });
        });
    }

}