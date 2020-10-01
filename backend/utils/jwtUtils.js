// Imports
const jwt = require('jsonwebtoken');

//TO DO require('dotenv').config();
const AUTH_TOKEN = 'QB-z$DIH26_kfuq2DzYDf9v7';



//Exported functions
module.exports = {
    generateUserToken: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin            
        },
        AUTH_TOKEN,
        {
            expiresIn: '24h'
        })
    },
    parseAuthorization: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
      let userId = -1;
      let token = module.exports.parseAuthorization(authorization);
      if(token != null) {
        try {
          let jwtToken = jwt.verify(token, AUTH_TOKEN);
          if(jwtToken != null)
            userId = jwtToken.userId;
        } catch(err) {}
      }
      return userId;
    }
}