'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tee_boxes', {
      teetype: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      teeColor: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      distance: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      holeNumber: {
        type: Sequelize.INTEGER,
        references: {
          model: 'holes',
          key: 'holeNumber'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('tee_boxes');
  }
};
