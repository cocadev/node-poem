'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      ActivityTypeId: {
        type: Sequelize.INTEGER
      },
      activityDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      service: {
        type: Sequelize.STRING(25)
      },
      coPay: {
        type: Sequelize.FLOAT
      },
      coInsurance: {
        type: Sequelize.FLOAT
      },
      selfPay: {
        type: Sequelize.FLOAT
      },
      charity: {
        type: Sequelize.FLOAT
      },
      buffer: {
        type: Sequelize.FLOAT
      },
      prepay: {
        type: Sequelize.FLOAT
      },
      ppi: {
        type: Sequelize.FLOAT
      },
      fees: {
        type: Sequelize.FLOAT
      },
      deductible: {
        type: Sequelize.FLOAT
      },
      outOfPocketMax: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
      },
      installments: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Activities');
  }
};
