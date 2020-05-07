var User = require('../../Models/user.model');

module.exports.postLogin = async function(req, res, next) {
  var users = await User.create(req.body);
  res.json(users);
}