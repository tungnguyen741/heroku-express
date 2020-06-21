const express = require("express");
const router = express.Router();
const book_controller = require('../controllers/book_controller');
const validateBook = require("../validate/book_validate");
//upload file
var multer = require('multer');
var upload = multer({
    dest: './public/uploads/'
});
//show books
router.get("/", book_controller.showBook);
//show add books
router.get("/add", book_controller.showAdd);
//add books
router.post("/add", upload.single('avatarBook'), validateBook.postBook , book_controller.postAddBook);
//delete books
router.get("/delete/:id", book_controller.deleteBook);
//view books
router.get("/detail/:id", book_controller.viewDetail);
//search books
router.get("/search", book_controller.searchBook);
//update books
router.get("/update/:id",    book_controller.updateBook);
router.post("/update/:id",upload.single('avatarBook'), validateBook.updateBook , book_controller.postUpdateBook);
module.exports = router;