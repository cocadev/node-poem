
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('ActivityInstallments', 'installmentDate', {
                    type: Sequelize.DATEONLY,
                }, { transaction: t }),

                queryInterface.addColumn('ActivityInstallments', 'paymentDate', {
                    type: Sequelize.DATEONLY,
                }, { transaction: t }),

                queryInterface.addColumn('ActivityInstallments', 'amountPaid', {
                    type: Sequelize.FLOAT,
                    defaultValue: 0
                }, { transaction: t }),

                queryInterface.addColumn('ActivityInstallments', 'amountDue', {
                    type: Sequelize.FLOAT,
                    defaultValue: 0
                }, { transaction: t }),

            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('ActivityInstallments', 'installmentDate', { transaction: t }),
                queryInterface.removeColumn('ActivityInstallments', 'paymentDate', { transaction: t }),
                queryInterface.removeColumn('ActivityInstallments', 'amountPaid', { transaction: t }),
                queryInterface.removeColumn('ActivityInstallments', 'amountDue', { transaction: t }),
            ])
        })
    }
};
