const express = require("express");
const router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: './public/uploads/'
});
const user_controller = require('../controllers/user_controller');
const authencation = require("../../middleware/auth_middleware")
const validate = require("../../validate/user_validate")
router.get("/", authencation.authJWT, user_controller.viewUser);

//view detail users
router.get("/:id", authencation.authJWT,user_controller.detailUser);

router.get("/name/:email", authencation.authJWT, user_controller.detailUserByE);

//add users
router.post("/",upload.single('avatar'), validate.checkCreateUser ,user_controller.postAddUser);

//delete users
router.delete("/:id", authencation.authJWT,user_controller.deleteUser);

//update users
router.put("/:id", authencation.authJWT,user_controller.updateUser);
// router.post("/:id", upload.single('avatar'), user_validate.postAddUser ,user_controller.postUpdateUser);

//cmt a post
router.patch("/comment:id", authencation.authJWT,user_controller.cmtPost);
module.exports = router;