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
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Messages',
          key: 'id'
        }
      },
      content : {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('likes');
  }
};