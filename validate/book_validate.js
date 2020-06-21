const Book = require('../Models/data.model')
module.exports.postBook =  (req, res, next) =>{
    var titleAdded = req.body.titleAdded;
    var descriptionAdded = req.body.descriptionAdded;
    var avatarBook = req.body.avatarBook;

    if(!titleAdded || !descriptionAdded || !req.file){
        res.render('add',{
            errors: ["Không được bỏ trống các ô"],
            values: req.body,
            dataDetail
        })
        return; 
    }
    next();
}

module.exports.updateBook = async (req, res, next) =>{
    
    //data book detail
    let dataDetail = await Book.find({_id: req.params.id});
    var titleAdded = req.body.titleAdded;
    var descriptionAdded = req.body.descriptionAdded;
    var avatarBook = req.body.avatarBook;
    console.log(dataDetail);
    if(titleAdded=="" || descriptionAdded=="" || !req.file){
        res.render("update",{dataDetail, errors: ["Không được để trống các ô"]});
    }
    next();
}