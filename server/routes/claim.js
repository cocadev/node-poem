const express = require('express');
const { validateBody } = require('../middleware/validator');
const safeAsync = require('../middleware/asyncController');
const router = express.Router();

const { getEstimatedClaimsDataSet, getFinalClaimsDataSet, getClaimsDataSet, addEstimatedDataSet, updateEstimatedDataSet, deleteEstimatedDataSet, addFinalDataSet, updateFinalDataSet
} = require('../validators/claim');

const { getEstimatedClaims, getFinalClaims, getClaims, addEstimated, updateEstimated, deleteEstimated, addFinal, updateFinal, search, getSingleEstimatedClaim,
    getSingleFinalClaim
} = require('../controllers/Claim.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// method = GET
// endpoint = claim/estimated/list/:ProviderId/:pageNo
router.get('/estimated/list/:ProviderId/:pageNo', safeAsync(getClaims));
// method = GET
// endpoint = claim/list
router.get('/list', validateBody(getClaimsDataSet), safeAsync(getClaims));
///////////////////////////////////////
// Group C - History Estimated Calim
// method = POST
// endpoint = claim/estimated/list
router.post('/estimated/list', validateBody(getEstimatedClaimsDataSet), safeAsync(getEstimatedClaims));
///////////////////////////////////////
// Group C - Estiamted Claim id
// method = GET
// endpoint = claim/estimated/:ClaimId
router.get('/estimated/:ClaimId', safeAsync(getSingleEstimatedClaim));
///////////////////////////////////////
// Group C - History Final Calim
// method = POST
// endpoint = claim/final/list
router.post('/final/list', validateBody(getFinalClaimsDataSet), safeAsync(getFinalClaims));
///////////////////////////////////////
// Group C - Estiamted Claim id
// method = GET
// endpoint = claim/final/:ClaimId
router.get('/final/:ClaimId', safeAsync(getSingleFinalClaim));



/////////////////////////////////////
// Provider Screens - Main screen 1b
// Add new estiamted claim
// method = POST
// endpoint = claim/estimated
router.post('/estimated', validateBody(addEstimatedDataSet), safeAsync(addEstimated));
//router.get('/estimated/list/:PatientId/:pageNo', safeAsync(getEstimatedClaimsForMainScreen));
/////////////////////////////////////
// Edit estimated claim
// method = PUT
// endpoint = claim/estimated
router.put('/estimated', validateBody(updateEstimatedDataSet), safeAsync(updateEstimated));
/////////////////////////////////////
// Delete estiamted claim
// method = DELETE
// endpoint = claim/estimated
router.delete('/estimated', validateBody(deleteEstimatedDataSet), safeAsync(deleteEstimated));
/////////////////////////////////////
// Provider Screens - Final claim 3b
// Add new final claim
// method = POST
// endpoint = claim/final
router.post('/final', validateBody(addFinalDataSet), safeAsync(addFinal));
/////////////////////////////////////
// Provider Screens - Final claim 1b
// Edit final claim
// method = PUT
// endpoint = claim/final
router.put('/final', validateBody(updateFinalDataSet), safeAsync(updateFinal));
/////////////////////////////////////
//
// method = GET
// endpoint = claim/search
router.get('/search', safeAsync(search));
//router.get('/search', validateBody(getClaimsDataSet), safeAsync(getClaims));

// method = POST
// endpoint = claim/estimated
//router.post('/final', validateBody(addFinalDataSet), safeAsync(addFinal));



// method = GET
// endpoint = claim/final-claim?PatientId=123&claimId=1
router.post('/final-claim', safeAsync(getSingleFinalClaim));



// method = GET
// endpoint = /claim/:id/attachments
router.post('/:id/attachments', (req, res) => {
  res.send({
    "status": "OK",
    "message": "user identified successfully",
    "data": {
      claimId: 1,
      attachments:[
        {id: 1, name:'doc1',link:'doc1.docx'},
        {id: 2, name:'doc2',link:'doc2.docx'},
        {id: 3, name:'doc1',link:'doc3.docx'}
      ]
    }
  });
});



module.exports = router;
