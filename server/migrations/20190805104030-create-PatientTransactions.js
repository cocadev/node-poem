'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientTransactions', {
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
      transactionDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      amnount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      type: {
        type: Sequelize.ENUM('Credit', 'Debit')
      },
      head: {
        type: Sequelize.STRING(25)
      },
      service: {
        type: Sequelize.STRING(25)
      },
      description: {
        type: Sequelize.STRING(75)
      },
      remarks: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('PatientTransactions');
  }
};
