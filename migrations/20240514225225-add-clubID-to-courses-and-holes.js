'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('holes', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('tee_boxes', 'courseID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'courseID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('tee_boxes', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'clubID');
    await queryInterface.removeColumn('holes', 'clubID');
    await queryInterface.removeColumn('tee_boxes', 'courseID');
    await queryInterface.removeColumn('tee_boxes', 'clubID');
  }
};
