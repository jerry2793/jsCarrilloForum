// this is where specific fields will be updated in the db
// call this api maybe when a like is dropped to a comment
// and only need to update a specific field in a model instance

// this is helpful when adding new json onto a model's list field

// make this router the root of '/api/update', and embeded in the 
// API router, not the main index

const express = require("express")

const router = express.Router();


router.get('/', (req,res) => {
    res.send('API endpoint to update specific fields in a model instance gien model name and model id, and the field name')
})

router.post('/:modelName/:id/:fieldName', (req,res) => {
    // first query out the model instance
    // then update
    // send status code or result
})

module.exports = router