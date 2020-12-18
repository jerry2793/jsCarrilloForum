const mongoose = require("mongoose");

const Schema  = mongoose.Schema;


const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     minlength: 5,
    // },
    email: {
        type: String,
        unique:true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: 'FirstName LastName'
    },
    age: {
        type: Date,
        required: false,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

    resetLink: {
        data: String,
        default: ''
    },
    timestamps: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User