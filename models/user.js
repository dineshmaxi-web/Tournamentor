var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email : String,
  phonenumber  : String
});

var user = mongoose.model("users", userSchema);

module.exports = user;
