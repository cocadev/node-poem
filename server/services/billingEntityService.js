const jwt = require('jsonwebtoken');
const models = require('../models');
// const patientCreditCardService = require('./providerEntityService');

const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.BillingEntity.create({
      ProviderId: payload.ProviderId,
      entityNpi: payload.entityNpi,
      entityName: payload.entityName
    })
      .then(returnObject => {
        resolve({ status: 201, message: 'Provider entity has been added', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getRecord = payload => {
  return new Promise((resolve, reject) => {
    models.BillingEntity.find({ where: { id: payload.id } })
      .then(record => {
        // Check if record exists in db
        if (record) {
          resolve({ status: 201, message: 'Provider entity is found', content: record });
        } else {
          resolve({ status: 200, message: 'Provider entity is not found', content: record });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getRecords = payload => {
  return new Promise((resolve, reject) => {
    models.BillingEntity.find({ where: { ProviderId: payload.ProviderId } })
      .then(records => {
        // Check if record exists in db
        if (records) {
          resolve({ status: 201, message: 'Provider entity is found', content: record });
        } else {
          resolve({ status: 200, message: 'Provider entity is not found', content: record });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const updateRecord = payload => {
  return new Promise((resolve, reject) => {
    models.BillingEntity.update(
      payload, // what going to be updated
      { where: { id: payload.id } } // where clause
    )
      .then(record => {
        resolve({ status: 201, message: 'Patient is found', content: record });
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
