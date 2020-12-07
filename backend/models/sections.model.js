const mongoose = require("mongoose")
const { Schema } = require("mongoose");


const sectionSchema = new Schema({
    // the creator of the new section
    user: mongoose.Types.ObjectId,

    // actual body of the model instance
    title: {
        type: String,
        required: true,
        default: 'title of the section'
    },
    description: {
        type: String,
        required: false,
        default: 'No Description is set for this section'
    },

    // add a "[]" to indicate to store a list of data
    permittedUsers: [mongoose.Types.ObjectId],

    // metadata
    timestamp: {
        type: Date,
        default: Date.now()
    }
})


const Section = mongoose.model("Section",sectionSchema)

module.exports = Section