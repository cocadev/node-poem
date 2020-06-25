const express = require('express');

const { validateBody } = require('../middleware/validator');
const {
  sendOTPDataSet,
  verifyOTPDataSet,
  emailAvailableDataSet,
  usernameAvailableDataSet,
  signupDataSet,
  retrieveUsernameDataSet,
  retrieveUsernameSquestionDataSet,
  retrieveUsernameSecretQuestionDataSet,
  forgotPasswordIdentifyDataSet,
  forgotPasswordSquestionDataSet,
  forgotPasswordDataSet,
  changeUsernameSquestionDataSet,
  changeUsernameDataSet,
  verifyEmailDataSet,
  saveBiometricDataSet,
  updatePatientProfileBasicInfoDataSet,
  paymentGovtIdDataSet,
  updatePatientProfilePaymentAddCardDataSet,
  updatePatientProfilePaymentAddBankDataSet,
  patientProfilePOEMScreen1DataSet,
  updatePatientProfilePOEMScreen2DataSet,
  updatePatientProfilePOEMScreen3DataSet,
  
  processPaymentDataSet,
  getPatientStatementDataSet,
  getMonthClaimsDataSet,

  secretQuestionDataSet,
  secretAnswerDataSet,


  searchHistoryDataSet,

  listClaimsDataSet,
  approveClaimDataSet,
  memberSearchDataSet,
  signinDataSet,
  tcAcceptanceDataSet

} = require('../validators/patient');
const safeAsync = require('../middleware/asyncController');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

const {
  sendMobileOTP,
  verifyMobileOTP,
  usernameAvailable,
  emailAvailable,
  verifyEmail,
  signup,
  tcAcceptance,
  saveBiometric,
  memberSearch,
  signin,
  getSigninQuestions,
  changePassword,
  updatePatientProfileBasicInfo,
  updatePatientProfileInsuranceInfo,
  updatePatientProfilePaymentAddBank,
  updatePatientProfilePaymentAddCard,
  updatePatientProfilePOEMScreen1,
  updatePatientProfilePOEMScreen2,
  updatePatientProfilePOEMScreen3,
  getDuePaymentForPatient,
  getPatientStatement,
  processPaymentForPatient,
  getMonthClaims,
  updateRequestPatientIDCard,
  patientIDCardNotMatch,
  getPatientClaims,
  createPatientClaim,
  editPatientClaim,
  deletePatientClaim,
  listClaims,
  approveClaim,
  getApproveClaimDetail,
  testEmailSend,
  testSMSSend,
  getPatientSavingSummary,
  getPatientTimeDeductibleSummary,
  getPatientTimeOOPSummary,
  createScheduleJob,
  saveClaimNotes,
  estimatePPIAndPrePay,
  paymentGovtId
} = require('../controllers/Patient.js');

const {
  createCustomerOnStripe,
  getCustomerFromStripe,
  chargeCustomerOnStripe,
  createCardTokenOnStripe,
  createBankTokenOnStripe,
  createCheckOutSessionOnStripe,
  createCustomerInvoiceOnStripe
} = require('../controllers/Payment.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// method = POST
// endpoint = patient/get-otp
// the final otp third party sms service is yet to be decide
// router.post('/send-otp', middleware.jwtAuth, validateBody(sendOTPDataSet), safeAsync(sendMobileOTP));
router.post('/send-otp', validateBody(sendOTPDataSet), safeAsync(sendMobileOTP));

// method = PUT
// endpoint = patient/verify-otp
router.put('/verify-otp', validateBody(verifyOTPDataSet), safeAsync(verifyMobileOTP));

// method = POST
// endpoint =  patient/username-available
router.post(
  '/username-available',
  validateBody(usernameAvailableDataSet),
  safeAsync(usernameAvailable)
);

// method = POST
// endpoint =  patient/email-available
router.post('/email-available', validateBody(emailAvailableDataSet), safeAsync(emailAvailable));

// method = POST
// endpoint =  patient/email/verification
router.post('/email/verification', validateBody(verifyEmailDataSet), safeAsync(verifyEmail));

// method = POST
// endpoint =  patient/email/verification validateBody(signupDataSet),
router.post('/signup', validateBody(signupDataSet), safeAsync(signup));

// method = PUT
// endpoint = patient/tc-acceptance
router.put('/tc-acceptance', validateBody(tcAcceptanceDataSet), safeAsync(tcAcceptance));

// method = POST
// endpoint =  patient/change-password
router.post('/change-password', safeAsync(changePassword));

// method = PUT
// endpoint = patient/email/verification
router.put('/email/verification', validateBody(verifyEmailDataSet), safeAsync(verifyEmail));

// method = POST
// endpoint = patient/search
router.post('/search', validateBody(memberSearchDataSet), safeAsync(memberSearch));

//////////////////////
// Group B - Sign in 1
// method = POST
// endpoint = patient/signin
router.post('/signin', validateBody(signinDataSet), safeAsync(signin));

//////////////////////
// Group B - Sign in 2
// method = GET
// endpoint = patient/signin/security-questions
router.get('/signin/security-questions/:PatientId', safeAsync(getSigninQuestions));


// method = POST
// endpoint = patient/security-questions
// Returning Dummy data for /paitent/security-questions POST call
// Will be replaced with actual code during development task
router.post('/security-questions', (req, res) => {
  res.send({
    status: 'OK',
    message: 'security questions submitted successfully'
  });
});

// method = PUT
// endpoint = patient/save-biometric
router.put('/save-biometric', validateBody(saveBiometricDataSet), safeAsync(saveBiometric));

// method = PUT
// endpoint = patient/profile/basic
router.put('/profile/basic', validateBody(updatePatientProfileBasicInfoDataSet), safeAsync(updatePatientProfileBasicInfo));

// method = PUT
// endpoint = patient/profile/insurance
//router.put('/profile/insurance', safeAsync(updatePatientProfileInsuranceInfo));
router.post('/insurance', (req, res) => {
  res.send({ status: 200, message: 'Data updated successfully' });
});

// method = POST
// endpoint = patient/profile/payment-add-bank
router.post('/profile/payment-add-bank', validateBody(updatePatientProfilePaymentAddBankDataSet), safeAsync(updatePatientProfilePaymentAddBank));

// method = POST
// endpoint = patient/profile/payment-add-card
router.post('/profile/payment-add-card', validateBody(updatePatientProfilePaymentAddCardDataSet), safeAsync(updatePatientProfilePaymentAddCard));

// method = POST
// endpoint =  patient/profile/payment-govt-id
router.post('/profile/payment-govt-id', validateBody(paymentGovtIdDataSet), safeAsync(paymentGovtId));

// method = POST
// endpoint = patient/profile/poem-screen1
router.post('/profile/poem-screen1', validateBody(patientProfilePOEMScreen1DataSet), safeAsync(updatePatientProfilePOEMScreen1));

// method = POST
// endpoint = patient/profile/poem-screen2
router.post('/profile/poem-screen2', validateBody(updatePatientProfilePOEMScreen2DataSet), safeAsync(updatePatientProfilePOEMScreen2));

// method = PUT
// endpoint = patient/profile/poem-screen3
router.put('/profile/poem-screen3', validateBody(updatePatientProfilePOEMScreen3DataSet), safeAsync(updatePatientProfilePOEMScreen3));
// method = GET
// endpoint = patient/payment-due/:PatientId
router.get('/payment-due/:PatientId', safeAsync(getDuePaymentForPatient));
// method = POST
// endpoint = patient/payment-process
router.post('/payment-process', validateBody(processPaymentDataSet), safeAsync(processPaymentForPatient));



// method = PUT
// endpoint =  patient/id-card-update
router.put('/id-card-update', safeAsync(updateRequestPatientIDCard));

// method = PUT
// endpoint =  patient/id-card-not-match
router.put('/id-card-not-match', safeAsync(patientIDCardNotMatch));

// method = GET
// endpoint =  patient/claims
router.get('/claims', safeAsync(getPatientClaims));

// method = POST
// endpoint =  patient/claim-notes
router.post('/claim-notes', safeAsync(saveClaimNotes));
// router.post('/claim-notes', validateBody(estimatedClaimDataSet), safeAsync(createPatientClaim));

// method = POST
// endpoint =  patient/claims
// router.post('/claim', validateBody(estimatedClaimDataSet), safeAsync(createPatientClaim));

// method = PUT
// endpoint =  patient/claim
router.put('/claim', safeAsync(editPatientClaim));

// method = DELETE
// endpoint =  patient/claim
router.delete('/claim/:id', safeAsync(deletePatientClaim));



// method = POST
// endpoint =  patient/testSendEmail
router.post('/testSendEmail', safeAsync(testEmailSend));

// method = POST
// endpoint =  patient/testSMSEmail
router.post('/testSMSEmail', safeAsync(testSMSSend));

// method = POST
// endpoint =  patient/payment/customer/create
router.post('/payment/customer/create', safeAsync(createCustomerOnStripe));

// method = POST
// endpoint =  patient/payment/customer/get
router.post('/payment/customer/get', safeAsync(getCustomerFromStripe));

// method = POST
// endpoint =  patient/payment/customer/charge
router.post('/payment/customer/charge', safeAsync(chargeCustomerOnStripe));

// method = POST
// endpoint =  patient/payment/customer/card-token
router.post('/payment/customer/card-token', safeAsync(createCardTokenOnStripe));

// method = POST
// endpoint =  patient/payment/customer/bank-token
router.post('/payment/customer/bank-token', safeAsync(createBankTokenOnStripe));

// method = POST
// endpoint =  patient/payment/customer/checkout-session
router.post('/payment/customer/checkout-session', safeAsync(createCheckOutSessionOnStripe));

// method = POST
// endpoint =  patient/payment/customer/customer-invoice
router.post('/payment/customer/customer-invoice', safeAsync(createCustomerInvoiceOnStripe));



// method = GET
// endpoint =  patient/test-cron-job
router.get('/test-cron-job', safeAsync(createScheduleJob));

// method = GET
// endpoint =  patient/estimate-prepay-ppi/:id
router.get('/estimate-prepay-ppi/:id', safeAsync(estimatePPIAndPrePay));



// method = GET
// endpoint = patient/fetch-security-questions
// Returning Dummy data for /paitent/fetch-security-questions // Will be replaced with actual code during development task
router.get('/security-questions', (req, res) => {
  res.send({
    status: 'OK',
    message: 'security questions submitted successfully',
    data: [
      { question_id: 1, question: 'favorite pet name?' },
      { question_id: 2, question: 'favorite food name?' },
      { question_id: 3, question: 'favorite city name?' }
    ]
  });
});

// method = PUT
// endpoint = patient/signin/security-questions
// Returning Dummy data for /paitent/signin/security-questions // Will be replaced with actual code during development task
router.put('/security-questions', (req, res) => {
  res.send({
    status: 'OK',
    message: "data updated successfully"
  });
});

//////////////////////////////////////
// Group A - Set up security questions
// method = PUT
// endpoint = patient/secret-question
// Returning Dummy data for /paitent/signin/security-questions // Will be replaced with actual code during development task
router.put('/secret-question', validateBody(secretQuestionDataSet), (req, res) => {
  res.send({
    status: 'OK',
    message: "data updated successfully"
  });
});
// method = PUT
// endpoint = patient/secret-answer
// Returning Dummy data for /paitent/signin/security-questions // Will be replaced with actual code during development task
router.put('/secret-answer', validateBody(secretAnswerDataSet), (req, res) => {
  res.send({
    status: 'OK',
    message: "data updated successfully"
  });
});


///////////////////////////////////
// Group A - Retrieve username 2
// method = POST
// endpoint = patient/retrieve-username/identify
// Will be replaced with actual code during development task
router.post('/retrieve-username/identify', validateBody(retrieveUsernameDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "user identified successfully",
    PatientId: 1
    // "questions": [{ question_id: 1, question: 'favorite pet name?', answer: "Answer 1" },
    // { question_id: 2, question: 'favorite food name?', answer: "Answer 1" },
    // { question_id: 3, question: 'favorite city name?', answer: "Answer 1" }]
  });
});

// Method = GET
// endpoint = patient/fetch-security-questions:PatientId
// Returning Dummy data for /paitent/fetch-security-questions // Will be replaced with actual code during development task
router.get('/fetch-security-questions/:PatientId', (req, res) => {
  res.send({
    status: 'OK',
    message: "Data fetched successfully",
    data: [
      { question_id: 1, question: 'favorite pet name?' },
      { question_id: 2, question: 'favorite food name?' },
      { question_id: 3, question: 'favorite city name?' }
    ]
  });
});

// method = POST
// endpoint =  patient/retrieve-username/security-questions
// Will be replaced with actual code during development task
router.post('/retrieve-username/security-questions', validateBody(retrieveUsernameSquestionDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "Data fetched successfully",
    secretQuestion: "Some secret Question"
  });
});


// method = POST
// endpoint =  patient/retrieve-username/secret-question
// Will be replaced with actual code during development task
router.post('/retrieve-username/secret-question', validateBody(retrieveUsernameSecretQuestionDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "user identified successfully",
    username: "testuser1"
  });
});

//////////////////////////////
// Group A - Forgot password 2
// method = POST
// endpoint =   patient/forgot-password/identify
// Will be replaced with actual code during development task
router.post('/forgot-password/identify', validateBody(forgotPasswordIdentifyDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "user identified successfully",
    PatientId: 1
  });
});

// method = POST
// endpoint =  patient/forgot-password/security-questions
// Will be replaced with actual code during development task
router.post('/forgot-password/security-question', validateBody(forgotPasswordSquestionDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "user identified successfully",
    PatientId: 1
  });
});


// method = POST
// endpoint =  patient/forgot-password
// Will be replaced with actual code during development task
router.post('/forgot-password', validateBody(forgotPasswordDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "password updated successfully"
  });
});

//////////////////////////////
// Group A - Change Username
// method = POST
// endpoint =  patient/change-username/security-questions
// Will be replaced with actual code during development task
router.post('/change-username/security-questions', validateBody(changeUsernameSquestionDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "user identified successfully",
    PatientId: 1
  });
});
// method = POST
// endpoint = patient/change-username
// Will be replaced with actual code during development task
router.post('/change-username', validateBody(changeUsernameDataSet), (req, res) => {
  res.send({
    status: "OK",
    message: "data updated successfully"
  });
});


// method = POST
// endpoint =    patient/forgot-password/security-question
// Will be replaced with actual code during development task
// router.post('/forgot-password/security-question', (req, res) => {
//   res.send({
//     "status": "OK",
//     "message": "user identified successfully",
//     "userId": 1
//   });
// });

////////////////////////////
// Group A - Member ID
// method = GET
// endpoint =     patient/memberid-barcode/:PatientId
// Will be replaced with actual code during development task
router.get('/memberid-barcode/:PatientId', (req, res) => {

  res.send({
    status: "OK",
    message: "Data fetched successfully",
    data: {
      "memberId": 1234567891234567,
      "barcode": "data:image/png;base64,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"
    }
  });
});



// method = POST
// endpoint = patient/retrive-username/secret-question
// Will be replaced with actual code during development task
// router.post('/retrive-username/secret-question', (req, res) => {
//   res.send({
//     status: "OK",
//     message: "user identified successfully",
//     username: "John.doe"
//   });
// });


// method = POST
// endpoint = patient/payment/checkout
// Will be replaced with actual code during development task
router.post('/payment/checkout', (req, res) => {
  res.send({
    status: "OK",
    message: "your payment is succesfull",
    data: "Data from stripe"
  });
});



///////////////////////////
// Group C - History Search
// method = GET
// endpoint = patient/history-search?patientId=1
// Will be replaced with actual code during development task
router.get('/history-search/:PatientId', (req, res) => {
  res.send({
    "status": "OK",
    "message": "Patient History Found",
    "data": [
      {id:1, searchTime: "2019-08-15 14:45", ProviderId: 112, providerName: "ProviderName", providerAddress:"Locaiton of provider"},
      {id:2, searchTime: "2019-08-16 14:45", ProviderId: 112, providerName: "ProviderName", providerAddress:"Locaiton of provider"},
      {id:3, searchTime: "2019-08-17 14:45", ProviderId: 112, providerName: "ProviderName", providerAddress:"Locaiton of provider"},
    ]
  });
});

router.put('/history-search', validateBody(searchHistoryDataSet), (req, res) => {
  res.send({status: 'OK', message: 'Data submitted successfully'});
});


//////////////////////////////
// Group C - Main Screen POEM
// method = GET
// endpoint =  patient/saving-summary/:id
router.get('/saving-summary/:id', safeAsync(getPatientSavingSummary));

// method = GET
// endpoint =  patient/time-deductible/:id
router.get('/time-deductible/:id', safeAsync(getPatientTimeDeductibleSummary));

// method = GET
// endpoint =  patient/time-oop/:id
router.get('/time-oop/:id', safeAsync(getPatientTimeOOPSummary));

////////////////////////////////
// Group C - Monthly statment 1
// method = POST
// endpoint = patient/statement
router.post('/statement', validateBody(getPatientStatementDataSet), safeAsync(getPatientStatement));

//////////////////////////////////
// Group C - Monthly statment 1.1
// method = POST
// endpoint = patient/month-claims
router.post('/month-claims', validateBody(getMonthClaimsDataSet), safeAsync(getMonthClaims));

//////////////////////////////////
// Group C - Approve Claims 1
// method = GET
// endpoint =  patient/list-claims/:PatientId
router.get('/list-claims/:PatientId',  safeAsync(listClaims));
//router.get('/list-claims', validateBody(listClaimsDataSet), safeAsync(listClaims));
//////////////////////////////////
// Group C - Approve Claims 1
// method = GET
// endpoint =  patient/claim/:id
router.get('/approve-claim/:id', safeAsync(getApproveClaimDetail));

// method = POST
// endpoint = patient/approve-claim
router.post('/approve-claim', validateBody(approveClaimDataSet), safeAsync(approveClaim));
module.exports = router;



/*
//////////////////////////////////
// Provider Screens - Main Screen
// method = GET
// endpoint =  patient/search/:searchString
router.get('/search/:searchString', safeAsync(searchPatient));
// method = GET
// endpoint =  patient/insurance/list/:PatientId
router.get('/insurance/list/:PatientId', safeAsync(searchPatientInsurance));
// method = POST
// endpoint =  patient/insurance
router.post('/insurance', safeAsync(addPatientInsurance));
// method = PUT
// endpoint =  patient/insurance
router.put('/insurance', safeAsync(updatePatientInsurance));
// method = DELETE
// endpoint =  patient/insurance/:InsuranceId
router.delete('/insurance/:InsuranceId', safeAsync(deletePatientInsurance));
// method = PUT
// endpoint =  patient/profile
router.put('/profile', safeAsync(updateProfile));
*/
