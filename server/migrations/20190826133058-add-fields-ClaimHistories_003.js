module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([

              queryInterface.addColumn('ClaimHistories', 'providerGenratedId', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'insuranceGenratedId', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'dateOfServiceFrom', {
                  type: Sequelize.DATEONLY,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'dateOfServiceTo', {
                  type: Sequelize.DATEONLY,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'outOfNetwork', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'notCovered', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'noPriorAuthorization', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'denied', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'charity', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'writeOff', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'rebate', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'coupon', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'other', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'status', {
                  type: Sequelize.ENUM('Default', 'Pending approval', 'In payment cycle', 'Administrative processing', 'Paid'),
                  defaultValue: 'Default'
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'notes', {
                  type: Sequelize.TEXT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'unbundlling', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'duplicate', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'billed', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'approved', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'contractAssignment', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'billingEntityNpi', {
                  type: Sequelize.STRING,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'BillingEntityId', {
                  type: Sequelize.INTEGER,
                  references: {
                    model: {
                      tableName: 'BillingEntities',
                      schema: 'public'
                    },
                    key: 'id'
                  },
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'isActive', {
                  type: Sequelize.BOOLEAN,
                  defaultValue: true
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'isPaid', {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'paidAmount', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),

              queryInterface.addColumn('ClaimHistories', 'balanceAmount', {
                  type: Sequelize.FLOAT,
              }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
              queryInterface.removeColumn('ClaimHistories', 'providerGenratedId', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'insuranceGenratedId', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'dateOfServiceFrom', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'dateOfServiceTo', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'outOfNetwork', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'notCovered', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'noPriorAuthorization', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'denied', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'charity', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'writeOff', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'rebate', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'coupon', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'other', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'status', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'notes', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'unbundlling', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'duplicate', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'billed', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'approved', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'contractAssignment', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'billingEntityNpi', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'BillingEntityId', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'isActive', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'isPaid', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'paidAmount', { transaction: t }),
              queryInterface.removeColumn('ClaimHistories', 'balanceAmount', { transaction: t })
            ])
        })
    }
};
