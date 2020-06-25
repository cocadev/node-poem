
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([

                queryInterface.addColumn('Activities', 'isCompleted', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }, { transaction: t })

            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Activities', 'isCompleted', { transaction: t }),

            ])
        })
    }
};
