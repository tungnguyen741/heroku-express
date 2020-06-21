const express = require('express')
const router = express.Router()
const transaction_controller = require("../controllers/transaction_controller");

router.get('/', transaction_controller.indexTransaction);

router.get('/:id', transaction_controller.finishTransaction);

router.post('/', transaction_controller.postCreateTransaction);

router.delete('/:id', transaction_controller.delTransaction);

router.put('/:id', transaction_controller.updateTransaction);

module.exports = router;