
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.hasMany(models.Comment),
      models.Post.belongsTo(models.Users, {
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  Post.init({
    idUSERS: DataTypes.INTEGER,
    posttitle: DataTypes.STRING,
    posttext: DataTypes.STRING,
    postattachment: DataTypes.STRING,
    postlikes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};