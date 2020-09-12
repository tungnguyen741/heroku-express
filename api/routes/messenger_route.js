const express = require('express')
const router = express.Router()

const messenger_controller = require('../controllers/messenger_controller')

router.get('/t/', messenger_controller.messenger);

module.exports = router;

