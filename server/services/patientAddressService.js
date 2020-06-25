const models = require('../models');

const createPatientAddress = async payload => {
  let patientAddress;

  try {
    patientAddress = await models.PatientAddressDetails.create({
      PatientId: payload.PatientId,
      address: payload.address,
      year: payload.year,
      month: payload.month,
      homeStatus: payload.homeStatus
    });

    return {
      status: 200,
      message: 'Data updated successfully'
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { createPatientAddress };
