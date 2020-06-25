'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ProviderPaymentDetails', {
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
      nameOnAccount: {
        type: Sequelize.STRING(75)
      },
      bankRoutingNumber: {
        type: Sequelize.STRING(32)
      },
      accountType: {
        type: Sequelize.STRING(45)
      },
      billingAddress: {
        type: Sequelize.STRING(75)
      },
      npiNumber: {
        type: Sequelize.STRING(15)
      },
      providerType: {
        type: Sequelize.STRING(75)
      },
      entityType: {
        type: Sequelize.STRING(75)
      },
      entityName: {
        type: Sequelize.STRING(75)
      },
      firstName: {
        type: Sequelize.STRING(75)
      },
      middleName: {
        type: Sequelize.STRING(75)
      },
      lastName: {
        type: Sequelize.STRING(75)
      },
      nameOnCard: {
        type: Sequelize.STRING(75)
      },
      cardNumber: {
        type: Sequelize.STRING(20)
      },
      cvvNumber: {
        type: Sequelize.STRING(5)
      },
      expiryDateMonYrs: {
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
    return queryInterface.dropTable('ProviderPaymentDetails');
  }
};
