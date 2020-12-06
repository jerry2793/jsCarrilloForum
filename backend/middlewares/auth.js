import User from '../models/user.model'


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

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


export default authenticateJWT;