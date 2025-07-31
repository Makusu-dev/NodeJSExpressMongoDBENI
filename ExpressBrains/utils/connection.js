const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/express-brains";

async function connectToDb() {
  mongoose.connect(uri).then(() => {
    console.log('Connexion réussi !');
  }).catch(err => console.log(err));
}


module.exports =
  {connectToDb};