'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';
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
    await queryInterface.dropTable('courses');
  }
};

