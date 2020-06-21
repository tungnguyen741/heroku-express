const express = require("express");
const router = express.Router();
const book_controller = require('../controllers/book_controller');
//show api books
router.get("/", book_controller.showBook);
 
//add books
router.post("/", book_controller.postAddBook);

//delete books
router.delete("/:id", book_controller.deleteBook);

//view detail books
router.get("/:id", book_controller.viewDetail);

//update books
router.put("/:id", book_controller.updateBook);
 
module.exports = router;
