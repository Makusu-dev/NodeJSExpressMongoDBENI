const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');
const tryNumberService = require('../services/try-number');
const randomNumberService = require('../services/random-number');
const { ResultTypes } = require('../enums/result-types')



let numberToFind ;




/* GET home page. */
router.get('/', function(req, res, next) {
  if (!numberToFind){
    numberToFind=randomNumberService.RandomNumber.generate();
    console.log('generated number: '+ numberToFind);
  }
  res.render('index', { title: 'Express',numberToFind: 'numberToFind'});
});

router.post('/',(req,res,err)=>{
  console.log(parseInt(req.body.attempt));
  const tryNumberResponse = tryNumberService.tryNumber(parseInt(req.body.attempt),numberToFind);
  console.log(err);
  // err.message = tryNumberResponse.text
  if(tryNumberResponse.resultType === ResultTypes.CORRECT){
    req.flash('success',tryNumberResponse.text);
  }
  else{
    req.flash('error', tryNumberResponse.text);
  }

 res.redirect('/')
})


module.exports = router;
