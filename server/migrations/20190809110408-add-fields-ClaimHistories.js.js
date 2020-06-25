
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('ClaimHistories', 'coPay', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'deductible', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'coInsurance', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'selfPay', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'total', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'isOutOfNetwork', {
                    type: Sequelize.BOOLEAN,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'isApprovedByPatient', {
                    type: Sequelize.BOOLEAN,
                }, { transaction: t }),

                queryInterface.addColumn('ClaimHistories', 'approvedByPatientTime', {
                    type: Sequelize.DATE,
                }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('ClaimHistories', 'coPay', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'deductible', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'coInsurance', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'selfPay', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'total', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'isOutOfNetwork', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'isApprovedByPatient', { transaction: t }),
                queryInterface.removeColumn('ClaimHistories', 'approvedByPatientTime', { transaction: t })
            ])
        })
    }
};
