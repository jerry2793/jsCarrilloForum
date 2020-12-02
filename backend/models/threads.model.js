const mongoose = require("mongoose")
const { Schema } = require("mongoose");


const forumSections = new Schema({
    user: [mongoose.Types.ObjectId],

})
