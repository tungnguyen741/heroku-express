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
    //let isUserAd = await User.findOne({ _id: req.signedCookies.userId });
    //let isUserAd = await User.findOne({ _id: req.signedCookies.userId });
    console.log('USER TÌM THẤY:   ',res.locals.name);
    console.log('USER TÌM THẤY:   ',res.locals.user._id);
    const saltRounds = 10;
    if (!req.file) {
        // req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
        // var hashPass = await bcrypt.hash(req.body.password, saltRounds);
        const hashPassPromise = await bcrypt.hash(res.locals.password, saltRounds);
        updateUs = await User.updateOne({ _id:  res.locals.user._id }, {
            name: res.locals.name,
            age: res.locals.age,
            sex: res.locals.gioiTinh,
            password:   hashPassPromise,
            avatarUrl: res.locals.avatar
        });
    }

    if (req.file) {
        try {
            // var uploader = await cloudinary.v2.uploader.upload(req.file.path);
            // var hashPass = await bcrypt.hash(req.body.password, saltRounds);
            // var updateUs = await User.updateOne({ _id: isUserAd.id }, {
            const uploaderPromise = await cloudinary.v2.uploader.upload(req.file.path);
            const hashPassPromise = await bcrypt.hash(req.body.password, saltRounds);
            // const uploader = await updateUsPromise;
            // const hashPass = await hashPassPromise;
            updateUsPromise = await User.updateOne({ _id: res.locals.user._id }, {
                name: res.locals.name,
                age: res.locals.age,
                sex: res.locals.gioiTinh,
                password:  hashPassPromise,
                avatarUrl:  uploaderPromise.url
            });
            
        } catch (err) {
            console.log(err);
        }

    }
   res.redirect('/');
}