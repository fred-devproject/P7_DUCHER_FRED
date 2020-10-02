// Imports
const models = require('../models');
const jwtUtils = require('../utils/jwtUtils');
var asyncLib = require('async');

// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;


// Controllers
module.exports = {

    // Créer un nouveau message
    createMessage: function(req, res) {
        // Getting auth header
        let headerAuth  = req.headers['authorization'];
        let userId      = jwtUtils.getUserId(headerAuth);
    
        // Params
        let title   = req.body.title;
        let content = req.body.content;
    
        if (title == null || content == null) {
          return res.status(400).json({ 'erreur': 'Paramètres manquants' });
        }
    
        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
          return res.status(400).json({ 'erreur': 'Paramètres invalides' });
        }
        // test avec waterfall
        asyncLib.waterfall([
          function(done) {
            models.User.findOne({
              attributes: ['id', 'username'],
              where: { id: userId }
            })
            .then(function(userFound) {
              done(null, userFound);
            })
            .catch(function(err) {
              return res.status(500).json({ 'erreur': 'Impossible de verifier l\'utilisateur' });
            });
          },
          function(userFound, done) {
            if(userFound) {
              models.Message.create({
                title  : title,
                content: content,
                likes  : 0,
                UserId : userFound.id                
              })
              .then(function(newMessage) {
                done(newMessage);
              });
            } else {
              res.status(404).json({ 'erreur': 'Utilisateur introuvable' });
            }
          },
        ], function(newMessage) {
          if (newMessage) {
            return res.status(201).json(newMessage);
          } else {
            return res.status(500).json({ 'erreur': 'Impossible de poster le message' });
          }
        });
      },

      // lister tous les messages
      listMessages: function(req, res) {        
        models.Message.findAll({
          order: [['updatedAt', 'DESC']],
          include:[{
            model: models.User,
            attributes: ['Username', 'id']
          }],
        }).then(function(messages) {
          if (messages) {
            res.status(200).json(messages);
          } else {
            res.status(404).json({ "erreur": "Aucun message trouvé" });
          }
        }).catch(function(err) {
          console.log(err);
          res.status(500).json({ "erreur": "Champs invalide" });
        });
      },

      // Afficher un seul message
      oneMessage: function(req,res) {
        models.Message.findOne({
          include: [{
            model: models.User,
            attributes: ['id','username' ]
          }],
          where: { id : req.params.id }
        })
        .then (function(onemessage) {
          res.status(200).json(onemessage);
        })
        .catch(function(err) {
          console.log(err);
          res.status(500).json({ "erreur": "Une erreur c\'est produite"});
        });
      },

      deleteMessage: function(req, res) {

        // Getting auth header
        let headerAuth  = req.headers['authorization'];
        let userId      = jwtUtils.getUserId(headerAuth);
        console.log(userId);
        models.User.findOne({
            attributes: ['id', 'isadmin'],
            where: { id: userId }
        })
        .then(user => {
          //Vérification pour supprimer il faut etre admin ou à l'origine du message
          if (user && (user.isAdmin == true || user.id == userId)) {
              console.log('Suppression du post id :', req.params.id);
              models.Message
                  .findOne({
                      where: { id: req.params.id }
                  })
                  .then((messageFind) => {                      
                    models.Message
                        .destroy({
                            where: { id: messageFind.id }
                        })
                        .then(() => res.end())
                        .catch(err => res.status(500).json(err))                      
                  })
                  .catch(err => res.status(500).json(err))
          } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
        })
        .catch(error => res.status(500).json(error));                     
      },

      // Modification d'un message
      updateMessage: function(req, res) {

        // Getting auth header
        let headerAuth  = req.headers['authorization'];
        let userId      = jwtUtils.getUserId(headerAuth);
        console.log(userId);
        models.User.findOne({
            attributes: ['id', 'isadmin'],
            where: { id: userId }
        })
        .then(user => {
          //Vérification pour supprimer il faut etre admin ou à l'origine du message
          if (user && (user.isAdmin == true || user.id == userId)) {
              console.log('Modification du post id :', req.params.id);
              models.Message
                  .findOne({
                      where: { id: req.params.id }
                  })
                  .then((messageFind) => {                      
                    models.Message
                        .update({
                            title: req.body.newTitle,
                            content: req.body.newContent,                            
                          },
                            {where: { id: messageFind.id }}
                        )
                        .then(() => res.end())
                        .catch(err => res.status(500).json(err))                      
                  })
                  .catch(err => res.status(500).json(err))
          } else { res.status(403).json('Utilisateur non autorisé à editer ce post') }
        })
        .catch(error => res.status(500).json(error));                     
      },
}