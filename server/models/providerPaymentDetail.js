module.exports = (sequelize, DataTypes) => {
  const ProviderPaymentDetail = sequelize.define(
    'ProviderPaymentDetail',
    {
      ProviderId: DataTypes.INTEGER,
      nameOnAccount: DataTypes.STRING,
      bankRoutingNumber: DataTypes.STRING,
      accountType: DataTypes.STRING,
      billingAddress: DataTypes.STRING,
      npiNumber: DataTypes.STRING,
      providerType: DataTypes.STRING,
      entityType: DataTypes.STRING,
      entityName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      nameOnCard: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      cvvNumber: DataTypes.STRING,
      expiryDateMonYrs: DataTypes.STRING,
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          ProviderPaymentDetail.belongsTo(models.Provider);
          // Provider.belongsTo(models.Patient);
        }
      }
    }
  );
  return ProviderPaymentDetail;
};
