module.exports = (sequelize, DataTypes) => {
  const PatientCreditCard = sequelize.define(
    'PatientCreditCard',
    {
      PatientId: DataTypes.INTEGER,
      cardType: DataTypes.STRING,
      nameOnCard: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      expiryDateMonYrs: DataTypes.STRING,
      cvvNumber: DataTypes.STRING,
      billingAddress: DataTypes.STRING,
      cardBrand: DataTypes.STRING,
      cardLevel: DataTypes.STRING,
      stripeKey: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          PatientCreditCard.belongsTo(models.Patient);
        }
      }
    }
  );
  return PatientCreditCard;
};




//familyDedPktMaxInNetBenefits: DataTypes.DOUBLE,
