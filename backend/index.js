const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config()

const PORT = process.env.PORT || 5000;

console.log(process.env.CONNECT_URI)

// connect to the remote mongodb database
mongoose.connect(
    process.env.CONNECT_URI,
    { useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true }
);
let connection = mongoose.connection;
connection.once("open", () => {
    console.log(`connected to mongodb`)
})

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
// app.use('/posts',require("./routers/posts.js"))
app.use('/auth',require('./routers/authroutes'))
app.use('/api',require("./routers/fetches"))
// app.use('/accounts',require('./routers/auth'))




app.listen(PORT, () => console.log(`http://localhost:${PORT}`) )