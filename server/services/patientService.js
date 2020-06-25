const jwt = require('jsonwebtoken');
const moment = require('moment');
// const passport = require('passport');

const _ = require('lodash');
const models = require('../models');
const activityService = require('./activityService');
const userService = require('./userService');
const patientAddressService = require('./patientAddressService');
const patientBankAccountService = require('./patientBankAccountService');
const patientCreditCardService = require('./patientCreditCardService');
const esearchService = require('./esearchService');

const sendMobileOTP = payload => {
  return new Promise((resolve, reject) => {
    models.Patient.findOne({ where: { mobileNumber: payload.mobile } })
      .then(__patient => {
        if (__patient) {
          if (!__patient.otpVerified) {
            const otp = Math.ceil(Math.random(1, 9) * 10000);

            models.Patient.update(
              {
                otp: otp,
                otpTTL: moment()
                  .add(2, 'minutes')
                  .format('YYYY-MM-DD HH:ss')
              },
              { where: { id: __patient.id } } // where clause
            )
              .then(patient => {
                // ///////////////////////////////////////
                // 3rd party code to send SMS with otp //
                // ///////////////////////////////////////

                resolve({
                  status: 'OK',
                  otp,
                  PatientId: patient.id,
                  message: 'OTP has been sent successfully'
                });
              })
              .catch(error => {
                reject({ status: 'Error', message: error });
              });
          } else {
            resolve({
              status: 'OK',
              OTP,
              PatientId: patient.id,
              message: 'mobile already registered'
            });
          }
        } else {
          // If mobile number is not already registered
          const OTP = Math.ceil(Math.random(1, 9) * 10000);
          addRecord({ username: '', password: '', mobileNumber: payload.mobile, otp: OTP })
            .then(patientResult => {
              resolve({
                status: 'OK',
                OTP,
                PatientId: patientResult.content.id,
                message: 'OTP has been sent successfully'
              });
            })
            .catch(error => {
              reject({ status: 400, message: 'Kindly try again', content: error });
            });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const verifyMobileOTP = payload => {
  return new Promise((resolve, reject) => {
    models.Patient.findOne({ where: { id: payload.id } })
      .then(record => {
        // Check if record exists in db

        if (record) {
          console.log(`--> record.otp: ${record.otp}`);
          console.log(`--> payload.otp: ${payload.otp}`);
          // Compare otp and otpTTL value with current time
          // if (parseInt(record.otp) == parseInt(payload.otp) && record.otpTTL <= moment().format('YYYY-MM-DD HH:ss')) {
          if (parseInt(record.otp) == parseInt(payload.otp)) {
            // Update values in db
            models.Patient.update(
              { otpVerified: true },
              { where: { id: payload.id } } // where clause
            )
              .then(record => {
                resolve({
                  status: 'OK',
                  message: 'OTP has been verified successfully',
                  id: payload.id
                });
              })
              .catch(error => {
                reject({ status: 'Error', message: error });
              });
          } else if (record.otpTTL <= moment().format('YYYY-MM-DD HH:ss')) {
            // if TTL is expired
            resolve({ status: 'Error', message: 'OTP expired' });
          } else {
            // if provide OTP is invalid
            resolve({ status: 'Error', message: 'Invalid OTP provided' });
          }
        } else {
          resolve({ status: 'Error', message: 'Invalid id provided' });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const usernameAvailable = payload => {
  return new Promise((resolve, reject) => {
    models.User.find({ where: { username: payload.username } })
      .then(user => {
        // Check if record exists in db
        if (user) {
          resolve({ status: 201, message: 'username is already taken' });
        } else {
          resolve({ status: 200, message: 'username is available' });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const emailAvailable = payload => {
  return new Promise((resolve, reject) => {
    models.Patient.find({ where: { email: payload.email } })
      .then(patient => {
        // Check if record exists in db
        if (patient) {
          resolve({ status: 201, message: 'email is already taken' });
        } else {
          resolve({ status: 200, message: 'email is available' });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const verifyEmail = payload => {
  return new Promise((resolve, reject) => {
    getRecord({ id: payload.id })
      .then(record => {
        // Check if record exists in db
        if (record.content) {
          // Compare otp and otpTTL value with current time
          // if ( parseInt(record.emailCode) == parseInt(payload.emailCode) && record.emailCodeTTL <= moment().format('YYYY-MM-DD HH:ss') ) {
          if (parseInt(record.content.emailCode) == parseInt(payload.emailCode)) {
            // Update values in db
            models.Patient.update(
              { isEmailVerified: true },
              { where: { id: payload.id } } // where clause
            )
              .then(record => {
                resolve({ status: 'OK', message: 'Email has been verified successfully' });
              })
              .catch(error => {
                reject({ status: 'Error', message: error });
              });
          } else if (record.content.emailCodeTTL <= moment().format('YYYY-MM-DD HH:ss'))
            // if TTL is expired
            resolve({ status: 'Error', message: 'Email code expired' });
          // if provide OTP is invalid
          else resolve({ status: 'Error', message: 'Invalid email code provided' });
        } else {
          resolve({ status: 'Error', message: 'Invalid id provided' });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const changePassword = payload => {
  if (!payload || !payload.username || !payload.oldPassword || !payload.newPassword) {
    return res.status(400).json({
      code: 'E_BAD_REQUEST',
      data: null,
      message: 'The request could not be fulfilled due to bad request.Please provide valid params.'
    });
  }

  return new Promise((resolve, reject) => {
    models.User.findOne({ id: payload.username })
      .then(record => {
        // Check if record exists in db
        if (record) {
          if (record.password == payload.oldPassword) {
            // Update values in db
            models.User.update(
              { password: newPassword },
              { where: { username: payload.username } } // where clause
            )
              .then(record => {
                resolve({ status: 'OK', message: 'password has been changed successfully' });
              })
              .catch(error => {
                reject({ status: 'Error', message: error });
              });
          }
        } else {
          resolve({ status: 'Error', message: 'Invalid username provided' });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const signup = payload => {
  return new Promise((resolve, reject) => {
    const emailCode = Math.ceil(Math.random(1, 9) * 10000);
    getRecord({ id: payload.id })
      .then(patient => {
        userService
          .updateRecord({
            username: payload.username,
            password: payload.password,
            id: patient.content.UserId
          })
          .then(record => {
            updateRecord({
              name: payload.name,
              suffix: payload.suffix,
              email: payload.email,
              dateOfBirth: payload.dateOfBirth,
              gender: payload.gender,
              inviteCode: payload.inviteCode,
              referralCode: payload.referralCode,
              isHiddenFromSearch: payload.isHiddenFromSearch,
              emailCode,
              emailCodeTTL: moment()
                .add(2, 'minutes')
                .format('YYYY-MM-DD HH:ss'),
              id: patient.content.id
            })
              .then(record => {
                // ///////////////////////////////////////////////////////
                // 3rd party code to send Email with verification code //
                // ///////////////////////////////////////////////////////

                resolve({ status: 'OK', message: 'Data submitted successfully', id: record.id });
              })
              .catch(error => {
                reject({ status: 'Error', message: error });
              });
          })
          .catch(error => {
            reject({ status: 'Error', message: error });
          });
      })
      .catch(error => {
        reject({ status: 'Error', message: error });
      });
  });
};

const saveBiometric = payload => {
  return new Promise((resolve, reject) => {
    getRecord({ id: payload.id })
      .then(patient => {
        updateRecord({
          bioMetric: payload.bioMetric,
          id: patient.content.id
        })
          .then(record => {
            resolve({ status: 'OK', message: 'Data submitted successfully', id: payload.id });
          })
          .catch(error => {
            reject({ status: 'Error', message: error });
          });
      })
      .catch(error => {
        reject({ status: 'Error', message: error });
      });
  });
};

const addRecord = payload => {
  return new Promise((resolve, reject) => {
    console.log('0011 --- ');
    userService
      .addRecord({ username: payload.username, password: payload.password })
      .then(user => {
        console.log('0012 --- ');
        models.Patient.create({
          UserId: user.content.id,
          mobileNumber: payload.mobileNumber,
          otp: payload.otp,
          otpTTL: moment()
            .add(2, 'minutes')
            .format('YYYY-MM-DD HH:ss')
        })
          .then(returnObject => {
            console.log('0013 --- ');
            resolve({
              status: 201,
              message: 'Provider entity has been added',
              content: returnObject
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
};

const updateRecord = payload => {
  return new Promise((resolve, reject) => {
    console.log("--> tyeing to update Patient reocrd");
    models.Patient.update(
      payload, // what going to be updated
      { where: { id: payload.id } } // where clause
    )
      .then(() => {
        // Fetch complete updated record from db
        console.log("--> getting fresh Patient Record for ID: "+ payload.id);
        return models.Patient.findById(payload.id);
      })
      .then(record => {
        // Update elastic search for updated patient record
        console.log("--> updating Patient Record for elastic search");
        esearchService.setPatient(record.dataValues);
        return record;
      })
      .then(record => {
        console.log("--> Patient updated successfully sending success response.");
        resolve({ status: 201, message: 'Patient updated successfully', content: record });
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const getRecord = payload => {
  return new Promise((resolve, reject) => {
    models.Patient.findOne({ where: { id: payload.id } })
      .then(record => {
        // Check if record exists in db
        if (record) {
          resolve({ status: 201, message: 'Patient record found', content: record });
        } else {
          resolve({ status: 200, message: 'Patient record not found' });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const memberSearch = payload => {
  return new Promise((resolve, reject) => {
    models.Patient.findOne({ where: { memberId: payload.memberId } })
      .then(record => {
        // Check if record exists in db
        if (record) {
          resolve({ status: 201, message: 'Patient record found', content: record });
        } else {
          resolve({ status: 200, message: 'Patient record not found' });
        }
      })
      .catch(error => {
        reject({ status: 400, message: 'Kindly try again', content: error });
      });
  });
};

const signin = payload => {
  // if (!payload || !payload.username || !payload.password) {
  //   return {
  //     code: 'E_BAD_REQUEST',
  //     data: null,
  //     message: 'The request could not be fulfilled due to bad request.Please provide valid params.'
  //   };
  // }

  return new Promise((resolve, reject) => {
    models.User.find({ where: { username: payload.username } })
      .then(user => {
        // Check if record exists in db
        if (user) {
          if (user.password === payload.password) { 
            models.Patient.find({ where: { UserId: user.id } })
            .then( patient => {
              const token = jwt.sign({uid: user.id, pid: patient.id, username: user.username }, 'POEM_TOKEN_SECRET', {
                expiresIn: 60 * 60 * 24 // expires in 24 hours
              });
              
              resolve({ status: 200, message: 'Patient logged in successfully', p: patient.id, token });
            })
            .catch(error => {
              reject(error);
            });            
          } else {
            resolve ({ status: 201, message: 'User or password is wrong.' });
          }
        } else {
          resolve({ status: 201, message: 'Patient not found' });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updatePatientProfileBasicInfo = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    try {
      await patientFind.update({
        maritalStatus: payload.maritalStatus,
        ssnNumber: payload.ssnNumber,
        occupation: payload.occupation,
        designation: payload.designation,
        employersName: payload.employersName,
        employerAddress: payload.employerAddress,
        employeeNumber: payload.employeeNumber,
        annualIncome: payload.annualIncome,
        yearsWorkedInCurrentCompany: payload.yearsWorkedInCurrentCompany,
        monthsWorkedInCurrentCompan: payload.monthsWorkedInCurrentCompany
      });

      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
  // let patientAddress;
  // if (payload.address == null) {
  //   try {
  //     patientAddress = await patientAddressService.createPatientAddress(payload.address);
  //   } catch (err) {
  //     throw err;
  //   }
  // } else {
  //   return {
  //     status: 200,
  //     message: 'Data updated successfully'
  //   };
  // }
};

const updatePatientProfileInsuranceInfo = async payload => {
  let patientFind;

  return {
    status: 200,
    message: 'Data updated successfully'
  };

  /*
  try {
    patientFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }

  if (patientFind != null) {
    try {
      await patientFind.update({
        planName: payload.planName,
        groupPlanId: payload.groupPlanId,
        nameOnCard: payload.nameOnCard,
        memberId: payload.memberId,
        planIssuer: payload.planIssuer,
        fromPlanEffectiveDate: payload.fromPlanEffectiveDate,
        // toPlanEffectiveDate: payload.toPlanEffectiveDate,
        planAddress: payload.planAddress,
        patientCustServiceContNumber: payload.patientCustServiceContNumber,
        providerCustServiceContNumber: payload.providerCustServiceContNumber,
        financiallyresponsibleparty: payload.financiallyresponsibleparty,
        financialResponsibleName: payload.financialResponsibleName,
        financialResponsibleRelationShip: payload.financialResponsibleRelationShip,
        financialResponsiblePartyAddress: payload.financialResponsiblePartyAddress,
        insuranceCardPicFront: payload.insuranceCardPicFront,
        insuranceCarPicBack: payload.insuranceCarPicBack
      });
      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      return { status: 400, message: 'Patient Not Found', content: err };
    }
  } else {
    return { status: 400, message: 'Kindly try again' };
  }
  */
};

const updatePatientProfilePaymentAddBank = async payload => {
  let patientFind;
  let patientBank;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    try {
      patientBank = await patientBankAccountService.createPatientBankAccount(payload);
      // Error Handling for linked function
      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const updatePatientProfilePaymentAddCard = async payload => {
  let patientFind;
  let patientCard;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  } catch (err) {
    throw err;
  }

  if (patientFind != null) {
    try {
      patientCard = await patientCreditCardService.createPatientCreditCard(payload);
      // Error Handling for linked function
      return {
        status: 200,
        message: 'Data updated successfully'
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const updatePatientProfilePOEMScreen1 = async payload => {
  return updateRecord({
    isOutOfPocketMaxInNetWorkBenefits: payload.isOutOfPocketMaxInNetWorkBenefits,
    individualDedPktMaxInNetBenefits: payload.individualDedPktMaxInNetBenefits,
    individualOutOfPktMaxInNetBenefits: payload.individualOutOfPktMaxInNetBenefits,
    familyDedPktMaxInNetBenefits: payload.familyDedPktMaxInNetBenefits,
    familyOutOfPktMax: payload.familyOutOfPktMax,
    isOutOfNetWorkbenefits: payload.isOutOfNetWorkbenefits,
    individualDedOutOfNetBenefits: payload.individualDedOutOfNetBenefits,
    individualOutOfPktMaxOfNetBenefits: payload.individualOutOfPktMaxOfNetBenefits,
    familyDedOutOfNetBenefits: payload.familyDedOutOfNetBenefits,
    familyOutOfPocketMax: payload.familyOutOfPocketMax,
    id: payload.PatientId
  })
    .then(record => {
      return { status: 'OK', message: 'Data submitted successfully', id: record.id };
    })
    .catch(error => {
      return { status: 'Error', message: error };
    });
};

const updatePatientProfilePOEMScreen2 = async payload => {
  return updateRecord({
    prePayReq: payload.prePayReq,
    bufferFromAbpcorp259: payload.bufferFromAbpcorp259,
    guaranteedPaymentsToProviders: payload.guaranteedPaymentsToProviders,
    declinePPI: payload.declinePPI,
    ppiTotalAmount: payload.ppiTotalAmount,
    id: payload.PatientId
  })
    .then(record => {
      return { status: 'OK', message: 'Data submitted successfully', id: record.id };
    })
    .catch(error => {
      return { status: 'Error', message: error };
    });
};

const updatePatientProfilePOEMScreen3 = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // try {
      return estimatePPIAndPrePay({id:payload.PatientId}).then(ppiPrePay => {
        let _prePay = parseFloat(ppiPrePay.content.prePay);
        let _ppi = parseFloat(ppiPrePay.content.ppi);
        if(payload.isPrePayInstallments)
          ppiPrePay.content.prePayInstallment; // Installment amount
          //_prePay += (_prePay * 0.10); // Installment amount

        if(payload.isPpiPaymentSplit)
          _ppi += ppiPrePay.content.ppiInstallment; // Installment amount
          //_ppi += (_ppi * 0.10); // Installment amount

        var _input =  {
          prePayReq: _prePay.toFixed(2),
          ppiTotalAmount: _ppi.toFixed(2),
          isPrePayPaymentSplit: payload.isPrePayInstallments,
          prePay1stPayment: payload.prePay1stPayment,
          prePayInstallments: payload.prePayInstallments,
          isPpiDecliened: payload.isPpiDecliened,
          isPpiPaymentSplit: payload.isPpiInstallments,
          ppi1stPayment: payload.ppi1stPayment,
          ppiInstallments: payload.ppiInstallments
        }

        return patientFind.update(_input).then(result =>{
          _input.PatientId = payload.PatientId;
          return activityService.prePay(_input).then(returnObject => {
            return activityService.ppi(_input).then(returnObject => {
              return { status: "OK", message: "Data updated successfully"};
            });
          });
        })
        .catch(err =>
          handleError(err)
        )
      });
    // } catch (err) {
    //   throw err;
    // }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const getPatientStatement = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    try {
      // Here call stored procedure GET_MONTHLY_STATEMENT and send the data as response
      // statementYear: payload.statementYear,
      // statementMonth: payload.statementMonth
      return {
        status: 200,
        message: 'Data fetched successfully',
        data: [
          {
            key: 'value'
          }
        ]
      };
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const processPaymentForPatient = async payload => {
  let patientFind;
  let patientCardFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    try {
      patientCardFind = await patientCreditCardService.getPatientCreditCardByID(payload);
    } catch (err) {
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }

  if (patientCardFind != null) {
    // 3rd Party will be used to make payment And after that
    // we will call transaction Function
    return {
      status: 200,
      message: 'payment made successfully'
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const getPatientMonthlyClaims = async payload => {
  let patientFind;
  let patientCardFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // try {
    //   patientCardFind = await patientCreditCardService.getPatientCreditCardByID(payload);
    // } catch (err) {
    //   throw err;
    // }
    return {
      status: 200,
      message: 'Data Found',
      content: { data: [] }
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const updateRequestPatientIDCard = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    await patientFind.update({
      isRequestIdUpdate: true
    });
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const patientIDCardNotMatch = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    await patientFind.update({
      isIdNotMatch: true
    });
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const getPatientClaims = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // Fetch the list of all approved claims from PATIENT_CLAIMS_TABLE based on
    // provided patientId in payload.
    return {
      status: 200,
      message: 'Data Found',
      content: { data: [] }
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const createPatientClaim = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // Add  claims from PATIENT_CLAIMS_TABLE based on
    // provided patientId in payload.
    // {
    //   patientId: payload.patientId,
    //   providerId: payload.providerId,
    //   coPayAmount: payload.coPayAmount,
    //   deductibleAmount: payload.deductibleAmount,
    //   coInsuranceAmount: payload.coInsuranceAmount,
    //   selfPayAmount: payload.selfPayAmount,
    //   totalAmount: payload.totalAmount
    // }
    return {
      status: 200,
      message: 'Claim Added Successfully'
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const editPatientClaim = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // Edit  claims from PATIENT_CLAIMS_TABLE based on
    // provided patientId in payload.
    // {
    //    id: id,//claimID
    //   patientId: payload.patientId,
    //   providerId: payload.providerId,
    //   coPayAmount: payload.coPayAmount,
    //   deductibleAmount: payload.deductibleAmount,
    //   coInsuranceAmount: payload.coInsuranceAmount,
    //   selfPayAmount: payload.selfPayAmount,
    //   totalAmount: payload.totalAmount
    // }
    return {
      status: 200,
      message: 'Claim Edited Successfully'
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const deletePatientClaim = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // Delete  claims from PATIENT_CLAIMS_TABLE based on
    // provided patientId in payload.
    // {
    //   claimId: payload.claimId
    //   patientId: payload.patientId,
    //   providerId: payload.providerId
    // }
    return {
      status: 200,
      message: 'Claim Deleted Successfully'
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const getPatientClaimsList = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.patientId } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    // Fetch the list of all unapproved claims from PATIENT_CLAIMS_TABLE based on
    // provided patientId in payload.
    return {
      status: 200,
      message: 'Data Found',
      content: { data: [] }
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const getPatientClaimDetail = async payload => {
  let claimFind;

  try {
    claimFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }
  if (claimFind != null) {
    // Fetch tclaims from PATIENT_CLAIMS_TABLE based on
    // provided patientId in payload.
    return {
      status: 200,
      message: 'Data Found',
      content: { data: [] }
    };
  }
  return { status: 400, message: 'Claim Not Found' };
};

const getPatientSavingSummary = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    return {
      status: 200,
      message: 'Data Found',
      content: { data: { paidWithoutPoem: 65000, paidWithPoem: 50000, overPaid: 15000 } }
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const getPatientTimeDeductibleSummary = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    const graph = [
      {
        line1: [
          { month: 'Jan', value: 20 },
          { month: 'Feb', value: 25 },
          { month: 'Mar', value: 30 },
          { month: 'Apr', value: 35 }
        ],
        line2: [
          { month: 'Jan', value: 10 },
          { month: 'Feb', value: 18 },
          { month: 'Mar', value: 24 },
          { month: 'Apr', value: 32 }
        ],
        line3: [
          { month: 'Jan', value: 25 },
          { month: 'Feb', value: 27 },
          { month: 'Mar', value: 30 },
          { month: 'Apr', value: 33 }
        ]
      }
    ];

    return {
      status: 200,
      message: 'Data Found',
      content: { data: graph }
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const getPatientTimeOOPSummary = async payload => {
  let patientFind;

  try {
    patientFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
    const graph = [
      {
        line1: [
          { month: 'Jan', value: 20 },
          { month: 'Feb', value: 25 },
          { month: 'Mar', value: 30 },
          { month: 'Apr', value: 35 }
        ],
        line2: [
          { month: 'Jan', value: 10 },
          { month: 'Feb', value: 18 },
          { month: 'Mar', value: 24 },
          { month: 'Apr', value: 32 }
        ],
        line3: [
          { month: 'Jan', value: 25 },
          { month: 'Feb', value: 27 },
          { month: 'Mar', value: 30 },
          { month: 'Apr', value: 33 }
        ]
      }
    ];

    return {
      status: 200,
      message: 'Data Found',
      content: { data: graph }
    };
  }
  return { status: 400, message: 'Patient Not Found' };
};

const estimatePPIAndPrePay = async payload => {
  let patientFind;
console.log("--> estimatePPIAndPrePay() called")
  try {
    patientFind = await models.Patient.find({ where: { id: payload.id } });
  } catch (err) {
    throw err;
  }
  if (patientFind != null) {
console.log("---> Got Patient record");
    try {
console.log("---> Got Patient record 001");
      const tempDedPK = [];
      // if (patientFind.isInsurancePayOutOfNetWorkCare) {
      tempDedPK.push(patientFind.individualDedPktMaxInNetBenefits);
      tempDedPK.push(patientFind.individualOutOfPktMaxInNetBenefits);
      tempDedPK.push(patientFind.familyDedPktMaxInNetBenefits);
      tempDedPK.push(patientFind.familyOutOfPktMax);

      let finalDedutible = _.max(tempDedPK);
      var prePay = 0.25 * finalDedutible;
      var prePayInstallment = (0.10 * prePay) + prePay;
      var ppi = 0.04 * prePay;
      var ppiInstallment = (0.15 * ppi) + ppi;
      var buffer = 0.5 * finalDedutible;
      return {
        status: 200,
        message: 'Data Found',
        content: { prePay: prePay.toFixed(2), prePayInstallment: prePayInstallment.toFixed(2), ppiInstallment: ppiInstallment.toFixed(2), ppi: ppi.toFixed(2), buffer: buffer }
      };
      // }
      // return {
      //   status: 200,
      //   message: 'Data Found',
      //   content: { prePay: 1500, ppi: 0, buffer: 750 }
      // };
    } catch (err) {
      console.dir(err);
      throw err;
    }
  } else {
    return { status: 400, message: 'Patient Not Found' };
  }
};

const paymentGovtId = async payload => {
  //let patientFind;

  // try {
console.log("--> checking paritnet record for PatientId: "+ payload.PatientId);

     var patientFind = await models.Patient.find({ where: { id: payload.PatientId } });
  // } catch (err) {
  //   throw err;
  // }

console.log("--> checking record for null "+ patientFind);
  if (patientFind != null) {
    return updateRecord({
      govtIdPic: payload.govtIdPic,
      id: payload.PatientId
    })
      .then(record => {
        return { status: 'OK', message: 'Data submitted successfully', id: record.id };
      })
      .catch(error => {
        return { status: 'Error', message: error };
      });
  }
  else {
      return { status: 400, message: 'Patient Not Found' };
  }

};

module.exports = {
  addRecord,
  updateRecord,
  getRecord,
  sendMobileOTP,
  verifyMobileOTP,
  usernameAvailable,
  emailAvailable,
  verifyEmail,
  signup,
  saveBiometric,
  signin,
  changePassword,
  updatePatientProfileBasicInfo,
  updatePatientProfileInsuranceInfo,
  updatePatientProfilePaymentAddBank,
  updatePatientProfilePaymentAddCard,
  updatePatientProfilePOEMScreen1,
  updatePatientProfilePOEMScreen2,
  updatePatientProfilePOEMScreen3,
  getPatientStatement,
  processPaymentForPatient,
  getPatientMonthlyClaims,
  updateRequestPatientIDCard,
  patientIDCardNotMatch,
  getPatientClaims,
  createPatientClaim,
  editPatientClaim,
  deletePatientClaim,
  getPatientClaimsList,
  getPatientClaimDetail,
  getPatientSavingSummary,
  getPatientTimeDeductibleSummary,
  getPatientTimeOOPSummary,
  estimatePPIAndPrePay,
  paymentGovtId
};
