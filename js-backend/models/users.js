let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = mongoose.model('User', UserSchema);