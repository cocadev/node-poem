'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      email: {
        type: Sequelize.STRING(255)
      },
      name: {
        type: Sequelize.STRING(75)
      },
      suffix: {
        type: Sequelize.STRING(6)
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.STRING(10)
      },
// dependentId: {
//   type: Sequelize.DOUBLE
// },
      ssn: {
        type: Sequelize.STRING(75)
      },
      address1: {
        type: Sequelize.STRING(75)
      },
      yearsLivedInAddress: {
        type: Sequelize.STRING(75)
      },
      houseStatus: {
        type: Sequelize.STRING(75)
      },
      maritalStatus: {
        type: Sequelize.STRING(15)
      },
      highestEducation: {
        type: Sequelize.STRING(75)
      },
      occupation: {
        type: Sequelize.STRING(75)
      },
      designation: {
        type: Sequelize.STRING(75)
      },
      yearsWorkedInCurrentCompany: {
        type: Sequelize.STRING(5)
      },
      employersName: {
        type: Sequelize.STRING(75)
      },
      employeeNumber: {
        type: Sequelize.STRING(75)
      },
      areaCode: {
        type: Sequelize.STRING(75)
      },
      mobileNumber: {
        type: Sequelize.STRING(15)
      },
      annualIncome: {
        type: Sequelize.FLOAT
      },
      planName: {
        type: Sequelize.STRING(75)
      },
      groupPlanId: {
        type: Sequelize.STRING(75)
      },
      nameOnCard: {
        type: Sequelize.STRING(75)
      },
      memberId: {
        type: Sequelize.STRING(75)
      },
      providerCustServiceContNumber: {
        type: Sequelize.STRING(75)
      },
      financiallyResponsibleParty: {
        type: Sequelize.STRING(75)
      },
      financialResponsibleRelationShip: {
        type: Sequelize.STRING(75)
      },
      financialResponsiblePartyAddress: {
        type: Sequelize.STRING(75)
      },
      financialResponsibleName: {
        type: Sequelize.STRING(75)
      },
      patientCustServiceContNumber: {
        type: Sequelize.STRING(75)
      },
      planIssuer: {
        type: Sequelize.STRING(75)
      },
      planAddress: {
        type: Sequelize.STRING(75)
      },
      fromPlanEffectiveDate: {
        type: Sequelize.DATE
      },
      toPlanEffectiveDate: {
        type: Sequelize.DATE
      },
      flowStep: {
        type: Sequelize.INTEGER
      },

      isOutOfPocketMaxInNetWorkBenefits: {
        type: Sequelize.BOOLEAN
      },
      individualDedPktMaxInNetBenefits: {
        type: Sequelize.FLOAT
      },
      individualOutOfPktMaxInNetBenefits: {
        type: Sequelize.FLOAT
      },
      familyDedPktMaxInNetBenefits: {
        type: Sequelize.FLOAT
      },
      familyOutOfPktMax: {
        type: Sequelize.FLOAT
      },
      isOutOfNetworkBenefits: {
        type: Sequelize.BOOLEAN
      },

      individualDedOutOfNetBenefits: {
        type: Sequelize.FLOAT
      },
      individualOutOfPktMaxOfNetBenefits: {
        type: Sequelize.FLOAT
      },
      familyDedOutOfNetBenefits: {
        type: Sequelize.FLOAT
      },
      familyOutOfPocketMax: {
        type: Sequelize.FLOAT
      },
      prePayReq: {
        type: Sequelize.FLOAT
      },

      bufferFromAbpcorp259: {
        type: Sequelize.FLOAT
      },
      guaranteedPaymentsToProviders: {
        type: Sequelize.FLOAT
      },
      paymentMethod: {
        type: Sequelize.STRING(75)
      },
      paymentFrequencyPrePay: {
        type: Sequelize.INTEGER
      },
      equalMonthlyPaymentOf: {
        type: Sequelize.FLOAT
      },
      ppiOneTimePaymentAmount: {
        type: Sequelize.FLOAT
      },
      ppiTotalAmount: {
        type: Sequelize.FLOAT
      },
      ppiFirstPaymentAmount40per: {
        type: Sequelize.FLOAT
      },
      ppiEqualMonths: {
        type: Sequelize.FLOAT
      },
      ppiEqualMonthsPaymentAmount: {
        type: Sequelize.FLOAT
      },
      nextPaymentChargedOn: {
        type: Sequelize.DATE
      },
      thirdPaymentChargedOn: {
        type: Sequelize.DATE
      },
      fourthPaymentChargedOn: {
        type: Sequelize.DATE
      },
      otp: {
        type: Sequelize.INTEGER
      },
      otpVerified: {
        type: Sequelize.BOOLEAN
      },
      otpTTL: {
        type: Sequelize.DATE
      },
      emailCode: {
        type: Sequelize.STRING
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN
      },
      emailCodeTTL: {
        type: Sequelize.DATE
      },
      isTcAccepted: {
        type: Sequelize.BOOLEAN
      },
      inviteCode: {
        type: Sequelize.STRING(32)
      },
      referralCode: {
        type: Sequelize.STRING(32)
      },
      isHiddenFromSearch: {
        type: Sequelize.BOOLEAN
      },
      bioMetric: {
        type: Sequelize.BLOB
      },
      isPpiPaymentSplit: {
        type: Sequelize.BOOLEAN
      },
      isPrePayPaymentSplit: {
        type: Sequelize.BOOLEAN
      },
      employersAddress: {
        type: Sequelize.STRING(75)
      },
      monthsWorkedInCurrentCompany: {
        type: Sequelize.STRING(5)
      },
      insuranceCardPicFront: {
        type: Sequelize.BLOB
      },
      insuranceCarPicBack: {
        type: Sequelize.BLOB
      },
      isRequestIdUpdate: {
        type: Sequelize.BOOLEAN
      },
      isIdNotMatch: {
        type: Sequelize.BOOLEAN
      },
      govtIdPic: {
        type: Sequelize.BLOB
      },
      isInsurancePayOutOfNetworkCare: {
        type: Sequelize.STRING
      },
      stripeKey: {
        type: Sequelize.STRING(255)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Patients');
  }
};
