module.exports = (sequelize, DataTypes) => {
  const PatientTransaction = sequelize.define(
    'PatientTransaction',
    {
      PatientId: DataTypes.INTEGER,
      ActivityInstallmentId: DataTypes.INTEGER,
      transactionDate: DataTypes.DATE,
      amnount: DataTypes.FLOAT,
      type: DataTypes.ENUM('Credit', 'Debit'),
      head: DataTypes.STRING,
      service: DataTypes.STRING,
      description: DataTypes.STRING,
      remarks: DataTypes.TEXT,
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          PatientTransaction.belongsTo(models.Patient);
          PatientTransaction.belongsTo(models.ActivityInstallment);
        }
      }
    }
  );
  return PatientTransaction;
};
