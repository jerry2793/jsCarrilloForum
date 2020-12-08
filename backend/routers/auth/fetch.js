// root url for the router:
// hostname/api/auth/

const express = require('express')

const User = require('../../models/user.model')

const router = express.Router();

// user must be authenticated to be able to get data
router.use(require('../../middlewares/auth'))

// grab the existing user info about their profiles
router.get('/profile', (req, res) => {
    User.findOne({_id: req.user._id})
        .exec((err, user) => {
            if (err) {
                res.status(500).json({err:"cannot retrieve user instance from db, sorry"})
            }
            // return the user model json
            res.json(user)
        })
})


module.exports = router;