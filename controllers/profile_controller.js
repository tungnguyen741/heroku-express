var bcrypt = require('bcrypt')
var User = require('../Models/user.model');

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkeyUp,
    api_secret: process.env.APIsecretUp
});

module.exports.indexProfile = async function(req, res, next) {
    let isUserAd = await User.findOne({ _id: req.signedCookies.userId });
    let dataFinded = await User.findOne({ _id: isUserAd.id });
    var dataArr = [];

    dataArr.push(dataFinded);
    res.render("profile", { dataFinded: dataArr });

}

module.exports.postProfile = async function(req, res, next) {
    const saltRounds = 10;
    //kiem tra mau khau cu co khop ko
    let userLoginTrue = await User.findById(res.locals.user._id);
    try {
        var truePass = await bcrypt.compare(res.locals.password, userLoginTrue.password);
        console.log('TRUE PASS',truePass)
        if (truePass) {
            //sau do kiem tra file hình co hay ko
            //=======================================
            if (!req.file) {
                const hashPassPromise = await bcrypt.hash(res.locals.passwordNew, saltRounds);
                updateUs = await User.updateOne({ _id:  res.locals.user._id }, {
                    name: res.locals.name,
                    age: res.locals.age,
                    sex: res.locals.gioiTinh,
                    password:   hashPassPromise,
                    avatarUrl: res.locals.avatar
                });
                return  res.redirect('/');
            }

            if (req.file) {
                try {
                    const uploaderPromise = await cloudinary.v2.uploader.upload(req.file.path);
                    const hashPassPromise = await bcrypt.hash(res.locals.passwordNew, saltRounds);
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
                return  res.redirect('/');
        }
         //=======================================
        } 
    }
    catch (err) {
        console.log(err);
   }
   
   return res.status(200).render('profile', {
        errors: ["Mật Khẩu cũ Không trùng khớp !"],
        values: req.body,
        dataFinded: res.locals.dataFinded
    });
  
}