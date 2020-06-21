var User = require('../Models/user.model'); 
const jwt = require('jsonwebtoken');
 module.exports.checkCookie = async function (req, res, next){
	if(! req.signedCookies.userId){
		res.redirect('/login');
		return;
	}
	let user = await User.findById(req.signedCookies.userId);
	
	if (!user) {
		res.redirect("/auth/login");
		return;
	}

	next();
}

module.exports.authJWT = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}