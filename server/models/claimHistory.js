module.exports = (sequelize, DataTypes) => {
  const ClaimHistory = sequelize.define(
    'ClaimHistory',
    {
      ClaimId: DataTypes.INTEGER,
      PatientId: DataTypes.INTEGER,
      ProviderId: DataTypes.INTEGER,
      ActivityId: DataTypes.INTEGER,
      claimType: DataTypes.ENUM('Estimated', 'Final'),
      coPay: DataTypes.FLOAT,
      deductible: DataTypes.FLOAT,
      coInsurance: DataTypes.FLOAT,
      selfPay: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
      isOutOfNetwork: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isApprovedByPatient: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      approvedByPatientTime: DataTypes.DATE,
      providerGenratedId: DataTypes.STRING,
      insuranceGenratedId: DataTypes.STRING,
      dateOfServiceFrom: DataTypes.DATEONLY,
      dateOfServiceTo: DataTypes.DATEONLY,
      outOfNetwork: DataTypes.FLOAT,
      notCovered: DataTypes.FLOAT,
      noPriorAuthorization: DataTypes.FLOAT,
      denied: DataTypes.FLOAT,
      charity: DataTypes.FLOAT,
      writeOff: DataTypes.FLOAT,
      rebate: DataTypes.FLOAT,
      coupon: DataTypes.FLOAT,
      other: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM('Default', 'Pending approval', 'In payment cycle', 'Administrative processing', 'Paid'),
        default: 'Default'
      },
      notes: DataTypes.TEXT,
      unbundlling: DataTypes.STRING,
      duplicate: DataTypes.STRING,
      billed: DataTypes.STRING,
      approved: DataTypes.STRING,
      contractAssignment: DataTypes.STRING,
      billingEntityNpi: DataTypes.STRING,
      BillingEntityId: DataTypes.INTEGER,
      isActive: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
      },
      isPaid: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      paidAmount: DataTypes.FLOAT,
      balanceAmount: DataTypes.FLOAT
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          ClaimHistory.belongsTo(models.Claim);
          ClaimHistory.belongsTo(models.Patient);
          ClaimHistory.belongsTo(models.Provider);
          ClaimHistory.belongsTo(models.Activity);
          ClaimHistory.belongsTo(models.BillingEntity);
        }
      }
    }
  );
  return ClaimHistory;
};
