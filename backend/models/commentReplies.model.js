const mongoose = require('mongoose')
const { Schema } = require("mongoose");

const replySchema = new Schema({
    user: mongoose.Types.ObjectId,
    // store which comment the reply belongs to
    comment: mongoose.Types.ObjectId,

    reply: {
        type: String,
        required: true,
        default: 'The reply is not written yet'
    },

    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Reply = mongoose.model("Reply",replySchema)

module.exports = Reply