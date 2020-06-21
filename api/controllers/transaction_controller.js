var Transaction = require("../../Models/transaction.model");

module.exports.indexTransaction = async function(req, res) {
  try {
    var transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports.postCreateTransaction = async (req, res) => {
  try {
    var transaction = new Transaction(req.body);
    var result = await transaction.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports.delTransaction = async (req, res) =>{
  try {
    var result = await Transaction.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  }catch (error) {
    res.status(500).send(error);
  }
}

//detail transaction
module.exports.finishTransaction = async (req, res) => {
  try {
    var transaction = await Transaction.findById(req.params.id);
    res.send(transaction);
  }catch (error) {
    res.status(500).send(error);
  }
}

module.exports.updateTransaction = async (req, res) =>{
  try {
    var transaction = await Transaction.findById(req.params.id).exec();
    transaction.set(req.body);
    var result = await transaction.save();
    res.send(result);
  }catch (error) {
    res.status(500).send(error);
  }
}