'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientAddressDetails', {
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
      address: {
          type: Sequelize.STRING(75)
      },
      year: {
        type: Sequelize.STRING(4)
      },
      month: {
        type: Sequelize.STRING(2)
      },
      houseStatus: {
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
    return queryInterface.dropTable('PatientAddressDetails');
  }
};
