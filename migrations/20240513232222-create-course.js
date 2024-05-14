'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      courseID: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      courseName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numHoles: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      timeStampUpdated: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      golfClubName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'golf_clubs',
            key: 'name'
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
    await queryInterface.dropTable('courses');
  }
};

