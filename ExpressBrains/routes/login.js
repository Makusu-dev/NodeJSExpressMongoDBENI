let express = require('express');
let router = express.Router();
const { validationResult, body } = require('express-validator');
const userStorage = require('../storage/users');
const argon2 = require('argon2');

router.get('/', function (req, res) {
  res.render('login')
})

router.post('/login',body('email').isEmail().withMessage('Please provide a valid email'),body('email').custom((value, { req }) => {
  let checkEmail=userStorage.findByEmail(value);
  return checkEmail;
}).withMessage('email does not exists in the database'), function (req, res) {
  //passer un utilisateur en session
})


module.exports = router;