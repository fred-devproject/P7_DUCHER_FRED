// Imports

const express = require('express');
const usersCtrl = require('./routes/usersCtrl');

//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/profil/').get(usersCtrl.getUserProfil);
    //apiRouter.route('/users/profil/').put(usersCtrl.updateUserProfil);

    return apiRouter;
})();