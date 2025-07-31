const mongoose = require('mongoose')
//remplacer par un enum-roles
const userSchema = mongoose.Schema({
  uuid: String,
  pseudo: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};