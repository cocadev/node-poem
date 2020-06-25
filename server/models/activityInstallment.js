module.exports = (sequelize, DataTypes) => {
  const ActivityInstallment = sequelize.define(
    'ActivityInstallment',
    {
      ActivityId: DataTypes.INTEGER,
      PatientId: DataTypes.INTEGER,
      installmentNumber: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      amountPaid: DataTypes.FLOAT,
      amountDue: DataTypes.FLOAT,
      installmentDate: DataTypes.DATE,
      paymentDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      isPaid: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          ActivityInstallment.belongsTo(models.Activity);
          ActivityInstallment.belongsTo(models.Patient);
        }
      }
    }
  );
  return ActivityInstallment;
};
