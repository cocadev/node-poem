/* eslint-disable func-names */
//const { validator } = require('../middleware/validator');

//const insuranceService = require('../services/insuranceService');

exports.fileUpload = async (req, res) => {
  // const result = await insuranceService.checkCardSupport(req.body);
  res.send({ status: 'OK', message: 'Data submitted successfully', fileUrl: "here is some file url" });
};
