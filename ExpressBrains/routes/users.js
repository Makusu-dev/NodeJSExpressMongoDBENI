let express = require('express');
let router = express.Router();
const { validationResult, body } = require('express-validator');
const userStorage = require('../storage/usersDB');
const argon2 = require('argon2');
const {User} = require('../models/User')

let user = {
  email:'',
  password:'',
}
let error=[];

/* provisoire ajout des users pour test */

router.get('/add-users', async function(req,res){

    const user1 = {
      pseudo: 'Makusu',
      email: 'maxime.jeannin@mail.com',
      password: '$argon2id$v=19$m=65536,t=3,p=4$a/S4YlMok2fjm90BQdTtpw$ogkluyFQIdzchfTyeaAGsX+fjvaO4dcUpm9uMCaxYos',
      role: 'admin',
    };

    const user2 = {
      email: 'maxime.jeannin@autremail.com',
      pseudo: 'maxou',
      password: '$argon2id$v=19$m=65536,t=3,p=4$a/S4YlMok2fjm90BQdTtpw$ogkluyFQIdzchfTyeaAGsX+fjvaO4dcUpm9uMCaxYos',
      role: 'user',
    };

    await userStorage.addUser(user1);
    await userStorage.addUser(user2);

    res.send("Utilisateurs ajoutés");


})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await userStorage.getUsers();
  res.render('users',{users:users});
});

router.get('/create',async function(req, res, next) {
  res.render('user-create');
})

router.post('/create',body('email').isEmail().withMessage('Please provide a valid email'),
                            body('pseudo').isLength({min:4,max:16}).withMessage('Pseudo must be between 4 and 16 characters'),
                            body('password').isLength({min:4,max:16}).withMessage('Password must be between 4 and 16 characters'),
                            body('passwordConfirm').custom((value, { req }) => {
                                return value === req.body.password;
                            }).withMessage('Password confirmation must be the same as password'),
                            body('email').custom(async function (value, { req }) {
                              let checkEmail= await userStorage.findByEmail(value);
                              return !checkEmail;
                            }).withMessage('email already exists in the database'),
                            body('pseudo').custom(async function (value, { req }) {
                              let checkPseudo= await userStorage.findByPseudo(value);
                              return !checkPseudo;
                            }),
  async function(req, res, err) {
  resultOfValidation=validationResult(req);
  if(resultOfValidation.isEmpty()) {
      user = new User(user);
      user.email=req.body.email;
      user.password=req.body.password;
      console.log(user);
      //Save user in database
      try {
        const hash = await argon2.hash(user.password);
        user.password = hash;
        await userStorage.addUser(user);
        req.session.user=user;
        res.redirect('/')
      } catch (err) {
        error.push(err);
      }
  }
  else {
    console.log(err);
    error=resultOfValidation.array();
    res.render('user-create',{error:error})
  }
})


module.exports = router;
