var User = require("../Models/user.model");
var Book = require("../Models/data.model");
var Transaction = require("../Models/transaction.model");
var Session = require("../Models/session.model");
module.exports.indexTransaction = async function(req, res) {
    let books = await Book.find();
    let users = await User.find();
    let transactions = await Transaction.find();
    let session = await Session.findOne({
        _id: req.signedCookies.sessionId
    });
    let bookName = [];
    let amountBook = [];
    let statusBook = [];
    let usersBorrow = [];
    let ssArrFind = session.cart;
    //GUESS
    if (!res.locals.user) {
        console.log("GUESSSSSSSSSSSSSSSSSSSSs");
        ssArrFind.forEach(item => {
            var bookNameFind = books.filter(item2 => {
                return item2.id == item.bookId;
            });
            bookName.push(bookNameFind);
            amountBook.push(item.quantity);
            statusBook.push(!bookNameFind)
        });
        res.render("transaction", {
            bookNameBorrow: bookName.flat(),
            sumItem: amountBook,
            statusBook: statusBook
        });
        return;
    }
    //ADMIN
    var xxx = [];
    if (res.locals.user.isAdmin) {
        console.log("ADMINNNNNNNNNNNNNNN");
        transactions.forEach(item => {
            bookName.push(item.bookId);
            statusBook.push(item.isComplete);
            usersBorrow.push(item.userId);
            xxx.push(item.id);
        });
        var temp = [];
        bookName.forEach(item => {
            var bookNameFind = books.filter(item2 => {
                return item2.id == item;
            });
            temp.push(bookNameFind);
        });
        var temp2 = [];
        usersBorrow.forEach(item => {
            var usersBorrow1 = users.filter(item2 => {
                return item2.id == item;
            });
            temp2.push(usersBorrow1);
            amountBook.push(usersBorrow1.length);
        });
        res.render("transaction", {
            usersBorrow: temp2.flat(),
            statusBook,
            bookNameBorrow: temp.flat(),
            sumItem: amountBook,
            amountBook: xxx,
            saveMore: true
        });
        return;
    }
    //USER
    if (res.locals.user) {
        usersBorrow = users.filter(item => {
            return res.locals.user.id == item.id;
        });
        var userOnTrans = transactions.filter(item => {
            return item.userId == res.locals.user.id
        });
        userOnTrans.forEach(item => {
            var bookNameFind = books.filter(item2 => {
                return item2.id == item.bookId;
            });
            bookName.push(bookNameFind);
            amountBook.push(bookNameFind.length);
            statusBook.push(item.isComplete)
        });
        res.render("transaction", {
            usersBorrow,
            bookNameBorrow: bookName.flat(),
            sumItem: amountBook,
            statusBook
        });
        return;
    }
};
module.exports.createTransaction = async function(req, res) {
    res.render("transaction_create", {
        dataUser: await User.find(),
        dataBook: await Book.find()
    });
};
module.exports.postCreateTransaction = async function(req, res) {
    var bookRecieve = req.body.bookRecieve;
    var userRecieve = req.body.userRecieve;
    var idUserRecieve = await User.findOne({
        name: userRecieve
    });
    var idBookRecieve = await Book.findOne({
        title: bookRecieve
    });
    await new Transaction({
        userId: idUserRecieve.id,
        bookId: idBookRecieve.id,
        isComplete: false
    }).save();
    res.redirect("/transaction");
};
module.exports.finishTransaction = async function(req, res, next) {
    var errors = [];
    var tranIdparam = req.params.tranId;
    try {
        var resultId = await Transaction.findOne({
            _id: tranIdparam
        });

        if (!resultId) {
            errors.push("id " + tranIdparam + " Not Found");
        }
        if (errors.length) {
            res.render("transaction", {
                errors: errors
            });
            return;
        }
        await Transaction.updateOne({
            _id: tranIdparam
        }, {
            isComplete: true
        });
        res.redirect("/transaction");
    } catch (err) {
        console.log(err);
        next(err);
    }
};