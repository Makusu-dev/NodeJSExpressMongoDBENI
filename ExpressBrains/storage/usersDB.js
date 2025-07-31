const uuid = require('uuid');
const {User} = require('../models/User')





async function getUsers() {
  try{
    const data = await User.find();
    return data;
  }
  catch(err){
    console.log(err);
    await client.close();
  }
}

async function addUser(user) {
  try{
      const newUser = new User(user);
      console.log(newUser);
      newUser.uuid = uuid.v4();
      newUser.role = "user";
      await newUser.save().then((user) => {
        console.log("utilisateur ", user.pseudo, "ajouté" )
      });
  }
  catch(err){
    console.log(err);
    await client.close();
  }
}

async function deleteUserByEmail(userEmail) {
  try{
    let user = await User.findOne({email: userEmail});
    if (user) {
      console.log(user)
      await user.deleteOne();
    }
  } catch (error) {
    console.log(error);
    await client.close();
  }

}

async function findByEmail(email) {
  try {
    return await User.findOne({ email: email })
  }catch(err){
    console.log(err);
    await client.close();
  }
}

async function findById(id) {
  try {
    return await User.findOne({ id: id })
  }catch(err){
    console.log(err);
    await client.close();
  }
}

async function findByPseudo(pseudo) {
  try {
    return await User.findOne({ pseudo: pseudo })
  }catch(err){
    console.log(err);
    await client.close();
  }
}



module.exports = {
  getUsers,
  addUser,
  findByEmail,
  findByPseudo,
  findById,
  deleteUserByEmail
}




// const users = [
//   {
//     uuid: uuid.v4(),
//     email: 'admin@express-brains.local',
//     password:
//       '$argon2id$v=19$m=65536,t=3,p=4$QrMXiyCxsLjv700OAZzDkQ$abhVv5mq+rZ4gS9koYTSS7MXdWWOBU+eAJY/oZ56wsw',
//     role: 'admin',
//   },
//   {
//     uuid: uuid.v4(),
//     email: 'user@express-brains.local',
//     password:
//       '$argon2id$v=19$m=65536,t=3,p=4$jzQB9YoLnTyZpL66ZxWcYA$KaL4B8QM0Ni87d8bhK1bRM8O1lwU1f9H/SPSX9S4rlQ',
//     role: 'user',
//   },
//   {
//     uuid: uuid.v4(),
//     email: 'maxime.jeannin@mail.com',
//     password:
//       '$argon2id$v=19$m=65536,t=3,p=4$a/S4YlMok2fjm90BQdTtpw$ogkluyFQIdzchfTyeaAGsX+fjvaO4dcUpm9uMCaxYos',
//     role: 'admin',
//   },
// ]