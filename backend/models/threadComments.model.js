const mongoose = require('mongoose')
const { Schema } = require("mongoose");

const commentSchema = new Schema({
    user: mongoose.Types.ObjectId,
    // store which thread or topic the comment is pointing to
    thread: mongoose.Types.ObjectId,

    comment: {
        type: String,
        required: true,
        default: 'The reply is not written yet'
    },

    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model("Comment",commentSchema)

module.exports = Comment