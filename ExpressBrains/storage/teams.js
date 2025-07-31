const uuid = require('uuid');
const {User} = require('../models/User')
const {Team} = require('../models/Team')
const userStorage = require('../storage/usersDB');




async function getTeams() {
  try {
    const data = await Team.find();
    return data
  }
  catch(err){
    console.log(err);
    await client.close();
  }
}

async function findById(teamId) {
  try {
    data = await Team.findOne({id: teamId})
    return data;
  } catch(err){
    console.log(err);
    await client.close();
  }
}

async function findByName(teamName) {
  try {
    data = await Team.findOne({name: teamName})
    return data;
  } catch(err){
    console.log(err);
    await client.close();
  }
}


async function addTeam(team) {
  try{
    const newTeam = new Team();
    console.log(newTeam);
    newTeam.id = uuid.v4();
    newTeam.name = team.name;
    await newTeam.save().then(() => {
      console.log("Team Added!");
    });
  }
  catch(err){
    console.log(err);
    await client.close();
  }
}

async function addUserToTeam(user_id,team_name) {
  const userToAdd = await userStorage.findById(user_id);
  console.log(userToAdd);
  const teamToBeAdded = await Team.findOne({name: team_name});
  console.log(teamToBeAdded);
  teamToBeAdded.members.push(userToAdd);
  await teamToBeAdded.save();
  teamToBeAdded.populate('members').then((team)=>{
    console.log('Team:',team);
  }).catch(err => console.log(err));
}

module.exports = {
  getTeams,
  addTeam,
  addUserToTeam,
  findById,
  findByName
}