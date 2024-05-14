'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('golf_clubs', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });

    await queryInterface.createTable('golf_clubs', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      clubName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeStampUpdated: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      distance: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      measureUnit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      clubID: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
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
        allowNull: false,
        references: {
          model: 'courses',
          key: 'courseID'
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

    await queryInterface.createTable('tee_boxes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teetype: {
        type: Sequelize.STRING,
        allowNull: false
      },
      teeColor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      distance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      holeNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.removeColumn('golf_clubs', 'clubID');
    await queryInterface.dropTable('tee_boxes');
    await queryInterface.dropTable('holes');
    await queryInterface.dropTable('courses');
    await queryInterface.dropTable('golf_clubs');
  }
};
