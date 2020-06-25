module.exports = (sequelize, DataTypes) => {
  const PatientAddressDetail = sequelize.define(
    'PatientAddressDetail',
    {
      PatientId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      year: DataTypes.STRING,
      month: DataTypes.STRING,
      homeStatus: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          PatientAddressDetail.belongsTo(models.Patient);
        }
      }
    }
  );
  return PatientAddressDetail;
};
