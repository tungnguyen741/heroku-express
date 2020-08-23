var User = require('../../Models/user.model');
const bcrypt = require('bcrypt')
module.exports.postLogin = async (req, res, next) => {
  //Login a registered user
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(401).send({error: 'Login failed! Check authentication credentials'})
  }
    var truePass = await bcrypt.compare(req.body.password, user.password);
    if (!truePass) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken();
    res.json({ 
      accessToken: token, 
      user: {
        age: user.age,
        avatarUrl: user.avatarUrl,
        email: user.email,
        name: user.name,
        sex: user.sex,
        tokens: user.tokens,
        _id: user._id
      }
    })
  } catch (error) {
      res.status(400).send(error)
  }
}


module.exports.viewLogged = async (req, res) =>{
   // View logged in user profile
   res.send(req.user)
}

module.exports.logout = async (req, res) =>{
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
      res.status(500).send(error)
}
}