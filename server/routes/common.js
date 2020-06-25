const express = require('express');
const { validateBody } = require('../middleware/validator');
const safeAsync = require('../middleware/asyncController');

const router = express.Router();

const { fileUpload } = require('../controllers/Common.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// method = POST
// endpoint = insurance/card-support
// the final card support third party yet
router.post('/file-upload', safeAsync(fileUpload));

module.exports = router;
