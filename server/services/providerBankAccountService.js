const models = require('../models');

const createProviderBankAccount = async payload => {
  let providerBankAccount;

  try {
    providerBankAccount = await models.ProviderBankAccount.create({
      ProviderId: payload.ProviderId,
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

module.exports = { createProviderBankAccount };
