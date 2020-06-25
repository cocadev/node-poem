const Joi = require('joi');

//
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
  gender: Joi.string().required()
});

exports.profileDataSet = Joi.object().keys({

});

exports.providerEntityDataSet = Joi.object().keys({

});

exports.getProviderEntityDataSet = Joi.object().keys({

});

exports.billingEntityDataSet = Joi.object().keys({

});

exports.getBillingEntityDataSet = Joi.object().keys({

});

exports.getAddFinalClaimDataSet = Joi.object().keys({
  PatientId: Joi.number().integer().required(),
  ProviderId: Joi.number().integer().required(),
  coPay: Joi.number().required(),
  deductible: Joi.number().required(),
  coInsurance: Joi.number().required(),
  selfPay: Joi.number().required(),
  total: Joi.number().required(),
  dateOfService: Joi.string().required(),
  billingEntityNpis: Joi.string().required()
});
