var User = require("../../Models/user.model")
const bcrypt = require("bcrypt");
module.exports.viewUser = async function (req, res) {
  try {
    var users = await User.find();
    res.json(users); 
  } catch (error) {
    res.status(500).send(error);    
  }
};

module.exports.postAddUser = async (req, res) => {
  try{
    var hashPass = await bcrypt.hash(req.body.password, 10);
    var updateUs = await new User({
      name: req.body.name,
      age: req.body.age,
      sex: req.body.GioiTinh,
      email: req.body.email,
      password: hashPass,
      avatarUrl: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
      isAdmin: false,
      wrongLoginCount: 0,
    }).save();
 
    const token = await updateUs.generateAuthToken()
    res.status(201).send({ updateUs, token })

  }
  catch (error) {
      res.status(500).send(error);
  }
}

module.exports.detailUser = async (req, res) =>{
  try {
     var user = await User.findById(req.params.id);
     res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
} 

module.exports.detailUserByE = async (req, res) =>{
  try {
     var user = await User.findOne({"email": req.params.email});
     res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
} 
 
module.exports.deleteUser = async (req, res) =>{
  try {
    var result = await User.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports.updateUser = async (req, res) =>{
  try {
    var user = await User.findById(req.params.id).exec();
    var hashPass = await bcrypt.hash(req.body.password, 10);
    user.set({
      name: req.body.name,
      age: req.body.age,
      sex: req.body.GioiTinh,
      email: req.body.email,
      password: hashPass,
      avatarUrl: "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png",
      isAdmin: false,
      wrongLoginCount: 0,
    });
    var result = await user.save();
    res.send(result);

  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports.cmtPost = async(req, res) => {
  try {
    var post = await User.findOne()
  } catch (error) {
    res.status(500).send(error);
  }
}