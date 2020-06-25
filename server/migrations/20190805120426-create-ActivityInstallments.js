'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ActivityInstallments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ActivityId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Activities'
          },
          key: 'id'
        }
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
      },
      installmentNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ActivityInstallments');
  }
};
