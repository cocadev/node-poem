module.exports = (sequelize, DataTypes) => {
  const MonthlyStatementDetail = sequelize.define(
    'MonthlyStatementDetail',
    {
      PatientId: DataTypes.INTEGER,
      MonthlyStatementId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'MonthlyStatements'
          },
          key: 'id'
        }
      },
      ActivityId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Activities'
          },
          key: 'id'
        }
      },
      ActivityInstallmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'ActivityInstallments'
          },
          key: 'id'
        }
      },
      ClaimId: {
        type: DataTypes.INTEGER,
        defaultValue: -1
      },
      totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
      previousPaidAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
      installmentAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
      paidAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
      balanceAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          MonthlyStatementDetail.belongsTo(models.Patient);
          MonthlyStatementDetail.belongsTo(models.MonthlyStatementDetail);
          MonthlyStatementDetail.belongsTo(models.Activity);
          MonthlyStatementDetail.belongsTo(models.ActivityInstallment);
          //
          // Activity.hasMany(models.MonthlyStatmentDetail, { onDelete: 'cascade', hooks: true });
        }
      }
    }
  );
/*
  Activity.beforeCreate((user, options) => {
    console.log("--> Activity.beforeCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });

  Activity.afterCreate((user, options) => {
    console.log("--> Activity.afterCreate called");
    // return hashPassword(user.password).then(hashedPw => {
    //   user.password = hashedPw;
    // });
  });
*/
  return MonthlyStatementDetail;
};
