'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUSERS: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key:'id'
        }
      },
      idPOSTS: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key:'id'
        }
      },
      commenttext: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Comments');
  }
};