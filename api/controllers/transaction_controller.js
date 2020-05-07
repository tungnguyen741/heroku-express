var Transaction = require("../../Models/transaction.model");
module.exports.indexTransaction = async function(req, res) {
  var transactions = await Transaction.find();
  res.json(transactions);
}