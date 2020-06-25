const models = require('../models');
// const patientCreditCardService = require('./providerEntityService');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const signup = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, amountDue: payload.amount,
      installmentDate: moment().format('YYYY-MM-DD HH:ss'), dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const ppi = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, amountDue: payload.amount,
      installmentDate: moment().format('YYYY-MM-DD HH:ss'), dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const prePay = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, amountDue: payload.amount,
      installmentDate: moment().format('YYYY-MM-DD HH:ss'), dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const estimatedClaim = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, amountDue: payload.amount,
      installmentDate: moment().format('YYYY-MM-DD HH:ss'), dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};


const finalClaim = payload => {
  return new Promise((resolve, reject) => {
    addRecord({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, amountDue: payload.amount,
      installmentDate: moment().format('YYYY-MM-DD HH:ss'), dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
    })
    .then(activityInstallment => {
      resolve({ status: 'OK', content: activityInstallment.content });
    })
    .catch(error => {
      reject({ status: "ERROR", content: error });
    });
  });
};

const addRecord = payload => {
  return new Promise((resolve, reject) => {
    models.ActivityInstallment.create({
      ActivityId: payload.ActivityId, PatientId: payload.PatientId,
      installmentNumber: 1, amount: payload.amount, amountDue: payload.amountDue,
      installmentDate: moment().format('YYYY-MM-DD HH:ss'), dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: payload.isPaid
    })
      .then(returnObject => {
        resolve({ status: 201, message: 'Record has been added', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const markInActive = payload => {
  return new Promise((resolve, reject) => {
    models.ActivityInstallment.update(
        {isActive: false}, //what going to be updated
        { where: { ActivityId: payload.ActivityId }} // where clause
    )
      .then(returnObject => {
        resolve({ status: 201, message: 'Record has been updated', content: returnObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};


const genrateInstallments = async PatientId => {
  try {
    var currentStatments = await models.sequelize.query(`
      SELECT
				"vAD"."ActivityId", "vAD"."ClaimId",
  			MAX("ActivityAmount") AS "ActivityAmount",
  			MAX("ActivityInstallments") AS "ActivityInstallments",
  			COUNT("vAD"."InstallmentNumber") AS "InstallmentsCreated"
      FROM
      	"viewActivityDetails" AS "vAD"
      WHERE
          "vAD"."isActivityActive" = true AND "vAD"."isInstallmentPaid" = false AND "vAD"."PatientId" = (:PatientId)
      GROUP BY
      	"vAD"."ActivityId", "vAD"."ClaimId"
    `, {
      replacements: {PatientId: PatientId},
      type: models.sequelize.QueryTypes.SELECT
    });

    var InstallmnetQueries = currentStatments.map(x => {
      var nextInstallmentNumber = parseInt(x.InstallmentsCreated) + 1;
      var nextInstallmentAmount = x.ActivityAmount / x.ActivityInstallments;

      if(nextInstallmentNumber <= parseInt(x.ActivityInstallments)){
        return { ActivityId: x.ActivityId, PatientId: PatientId,
        installmentNumber: nextInstallmentNumber, amount: nextInstallmentAmount.toFixed(2),
        amountPaid: 0, amountDue: nextInstallmentAmount.toFixed(2), installmentDate: moment().format('YYYY-MM-DD HH:ss'),
        paymentDate: null, dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'),
        isPaid: false, isActive: true };
      }
      else
        return null;
    });

    var _InstallmnetQueries = _.filter(InstallmnetQueries, function(o) { return !_.isNull(o)});
    return models.ActivityInstallment.bulkCreate(_InstallmnetQueries)
      .then(function(response){
          return (response);
      })
      .catch(function(error){
          return (error);
      });

  }
  catch(err) {
    console.dir(err)
  }
}



module.exports = {
  signup, ppi, prePay, estimatedClaim, finalClaim,
  addRecord, markInActive, genrateInstallments
};
