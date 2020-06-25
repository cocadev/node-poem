const Joi = require('joi');
const moment = require('moment');

exports.sendOTPDataSet = Joi.object().keys({
  mobile: Joi.string().required()
  //mobile: Joi.string().regex(/\+(\d){11, 15}/)
});

exports.verifyOTPDataSet = Joi.object().keys({
  otp: Joi.number().integer().required(),
  id: Joi.number().integer().required()
});

exports.usernameAvailableDataSet = Joi.object().keys({
  username: Joi.string().required()
});

exports.emailAvailableDataSet = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 })
});

exports.signupDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  suffix: Joi.string().allow('').optional(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  username: Joi.string().required(),
  password: Joi.string().required(),
  dob: Joi.string().required(),
  gender: Joi.string().required(),
  inviteCode: Joi.string().allow('').optional(),
  referralCode: Joi.string().allow('').optional(),
  isHiddenFromSearch: Joi.boolean().required()
});

exports.tcAcceptanceDataSet = Joi.object().keys({
  id: Joi.number().integer().required()
});

// exports.listClaimsDataSet = Joi.object().keys({
//   PatientId: Joi.number().integer().required()
// });

exports.verifyEmailDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  emailCode: Joi.number().integer().required()
});

exports.saveBiometricDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  bioMetric: Joi.string().required(),
});

exports.approveClaimDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  ClaimId: Joi.number().integer().required()
// add more fields here
});

exports.updatePatientProfileBasicInfoDataSet = Joi.object().keys({

  id: Joi.number().integer().required(),
  maritalStatus: "string",
  ssnNumber: Joi.string().required(),
  //"address": [{ "address":"string", "year": 1990, "month": 12, "houseStatus": "string"}],
  address: Joi.array().optional(),
  occupation: Joi.string().allow('').optional(),
  designation: Joi.string().allow('').optional(),
  employersName: Joi.string().allow('').optional(),
  employersAddress: Joi.string().allow('').optional(),
  employeeNumber: Joi.string().required(),
  annualIncome: Joi.number().optional(),
  yearsWorkedInCurrentCompany: Joi.string().allow('').max(5).optional(),
  monthsWorkedInCurrentCompany: Joi.string().allow('').max(5).optional(),

// add more fields here
});

exports.updatePatientProfilePaymentAddCardDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  cardType: Joi.string().required(),
  cardBrand: Joi.string().required(),
  cardLevel: Joi.string().required(),
  stripeKey: Joi.string().optional(),
  nameOnCard: Joi.string().required(),
  cardNumber: Joi.string().creditCard().required(),
  expiryDateMonYrs: Joi.string().max(6).required(),
  cvvNumber: Joi.string().max(5).required(),
  billingAddress: Joi.string().required()
});

exports.paymentGovtIdDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  govtIdPic: Joi.string().required()
});

exports.updatePatientProfilePaymentAddBankDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  suffix: Joi.string().required(),
  nameOfAccount: Joi.string().required(),
  routingNumber: Joi.string().required(),
  accountNumber: Joi.string().required(),
  accountType: Joi.string().max(15).required()
});

exports.patientProfilePOEMScreen1DataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  isOutOfPocketMaxInNetWorkBenefits: Joi.boolean().required(),
  individualDedPktMaxInNetBenefits: Joi.number().required(),
  individualOutOfPktMaxInNetBenefits: Joi.number().required(),
  familyDedPktMaxInNetBenefits: Joi.number().required(),
  familyOutOfPktMax: Joi.number().required(),
  isOutOfNetWorkbenefits: Joi.boolean().required(),
  individualDedoutOfNetBenefits: Joi.number().required(),
  individualOutOfPktMaxOfNetBenefits: Joi.number().required(),
  familyDedoutOfNetBenefits: Joi.number().required(),
  familyOutOfPocketMax: Joi.number().required()
});

exports.updatePatientProfilePOEMScreen2DataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  prePayReq: Joi.number().required(),
  bufferFromAbpcorp259: Joi.number().required(),
  guaranteedPaymentsToProviders: Joi.number().required(),
  ppiTotalAmount: Joi.number().required()
});

exports.updatePatientProfilePOEMScreen3DataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  isPrePayInstallments: Joi.boolean().required(),
  prePay1stPayment: Joi.number().required(),
  prePayInstallments: Joi.number().required(),
  isPpiDecliened: Joi.boolean().required(),
  isPpiInstallments: Joi.boolean().required(),
  ppi1stPayment: Joi.number().required(),
  ppiInstallments: Joi.number().required(),
});

exports.processPaymentDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required()
});

exports.getPatientStatementDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  statementYear: Joi.number().integer().min(1990).max(parseInt(moment().format("YYYY"))).required(),
  statementMonth: Joi.number().integer().min(1).max(12).required()
});

exports.getMonthClaimsDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  statementYear: Joi.number().integer().min(1990).max(parseInt(moment().format("YYYY"))).required(),
  statementMonth: Joi.number().integer().min(1).max(12).required(),
  pageNo: Joi.number().integer().min(1).required(),
});

exports.memberSearchDataSet = Joi.object().keys({
  memberId: Joi.string().required()
// add more fields here
});

exports.signinDataSet = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

exports.retrieveUsernameDataSet = Joi.object().keys({
  memberId: Joi.string().required(),
  name: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  ssn: Joi.string().required()
});

exports.retrieveUsernameSquestionDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  answers1: Joi.string().required(),
  answers2: Joi.string().required(),
  answers3: Joi.string().required()
});

exports.retrieveUsernameSecretQuestionDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  secretAnswer: Joi.string().required()
});

exports.forgotPasswordIdentifyDataSet = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  ssn: Joi.string().required()
});

exports.forgotPasswordSquestionDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  answers1: Joi.string().required(),
  answers2: Joi.string().required(),
  answers3: Joi.string().required()
});

exports.forgotPasswordDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  password1: Joi.string().required(),
  password2: Joi.string().required()
});

exports.changeUsernameSquestionDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  answers1: Joi.string().required(),
  answers2: Joi.string().required(),
  answers3: Joi.string().required()
});


exports.changeUsernameDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  username: Joi.string().required()
});

exports.secretQuestionDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  secretQuestion: Joi.string().required()
});

exports.secretAnswerDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  secretAnswer: Joi.string().required()
});





exports.searchHistoryDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  providers: Joi.array().items(Joi.number().integer().required()),
});
