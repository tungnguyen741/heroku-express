const express = require("express");
const router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: './public/uploads/'
});



const post_controller = require('../controllers/post_controller');
const authencation = require("../../middleware/auth_middleware")
const validate = require("../../validate/user_validate")
router.get("/" , post_controller.viewPost);

//view detail post 
router.get("/:id", post_controller.viewDetailPost);

//view all post of user
router.get("/:user_id/author", post_controller.viewPostOfAuthor);
//post a article
router.post("/",  upload.single('imgPostUrl') ,post_controller.postArticle);
//like - id user
router.post("/:user_id/like", post_controller.addLikePost ); 

router.post("/:user_id/unlike", post_controller.unLikePost ); 

router.post("/:user_id/isLiked", post_controller.checkIsLiked);

router.post("/:user_id/comment", post_controller.commentPost ); 
module.exports = router;