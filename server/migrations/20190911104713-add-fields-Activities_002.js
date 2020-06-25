
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Activities', 'isActive', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                }, { transaction: t }),

                queryInterface.addColumn('Activities', 'paidAmount', {
                    type: Sequelize.FLOAT,
                    defaultValue: 0
                }, { transaction: t }),

                queryInterface.addColumn('Activities', 'balanceAmount', {
                    type: Sequelize.FLOAT,
                    defaultValue: 0
                }, { transaction: t }),

            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Activities', 'isActive', { transaction: t }),
                queryInterface.removeColumn('Activities', 'paidAmount', { transaction: t }),
                queryInterface.removeColumn('Activities', 'balanceAmount', { transaction: t }),
            ])
        })
    }
};
