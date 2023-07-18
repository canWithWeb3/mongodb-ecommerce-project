const jwt = require("jsonwebtoken")
const User = require("../models/user")

module.exports = async function(req, res, next) {
    res.locals.csrfToken = "req.csrfToken()"

    res.locals.isAuth = false
    res.locals.username = ""
    res.locals.userProducts = 0
    res.locals.isAdmin = false

    const token = req.session.authToken
    if(token){
        const decodedToken = jwt.verify(token, "jwtPrivateKey")
        if(decodedToken._id){
            const user = await User.findOne({ _id: decodedToken._id })
            if(user){
                res.locals.isAuth = true
                res.locals.username = user.username
                res.locals.userProducts = user.products.length
                res.locals.isAdmin = user.isAdmin
            }
        }
    }

    next()
}