const express = require('express');
const router = express.Router();
const tryNumberService = require('../services/try-number');
const randomNumberService = require('../services/random-number');



let numberToFind ;




/* GET home page. */
router.get('/',async function(req, res, next) {
  if (!numberToFind){
    numberToFind=randomNumberService.RandomNumber.generate();
    console.log('generated number: '+ numberToFind);
  }
  res.render('index', { title: 'Express',numberToFind: 'numberToFind'});
});

router.post('/',(req,res,err)=>{
  // console.log(parseInt(req.body.attempt));
  const playAgain = req.body.playAgain;
  if(playAgain){
    numberToFind=randomNumberService.RandomNumber.generate();
    console.log('generated number: '+ numberToFind);
    res.render('index');
  }
  else{
    const tryNumberResponse = tryNumberService.tryNumber(parseInt(req.body.attempt),numberToFind);
    res.render('index', { result: tryNumberResponse })
  }
  // if(tryNumberResponse.resultType === ResultTypes.CORRECT){
  //   req.flash('success',tryNumberResponse.text);
  // }
  // else{
  //   req.flash('error', tryNumberResponse.text);
  // }
})

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
