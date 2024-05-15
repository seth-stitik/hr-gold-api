'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('holes', {
      holeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      par: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      yardage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      handicap: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courseID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'courses',
          key: 'courseID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      clubID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'golf_clubs',
          key: 'clubID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Adding composite primary key
    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber', 'courseID'],
      type: 'primary key',
      name: 'holes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('holes');
  }
};
