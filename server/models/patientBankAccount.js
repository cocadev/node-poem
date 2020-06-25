module.exports = (sequelize, DataTypes) => {
  const PatientBankAccount = sequelize.define(
    'PatientBankAccount',
    {
      PatientId: DataTypes.INTEGER,
      suffix: DataTypes.STRING,
      nameOfAccount: DataTypes.STRING,
      routingNumber: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      accountType: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          PatientBankAccount.belongsTo(models.Patient);
        }
      }
    }
  );
  return PatientBankAccount;
};
