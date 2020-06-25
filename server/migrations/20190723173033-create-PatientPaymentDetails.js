'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientPaymentDetails', {
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
      cardType: {
        type: Sequelize.STRING(40)
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
      billingAddress: {
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
    return queryInterface.dropTable('PatientPaymentDetails');
  }
};
