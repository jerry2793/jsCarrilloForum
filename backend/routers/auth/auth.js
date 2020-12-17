const express = require('express')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library')

const clientId = '716519267644-madtrjpocfpeea7bqple7gcg2prn0kns.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

const User = require("../../models/user.model");
const Sections = require("../../models/sections.model");
const Threads = require("../../models/threads.model");

const router = express.Router();


// jwt server secret that the client must match (access token)
const JWT_SECRET = process.env.JWT_TOKEN

router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )
// router.use(expressJwt({
//     secret: JWT_SECRET,
//     algorithms: ['RS256']
// }))





// Traditional native auth

// login with the native button
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


// user signups for both oauth and traditional auth
// OAuth: pass in the email and pwd along with the 
// data from the profile page collected. 
router.post('/signup', (req,res) => {
    /* JSON format: 
    {
        email: 
        pwd:
        firstName:
        lastName: 
        age: optional
        // the below field is auth added with oauth
        isTeacher: optional (true if teacher is district domain)
    }
    */

    const data = req.body

    // let newUser = new User({
    //     email: data.email,
    //     pwd: data.pwd,
    //     name: data.name,
    //     age: data.age,
    //     isTeacher: data.isTeacher,
    // })

    // just put the data directly into the model
    let newUser = new User(data)

    newUser.save( (err, data) => {
        if (err) {
            res.status(500).json({err:"Cannot save user to the database"})
        } else {
            // Sign the user in
            // what if the user is already authenticated with Oauth?
            
            const token = jwt.sign({_id: data._id}, JWT_SECRET, {expiresIn:'7d'});
            const { _id, name, email } = data;

            res.json({
                token: token,
                user: { _id, name, email }
            })
        }
    } )
})

// the signin with google button route
router.post('/signupwithgoogle', (req,res) => {
    const tokenId = req.body.tokenId;
    // console.log(tokenId)
    client.verifyIdToken({idToken:tokenId, audience: clientId}).then(response => {
        const {email_verified, name, email} = response.payload;
        console.log(name)
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
                        // console.log('oauth got from existing db')
                        const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn:'7d'});
                        const { _id, name, email } = user;

                        res.json({
                            token: token,
                            user: { _id, name, email },
                            // isFirstTimer: true
                        })
                    } else {
                        // user does not exist in db, so sign up
                        // set a default password for a new user
                        console.log('registering a new user')
                        let pwd = JWT_SECRET;
                        // const {firstName, lastName} = name.split()

                        // add isTeacher privellige to teacher organization address in email
                        let isTeacher;
                        if (email.split("@")[1] === 'srcs.k12.ca.us') {
                            isTeacher = true;
                        } else {
                            isTeacher = false;
                        }
                        let newUser = new User({
                            email: email, 
                            password: pwd,
                            name: name,
                            isTeacher: isTeacher
                        })

                        newUser.save( (err, data) => {
                            if (err) {
                                res.status(500).json({
                                    err: "Cannot save the user model, server encountered a wiered error"
                                })
                            }

                            // sign a user in
                            const token = jwt.sign({_id: data._id}, JWT_SECRET, {expiresIn:'7d'});
                            const { _id, name, email } = data;

                            res.json({
                                token: token,
                                user: { _id, name, email },
                                isFirstTimer: true,
                            })
                            
                        } )
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