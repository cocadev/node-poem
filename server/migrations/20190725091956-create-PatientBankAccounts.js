'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientBankAccounts', {
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
      suffix: {
          type: Sequelize.STRING(6)
      },
      nameOfAccount: {
        type: Sequelize.STRING(75)
      },
      routingNumber: {
        type: Sequelize.STRING(75)
      },
      accountNumber: {
        type: Sequelize.STRING(75)
      },
      accountType: {
        type: Sequelize.STRING(15)
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
    return queryInterface.dropTable('PatientBankAccounts');
  }
};
