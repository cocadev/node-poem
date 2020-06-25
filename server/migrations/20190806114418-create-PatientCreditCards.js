'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientCreditCards', {
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
        type: Sequelize.STRING(15)
      },
	    nameOnCard: {
        type: Sequelize.STRING(32)
      },
	    cardNumber: {
        type: Sequelize.STRING(20)
      },
	    expiryDateMonYrs: {
        type: Sequelize.STRING(6)
      },
	    cvvNumber: {
        type: Sequelize.STRING(5)
      },
	    billingAddress: {
        type: Sequelize.STRING(75)
      },
      cardBrand: {
        type: Sequelize.STRING(75)
      },
      cardLevel: {
        type: Sequelize.STRING(75)
      },
      stripeKey: {
        type: Sequelize.STRING(255)
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
    return queryInterface.dropTable('PatientCreditCards');
  }
};
