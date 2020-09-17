const Post = require('../../Models/post.model')
const User = require('../../Models/user.model')
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
       Post.findById(req.params.id)
       .populate({path: "authorID"})
       .populate("likes")
       .populate({path: "comments.userCommented", model:"User"})
       .exec((err, docs)=>{
         if(err){
           res.status(500).send(err);
         }
         res.send(docs);
      })
  
  } 

module.exports.viewPostOfAuthor = async (req, res) =>{
    try {
      let userAuthor = await User.findOne({"email": req.params.user_id});
      var post = await Post.find({"authorID": userAuthor._id});
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
          authorID: req.body.authorID ,
          datePost: req.body.datePost
        }).save();

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
  
  module.exports.timeLine = (req, res) => {
    try {
        Post.find({}).sort({"datePost" : -1})
        .populate({path: "authorID"})
        .populate("likes")
        .populate({path: "comments.userCommented", model:"User"})
        .exec((err, docs)=>{
        res.status(201).send(docs);
      })
      
    } catch (error) {
      res.status(500).send(error);
   }
 }



//  Post.find({}).sort({"datePost: req.body.datePost": 1}).exec((er,doc) => {
//    if(er){
//     //console.log(er)
//    }
//    //console.log(doc);
//  })
// Post.find({}).sort({"datePost: req.body.datePost": -1})
//         .populate({path: "authorID"})
//         .populate("likes")
//         .populate({path: "comments.userCommented", model:"User"})
//         .exec((err, docs)=>{
//           console.log(docs)
//         })


// User.findOne({"email": "admin"}).then( (userAuthor) => {
//   console.log(userAuthor)
//   Post.find({"authorID": userAuthor._id}).exec((er,doc)=>{
//     if(er){
//       console.log("EROR:", er);
//     }
//     console.log(doc);
//   })
  
// } )


// io.on('connection', (socket) => {
//   console.log('CONNCETED', socket.id)
//   var messAll = [];
//   socket.on('client-send-message',(data)=>{
//        messAll.push(data);
//       socket.broadcast.emit('server-send-message', messAll);
//       console.log(messAll, socket.id);
//   })
// })