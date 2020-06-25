const jwt = require('jsonwebtoken');
const models = require('../models');
const patientService = require('./patientService');
// const patientAddressService = require('./patientAddressService');
const providerBankAccountService = require('./providerBankAccountService');
// const patientCreditCardService = require('./patientCreditCardService');
const providerPaymentDetailService = require('./providerPaymentDetailService');

const addRecord = payload => {
  return new Promise((resolve, reject) => {
    patientService
      .signup(payload)
      .then(patientResult => {
        if (patientResult.status == 'OK') {
          // if User & Patient reocrds added successfully
          patientService
            .getRecord({ id: payload.id })
            .then(patient => {
              models.Provider.create({
                PatientId: patient.content.id,
                UserId: patient.content.UserId,
                email: patient.content.email,
                fullName: patient.content.name
              })
                .then(provider => {
                  resolve({
                    status: 201,
                    message: 'Provider has been registered',
                    id: provider.id,
                    PatientId: provider.PatientId
                  });
                })
                .catch(error => {
                  reject({ status: 400, message: 'Kindly try again', content: error });
                });
            })
            .catch(error => {
              reject({ status: 400, message: 'Kindly try again', content: error });
            });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getRecord = payload => {
  return new Promise((resolve, reject) => {
    models.Provider.find({ where: { id: payload.id } })
      .then(record => {
        // Check if record exists in db
        if (record) {
          resolve({ status: 201, message: 'Provider is found', content: record });
        } else {
          resolve({ status: 200, message: 'Provider is not found', content: record });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const updateRecord = payload => {
  return new Promise((resolve, reject) => {
    models.Provider.update(
      payload, // what going to be updated
      { where: { id: payload.id } } // where clause
    )
      .then(() => {
        return models.Provider.findById(payload.id);
      })
      .then(record => {
        esearchService.setProvider(record.dataValues);
        return record;
      })
      .then(record => {
        resolve({ status: 201, message: 'Provider profile has been updated', content: record });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getProviderStatement = async payload => {
  let providerFind;

  try {
    providerFind = await models.Provider.find({ where: { id: payload.providerid } });
  } catch (err) {
    throw err;
  }

  if (providerFind != null) {
    try {
      // Get Data From Transction DB
      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const addProviderAddBankAccount = async payload => {
  let providerFind;
  let providerBankAccount;

  try {
    providerFind = await models.Provider.find({ where: { id: payload.ProviderId } });
  } catch (err) {
    throw err;
  }
  if (providerFind != null) {
    try {
      providerBankAccount = await providerBankAccountService.createProviderBankAccount(payload);
      // Error Handling for linked function
      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Provider Not Found' };
  }
};

const provideTermAndCondition = async payload => {
  try {
    return {
      status: 'OK',
      message: 'Data fetched successfully',
      Data: 'terms and condition data'
    };
  } catch (err) {
    throw err;
  }
};

const addProviderAddPaymentDetails = async payload => {
  let providerFind;
  let providerPaymentDetail;

  try {
    providerFind = await models.Provider.find({ where: { id: payload.providerId } });
  } catch (err) {
    throw err;
  }

  if (providerFind != null) {
    try {
      providerPaymentDetail = await providerPaymentDetailService.addRecord(payload);
      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Provider Not Found' };
  }
};

const getProviderById = async payload => {
  let providerFind;

  try {
    providerFind = await models.Provider.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }

  if (providerFind != null) {
    try {
      // Get Data From Transction DB
      return {
        status: 200,
        message: 'Data updated successfully',
        data: providerFind
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Provider Not Found' };
  }
};


module.exports = {
  addRecord,
  getRecord,
  updateRecord,
  getProviderStatement,
  addProviderAddBankAccount,
  provideTermAndCondition,
  addProviderAddPaymentDetails,
  getProviderById
};
