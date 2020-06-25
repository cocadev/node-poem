'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ProviderBankAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProviderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Providers'
          },
          key: 'id'
        }
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
      address: {
        type: Sequelize.STRING(75)
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
    return queryInterface.dropTable('ProviderBankAccounts');
  }
};
