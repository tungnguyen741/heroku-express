require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(process.env.sessionKey));
const port = process.env.PORT || 3001;
// MONGO DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('CONNECTED Successfully')
});

//SOCKET IO
var server = app.listen(port, () => {
    console.log("OK!!!");
});
var io = require("socket.io")(server);
module.exports = io
const socket = require('./socket.io');
 
// ==== ROUTE ====
const userRoute = require("./route/user_route");
const bookRoute = require("./route/book_route");
const transactionRoute = require('./route/transaction_route');
const loginRoute = require("./route/login_route");
const profileRoute = require("./route/profile_route");
const cartRoute = require("./route/cart_route");
const session = require("./middleware/session_middleware");
const auth_middleware = require("./middleware/auth_middleware");

// ===== API ROUTE ====
const apiBookRoute = require('./api/routes/book_route');
const apiTransactionRoute = require('./api/routes/transaction_route');
const apiLoginRoute = require('./api/routes/login_route');
const apiUserRoute = require('./api/routes/user_route');
const apiPostRoute = require('./api/routes/post_route');
const apiMessengerRoute = require('./api/routes/messenger_route');
//==== check token =====

const authencation = require("./middleware/auth_middleware")
// ==== VIEW ====
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));

//==== USE ROUTE ====
//app.use(session);
app.use("/login", loginRoute);
app.use("/users", session, userRoute);
app.use("/", session, cartRoute, bookRoute);
app.use("/books", session, cartRoute, bookRoute);
app.use("/transaction", session, cartRoute, transactionRoute);
app.use("/profile", session, auth_middleware.checkCookie, profileRoute);
app.use("/cart", session, cartRoute);

//==== API ====
app.use("/api/books" , apiBookRoute);
app.use("/api/transactions" ,apiTransactionRoute);
app.use("/api/login", apiLoginRoute);
app.use("/api/users", apiUserRoute);
app.use("/api/post", apiPostRoute);
app.use("/api/messages", apiMessengerRoute);

// UNIT TEST

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

module.exports = app; // for testing

//log out
var Session = require('./Models/session.model');
app.get("/logout", async function(req, res) {
    res.clearCookie("userId");
    res.clearCookie("sessionId");
    await Session.deleteOne({ sskey: req.signedCookies.sessionId });
    res.redirect("/login");
});

 