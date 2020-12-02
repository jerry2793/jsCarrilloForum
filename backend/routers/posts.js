const express = require("express")

const ThreadModel = require("./../models/threads.model")

const router  = express.Router();

router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )

router.get('/', (req,res) => {
    res.send("welcome to the posting page")
});

router.post('/new-thread/', (req,res) => {
    data = req.body;

    // console.log(data);

    const newThread = new ThreadModel({
        username: data.username,
        title: data.title,
        body: data.content,
    })

    res.sendStatus(200);
    // res.send(data)
})

module.exports = router;