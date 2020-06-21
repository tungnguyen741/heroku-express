const express = require("express");
const router = express.Router();
const book_controller = require('../controllers/book_controller');
//show api books
router.get("/", book_controller.showBook);
 
//view detail books
router.get("/:id", book_controller.viewDetail);

//add books
router.post("/", book_controller.postAddBook);

//update books
router.put("/:id", book_controller.updateBook);
 
//delete books
router.delete("/:id", book_controller.deleteBook);

module.exports = router;