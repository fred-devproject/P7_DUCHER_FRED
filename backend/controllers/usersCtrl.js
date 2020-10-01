// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const models = require('../models');


// REGEX
const EMAIL_REGEX = /[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// Controllers
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
            return res.status(500).json({ 'erreur': 'Impossible de verifier l\'utilisateur'})
        })
    },

    //Affichage du profil utilisateur
    getUserProfil: function(req, res) {
        // Getting auth header
        let headerAuth  = req.headers['authorization'];
        let userId      = jwtUtils.getUserId(headerAuth);
    
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

    updatePassword: function(req, res) {
        //Getting auth header
        let headerAuth  = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        const newPassword = req.body.newPassword;
        
        //Vérification regex du nouveau mot de passe
        if (!PASSWORD_REGEX.test(newPassword)) {
            return res.status(400).json({ 'erreur': 'mot de passe invalide'})
        } else {
            models.User.findOne({
            where: { id: userId }            
            }).then(user => {                
                bcrypt.compare(newPassword, user.password, (resComparePassword) => {
                    //bcrypt compare le nouveau mot de passe avec l'ancien: avertissement si ils sont identiques
                    if (resComparePassword) {
                        res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                    } else {
                        bcrypt.hash(newPassword, 10, function (err, bcryptNewPassword) {
                            models.User.update(
                                { password: bcryptNewPassword },
                                { where: { id: user.id } }
                            )
                            .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
                            .catch(err => res.status(500).json(err))
                        })
                    }
                })
            })
            .catch(err => json(err))
        } 
    },

    deleteUser: function(req,res) {
        // Getting auth header
        let headerAuth  = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'Vous n\'avez pas l\'autorisation pour supprimer ce compte' });
        } else if (userId != null) {            
            models.User.findOne({
                where: { id: userId }            
            })
            .then( user =>{
                models.User
                .destroy({
                    where: { id: user.id }
                })
                .then(() => res.end())
                .catch(err =>console.log(err))
            })
            .catch(err => res.status(500).json(err))
        } else {
            res.status(500).json({ "erreur": 'Suppression de ce compte impossible' })
        }
    }
}