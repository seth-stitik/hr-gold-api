'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tee_boxes', {
      teetype: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      teeColor: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      distance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      holeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'holes',
          key: 'holeNumber'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tee_boxes');
  }
};
