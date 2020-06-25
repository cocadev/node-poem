const express = require('express');
const { validateBody } = require('../middleware/validator');
const safeAsync = require('../middleware/asyncController');
const router = express.Router();

const { signupDataSet, profileDataSet, providerEntityDataSet, getProviderEntityDataSet, billingEntityDataSet,
  getBillingEntityDataSet, getAddFinalClaimDataSet
} = require('../validators/provider');

const {
  signup, updateProfile, addProviderEntity, getProviderEntities, getBillingEntities, addBillingEntity,
  getProviderStatement, addProviderAddBankAccount, addProviderAddPaymentDetails, addFinalClaim, provideTermAndCondition, getProviderById
} = require('../controllers/Provider.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
///////////////////////////////
// Provider Screens - signup 7b
// method = POST
// endpoint = provider/signup
router.post('/signup', validateBody(signupDataSet), safeAsync(signup));

// method = PUT
// endpoint = provider/profile-general
// router.put('/profile-general', validateBody(profileDataSet), safeAsync(updateProfile));
router.put('/profile-general', safeAsync(updateProfile));

// method = POST
// endpoint =  provider/provider-entity
// router.post('/provider-entity', validateBody(providerEntityDataSet), safeAsync(addProviderEntity));
router.post('/provider-entity', safeAsync(addProviderEntity));

// method = GET
// endpoint =  provider/provider-entity
// router.get('/provider-entity', validateBody(getProviderEntityDataSet), safeAsync(getProviderEntities));
router.get('/provider-entity/:id', safeAsync(getProviderEntities));

// method = POST
// endpoint =  provider/billing-entity
router.post('/billing-entity', safeAsync(addBillingEntity));

// method = GET
// endpoint =  provider/billing-entity
router.get('/billing-entity', validateBody(getBillingEntityDataSet), safeAsync(getBillingEntities));

// method = POST
// endpoint =  provider/statement
router.post('/statement', safeAsync(getProviderStatement));

// method = POST
// endpoint =  provider/add-bank-account
router.post('/add-bank-account', safeAsync(addProviderAddBankAccount));

// method = POST
// endpoint =  provider/add-payment-details
router.put('/add-payment-details', safeAsync(addProviderAddPaymentDetails));

// method = GET
// endpoint =  provider/terms-condition
router.get('/terms-condition', safeAsync(provideTermAndCondition));


// method = POST
// endpoint =  provider/final-claim
// router.post('/final-claim', validateBody(getAddFinalClaimDataSet), safeAsync(addFinalClaim));
router.post('/final-claim', safeAsync(addFinalClaim));


//provider/:id

// method = GET
// endpoint =  provider/:id
router.get('/:id', safeAsync(getProviderById));


module.exports = router;
