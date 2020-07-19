var Transaction = require('../Models/transaction.model');
var Book = require('../Models/data.model');
var User = require('../Models/user.model');
var Session = require('../Models/session.model');
const dataBookPromise = Book.find();

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkeyUp,
    api_secret: process.env.APIsecretUp
});

module.exports.showBook = async function(req, res, next) {
    var page = parseInt(req.query.page) || 1; //so trang
    var items = 9; // 9 item
    var start = (page - 1) * items;
    var end = page * items;
    var loading = false;
   try {
    const dataBook = await dataBookPromise;
    var endPage = Math.floor(dataBook.length / items) + 1;
    if (res.locals.user) {
        if (res.locals.user.isAdmin) {
            res.render("books", {
                books: dataBook.slice(start, end),
                viewAction: true,
                user: res.locals.user,
                page: page,
                endPage: endPage,
                sumCart: res.locals.count,
                loading
            });
        }
        res.render("books", {
            books: dataBook.slice(start, end),
            viewAction: false,
            user: res.locals.user,
            page,
            endPage,
            sumCart: res.locals.count,
            loading
        });
    }

    res.render("books", {
        books: dataBook.slice(start, end),
        viewAction: false,
        user: dataBook,
        page,
        endPage,
        sumCart: res.locals.count,
        loading
    });
    return next();
   } catch (error) {
       console.error(error);
    }
}

module.exports.showAdd = (req, res) => {
    res.render("add");
};

module.exports.postAddBook = async (req, res) => {
    let titleAdded = req.body.titleAdded;
    let descriptionAdded = req.body.descriptionAdded;
    
    try {
        var uploader = await cloudinary.v2.uploader.upload(req.file.path);
       
        await new Book({
            title: titleAdded,
            description: descriptionAdded,
            image: uploader.url
        }).save();
    } catch (err) {
        console.err(err);
    }
 
    res.redirect("/books");
};

module.exports.deleteBook = async function(req, res) {
    let id = req.params.id;
    const bookDelPromise = Book.deleteOne({ _id: id });
    const transDelPromise = Transaction.deleteOne({ bookId: id })
    const bookDel = await bookDelPromise;
    const transDel = await transDelPromise;
    
    res.redirect("/books");

};

module.exports.viewDetail = async function(req, res) {
    let id = req.params.id;
    let dataDetail = await Book.find({ _id: id });
    res.render("detail", { dataDetail, values:req.body });
};

module.exports.updateBook = async function(req, res) {
    let id = req.params.id;
    let dataDetail = await Book.find({ _id: id });
    res.render("update", { dataDetail });
};

module.exports.postUpdateBook = async function(req, res) {
    let titleUpdate = req.body.titleUpdate;
    let descriptionUpdate = req.body.descriptionUpdate;
    if(req.file){
        try {
            var uploader = await cloudinary.v2.uploader.upload(req.file.path);
            var bookUpdate = await Book.updateOne({ _id: req.params.id }, {
                title:  titleUpdate,
                description: descriptionUpdate,
                image: uploader.url
            })
            return res.redirect("/");   
        } catch (error) {
            console.err(error);   
        }
    }
       if(!req.file){
        try {
            var bookUpdate = await Book.updateOne({ _id: req.params.id }, {
                title: titleUpdate,
                description: descriptionUpdate,
                image: res.locals.dataDetail.image
            })
            return  res.redirect("/");
        }   
        catch(err){
            console.err(err);
            }         
        }
 
};

module.exports.searchBook = async function(req, res) {
    let q = req.query.s.trim();    
    var dataBook = await Book.find();
    var page = parseInt(req.query.page) || 1; //so trang
    var items = 9; // 9 item
    var start = (page - 1) * items;
    var end = page * items;
    var endPage = Math.floor(dataBook.length / items) + 1;

    if(!(q.trim())){
        res.render("books", {
            books: 0,
            viewAction: false,
            user: dataBook,
            page,
            endPage,
            numResult: 0,
            valueRecurrent: req.query.s 
        });
        return;
    }
    var dataFiltered = dataBook.filter(product => product.title.toLowerCase().indexOf(q) != -1 ||  product.title.indexOf(q) != -1);


    if (res.locals.user) {
        if (res.locals.user.isAdmin) {
            res.render("books", {
                books: dataFiltered,
                viewAction: true,
                user: res.locals.user,
                page: page,
                endPage: endPage,
                numResult: dataFiltered.length,
                valueRecurrent: req.query.s
            });
        }
        res.render("books", {
            books: dataFiltered,
            viewAction: false,
            user: res.locals.user,
            page,
            endPage,
            numResult: dataFiltered.length,
            valueRecurrent: req.query.s
        });
    }

    if(dataFiltered.length == 0){
        dataFiltered = false
    }
    res.render("books", {
        books: dataFiltered,
        viewAction: false,
        user: dataBook,
        page,
        endPage,
        numResult: dataFiltered.length,
        valueRecurrent: req.query.s
    });
}