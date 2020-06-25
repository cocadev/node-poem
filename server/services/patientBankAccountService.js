const models = require('../models');

const createPatientBankAccount = async payload => {
  let patientBankAccount;

  try {
    patientBankAccount = await models.PatientBankAccount.create({
      PatientId: payload.PatientId,
      suffix: payload.suffix,
      nameOfAccount: payload.nameOfAccount,
      routingNumber: payload.routingNumber,
      accountNumber: payload.accountNumber,
      accountType: payload.accountType
    });

    return {
      status: 200,
      message: 'Data updated successfully'
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { createPatientBankAccount };
