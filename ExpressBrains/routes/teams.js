let express = require('express');
let router = express.Router();
const { validationResult, body } = require('express-validator');
const teamStorage = require('../storage/teams');
const userStorage = require('../storage/usersDB');
const argon2 = require('argon2');
const {User} = require('../models/User')
const { Team } = require('../models/Team');


let error=[];


router.get('/', async (req, res) => {
  const teams = await teamStorage.getTeams();
  console.log(teams);
  res.render('teams',{teams: teams})
})

router.get('/create', async (req, res) => {
  users = await userStorage.getUsers();
  res.render('team-create');
})

router.post('/create',body('name').notEmpty().withMessage('Your team needs a name'),body('members').isLength({min: 2}).withMessage("Il vous faut au moins 2 membres dans l'équipe"), async (req, res) => {
  let resultOfValidation=validationResult(req);
  if(resultOfValidation.isEmpty()) {
    let newTeam = new Team();
    newTeam.name=req.body.name;
    try {
      await teamStorage.addTeam(newTeam);
      console.log(req.body.members)
      for (let member in req.body.members) {
        let newMember = userStorage.findByPseudo(member);
        await teamStorage.addUserToTeam(newMember.id,newTeam.name)
      }
      res.redirect('/teams')
    }
    catch (error) {
      console.log(error);
      // error.push(error);
    }
  }
  else
  {
    console.log(err);
    error=resultOfValidation.array();
    res.render('team-create',{error:error})
  }
})



module.exports = router;