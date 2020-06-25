module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([

              queryInterface.addColumn('Patients', 'prePay1stPayment', {
                  type: Sequelize.FLOAT,
                  defaultValue: 0
              }, { transaction: t }),

              queryInterface.addColumn('Patients', 'prePayInstallments', {
                  type: Sequelize.INTEGER,
              }, { transaction: t }),

              queryInterface.addColumn('Patients', 'isPpiDecliened', {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false
              }, { transaction: t }),

              queryInterface.addColumn('Patients', 'ppi1stPayment', {
                  type: Sequelize.FLOAT,
                  defaultValue: 0
              }, { transaction: t }),

              queryInterface.addColumn('Patients', 'ppiInstallments', {
                  type: Sequelize.FLOAT,
                  defaultValue: 0
              }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
              queryInterface.removeColumn('Patients', 'prePay1stPayment', { transaction: t }),
              queryInterface.removeColumn('Patients', 'prePayInstallments', { transaction: t }),
              queryInterface.removeColumn('Patients', 'isPpiDecliened', { transaction: t }),
              queryInterface.removeColumn('Patients', 'ppi1stPayment', { transaction: t }),
              queryInterface.removeColumn('Patients', 'ppiInstallments', { transaction: t })
            ])
        })
    }
};
