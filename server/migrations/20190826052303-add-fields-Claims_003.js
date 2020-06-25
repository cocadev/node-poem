module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
              queryInterface.addColumn('Claims', 'parentClaimId', {
                  type: Sequelize.INTEGER,
                  defaultValue: -1
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'providerGenratedId', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'insuranceGenratedId', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'dateOfServiceFrom', {
                  type: Sequelize.DATEONLY,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'dateOfServiceTo', {
                  type: Sequelize.DATEONLY,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'outOfNetwork', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'notCovered', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'noPriorAuthorization', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'denied', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'charity', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'writeOff', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'rebate', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'coupon', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'other', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'status', {
                  type: Sequelize.ENUM('Default', 'Pending approval', 'In payment cycle', 'Administrative processing', 'Paid'),
                  defaultValue: 'Default'
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'notes', {
                  type: Sequelize.TEXT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'unbundlling', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'duplicate', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'billed', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'approved', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'contractAssignment', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'billingEntityNpi', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'BillingEntityId', {
                  type: Sequelize.INTEGER,
                  references: {
                    model: {
                      tableName: 'BillingEntities',
                      schema: 'public'
                    },
                    key: 'id'
                  },
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'isActive', {
                  type: Sequelize.BOOLEAN,
                  defaultValue: true
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'isPaid', {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'paidAmount', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('Claims', 'balanceAmount', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
              queryInterface.removeColumn('Claims', 'parentClaimId', { transaction: t }),
              queryInterface.removeColumn('Claims', 'providerGenratedId', { transaction: t }),
              queryInterface.removeColumn('Claims', 'insuranceGenratedId', { transaction: t }),
              queryInterface.removeColumn('Claims', 'dateOfServiceFrom', { transaction: t }),
              queryInterface.removeColumn('Claims', 'dateOfServiceTo', { transaction: t }),
              queryInterface.removeColumn('Claims', 'outOfNetwork', { transaction: t }),
              queryInterface.removeColumn('Claims', 'notCovered', { transaction: t }),
              queryInterface.removeColumn('Claims', 'noPriorAuthorization', { transaction: t }),
              queryInterface.removeColumn('Claims', 'denied', { transaction: t }),
              queryInterface.removeColumn('Claims', 'charity', { transaction: t }),
              queryInterface.removeColumn('Claims', 'writeOff', { transaction: t }),
              queryInterface.removeColumn('Claims', 'rebate', { transaction: t }),
              queryInterface.removeColumn('Claims', 'coupon', { transaction: t }),
              queryInterface.removeColumn('Claims', 'other', { transaction: t }),
              queryInterface.removeColumn('Claims', 'status', { transaction: t }),
              queryInterface.removeColumn('Claims', 'notes', { transaction: t }),
              queryInterface.removeColumn('Claims', 'unbundlling', { transaction: t }),
              queryInterface.removeColumn('Claims', 'duplicate', { transaction: t }),
              queryInterface.removeColumn('Claims', 'billed', { transaction: t }),
              queryInterface.removeColumn('Claims', 'approved', { transaction: t }),
              queryInterface.removeColumn('Claims', 'contractAssignment', { transaction: t }),
              queryInterface.removeColumn('Claims', 'billingEntityNpi', { transaction: t }),
              queryInterface.removeColumn('Claims', 'BillingEntityId', { transaction: t }),
              queryInterface.removeColumn('Claims', 'isActive', { transaction: t }),
              queryInterface.removeColumn('Claims', 'isPaid', { transaction: t }),
              queryInterface.removeColumn('Claims', 'paidAmount', { transaction: t }),
              queryInterface.removeColumn('Claims', 'balanceAmount', { transaction: t })
            ])
        })
    }
};
