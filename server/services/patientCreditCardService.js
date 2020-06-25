const models = require('../models');

const createPatientCreditCard = async payload => {
  let patientCreditCard;

  try {
    patientCreditCard = await models.PatientCreditCard.create({
      PatientId: payload.PatientId,
      cardType: payload.cardType,
      nameOnCard: payload.nameOnCard,
      cardNumber: payload.cardNumber,
      expiryDateMonYrs: payload.expiryDateMonYrs,
      cvvNumber: payload.cvvNumber,
      billingAddress: payload.billingAddress
    });

    return {
      status: 200,
      message: 'Data updated successfully'
    };
  } catch (err) {
    throw err;
  }
};

const getPatientCreditCardByID = async payload => {
  let patientCreditCard;

  try {
    patientCreditCard = await models.PatientCreditCard.find({ where: { id: payload.PatientId } });
    if (patientCreditCard != null) {
      //
      return {
        status: 200,
        message: 'Credit  Card Found',
        data: patientCreditCard
      };
    } 
      return {
        status: 200,
        message: 'Credit  Card Not Found'
      };
    
  } catch (err) {
    throw err;
  }
};
module.exports = { createPatientCreditCard, getPatientCreditCardByID };
