
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([

                queryInterface.addColumn('ActivityInstallments', 'isPaid', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }, { transaction: t }),

                queryInterface.addColumn('ActivityInstallments', 'isActive', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                }, { transaction: t }),

            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('ActivityInstallments', 'isPaid', { transaction: t }),
                queryInterface.removeColumn('ActivityInstallments', 'isActive', { transaction: t }),
            ])
        })
    }
};
