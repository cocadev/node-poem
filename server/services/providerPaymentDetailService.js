const jwt = require('jsonwebtoken');
const models = require('../models');
// const patientCreditCardService = require('./providerEntityService');

const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.ProviderPaymentDetail.create({
      ProviderId: payload.ProviderId,
      nameOnAccount: payload.nameOnAccount,
      entityName: payload.entityName,
      bankRoutingNumber: payload.bankRoutingNumber,
      accountType: payload.entityName,
      billingAddress: payload.entityName,
      npiNumber: payload.entityName,
      providerType: payload.entityName,
      entityType: payload.entityName,
      firstName: payload.entityName,
      middleName: payload.entityName,
      nameOnCard: payload.entityName,
      cardNumber: payload.entityName,
      cvvNumber: payload.entityName,
      expiryDateMonYrs: payload.entityName
    })
      .then(returnObject => {
        resolve({ status: 201, message: 'Payment Detail has been added', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getRecord = payload => {
  return new Promise((resolve, reject) => {
    models.ProviderPaymentDetail.find({ where: { id: payload.id } })
      .then(record => {
        // Check if record exists in db
        if (record) {
          resolve({ status: 201, message: 'Payment Detail is found', content: record });
        } else {
          resolve({ status: 200, message: 'Payment Detail is not found', content: record });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getRecords = payload => {
  return new Promise((resolve, reject) => {
    models.ProviderPaymentDetail.find({ where: { ProviderId: payload.ProviderId } })
      .then(records => {
        // Check if record exists in db
        if (records) {
          resolve({ status: 201, message: 'Payment Detail is found', content: record });
        } else {
          resolve({ status: 200, message: 'Payment Detail is not found', content: record });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const updateRecord = payload => {
  return new Promise((resolve, reject) => {
    models.ProviderPaymentDetail.update(
      payload, // what going to be updated
      { where: { id: payload.id } } // where clause
    )
      .then(record => {
        resolve({ status: 201, message: 'Payment Detail is found', content: record });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

module.exports = {
  addRecord,
  getRecord,
  updateRecord
};
