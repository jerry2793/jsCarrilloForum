const express = require('express')
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library')

const clientId = '716519267644-madtrjpocfpeea7bqple7gcg2prn0kns.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

const User = require("./../models/user.model");
const Sections = require("./../models/sections.model");
const Threads = require("./../models/threads.model");

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )



// Traditional native auth

router.post('/login', (req, res) => {
    // Read username and password from request body
    const { email, password } = req.body;

    // Filter user from the users array by email and password
    const user = User.find(u => { return u.email === email && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ email: user.email,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('email or password incorrect');
    }
});

router.post('/signup', (req,res) => {
    /* JSON format: 
    {
        email: 
        pwd:
        firstName:
        lastName: 
        age: optional
        isTeacher: optional (true if teacher district domain)
    }
    */
})

router.post('/signupwithgoogle', (req,res) => {
    const tokenId = req.body.tokenId;
    // console.log(tokenId)
    client.verifyIdToken({idToken:tokenId, audience: clientId}).then(response => {
        const {email_verified, name, email} = response.payload;
        // console.log(response.payload)
        if (email_verified) {
            User.findOne({email}).exec((err, user) => {
                if (err) {
                    // check to see if server is having some wierd issues. 
                    return res.status(500).json({
                        err: "Auto Response: Something had gone wrong retrieving your information from the database... "
                    })
                } else {
                    if (user) {
                        // user already exists in the db
                    } else {
                        // user does not exist in db, so sign up
                    }
                }
            })
        }
    })
})


module.exports = router


// references: 
// here is how to add a check auth middleware
// put somewhere else.
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