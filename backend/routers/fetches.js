const express = require("express");

const User = require("./../models/user.model");
const Sections = require("./../models/sections.model");
const Threads = require("./../models/threads.model");

const router  = express.Router();


router.get('auth/', (req,res) => {
 User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

// display all the sections available for an authenticated user
router.get('sections/', (req, res) => {
    Sections.find()
        .then(secs => res.send(secs))
        .catch(err => res.status(400).json(`Error: ${err}`)
});

// display all available threads for a given section id and permitted (auth) user
router.get('threads/:id', (req, res) => {
    Threads.find({_id: req.params.id})
        .then(threads => res.send(threads))
        .catch(err => res.status(400).json(`Error: ${err}`)
});

module.exports = router;