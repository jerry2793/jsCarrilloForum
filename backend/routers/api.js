// api calls, contains must and not authenticated routes
// utalize routers. 

// root: /api

const express = require("express")

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded( {extended:true} ) )

router.get('/', (req,res) => {
    res.send("Welcome to the api root of the backend app")
})


router.use('/accounts', require('./auth'))


module.exports = router