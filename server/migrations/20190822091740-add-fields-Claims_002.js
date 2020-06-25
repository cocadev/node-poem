
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Claims', 'ActivityId', {
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
                queryInterface.removeColumn('Claims', 'ActivityId', { transaction: t }),
            ])
        })
    }
};
