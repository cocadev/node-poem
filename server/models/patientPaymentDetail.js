module.exports = (sequelize, DataTypes) => {
  const PatientPaymentDetail = sequelize.define(
    'PatientPaymentDetail',
    {
      PatientId: DataTypes.INTEGER,
      cardType: DataTypes.STRING,
      nameOnCard: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      cvvNumber: DataTypes.STRING,
      expiryDateMonYrs: DataTypes.STRING,
      billingAddress: DataTypes.STRING,
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          PatientPaymentDetail.belongsTo(models.Patient);
          // Provider.belongsTo(models.Patient);
        }
      }
    }
  );
  return PatientPaymentDetail;
};
