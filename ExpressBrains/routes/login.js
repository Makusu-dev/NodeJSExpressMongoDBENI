let express = require('express');
let router = express.Router();
const { validationResult, body } = require('express-validator');
const userStorage = require('../storage/usersDB');
const argon2 = require('argon2');
const { User } = require('../models/User');
let error=[];


router.get('/', function (req, res) {
  res.render('login')
})



router.post('/',body('email').isEmail().withMessage('Please provide a valid email'), async function (req, res) {
  valResult = validationResult(req);
  if (valResult.isEmpty()) {
    //Vérifier mot de passe et email
    inputUser = await userStorage.findByEmail(req.body.email);
    console.log(inputUser);

    try {
      if (inputUser && await argon2.verify(inputUser.password, req.body.password)) {
        //passer un utilisateur en session
        req.session.user = inputUser;
        console.log("password and mail are matching");
        res.redirect('/');
      } else {
        console.log("no match");
        error.push({ path: 'email', msg: 'email and password doesn\'t match' });
        res.render('login', { error: error });
      }
    } catch(err){
      console.log(err);
      error.push(err);
    }
  }
  else {
    res.error=valResult.array();
    console.log(res.error);
    res.render('login',{error:res.error})
  }
})


module.exports = router;