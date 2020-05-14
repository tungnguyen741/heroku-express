var Transaction = require('../Models/transaction.model');
var Book = require('../Models/data.model');
var User = require('../Models/user.model');
var Session = require('../Models/session.model');
module.exports.showBook = async function(req, res) {
    var dataBook = await Book.find();
    var page = parseInt(req.query.page) || 1; //so trang
    var items = 9; // 9 item
    var start = (page - 1) * items;
    var end = page * items;
    var endPage = Math.floor(dataBook.length / items) + 1;

    if (res.locals.user) {
        if (res.locals.user.isAdmin) {
            res.status(200).render("books", {
                books: dataBook.slice(start, end),
                viewAction: true,
                user: res.locals.user,
                page: page,
                endPage: endPage,
                sumCart: res.locals.count
            });
        }
        res.status(200).render("books", {
            books: dataBook.slice(start, end),
            viewAction: false,
            user: res.locals.user,
            page,
            endPage,
            sumCart: res.locals.count
        });
    }

    res.status(200).render("books", {
        books: dataBook.slice(start, end),
        viewAction: false,
        user: dataBook,
        page,
        endPage,
        sumCart: res.locals.count
    });
}
module.exports.showAdd = (req, res) => {
    res.render("add");
};

module.exports.postAddBook = (req, res) => {
    let titleAdded = req.body.titleAdded;
    let descriptionAdded = req.body.descriptionAdded;
    new Book({
            title: titleAdded,
            description: descriptionAdded
        })
        .save()
        .then(res.redirect("/books"));
};

module.exports.deleteBook = async function(req, res) {
    let id = req.params.id;
    await Book.deleteOne({ _id: id });
    await Transaction.deleteOne({ bookId: id })
    res.redirect("/books");

};

module.exports.viewDetail = async function(req, res) {
    let id = req.params.id;
    let dataDetail = await Book.find({ _id: id });
    res.render("detail", { dataDetail });
};

module.exports.updateBook = async function(req, res) {
    let id = req.params.id;
    let dataDetail = await Book.find({ _id: id });
    res.render("update", { dataDetail });
};

module.exports.postUpdateBook = async function(req, res) {
    await Book.updateOne({ _id: req.params.id }, {
        title: req.body.titleUpdate,
        description: req.body.descriptionUpdate
    });

    res.redirect("/books");
};