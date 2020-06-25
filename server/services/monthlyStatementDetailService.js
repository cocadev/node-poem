const models = require('../models');
const monthlyStatementDetailService = require('./monthlyStatementDetailService.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const addStatmentDetails = async (PatientId, MonthlyStatementId) => {
  var thisStatment = await models.sequelize.query(`
    SELECT
    	"AT"."id", "AT"."title",
      "vAD"."ActivityTypeId", "vAD"."ActivityId", "vAD"."ActivityInstallmentId", "vAD"."PatientId", "vAD"."ClaimId",
    	"vAD"."ActivityAmount", "vAD"."ActivityPaidAmount", "vAD"."ActivityBalanceAmount", "vAD"."InstallmentAmount"
    FROM
    	"ActivityTypes" AS "AT" LEFT JOIN "viewActivityDetails" AS "vAD"
      ON
        "AT"."id" = "vAD"."ActivityTypeId" AND "vAD"."isActivityActive" = true AND "vAD"."isInstallmentPaid" = false AND "vAD"."PatientId" = (:PatientId)
  `, {
    replacements: {PatientId: PatientId},
    type: models.sequelize.QueryTypes.SELECT
  });
  var StatmentDetails = thisStatment.map(_thisStatment => {
    if(!_.isNull(_thisStatment.ActivityId))
      return {
        PatientId: PatientId, MonthlyStatementId: MonthlyStatementId,
        ActivityId: _thisStatment.ActivityId, ActivityInstallmentId: _thisStatment.ActivityInstallmentId,
        ClaimId: _.isNull(_thisStatment.ClaimId) ? -1 : _thisStatment.ClaimId,
        totalAmount: _.isNull(_thisStatment.ActivityAmount) ? 0 : _thisStatment.ActivityAmount,
        previousPaidAmount: _.isNull(_thisStatment.ActivityPaidAmount) ? 0 : _thisStatment.ActivityPaidAmount,
        installmentAmount: _.isNull(_thisStatment.InstallmentAmount) ? 0 : _thisStatment.InstallmentAmount, paidAmount: 0,
        balanceAmount: _.isNull(_thisStatment.ActivityBalanceAmount) ? 0 : _thisStatment.ActivityBalanceAmount,
      };
    else
      return null;
  });

  var _StatmentDetails = _.filter(StatmentDetails, function(o) { return !_.isNull(o)});

  return models.MonthlyStatementDetail.bulkCreate(_StatmentDetails)
    .then(function(response){
        return (response);
    })
    .catch(function(error){
        return (error);
    });
};



const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.MonthlyStatementDetail.create(payload)
      .then(returnObject => {
        resolve(returnObject);
      })
      .catch(error => {
        reject(error);
      });
  });
};


module.exports = {
  addStatmentDetails
};
