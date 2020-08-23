const Post = require('../../Models/post.model')

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkeyUp,
    api_secret: process.env.APIsecretUp
});

module.exports.viewPost = async function (req, res) {
    try {
      var post = await Post.find();
      res.json(post); 
    } catch (error) {
      res.status(500).send(error);    
    }
  };
  
  //id post,  
module.exports.viewDetailPost = async (req, res) =>{
    try {
       var post = await Post.findById(req.params.id)
       .populate({path: "authorID"})
       .populate("likes")
       .populate({path: "comments.userCommented", model:"User"})
       .exec((err, docs)=>{
          res.send(docs);
      })
      
        
    } catch (error) {
      res.status(500).send(error);
    }
  } 

module.exports.viewPostOfAuthor = async (req, res) =>{
    try {
       var post = await Post.find({"authorID": req.params.user_id});
       res.json(post);
    } catch (error) {
      res.status(500).send(error);
    }
  } 


  module.exports.postArticle = async (req, res) =>{
    try{
        var uploader = await cloudinary.v2.uploader.upload(req.file.path);
        var updateUs = await new Post({
          comments:[],
          likes: [],
          imgPostUrl: uploader.url,
          description: req.body.description,
          authorID: req.body.authorID
        }).save();
        console.log(updateUs, uploader.url);
        res.status(201).send('successful')
     
      }
      catch (error) {
          res.status(500).send(error);
      }
   
  }
  
  module.exports.checkIsLiked = async (req, res) => {
    try {
      var post = await  Post.find({$and: [{"_id" :req.params.user_id}, {"likes":[req.body.id_user_like]} ] })                 
      res.status(201).send(true);
    } catch (error) {
      res.status(500).send(false);
    }
  }
                                                                                                                     
  module.exports.addLikePost = async (req, res, next) =>{
    try {
      var post = await Post.update({_id: req.params.user_id}, {$push: {"likes": req.body.id_user_like} });
      res.status(201).send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  module.exports.unLikePost = async (req, res, next) => {
    try {
      var post = await Post.update({_id: req.params.user_id}, {$pull: {"likes": {$in: [ req.body.id_user_like ]} } });
      res.status(201).send(post);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  module.exports.commentPost = async (req, res) => {
    try {
      var post = await Post.update({_id: req.params.user_id}, {$push: {"comments": req.body } });
      res.status(201).send(post);
    } catch (error) {  
      res.status(500).send(error);
   }
 }