
module.exports = (sequelize, DataTypes) => {
  const MonthlyStatement = sequelize.define(
    'MonthlyStatement',
    {
      PatientId: DataTypes.INTEGER,
      statmentDate: { allowNull: false, type: DataTypes.DATEONLY },
      dueDate: { allowNull: false, type: DataTypes.DATEONLY },
      totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
      paymentDate: { type: DataTypes.DATEONLY },
      paymentAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
      prePay_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      prePay_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      prePay_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      prePay_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      ppi_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      ppi_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      ppi_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      ppi_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      buffer_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      buffer_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      buffer_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      buffer_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      lateFees_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      lateFees_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      lateFees_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      lateFees_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      intrest_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      intrest_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      intrest_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      intrest_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim90days_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim90days_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim90days_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      finalClaim90days_available: { type: DataTypes.FLOAT, defaultValue: 0 },
      estimatedClaim_this_statment: { type: DataTypes.FLOAT, defaultValue: 0 },
      estimatedClaim_paid: { type: DataTypes.FLOAT, defaultValue: 0 },
      estimatedClaim_due: { type: DataTypes.FLOAT, defaultValue: 0 },
      estimatedClaim_available: { type: DataTypes.FLOAT, defaultValue: 0 },
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          MonthlyStatement.belongsTo(models.Patient);
          MonthlyStatement.hasMany(models.MonthlyStatementDetail, { onDelete: 'cascade', hooks: true });
        }
      }
    }
  );
/*
  Activity.beforeCreate((user, options) => {
    console.log("--> Activity.beforeCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  Activity.afterCreate((user, options) => {
    console.log("--> Activity.afterCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });
*/
  return MonthlyStatement;
};
