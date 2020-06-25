'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Providers', {
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
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      email: {
        type: Sequelize.STRING(255)
      },
      fullName: {
        type: Sequelize.STRING(255)
      },
      institutionName: {
        type: Sequelize.STRING(75)
      },
      taxId: {
        type: Sequelize.STRING(75)
      },
      institutionType: {
        type: Sequelize.STRING(75)
      },
      ownership: {
        type: Sequelize.STRING(75)
      },
      businessAddressForNotices: {
        type: Sequelize.STRING(75)
      },
      phoneNumber: {
        type: Sequelize.STRING(15)
      },
      primaryContactFirstName: {
        type: Sequelize.STRING(32)
      },
      primaryContactMiddleName: {
        type: Sequelize.STRING(32)
      },
      primaryContactLastName: {
        type: Sequelize.STRING(32)
      },
      primaryContactPosition: {
        type: Sequelize.STRING(32)
      },
      primaryContactPhone: {
        type: Sequelize.STRING(15)
      },
      secondaryContactFirstName: {
        type: Sequelize.STRING(32)
      },
      secondaryContactMiddleName: {
        type: Sequelize.STRING(32)
      },
      secondaryContactLastName: {
        type: Sequelize.STRING(32)
      },
      secondaryContactPosition: {
        type: Sequelize.STRING(32)
      },
      secondaryContactPhone: {
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
    return queryInterface.dropTable('Providers');
  }
};
