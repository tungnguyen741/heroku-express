var bcrypt = require('bcrypt')
var User = require('../Models/user.model');
module.exports.indexProfile = async function(req, res, next) {
    let isUserAd = await User.findOne({ _id: req.signedCookies.userId });
    let dataFinded = await User.findOne({ _id: isUserAd.id });
    var dataArr = [];

    dataArr.push(dataFinded);
    res.render("profile", { dataFinded: dataArr });

}

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkeyUp,
    api_secret: process.env.APIsecretUp
});

module.exports.postProfile = async function(req, res, next) {
    let isUserAd = await User.findOne({ _id: req.signedCookies.userId });

    const saltRounds = 10;
    if (!req.file) {
        req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
        var hashPass = await bcrypt.hash(req.body.password, saltRounds);
        var updateUs = await User.updateOne({ _id: isUserAd.id }, {
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
            var updateUs = await User.updateOne({ _id: isUserAd.id }, {
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
}