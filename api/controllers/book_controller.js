var Book = require("../../Models/data.model");

module.exports.showBook = async function(req, res) {
  try {
    var books = await Book.find();
    res.json(books); 
  } catch (error) {
    res.status(500).send(error);    
  }
};

module.exports.postAddBook = async (req, res) => {
  try {
    var book = new Book(req.body);
    var result = await book.save();
    res.send(result);
  }
   catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteBook = async (req, res) =>{
  try {
    var result = await Book.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } 
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports.viewDetail = async (req, res) => {
  try {
    var book = await Book.findById(req.params.id);
    res.send(book);
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports.updateBook = async (req, res) => {
  try {
    var book = await Book.findById(req.params.id).exec();
    book.set(req.body);
    var result = await book.save();
    res.send(result);
  }catch (error) {
    res.status(500).send(error);
  }
}