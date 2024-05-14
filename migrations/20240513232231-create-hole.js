'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('holes', {
      holeNumber: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      par: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      yardage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      handicap: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      courseID: {
        type: Sequelize.STRING,
        references: {
          model: 'courses',
          key: 'courseID'
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
    await queryInterface.dropTable('holes');
  }
};
