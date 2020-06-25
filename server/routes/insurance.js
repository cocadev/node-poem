const express = require('express');
const { validateBody } = require('../middleware/validator');
const safeAsync = require('../middleware/asyncController');

const router = express.Router();

const { checkCardSupport, searchInsurance } = require('../controllers/Insurance.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// method = POST
// endpoint = insurance/card-support
// the final card support third party yet
router.post('/card-support', safeAsync(checkCardSupport));

// method = GET
// endpoint = insurance//search/:searchString
router.get('/search/:searchString', safeAsync(searchInsurance));


module.exports = router;
