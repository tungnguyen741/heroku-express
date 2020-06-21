const express = require('express')
const router = express.Router()
const login_controller = require("../controllers/login_controller");
const authencation = require("../../middleware/auth_middleware")

router.get('/me', authencation.authJWT, login_controller.viewLogged)
router.post('/', login_controller.postLogin);
router.post('/logout', authencation.authJWT, login_controller.logout)
module.exports = router;