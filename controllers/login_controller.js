const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail');
var User = require('../Models/user.model');
sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim());
module.exports.login = async (req, res, next) => {
     return res.status(200).render('login');
}
module.exports.postLogin = async function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.pass;

    const msg = {
        from: "1654052141tung@ou.edu.vn",
        to: email,
        subject: 'Cảnh báo bạn đăng nhập',
        html: '<strong>Bạn đã nhập sai mật khẩu quá 5 lần, Vui lòng liên hệ Admin <b><i>tung.nguyen21098@gmail</b></i> để được hỗ trợ!!</strong>',
    };

    let userLoginTrue = await User.findOne({
        email
    });
    if (!userLoginTrue) {
        res.status(200).render('login', {
            errors: ["Tài khoản chưa được đăng ký."],
            values: req.body
        });
        return;
    }
    //check pass
    try {
        var truePass = await bcrypt.compare(pass, userLoginTrue.password);
        console.log('TRUE PASS',truePass)
        if (truePass) {
            await User.updateOne({ _id: userLoginTrue._id }, { wrongLoginCount: 0 });

            res.cookie("userId", userLoginTrue._id, {
                signed: true
            });
            res.clearCookie("sessionId");
            res.redirect('/books');
            return;
        }
        await User.updateOne({ _id: userLoginTrue._id }, { wrongLoginCount: ++userLoginTrue.wrongLoginCount });
        if (userLoginTrue.wrongLoginCount ==5) {
            try {
                await sgMail.send(msg);
        
              } catch (error) {
                console.error(error);
             
                if (error.response) {
                  console.error(error.response.body)
                }
              }
            res.status(200).render('login', {
                errors: ["Bạn nhập sai quá 5 lần. Vui lòng liên hệ admin để mở khóa"],
                values: req.body
            });
            return;
        }
        if (userLoginTrue.wrongLoginCount == 3) {
            res.status(200).render('login', {
                errors: ["Bạn đã nhập sai 3 lần. Nhập sai 5 lần bị khóa tài khoản"],
                values: req.body
            });
            return;
        }
         if (userLoginTrue.wrongLoginCount >=5) {
            try {
                await sgMail.send(msg);
        
              } catch (error) {
                console.error(error);
             
                if (error.response) {
                  console.error(error.response.body)
                }
              }
            res.status(200).render('login', {
                errors: ["Bạn nhập sai quá 5 lần. Vui lòng liên hệ admin để mở khóa"],
                values: req.body
            });
            return;
         }
        res.status(200).render('login', {
            errors: ["Sai email hoặc mật khẩu. Không đăng nhập được"],
            values: req.body
        });
    } catch (err) {
        return next(err);
    }

}