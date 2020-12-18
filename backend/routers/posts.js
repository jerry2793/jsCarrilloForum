// router root: hostname/posts/
// handles the post requests (like add a blog instance)

const express = require("express")

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )


router.use(require('../middlewares/'))


router.get('/',(req, res) => {
    res.send(`Welcome to the post api, ${req.user.name}, you need to send your access token to post, which would be given automatically if you login with the GUI, it is in your sessionStorage (Hackers: We have XSS security protection, if detected, you will be banned for life)`)
})


module.exports = router