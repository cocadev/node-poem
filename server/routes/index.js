const express = require('express');

const router = express.Router();

const common = require('./common.js');
const claim = require('./claim.js');
const patient = require('./paitent.js');
const provider = require('./provider.js');
const insurance = require('./insurance.js');
const billingEntity = require('./billing-entity.js');

const SampleController = require('../controllers/SampleController.js');


const errorHandler = (err, req, res, next) => {
  console.log('\n\n===========>\n\nerr handler');
  if (res.headersSent) {
    return next(err);
  }
  if (err.isJoi || err.isCustom) {
    res.status(500).send({
      status: 0,
      message: err.message
    });
  } else {
    res.status(500).send({
      status: 0,
      message: 'Something went wrong'
    });
  }
};

router.get('/', function(req, res) {
  // res.render('index', { title: 'Express' });
  res.send({Status: "OK"})
});

// Sample Endpoint with sample data from db
//router.get('/sample', SampleController.getSample);
// router.get('/sample', SampleController.genrateStatment);
router.get('/sample', SampleController.genrateInstallments);
router.post('/sample', SampleController.setSample);
router.get('/sampleEsearch', SampleController.getEsearch);
router.post('/sampleEsearch', SampleController.setEsearch);

// Common End points
router.use('/common', common);
// Claim End points
router.use('/claim', claim);
// Paitent End points
router.use('/patient', patient);
// Provider End points
router.use('/provider', provider);
// Insurance End points
router.use('/insurance', insurance);
router.use('/billing-entity', billingEntity);


router.use(errorHandler);

module.exports = router;
