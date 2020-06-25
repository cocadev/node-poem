module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
    {
      UserId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      suffix: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      gender: DataTypes.STRING,
      ssn: DataTypes.STRING,
      address1: DataTypes.STRING,
      yearsLivedInAddress: DataTypes.STRING,
      houseStatus: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      highestEducation: DataTypes.STRING,
      occupation: DataTypes.STRING,
      designation: DataTypes.STRING,
      yearsWorkedInCurrentCompany: DataTypes.STRING,
      employersName: DataTypes.STRING,
      employeeNumber: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
      annualIncome: DataTypes.FLOAT,
      planName: DataTypes.STRING,
      groupPlanId: DataTypes.STRING,
      nameOnCard: DataTypes.STRING,
      memberId: DataTypes.STRING,
      providerCustServiceContNumber: DataTypes.STRING,
      financiallyResponsibleParty: DataTypes.STRING,
      financialResponsibleRelationShip: DataTypes.STRING,
      financialResponsiblePartyAddress: DataTypes.STRING,
      financialResponsibleName: DataTypes.STRING,
      patientCustServiceContNumber: DataTypes.STRING,
      planIssuer: DataTypes.STRING,
      planAddress: DataTypes.STRING,
      fromPlanEffectiveDate: DataTypes.DATE,
      toPlanEffectiveDate: DataTypes.DATE,
      flowStep: DataTypes.INTEGER,
      isOutOfPocketMaxInNetWorkBenefits: DataTypes.BOOLEAN,
      individualDedPktMaxInNetBenefits: DataTypes.FLOAT,
      individualOutOfPktMaxInNetBenefits: DataTypes.FLOAT,
      familyDedPktMaxInNetBenefits: DataTypes.FLOAT,
      familyOutOfPktMax: DataTypes.FLOAT,
      isOutOfNetworkBenefits: DataTypes.BOOLEAN,
      individualDedOutOfNetBenefits: DataTypes.FLOAT,
      individualOutOfPktMaxOfNetBenefits: DataTypes.FLOAT,
      familyDedOutOfNetBenefits: DataTypes.FLOAT,
      familyOutOfPocketMax: DataTypes.FLOAT,
      prePayReq: DataTypes.FLOAT,
      bufferFromAbpcorp259: DataTypes.FLOAT,
      guaranteedPaymentsToProviders: DataTypes.FLOAT,
      paymentMethod: DataTypes.STRING,
      paymentFrequencyPrePay: DataTypes.INTEGER,
      equalMonthlyPaymentOf: DataTypes.FLOAT,
      ppiOneTimePaymentAmount: DataTypes.FLOAT,
      ppiTotalAmount: DataTypes.FLOAT,
      ppiFirstPaymentAmount40per: DataTypes.FLOAT,
      ppiEqualMonths: DataTypes.FLOAT,
      ppiEqualMonthsPaymentAmount: DataTypes.FLOAT,
      nextPaymentChargedOn: DataTypes.DATE,
      thirdPaymentChargedOn: DataTypes.DATE,
      fourthPaymentChargedOn: DataTypes.DATE,
      otp: DataTypes.INTEGER,
      otpVerified: DataTypes.BOOLEAN,
      otpTTL: DataTypes.DATE,
      emailCode: DataTypes.STRING,
      isEmailVerified: DataTypes.BOOLEAN,
      emailCodeTTL: DataTypes.DATE,
      isTcAccepted: DataTypes.BOOLEAN,
      inviteCode: DataTypes.STRING,
      referralCode: DataTypes.STRING,
      isHiddenFromSearch: DataTypes.BOOLEAN,
      bioMetric: DataTypes.BLOB,
      isPpiPaymentSplit: DataTypes.BOOLEAN,
      isPrePayPaymentSplit: DataTypes.BOOLEAN,
      prePay1stPayment: DataTypes.FLOAT,
      prePayInstallments: DataTypes.INTEGER,
      isPpiDecliened: DataTypes.BOOLEAN,
      ppi1stPayment: DataTypes.FLOAT,
      ppiInstallments: DataTypes.FLOAT,
      employersAddress: DataTypes.STRING,
      monthsWorkedInCurrentCompany: DataTypes.STRING,
      insuranceCardPicFront: DataTypes.BLOB,
      insuranceCardPicBack: DataTypes.BLOB,
      isRequestIdUpdate: DataTypes.BOOLEAN,
      isIdNotMatch: DataTypes.BOOLEAN,
      //isIdNotMatch: DataTypes.BOOLEAN,
      govtIdPic: DataTypes.BLOB,
      //isSelfPicUpdate, isSelfPicMatch, selfPic
      isInsurancePayOutOfNetworkCare: DataTypes.STRING,
      stripeKey: DataTypes.STRING
    },
    {
      classMethods: {
        associate(models) {
          // associations can be defined here
          Patient.belongsTo(models.User);

          Patient.hasMany(models.Claim, { onDelete: 'cascade', hooks: true });
          Patient.hasMany(models.ClaimHistory, { onDelete: 'cascade', hooks: true });
          Patient.hasMany(models.ActivityInstallment, { onDelete: 'cascade', hooks: true });
          Patient.hasMany(models.PatientAddressDetail, { onDelete: 'cascade', hooks: true });

          Patient.hasMany(models.PatientCreditCard, { onDelete: 'cascade', hooks: true });

        }
      }
    }
  );
  return Patient;
};
