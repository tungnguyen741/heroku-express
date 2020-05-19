var User = require('../Models/user.model');
var bcrypt = require('bcrypt')

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkeyUp,
    api_secret: process.env.APIsecretUp
});

module.exports.viewUser = async function(req, res) {
    var users = await User.find();
    if(res.locals.user){
        if (res.locals.user.isAdmin) {
            return res.render("user_view", {
                users
            });
        }
    }
    res.send('<img src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln">')
};
module.exports.addUser = (req, res) => {
        res.render("user_add");
};
module.exports.postAddUser = async function(req, res) {
    const saltRounds = 10;
    if (!req.file) {
        var hashPass = await bcrypt.hash(req.body.password, saltRounds);
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
    }

    if (req.file) {
        try {
            var uploader = await cloudinary.v2.uploader.upload(req.file.path);
            var hashPass = await bcrypt.hash(res.locals.password, saltRounds);
            var updateUs = await new User({
                name: req.body.name,
                age: req.body.age,
                sex: req.body.GioiTinh,
                email: req.body.email,
                password: hashPass,
                avatarUrl: uploader.url,
                isAdmin: false,
                wrongLoginCount: 0,
            }).save();
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect('/login');
};
module.exports.deleteUser = async function(req, res) {
    let id = req.params.id;
    await User.deleteOne({ _id: id });
    res.redirect('/users');
};
module.exports.detailUser = async function(req, res) {
    let id = req.params.id;
    let dataHaveAvatar = [];
    let dataFinded = await User.find({ _id: id });
    if(res.locals.user){
        if (res.locals.user.isAdmin) {
        res.render("user_detail", {
            dataFinded,
            dataHaveAvatar: dataHaveAvatar.length > 0
        });
    }}
    res.send('<img src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln">')
};
module.exports.updateUser = async function(req, res) {
    let id = req.params.id;
    let dataHaveAvatar = [];
   if(res.locals.user){
        if (res.locals.user.isAdmin) {
        let dataFinded = await User.find({ _id: id });
        res.render("user_update", {
            dataFinded,
            dataHaveAvatar: dataHaveAvatar.length > 0
        });
    }}
    res.send('<img src="https://assets.prestashop2.com/sites/default/files/styles/blog_750x320/public/blog/2019/10/banner_error_404.jpg?itok=eAS4swln">')
};
module.exports.postUpdateUser = async function(req, res, next) {
    let id = req.params.id;
    const saltRounds = 10;
    if (!req.file) {
        req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
        var hashPass = await bcrypt.hash(req.body.password, saltRounds);
        var updateUs = await User.updateOne({ _id: id }, {
            name: req.body.name,
            age: req.body.age,
            sex: req.body.GioiTinh,
            password: hashPass,
            avatarUrl: req.body.avatar
        });
    }

    if (req.file) {
        try {
            var uploader = await cloudinary.v2.uploader.upload(req.file.path);
            var hashPass = await bcrypt.hash(req.body.password, saltRounds);
            var updateUs = await User.updateOne({ _id: id }, {
                name: req.body.name,
                age: req.body.age,
                sex: req.body.GioiTinh,
                password: hashPass,
                avatarUrl: uploader.url
            });
        } catch (err) {
            console.log(err);
        }

    }
    res.redirect('/');
};