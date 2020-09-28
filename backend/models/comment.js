'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Message, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'messageId',
      });
  
      models.Message.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'messageId',
        otherKey: 'userId',
      });

      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        allowNull: false
        
      });

      models.Comment.belongsTo(models.Message, {
        foreignKey: 'messageid',
        as: 'message', 
        allowNull: false
        
      });

      
    }
  };
  Comment.init({
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};