const User = require('../models/user.model')

const accessTokenSecret = process.env.JWT_TOKEN

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers;

    if (authHeader) {
        const {token} = authHeader;

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // notice it adds a req.user attribute
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


module.exports = authenticateJWT;