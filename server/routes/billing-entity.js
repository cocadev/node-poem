const express = require('express');
const { validateBody } = require('../middleware/validator');
const safeAsync = require('../middleware/asyncController');

const router = express.Router();

const { searchBillingEntity, markBillingEntity } = require('../controllers/BillingEntity.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// method = GET
// endpoint = billing-entity/search/:searchString
router.get('/search/:searchString', safeAsync(searchBillingEntity));
// method = POST
// endpoint = billing-entity/search/:searchString
router.post('/mark', safeAsync(markBillingEntity));


module.exports = router;
