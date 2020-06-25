/* eslint-disable func-names */
const { validator } = require('../middleware/validator');
// const providerConstants = require('../constants/patientConstants');
const providerService = require('../services/providerService');
const providerEntityService = require('../services/providerEntityService');
const billingEntityService = require('../services/billingEntityService');
const patientService = require('../services/patientService');
// const claimService = require('../services/claimService');


exports.signup = async (req, res) => {
  const result = await providerService.addRecord(req.body);
  res.send(result);
};

exports.updateProfile = async (req, res) => {
  const result = await providerService.updateRecord(req.body);
  res.send(result);
};

exports.addProviderEntity = async (req, res) => {
  const result = await providerEntityService.addRecord(req.body);
  res.send(result);
};

exports.getProviderEntities = async (req, res) => {
  const result = await providerEntityService.getRecord(req.params);
  res.send(result);
};

exports.addBillingEntity = async (req, res) => {
  const result = await billingEntityService.addRecord(req.body);
  res.send(result);
};

exports.getBillingEntities = async (req, res) => {  
  res.send([
    {
      id:1,
      entityNpi: "ABCD1234",
      entityName: "Billing entity 1"
    },
    {
      id:2,
      entityNpi: "ABCD12345",
      entityName: "Billing entity 2"
    },
    {
      id:3,
      entityNpi: "ABCD12346",
      entityName: "Billing entity 3"
    },
    {
      id:4,
      entityNpi: "ABCD1237",
      entityName: "Billing entity 4"
    },
    {
      id:5,
      entityNpi: "ABCD1238",
      entityName: "Billing entity 1"
    }
  ])
};

// exports.createProviderPrimaryContact = async (req, res) => {
//   const result = await providerService.createProviderPrimaryContact(req.body);
//   res.send(result);
// };

exports.getProviderStatement = async (req, res) => {
  const result = await providerService.getProviderStatement(req.body);
  res.send(result);
};

exports.addProviderAddBankAccount = async (req, res) => {
  const result = await providerService.addProviderAddBankAccount(req.body);
  res.send(result);
};


exports.updateRequestPatientIDCard = async (req, res) => {
  const result = await patientService.updateRequestPatientIDCard(req.body);
  res.send(result);
};

exports.patientIDCardNotMatch = async (req, res) => {
  const result = await patientService.patientIDCardNotMatch(req.body);
  res.send(result);
};


exports.getProviderById = async (req, res) => {
  const result = await patientService.getProviderById(req.params);
  res.send(result);
};

/*
exports.createPatientClaim = async (req, res) => {
  const result = await patientService.createPatientClaim(req.body);
  res.send(result);
};

exports.provideTermAndCondition = async (req, res) => {
  const result = await providerService.provideTermAndCondition(req.body);
  res.send(result);
};

exports.addProviderAddPaymentDetails = async (req, res) => {
  const result = await providerService.addProviderAddPaymentDetails(req.body);
  res.send(result);
};
exports.addFinalClaim = async (req, res) => {
  console.log("Provider - controllers - addFinalClaim - payload is")
  console.dir(req.body);
  const result = await claimService.addFinalClaim(req.body);
  res.send(result);
};
*/
