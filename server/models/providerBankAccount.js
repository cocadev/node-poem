module.exports = (sequelize, DataTypes) => {
  const ProviderBankAccount = sequelize.define(
    'ProviderBankAccount',
    {
      ProviderId: DataTypes.INTEGER,
      nameOfAccount: DataTypes.STRING,
      routingNumber: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      accountType: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          ProviderBankAccount.belongsTo(models.Provider);
        }
      }
    }
  );
  return ProviderBankAccount;
};
