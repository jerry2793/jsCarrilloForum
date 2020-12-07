const mongoose = require("mongoose")
const { Schema } = require("mongoose");


const threadSchema = new Schema({
    user: mongoose.Types.ObjectId,

    // store the comments of the thread
    comments: [mongoose.Types.ObjectId],
})

const Thread = mongoose.model("Thread",threadSchema)

module.exports = Thread