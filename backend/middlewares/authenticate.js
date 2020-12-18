const jwt = require('jsonwebtoken')

const User = require('../models/user.model')


module.exports = (req,res,next) => {
    // check if user is in jwt
    console.log("authenticating...")
    const token = req.headers['authorization']
    if (token === 'undefined') {res.status(403); console.log('undefined token')}

    // console.log(token) // present, not an error

    // const bearerToken = token.split(' ')[1]
    // console.log(bearerToken) // this is the error, it is undefined
    // bearer token is when you add random strings in front of the actual token separated usually with a [space]

    jwt.verify(token, process.env.JWT_TOKEN, (err, authData) => {
        if (err) {res.status(403)} else {
            console.log('authenticated')
            User.findById(authData._id)
                .then(user => {
                    req.user = user
                    console.log(req.user)
                    next()
                })
                .catch(err => res.send("cannot find user account from backend"))
        }
    })
}