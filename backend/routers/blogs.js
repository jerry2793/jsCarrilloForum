const express = require("express")

const {Blog, BlogComments, CommentsReplies} = require('../models/blogs.model')

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )


router.get('/find/:q',(req,res) => {
    q = req.params.q
    let qResults = null;
    
    Blog.find()
        .then((blog) => {
            qResults = blog
        })
        .catch(err => console.log('error finding blogs', err))
    
    res.json(qResults)
})

router.post('/add',require('../middlewares/authenticate'), (req,res) => {
    const data = req.body
    data.user = req.user._id
    const newBlog = new Blog(data)
    newBlog.save()
        .then(blog => {
            console.log('created: ',blog)
            res.json(blog)
        })
        .catch(err => console.log('err: ',err))
})

router.post('/comment', require('../middlewares/authenticate'), (req,res) => {
    const data = req.body
    data.user = req.user._id

    const newComment = new BlogComments(data)
    newComment.save()
        .then(comment => {
            console.log('created: ',comment)
            res.status(200)
        })
        .catch(err => console.log('err: ',err))
})

router.post('/reply', require('../middlewares/authenticate'), (req,res) => {
    const data = req.body
    data.user = req.user._id

    const newReply = new CommentsReplies(data)
    newReply.save()
        .then(reply => {
            console.log('created: ',reply)
            res.status(200)
        })
        .catch(err => console.log('err: ',err))
})

module.exports = router