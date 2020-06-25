
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('ClaimHistories', 'ActivityId', {
                    type: Sequelize.INTEGER,
                    references: {
                      model: {
                        tableName: 'Activities',
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
                queryInterface.removeColumn('ClaimHistories', 'ActivityId', { transaction: t }),
            ])
        })
    }
};
