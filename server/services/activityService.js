const models = require('../models');
const installmentService = require('./installmentService.js');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const signup = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 2, // for ActivityTypeId for Signup Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: 'Signup',
      coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: 0, ppi: 0,
      fees: payload.fees, deductible: 0, outOfPocketMax: 0, total: payload.fees, installments: 1,
      isCompleted: true
    })
      .then(returnObject => {
        installmentService.signup({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: payload.fees, dueDate: moment().format('YYYY-MM-DD HH:ss')
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });

};

const ppi = payload => {
  return new Promise((resolve, reject) => {
    let _ppiInstallments = 1;
    let _1stInstallment = payload.ppiTotalAmount;
    if(payload.isPpiPaymentSplit){
      _ppiInstallments = payload.ppiInstallments > 1 ? payload.ppiInstallments : 1;
      _1stInstallment = payload.ppi1stPayment;
    }

    console.log(" ---> Activities - ppi -- payload.ppiTotalAmount: "+ payload.ppiTotalAmount);
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 3, // for ActivityTypeId for PPI Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: 'PPI',
      coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: 0, ppi: payload.ppiTotalAmount,
      fees: 0, deductible: 0, outOfPocketMax: 0, total: payload.ppiTotalAmount, installments: _ppiInstallments
    })
      .then(returnObject => {
        installmentService.ppi({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: _1stInstallment
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
}

const prePay = payload => {
  return new Promise((resolve, reject) => {
    let _prePayInstallments = 1;
    let _1stInstallment = payload.prePayReq;
    if(payload.isPrePayPaymentSplit){
      _prePayInstallments = payload.prePayInstallments > 1 ? payload.prePayInstallments : 1;
      _1stInstallment = payload.prePay1stPayment;
    }

    console.log(" ---> Activities - prePay -- payload.prePayReq: "+ payload.prePayReq);
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 4, // for ActivityTypeId for Prepay Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: 'Prepay',
      coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: payload.prePayReq, ppi: 0,
      fees: 0, deductible: 0, outOfPocketMax: 0, total: payload.prePayReq, installments: _prePayInstallments
    })
      .then(returnObject => {
        // models.ActivityInstallment.create({
        //   ActivityId: returnObject.id, PatientId: payload.PatientId,
        //   installmentNumber: 1, amount: _1stInstallment, installmentDate: : moment().format('YYYY-MM-DD HH:ss'),
        //   dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
        // })

        installmentService.prePay({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: _1stInstallment
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
};

const estimatedClaim = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 5, // for ActivityTypeId for Estimated Claim Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: payload.service,
      coPay: payload.coPay, coInsurance: payload.coInsurance, selfPay: payload.selfPay, charity: payload.charity, buffer: payload.buffer,
      prepay: payload.prepay, ppi: payload.ppi, fees: payload.fees, deductible: payload.deductible, outOfPocketMax: payload.outOfPocketMax,
      total: payload.total, installments: payload.installments
    })
      .then(returnObject => {
        var installmentAmolunt = parseFloat(payload.total) / parseFloat(payload.installments);
        // models.ActivityInstallment.create({
        //   ActivityId: returnObject.id, PatientId: payload.PatientId,
        //   installmentNumber: 1, amount: installmentAmolunt.toFixed(2), installmentDate: : moment().format('YYYY-MM-DD HH:ss'),
        //   dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
        // })
console.log("Trying to create installments for estimatedClaim")
        installmentService.estimatedClaim({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: installmentAmolunt.toFixed(2)
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          console.dir(error)
          reject({ status: "ERROR", content: error });
        });

        // resolve({ status: 'OK', content: returnObject });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
};


const finalClaim = payload => {
  return new Promise((resolve, reject) => {
    models.Activity.create({
      PatientId: payload.PatientId, ActivityTypeId: 6, // for ActivityTypeId for Final Claim Activity
      activityDate: moment().format('YYYY-MM-DD HH:ss'), service: payload.service,
      coPay: payload.coPay, coInsurance: payload.coInsurance, selfPay: payload.selfPay, charity: payload.charity, buffer: payload.buffer,
      prepay: payload.prepay, ppi: payload.ppi, fees: payload.fees, deductible: payload.deductible, outOfPocketMax: payload.outOfPocketMax,
      total: payload.total, installments: payload.installments
    })
      .then(returnObject => {
        var installmentAmolunt = parseFloat(payload.total) / parseFloat(payload.installments);
        // models.ActivityInstallment.create({
        //   ActivityId: returnObject.id, PatientId: payload.PatientId,
        //   installmentNumber: 1, amount: installmentAmolunt.toFixed(2), installmentDate: : moment().format('YYYY-MM-DD HH:ss'),
        //   dueDate: moment().add(10, 'days').format('YYYY-MM-DD HH:ss'), isPaid: false
        // })
        installmentService.finalClaim({
          ActivityId: returnObject.id, PatientId: payload.PatientId, amount: installmentAmolunt.toFixed(2)
        })
        .then(activityInstallment => {
          resolve({ status: 'OK', content: returnObject });
        })
        .catch(error => {
          reject({ status: "ERROR", content: error });
        });
      })
      .catch(error => {
        reject({ status: "ERROR", content: error });
      });
  });
};





////////////////////////////////////////////////////////////////////
/*
SELECT "AT"."id", "AT"."title", SUM("AI"."amount")
FROM
	"ActivityInstallments" AS "AI", "Activities" AS "A", "ActivityTypes" AS "AT"
WHERE
	"AI". "isActive" = true AND
	"AI"."isPaid" =  false AND
	"AI"."ActivityId" = "A"."id" AND
	"A"."ActivityTypeId" = "AT"."id"
GROUP BY "AT"."id", "AT"."title"
*/
const getPatientActiveRecords = PatientId => {
  return new Promise((resolve, reject) => {
    models.ActivityInstallment.findAll({ where: { PatientId: PatientId, isActive: true, isPaid: false }})
      .then(records => {
        resolve(records);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  signup, ppi, prePay, estimatedClaim, finalClaim, getPatientActiveRecords
};
