const models = require('../models');
const activityService = require('../services/activityService');
const installmentService = require('../services/installmentService');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const approveClaim = payload => {
  return new Promise((resolve, reject) => {

    models.Claim.update(
        {
          isApprovedByPatient: true,
          approvedByPatientTime: moment().format('YYYY-MM-DD HH:ss')
        },
        { where: { PatientId: payload.PatientId, id: payload.ClaimId }} // where clause
    )
      .then(returnObject => {
        resolve({ status: 201, message: 'Claim approved successfully' });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });

  });
};

const deleteRecord = payload => {
  return new Promise((resolve, reject) => {
    models.Claim.delete();
  });
}

const addEstimatedClaim = payload => {
  return new Promise((resolve, reject) => {
console.log("Creating activity of estiamted claim");
    activityService.estimatedClaim({
      PatientId: payload.PatientId,
      service: 'Estimated Claim',
      coPay: payload.coPay,
      deductible: payload.deductible,
      coInsurance: payload.coInsurance,
      selfPay: payload.selfPay,
      total: payload.total,
      charity: 0,
      buffer: 0,
      prepay: 0,
      ppi: 0,
      fees: 0,
      outOfPocketMax: 0,
      installments: 12
    })
    .then(activityObject => {
console.log("Creating estiamted claim");
      models.Claim.create({
        PatientId: payload.PatientId,
        ProviderId: payload.ProviderId,
        ActivityId: activityObject.content.id,
        claimType: "Estimated",
        coPay: payload.coPay,
        deductible: payload.deductible,
        coInsurance: payload.coInsurance,
        selfPay: payload.selfPay,
        total: payload.total,
        dateOfServiceFrom: payload.dateOfServiceFrom,
        dateOfServiceTo: payload.dateOfServiceTo,
        billingEntityNpi: payload.billingEntityNpi,
        BillingEntityId: payload.BillingEntityId,
        isOutOfNetwork: payload.isOutOfNetwork
      })
      .then(claimObject => {
        resolve({ status: 201, message: 'Claim has been added', content: claimObject });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
    })
    .catch(error => {
      reject({ status: 400, message: 'Kindly try again', content: error });
    });
  });
}

const updateEstimatedClaim = payload => {
  return new Promise((resolve, reject) => {
    var whereClause = { id: payload.ClaimId };
    models.Claim.findOne({ where: whereClause })
      .then(__claim => {
        __claim.coPay= payload.coPay;
        __claim.deductible= payload.deductible;
        __claim.coInsurance= payload.coInsurance;
        __claim.selfPay= payload.selfPay;
        __claim.total= payload.total;
        __claim.dateOfServiceFrom= moment(payload.dateOfServiceFrom, "DD-MM-YYYY").format("YYYY-MM-DD");
        __claim.dateOfServiceTo= moment(payload.dateOfServiceTo, "DD-MM-YYYY").format("YYYY-MM-DD");
        __claim.billingEntityNpi= payload.billingEntityNpi;
        __claim.BillingEntityId= payload.BillingEntityId;
        __claim.isOutOfNetwork= payload.isOutOfNetwork;

        __claim.save()
          .then(savedClaim => {
            resolve({ status: 201, message: 'Claim has been updated', content: savedClaim });
          })
          .catch(error => {
            reject({ status: 400, message: 'Kindly try again', content: error });
          });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
}

const addFinalClaim = payload => {
  return new Promise((resolve, reject) => {
console.log("in addFinalClaim service")

    var whereClause = { claimType: "Estimated", ProviderId: payload.ProviderId, billingEntityNpi: payload.billingEntityNpi };
    models.Claim.findAll({
      where: whereClause,
      attributes: ['id', 'ActivityId']
    })
    .then(estimatedClaims => {
      estimatedClaims.map(_eclaim => {
        console.log("setting installments InActive for estimated Claim id: "+ _eclaim.id + " && ActivityId: "+ _eclaim.ActivityId);
        installmentService.markInActive({ActivityId: _eclaim.ActivityId})
        .catch(error => { console.dir(error) })
      });

console.log("Adding final Claim")
      __addFinalClaim(payload)
      .then(finalClaimResult => {
console.log("Updating Estimated Claims Claims with finalClaim ID: "+ finalClaimResult.content.id)
        models.Claim.update(
            {isActive: false, parentClaimId: finalClaimResult.content.id}, //what going to be updated
            { where: whereClause} // where clause
        )
        .then(results => {
          // console.log("Claims updated")
          resolve(finalClaimResult);

        });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });


    })
    .catch(error => {
      reject({ status: 400, message: 'Kindly try again', content: error });
    });

  });
}


const updateFinalClaim = payload => {
  return new Promise((resolve, reject) => {
    var whereClause = { id: payload.ClaimId };
console.log("claimService - updateFinalClaim")
    models.Claim.findOne({ where: whereClause })
      .then(__claim => {
          __claim.coPay = payload.coPay;
          __claim.deductible = payload.deductible;
          __claim.coInsurance = payload.coInsurance;
          __claim.selfPay = payload.selfPay;
          __claim.total = payload.total;
          __claim.billingEntityNpi = payload.billingEntityNpi;
          __claim.BillingEntityId = payload.BillingEntityId;
          __claim.isOutOfNetwork = payload.isOutOfNetwork;
          __claim.providerGenratedId  = payload.providerGenratedId;
          __claim.insuranceGenratedId  = payload.insuranceGenratedId;
          __claim.outOfNetwork  = payload.outOfNetwork;
          __claim.notCovered  = payload.notCovered;
          __claim.noPriorAuthorization  = payload.noPriorAuthorization;
          __claim.denied  = payload.denied;
          __claim.charity  = payload.charity;
          __claim.writeOff  = payload.writeOff;
          __claim.rebate  = payload.rebate;
          __claim.coupon  = payload.coupon;
          __claim.other  = payload.other;

          __claim.save()
          .then(savedClaim => {
console.log("claimService - updateFinalClaim -- saved");
            models.ClaimHistory.create({
              PatientId: savedClaim.PatientId,
              ProviderId: savedClaim.ProviderId,
              ActivityId: savedClaim.ActivityId,
              ClaimId: savedClaim.id,
              claimType: "Final",
              coPay: savedClaim.coPay,
              deductible: savedClaim.deductible,
              coInsurance: savedClaim.coInsurance,
              selfPay: savedClaim.selfPay,
              total: savedClaim.total,
              dateOfService: savedClaim.dateOfService,
              billingEntityNpi: savedClaim.billingEntityNpi,
              BillingEntityId: savedClaim.BillingEntityId,
              isOutOfNetwork: savedClaim.isOutOfNetwork,
              providerGenratedId: savedClaim.providerGenratedId,
              insuranceGenratedId: savedClaim.insuranceGenratedId,
              dateOfServiceFrom: savedClaim.dateOfServiceFrom,
              dateOfServiceTo: savedClaim.dateOfServiceTo,
              outOfNetwork: savedClaim.outOfNetwork,
              notCovered: savedClaim.notCovered,
              noPriorAuthorization: savedClaim.noPriorAuthorization,
              denied: savedClaim.denied,
              charity: savedClaim.charity,
              writeOff: savedClaim.writeOff,
              rebate: savedClaim.rebate,
              coupon: savedClaim.coupon,
              other: savedClaim.other

            })
            .then(claimHistory => {
console.log("claimService - updateFinalClaim - ClaimHostories")
              resolve({ status: 201, message: 'Claim has been updated', content: savedClaim });
            })
            .catch(error => {
              reject({ status: 400, message: 'Kindly try again', content: error });
            });
          })
          .catch(error => {
            reject({ status: 400, message: 'Kindly try again', content: error });
          });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
}


  const __addFinalClaim = payload => {
    return new Promise((resolve, reject) => {
  console.log("Creating activity of final claim");
      activityService.finalClaim({
        PatientId: payload.PatientId,
        service: 'Final Claim',
        coPay: payload.coPay,
        deductible: payload.deductible,
        coInsurance: payload.coInsurance,
        selfPay: payload.selfPay,
        total: payload.total,
        charity: 0,
        buffer: 0,
        prepay: 0,
        ppi: 0,
        fees: 0,
        outOfPocketMax: 0,
        installments: 12
      })
      .then(activityObject => {
  console.log("Creating FINAL claim");
        models.Claim.create({
          PatientId: payload.PatientId,
          ProviderId: payload.ProviderId,
          ActivityId: activityObject.content.id,
          claimType: "Final",
          coPay: payload.coPay,
          deductible: payload.deductible,
          coInsurance: payload.coInsurance,
          selfPay: payload.selfPay,
          total: payload.total,
          dateOfServiceFrom: moment(payload.dateOfServiceFrom, "DD-MM-YYYY").format("YYYY-MM-DD"),
          dateOfServiceTo: moment(payload.dateOfServiceTo, "DD-MM-YYYY").format("YYYY-MM-DD"),
          billingEntityNpi: payload.billingEntityNpi,
          BillingEntityId: payload.BillingEntityId,
          isOutOfNetwork: payload.isOutOfNetwork
        })
        .then(claimObject => {
          // resolve({ status: 201, message: 'Claim has been added', content: claimObject });
console.log("Creating FINAL claim - ClaimHistory claimObject.id: "+ claimObject.id);
          models.ClaimHistory.create({
            PatientId: payload.PatientId,
            ProviderId: payload.ProviderId,
            ActivityId: activityObject.content.id,
            ClaimId: claimObject.id,
            claimType: "Final",
            coPay: payload.coPay,
            deductible: payload.deductible,
            coInsurance: payload.coInsurance,
            selfPay: payload.selfPay,
            total: payload.total,
            dateOfServiceFrom: moment(payload.dateOfServiceFrom, "DD-MM-YYYY").format("YYYY-MM-DD"),
            dateOfServiceTo: moment(payload.dateOfServiceTo, "DD-MM-YYYY").format("YYYY-MM-DD"),
            billingEntityNpi: payload.billingEntityNpi,
            BillingEntityId: payload.BillingEntityId,
            isOutOfNetwork: payload.isOutOfNetwork
          })
          .then(claimHistory => {
            resolve({ status: 201, message: 'Claim has been added', content: claimObject });
          })
          .catch(error => {
            reject({ status: 400, message: 'Kindly try again', content: error });
          });

        })
        .catch(error => {
          reject({ status: 400, message: 'Kindly try again', content: error });
        });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
    });
  }

module.exports = {
  approveClaim, addEstimatedClaim, addFinalClaim, updateEstimatedClaim, updateFinalClaim
};
