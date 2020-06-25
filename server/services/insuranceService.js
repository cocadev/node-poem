const models = require('../models');

const checkCardSupport = async payload => {
  try {
    const cardInfo = {
      namencard: payload.namencard,
      memberid: payload.memberid,
      planissuer: payload.planissuer,
      planeffectivedate: payload.planeffectivedate,
      planaddress: payload.planaddress,
      patientsupportno: payload.patientsupportno,
      providersupportno: payload.providersupportno
    };
    return {
      status: 200,
      message: 'Card Supported'
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  checkCardSupport
};
