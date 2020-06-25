
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('PatientTransactions', 'ActivityInstallmentId', {
                    type: Sequelize.INTEGER,
                    references: {
                      model: {
                        tableName: 'ActivityInstallments',
                        schema: 'public'
                      },
                      key: 'id'
                    },
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('PatientTransactions', 'ActivityInstallmentId', { transaction: t }),
            ])
        })
    }
};
