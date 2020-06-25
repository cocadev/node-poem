const Joi = require('joi');


exports.getEstimatedClaimsDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().optional(),
  // claimType: Joi.string().required()
});

exports.getFinalClaimsDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().optional(),
  // claimType: Joi.string().required()
});

exports.getClaimsDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  claimType: Joi.string().required()
});

exports.addEstimatedDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  ProviderId: Joi.number().integer().required(),
  billingEntityNpi: Joi.string().required(),
  BillingEntityId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  dateOfServiceFrom: Joi.string().required(),
  dateOfServiceTo: Joi.string().required(),
  isOutOfNetwork: Joi.boolean().required()
});

exports.updateEstimatedDataSet = Joi.object().keys({
  ClaimId: Joi.number().integer().required(),
  billingEntityNpi: Joi.string().required(),
  BillingEntityId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  dateOfServiceFrom: Joi.string().required(),
  dateOfServiceTo: Joi.string().required(),
  isOutOfNetwork: Joi.boolean().required(),
  notes:Joi.string(),
});

exports.addFinalDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  ProviderId: Joi.number().integer().required(),
  billingEntityNpi: Joi.string().required(),
  BillingEntityId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  dateOfServiceFrom: Joi.string().required(),
  dateOfServiceTo: Joi.string().required(),
  isOutOfNetwork: Joi.boolean().required(),
  notes:Joi.string()
});

exports.updateFinalDataSet = Joi.object().keys({
  ClaimId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  isOutOfNetwork: Joi.boolean().required(),
  notes:Joi.string(),
  billingEntityNpi: Joi.string().required(),
  BillingEntityId: Joi.number().integer().required(),
  outOfNetwork: Joi.number(),
  notCovered: Joi.number(),
  noPriorAuthorization: Joi.number(),
  denied: Joi.number(),
  charity: Joi.number(),
  writeOff: Joi.number(),
  rebate: Joi.number(),
  coupon: Joi.number(),
  other: Joi.number()
});



exports.deleteEstimatedDataSet = Joi.object().keys({
  ClaimId: Joi.number().integer().required(),
});








exports.signupDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  suffix: Joi.string(),
  dob: Joi.string(),
  inviteCode: Joi.string(),
  referralCode: Joi.string(),
  isHiddenFromSearch: Joi.boolean().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  gender: Joi.string().required(),

// add more fields here
});

exports.verifyEmailDataSet = Joi.object().keys({
  id: Joi.number().integer().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }),
  emailCode: Joi.string().required()
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

exports.estimatedClaimDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  ProviderId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  dateOfService: Joi.string().required(),
  billingEntityNpis: Joi.string().required()
// add more fields here
});



exports.memberSearchDataSet = Joi.object().keys({
  memberId: Joi.string().required()
// add more fields here
});

exports.signinDataSet = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});
