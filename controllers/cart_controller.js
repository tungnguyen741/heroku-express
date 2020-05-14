var Session = require('../Models/session.model');
var Transaction = require('../Models/transaction.model');
module.exports.addToCart = async function(req, res, next) {
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/books');
        return;
    }
    let session = await Session.findById(sessionId);

    let book = session.cart.find(
        cartItem => cartItem.bookId.toString() === bookId
    );

    if (book) {
        book.quantity += 1;
        session.save();
        res.redirect('/books');
    } else {
        await Session.findByIdAndUpdate(sessionId, {
            $push: { cart: { bookId, quantity: 1 } }
        });
        res.redirect('/books');
    }

    var updateTrans = await new Transaction({
        userId: res.locals.user.id,
        bookId,
        isComplete: false
    }).save();

    res.redirect('/books');
}