const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
let postSchema = new mongoose.Schema({
    comments:[{ 
            userCommented: { type: Schema.Types.ObjectId, ref: "User"},
            textCommented: String
        }],
    likes:[ { type: Schema.Types.ObjectId, ref: "User"} ],
    imgPostUrl: String,
    description: String,
    authorID:{  type: Schema.Types.ObjectId, ref: "User"}
});

let Post = mongoose.model('Post', postSchema, 'Posts');




module.exports = Post;

// _id: mongoose.Schema.Types.ObjectId,
// "comments":[
//     {
//         "userCommented": {
//              type: mongoose.Schema.Types.ObjectId, 
//              ref: 'User'},
//         "textCommented":String
//     } 
// ],
// "likes":[{
//         "userLiked":{ 
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: 'User'}
//     }],
// "imgPostUrl":String,
// "description":String,
// "authorID":{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User'}