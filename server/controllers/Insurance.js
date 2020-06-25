/* eslint-disable func-names */
const { validator } = require('../middleware/validator');

const insuranceService = require('../services/insuranceService');

exports.checkCardSupport = async (req, res) => {
  const result = await insuranceService.checkCardSupport(req.body);
  res.send(result);
};

exports.searchInsurance = async (req, res) => {
  res.send([
    { id:1, planName:"Some Plan name", groupPlanId: "56565641", planIssuer: "Plan issuer here", csNo: "123456", planAddress: "Some address here", providerCustServiceContNumber: "9612412513", patientCustServiceContNumber: "9612412513" },
    { id:2, planName:"Some Plan name 2", groupPlanId: "56565642", planIssuer: "Plan issuer here2", csNo: "123456A", planAddress: "Some address here", providerCustServiceContNumber: "9612412513", patientCustServiceContNumber: "9612412513" },
    { id:3, planName:"Some Plan name 3", groupPlanId: "56565643", planIssuer: "Plan issuer here3", csNo: "123456B", planAddress: "Some address here", providerCustServiceContNumber: "9612412513", patientCustServiceContNumber: "9612412513" },
  ]);
  //const result = await insuranceService.checkCardSupport(req.body);
  //res.send(result);
}; // 907-144-9611
