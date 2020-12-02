const express = require("express");
const cors = require("cors")

const app = express();

const PORT = 3000;

// middlewares
app.use( (req,res,next) => {
    console.log(`Request from: ${req.ip}.`)
    next()
})

app.use(cors())


app.get('/', (req,res) => {
    res.send("hello world")
})


// routers
app.use('/posts',require("./routers/posts.js"))
app.use('/api',require("./routers/fetches"))




app.listen(PORT, () => console.log(`http://localhost:${PORT}`) )