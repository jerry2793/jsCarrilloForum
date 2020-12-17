const express = require("express")

const User = require("../models/user.model")
const SectionModel = require("../models/sections.model")
const ThreadModel = require("./../models/threads.model")

const router  = express.Router();

router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )

// remember to use the isAuenticated middleware
router.use(require('../middlewares/auth'))
// use the middle ware to update the req.user to a usermodel
router.use( (req, res, next) => {
    User.findOne({_id:req.user._id}).exec(err, user => {
        if (err) {
            res.status(400).json({err:"cannot find the user model from existing database"})
        } else {
            req.user = user
            console.log(user)
            next()
        }
    })
} )

router.get('/', (req,res) => {
    res.send("welcome to the posting page")
});

// open up a new section for teacher only
router.post('/new-section', (req, res) => {
    if (req.user.isTeacher) {
        let newSection = new SectionModel(req.body)

        newSection.save( err => {
            if (err) {
                res.status(500).json({err:"Cannot save the db instance"})
            }
        })
    } else {
        res.status(403).json({err: "This is not a registered teacher account, Cannot give permission to open a new section"})
    }
})

// open up a new discussion thread
router.post('/new-thread/', (req,res) => {
    data = req.body;

    // console.log(data);

    const newThread = new ThreadModel({
        username: data.username,
        title: data.title,
        body: data.content,
    })

    newThread.save( err => {
        if (err) {
            res.status(500).json({err:`Cannot save new thread request into the database... ${err}`})
        }
    } )

    res.sendStatus(200);
    // res.send(data)
})


module.exports = router;