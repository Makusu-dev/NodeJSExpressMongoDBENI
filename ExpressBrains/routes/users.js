let express = require('express');
let router = express.Router();
const { validationResult, body } = require('express-validator');
const userStorage = require('../storage/users');
const argon2 = require('argon2');
const session = require("express-session");

let user = {
  email:'',
  password:'',
}
let error=[];


/* GET users listing. */
router.get('/', function(req, res, next) {
  users=userStorage.findAll();
  res.render('users',{users:users});
});

router.get('/create', function(req, res, next) {
  res.render('user-create');
})

router.post('/create',body('email').isEmail().withMessage('Please provide a valid email'),
                            body('password').isLength({min:4,max:16}).withMessage('Password must be between 4 and 16 characters'),
                            body('passwordConfirm').custom((value, { req }) => {
                                return value === req.body.password;
                            }).withMessage('Password confirmation must be the same as password'),
                            body('email').custom((value, { req }) => {
                              let checkEmail=userStorage.findByEmail(value);
                              return !checkEmail;
                            }).withMessage('email already exists in the database'),
  (req, res, err) => {
  result=validationResult(req);
  if(result.isEmpty()) {
      user.email=req.body.email;
      user.password=req.body.password;
      console.log(user);
      //Save user in database
      userStorage.addUser(user.email,argon2.hash(user.password));
      req.session.user=user;
      res.redirect('../');
  }
    console.log(err);
    error=result.array();
    res.render('user-create',{error:error})
})


module.exports = router;
