module.exports.postBook = (req, res, next) =>{
    var titleAdded = req.body.titleAdded;
    var descriptionAdded = req.body.descriptionAdded;
    var avatarBook = req.body.avatarBook;
    if(!titleAdded || !descriptionAdded || !req.file){
        res.render('add',{
            errors: ["Không được bỏ trống các ô"],
            values: req.body
        })
        return; 
    }
    next();
}