const mongoose = require('mongoose')



const Team = mongoose.model('Team',{
    uuid: String,
    name: String,
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
});

module.exports = {
  Team
};