module.exports = (sequelize, DataTypes) => {
  const BillingEntity = sequelize.define(
    'BillingEntity',
    {
      ProviderId: DataTypes.INTEGER,
      entityNpi: DataTypes.STRING,
      entityName: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          BillingEntity.belongsTo(models.Provider);
          BillingEntity.hasMany(models.Claim, {as: 'claims'})
        }
      }
    }
  );
  return BillingEntity;
};
