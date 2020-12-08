const express = require('express')
const cookieParser = require('cookie-parser')

const tokens = require('../localStorage/jwtTokens.storage')

const router = express.Router();

// define middlewares
router.use(cookieParser())

router.use((req, res, next) => {
    next();
})

// add in child routers
router.use('/accounts', require('./auth/auth'))
router.use('/posts',require('./posts'))

module.exports = router