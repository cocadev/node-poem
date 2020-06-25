
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Claims', 'coPay', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('Claims', 'deductible', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('Claims', 'coInsurance', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('Claims', 'selfPay', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('Claims', 'total', {
                    type: Sequelize.FLOAT,
                }, { transaction: t }),

                queryInterface.addColumn('Claims', 'isOutOfNetwork', {
                    type: Sequelize.BOOLEAN,
                }, { transaction: t }),
                queryInterface.addColumn('Claims', 'isApprovedByPatient', {
                    type: Sequelize.BOOLEAN,
                }, { transaction: t }),

                queryInterface.addColumn('Claims', 'approvedByPatientTime', {
                    type: Sequelize.DATE,
                }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Claims', 'coPay', { transaction: t }),
                queryInterface.removeColumn('Claims', 'deductible', { transaction: t }),
                queryInterface.removeColumn('Claims', 'coInsurance', { transaction: t }),
                queryInterface.removeColumn('Claims', 'selfPay', { transaction: t }),
                queryInterface.removeColumn('Claims', 'total', { transaction: t }),
                queryInterface.removeColumn('Claims', 'isOutOfNetwork', { transaction: t }),
                queryInterface.removeColumn('Claims', 'isApprovedByPatient', { transaction: t }),
                queryInterface.removeColumn('Claims', 'approvedByPatientTime', { transaction: t })
            ])
        })
    }
};
