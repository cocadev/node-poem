'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ProviderEntities', {
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
      providerNpi: {
        type: Sequelize.STRING(15)
      },
      firstName: {
        type: Sequelize.STRING(15)
      },
      midName: {
        type: Sequelize.STRING(15)
      },
      providerType: {
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
    return queryInterface.dropTable('ProviderEntities');
  }
};
