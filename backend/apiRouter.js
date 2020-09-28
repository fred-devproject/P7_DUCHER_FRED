// Imports

const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');

//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/profil/').get(usersCtrl.getUserProfil);
    apiRouter.route('/users/update/').put(usersCtrl.updatePassword);
    apiRouter.route('/users/delete/').delete(usersCtrl.deleteUser);

    return apiRouter;
})();