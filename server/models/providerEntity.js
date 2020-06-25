module.exports = (sequelize, DataTypes) => {
  const ProviderEntity = sequelize.define(
    'ProviderEntity',
    {
      ProviderId: DataTypes.INTEGER,
      providerNpi: DataTypes.STRING,
      firstName: DataTypes.STRING,
      midName: DataTypes.STRING,
      providerType: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          ProviderEntity.belongsTo(models.Provider);
        }
      }
    }
  );
  return ProviderEntity;
};
