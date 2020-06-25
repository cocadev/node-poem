const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Claim = sequelize.define(
    'Claim',
    {
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
      parentClaimId: {
        type: DataTypes.INTEGER,
        defaultValue: -1
      },
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
          Claim.belongsTo(models.Patient);
          Claim.belongsTo(models.Provider);
          Claim.belongsTo(models.Activity);
          Claim.belongsTo(models.BillingEntity);

          //Claim.hasMany(models.ActivityInstallment, { onDelete: 'cascade', hooks: true });
          Claim.hasMany(models.ClaimHistory, { onDelete: 'cascade', hooks: true });
        }
      }
    }
  );


//   Claim.beforeBulkUpdate((claim, options) => {
// console.log("Claim beforeUpdate 001")
//     claim.dateOfServiceFrom = moment(claim.dateOfServiceFrom, "DD-MM-YYYY").format("YYYY-MM-DD");
//     claim.dateOfServiceTo = moment(claim.dateOfServiceTo, "DD-MM-YYYY").format("YYYY-MM-DD");
// console.log("Claim beforeUpdate 002")
//   });

// Claim.beforeUpdate((claim, options) => {
// console.log("Claim beforeUpdate 001")
//   claim.dateOfServiceFrom = moment(claim.dateOfServiceFrom, "DD-MM-YYYY").format("YYYY-MM-DD");
//   claim.dateOfServiceTo = moment(claim.dateOfServiceTo, "DD-MM-YYYY").format("YYYY-MM-DD");
// console.log("Claim beforeUpdate 002")
// });

  Claim.beforeCreate((claim, options) => {
console.log("Claim beforeCreate")
    claim.dateOfServiceFrom = moment(claim.dateOfServiceFrom, "DD-MM-YYYY").format("YYYY-MM-DD");
    claim.dateOfServiceTo = moment(claim.dateOfServiceTo, "DD-MM-YYYY").format("YYYY-MM-DD");
  });

  Claim.afterCreate((claim, options) => {
    //console.log("--> Claim.afterCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });
  return Claim;
};
