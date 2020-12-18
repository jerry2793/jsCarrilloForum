// hostname/api/accounts is the root url

// app authentication related (profile too) stuff goes to here
// make sure to utalize routers too. 

const express = require("express")
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const {OAuth2Client} = require('google-auth-library')
const clientId = process.env.GoogleClientId
const client = new OAuth2Client(clientId)

const User = require("../models/user.model")

const router = express.Router(); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )


const JWT_SECRET = process.env.JWT_TOKEN

// helper functions
function signUserIn(user) {
    const token = jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn:'7d'});
    const { _id, name, email } = user;

    return {token: token, user: { _id, name, email },}
}

// traditional method of auth
router.post('/login', (req,res) => {
    const data = req.body
    User.findOne({email: data.email})
        .then((user) => {
            res.json(signUserIn(user))
        })
        .catch(err => console.log(err))
})

router.post('/update-pwd', require('../middlewares/authenticate'), (req,res) => {
    const data = req.body
    console.log(data)
    User.findByIdAndUpdate(data.user, {password: data.password})
        .then(user => {
            // console.log(user)
        })
        .catch(err => console.log(err))
    res.status(200)
})

router.post('/signup', (req,res) => {
    // handle the sign up api call
    /* Frontend need to format the json data
    {
        email, password, name, 
    }
    */
    const {data} = req.body
    let newUser = new User(data)
    newUser.save()
        .then(user => {
            res.status(200).json({
                tokenId: signUserIn(user),
                userId: user._id
            })
        })
        .catch(err => {console.log(err);res.status(500)})
})

// oauth api
router.post('/signwithgoogle', (req,res) => {
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
                        let isAdmin = false
                        if (email.split('@')[1] === 'k12.srcs.ca.us' || email === 'ruiyang_j2310@srcschools.org') {
                            isAdmin = true
                        } else {isAdmin=false}
                        user = {
                            email: email, 
                            password: pwd,
                            name: name,
                            isAdmin: isAdmin
                        }
                        console.log(user)
                        let newUser = new User(user)

                        newUser.save( (err, data) => {
                            if (err) {
                                console.log(err)
                                res.status(500).json({
                                    err: "Cannot save the user model, server encountered a wiered error"
                                })
                            }

                            console.log(data)
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

router.get("/profile/:id", require('../middlewares/authenticate'), (req,res) => {
    const id = req.params.id

    console.log(req.user)

    Profile.findOne({user:id})
        .then(profile => {
            if (profile) {
                console.log(profile)
                console.log('found profile')
                res.json({profile:profile})
            } else {
                console.log('no profile')
                res.json({profile: null})
            }
        })
        .catch(err => {
            console.log('error retrieving profile', err)
        })

})

module.exports = router