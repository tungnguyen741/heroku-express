var User = require('../Models/user.model');
module.exports.postAddUser = async (req, res, next) => {
    var errors = [];
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    let email = req.body.email;
    let password = req.body.password;
    try {
        let checkEmail = await User.findOne({ email });
        console.log(checkEmail);
        if(checkEmail.email == req.body.email){
            errors.push("Email đã được đăng ký")
                res.render("user_add", {
                    errors,
                    values: req.body
                })
                return;
        }
    } catch (error) {
        console.error(error);
    }
    
   
    // Kiểm tra tên ko là số
    stringParse = name.split("");

    stringParse.forEach(item => {
        if( parseInt(item) ){
            errors.push("Tên phải là chữ")
            res.render("user_add", {
                errors,
                values: req.body
            })
            return;
        }
    });


    // nhập thiếu thông tin
    if(!name || !age || !gioiTinh || !email || !password){
        errors.push("Ko được để trống các ô")
        res.render("user_add", {
            errors,
            values: req.body
        })
        return;
    }
    
   


     //kiểm tra năm sinh > 1900
    
     yy = age.split("-");
     if(yy[0] < 1920 || yy[0] >= 2020 ){
         res.render("user_add",{
             errors: ["Năm sinh ko hợp lệ"],
             values: req.body
         });
         return;
     }

    //Kiểm tra mật khẩu
    if( !(password.length >=8 &&  password.toLowerCase().indexOf(password) == -1 || password.toUppercase().indexOf(password) == -1) ){
        res.render("user_add",{
            errors: ["Mật khẩu nhiều hơn 8 ký tự, có ký tự Hoa và thường"],
            values: req.body
        });
        return;
    }
    //kiểm tra email có @
    if( !(email.includes("@") && email.includes(".")) ){
        res.render("user_add",{
            errors: ["Email ko đúng định dạng"],
            values: req.body
        });
        return;
    }
   
    

    if (!req.file) {
        req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
    }
    
    let avatar = req.body.avatar;
    if (name.length > 20) {
        errors.push("Tên phải ít hơn 20 kí tự");
        res.render("user_add", {
            errors: errors
        });
        return;
    }
    res.locals.name = name;
    res.locals.age = age;
    res.locals.gioiTinh = gioiTinh;
    res.locals.password = password;
    res.locals.email = email;
    res.locals.avatar = req.body.avatar;
    next();
}








module.exports.postUpdateUserValidate = async (req, res, next) => {
    var errors = [];
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    let email = req.body.email;
    let password = req.body.password;
    const dataFinded = await User.find({ _id: req.params.id })
    console.log(dataFinded)
    try {
        let checkEmail = await User.findOne({ email });
        console.log(checkEmail);
        if(checkEmail.email == req.body.email){
            errors.push("Email đã được đăng ký")
                res.render("user_update", {
                    errors,
                    values: req.body,
                    dataFinded
                })
                return;
        }
    } catch (error) {
        console.error(error);
    }
    
   
    // Kiểm tra tên ko là số
    stringParse = name.split("");

    stringParse.forEach(item => {
        if( parseInt(item) ){
            errors.push("Tên phải là chữ")
            res.render("user_update", {
                errors,
                values: req.body,
                dataFinded
            })
            return;
        }
    });


    // nhập thiếu thông tin
    if(!name || !age || !gioiTinh || !email || !password){
        errors.push("Ko được để trống các ô")
        res.render("user_update", {
            errors,
            values: req.body,
            dataFinded
        })
        return;
    }
    
   


     //kiểm tra năm sinh > 1900
    
     yy = age.split("-");
     if(yy[0] < 1920 || yy[0] >= 2020 ){
         res.render("user_update",{
             errors: ["Năm sinh ko hợp lệ"],
             values: req.body,
             dataFinded
         });
         return;
     }

    //Kiểm tra mật khẩu
    if( !(password.length >=8 &&  password.toLowerCase().indexOf(password) == -1)){
        res.render("user_update",{
            errors: ["Mật khẩu nhiều hơn 8 ký tự, có ký tự Hoa và thường"],
            values: req.body,
            dataFinded
        });
        return;
    }
    //kiểm tra email có @
    if( !(email.includes("@") && email.includes(".")) ){
        res.render("user_update",{
            errors: ["Email ko đúng định dạng"],
            values: req.body,
            dataFinded
        });
        return;
    }
   
    

    if (!req.file) {
        req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
    }
    
    let avatar = req.body.avatar;
    if (name.length > 20) {
        errors.push("Tên phải ít hơn 20 kí tự");
        res.render("user_update", {
            errors: errors,
            dataFinded
        });
        return;
    }
    res.locals.name = name;
    res.locals.age = age;
    res.locals.gioiTinh = gioiTinh;
    res.locals.password = password;
    res.locals.email = email;
    res.locals.avatar = req.body.avatar;
    next();
}
 