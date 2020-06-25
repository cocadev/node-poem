module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define(
    'Provider',
    {
      PatientId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      institutionName: DataTypes.STRING,
      taxId: DataTypes.STRING,
      institutionType: DataTypes.STRING,
      ownership: DataTypes.STRING,
      businessAddressForNotices: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      primaryContactFirstName: DataTypes.STRING,
      primaryContactMiddleName: DataTypes.STRING,
      primaryContactLastName: DataTypes.STRING,
      primaryContactPosition: DataTypes.STRING,
      primaryContactPhone: DataTypes.STRING,
      secondaryContactFirstName: DataTypes.STRING,
      secondaryContactMiddleName: DataTypes.STRING,
      secondaryContactLastName: DataTypes.STRING,
      secondaryContactPosition: DataTypes.STRING,
      secondaryContactPhone: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          Provider.belongsTo(models.User);
          Provider.belongsTo(models.Patient);

          Provider.hasMany(models.ProviderBankAccount, { onDelete: 'cascade', hooks: true });
          Provider.hasMany(models.ProviderEntity, { onDelete: 'cascade', hooks: true });
          Provider.hasMany(models.BillingEntity, { onDelete: 'cascade', hooks: true });
          Provider.hasMany(models.ProviderPaymentDetail, { onDelete: 'cascade', hooks: true });


          Provider.hasMany(models.Claim, { onDelete: 'cascade', hooks: true });
          Provider.hasMany(models.ClaimHistory, { onDelete: 'cascade', hooks: true });
        }
      }
    }
  );
  return Provider;
};
