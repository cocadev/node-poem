'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('BillingEntities', {
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
      entityNpi: {
        type: Sequelize.STRING(15)
      },
      entityName: {
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
    return queryInterface.dropTable('BillingEntities');
  }
};
