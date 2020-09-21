'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.Users, {
        foreignKey:{
          allowNull: false
        }
      }),
      models.Post.belongsTo(models.Posts, {
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  Comment.init({
    idUSERS: DataTypes.INTEGER,
    idPOSTS: DataTypes.INTEGER,
    commenttext: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};