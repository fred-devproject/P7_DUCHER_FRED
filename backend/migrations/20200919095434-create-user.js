'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userfirstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userlastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userpassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      useremail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isadmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};