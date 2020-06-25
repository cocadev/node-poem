const models = require('../models');
// const patientCreditCardService = require('./providerEntityService');
const jwt = require('jsonwebtoken');

const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.User.create({
      username: payload.username,
    	password: payload.password
    })
      .then(returnObject => {
        resolve({ status: 201, message: 'User has been added', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};


const getRecord = payload => {
  return new Promise((resolve, reject) => {
    models.User.find({ where: { id: payload.id } })
      .then(record => {
        // Check if record exists in db
        if (patient) {
          resolve({ status: 201, message: 'User is found', content: record });
        } else {
          resolve({ status: 200, message: 'User is not found', content: record });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};


const updateRecord = payload => {
  return new Promise((resolve, reject) => {
    models.User.update(
        payload, //what going to be updated
        { where: { id: payload.id }} // where clause
    )
    .then(record => {
      resolve({ status: 201, message: 'User is found', content: record });
    })
    .catch(error => {
      reject({ status: 400, message: 'Kindly try again', content: error });
    });

  });
};

module.exports = {
  addRecord, getRecord, updateRecord
};
