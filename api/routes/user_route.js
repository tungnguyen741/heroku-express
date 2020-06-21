const express = require("express");
const router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: './public/uploads/'
});
const user_controller = require('../controllers/user_controller');

router.get("/", user_controller.viewUser);

//view detail users
router.get("/:id", user_controller.detailUser);

//add users
router.post("/",upload.single('avatar'), user_controller.postAddUser);

//delete users
router.delete("/:id", user_controller.deleteUser);

//update users
router.put("/:id", user_controller.updateUser);
// router.post("/:id", upload.single('avatar'), user_validate.postAddUser ,user_controller.postUpdateUser);

module.exports = router;