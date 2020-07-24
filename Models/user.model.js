const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
let userSchema = new mongoose.Schema({
	name: String,
	age: String,
	sex: String,
	password: String,
	email: String,
	isAdmin: Boolean,
	wrongLoginCount: Number,
    avatarUrl: String,
    userName: String,
    post: [
        {
        description: String,
        imgPostUrl: String,
        likes:[
            {
                userLiked:{type:Schema.Types.ObjectId, ref:'User'},
            }
    ],
        comments:[
            {
                userCommented:{type:Schema.Types.ObjectId, ref:'User'},
                textCommented: String
            }
    ]
        }],
	tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

// userSchema.pre('save', async function (next) {
//     // Hash the password before saving the user model
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 10)
//     }
//     next()
// })

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}


let User = mongoose.model('User', userSchema, 'users');

module.exports = User;