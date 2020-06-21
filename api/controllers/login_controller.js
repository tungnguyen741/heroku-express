var User = require('../../Models/user.model');

module.exports.postLogin = async (req, res, next) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
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