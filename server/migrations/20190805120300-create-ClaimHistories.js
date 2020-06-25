'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ClaimHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClaimId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Claims'
          },
          key: 'id'
        }
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
      ProviderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Providers'
          },
          key: 'id'
        }
      },
      claimType: {
        type: Sequelize.ENUM('Estimated', 'Final')
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
    return queryInterface.dropTable('ClaimHistories');
  }
};
