// Imports

const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const messagesCtrl = require('./controllers/messagesCtrl');

//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/profil/').get(usersCtrl.getUserProfil);
    apiRouter.route('/users/update/').put(usersCtrl.updatePassword);
    apiRouter.route('/users/delete/').delete(usersCtrl.deleteUser);

    //Messages Routes
    apiRouter.route('/messages/post/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessages);
    apiRouter.route('/messages/:id/').get(messagesCtrl.oneMessage);
    apiRouter.route('/messages/delete/:id').delete(messagesCtrl.deleteMessage);
    apiRouter.route('/messages/update/').put(messagesCtrl.updateMessage);

    return apiRouter;
})();