var Book = require("../../Models/data.model");
module.exports.showBook = async function(req, res) {
  var books = await Book.find();

  res.json(books);
};
