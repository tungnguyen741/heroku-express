module.exports.postAddUser = (req, res, next) => {
    var errors = [];
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    let email = req.body.email;
    let password = req.body.password;

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
     if(yy[0] < 1920 && yy[0] > 2020 ){
         res.render("user_add",{
             errors: ["Năm sinh ko hợp lệ"],
             values: req.body
         });
         return;
     }

    //Kiểm tra mật khẩu
    if( !(password.length >=8 &&  password.toLowerCase().indexOf(password) == -1)){
        res.render("user_add",{
            errors: ["Mật khẩu nhiều hơn 8 ký tự, có ký tự Hoa và thường"],
            values: req.body
        });
        return;
    }
    //kiểm tra email có @
    if( !email.includes("@") ){
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