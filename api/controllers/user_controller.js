var User = require('../../Models/user.model');

module.exports.viewUser = async function (req, res) {
  var users = await User.find();
  res.json(users);
};