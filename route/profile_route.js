const express = require('express')
const router = express.Router()
const profile_controller = require("../controllers/profile_controller");
const profile_validate = require('../validate/profile_validate');

var multer = require('multer');
var upload = multer({
    dest: ''
});
router.get("/:id", profile_controller.indexProfile);
router.post("/:id", upload.single('avatar'), profile_validate.postAddProfile, profile_controller.postProfile);
module.exports = router;