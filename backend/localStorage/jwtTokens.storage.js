const mongoose = require('mongoose')

const User = require("../models/user.model")

module.exports = class {
    constructor () {
        this.tokens = {}
    }
    append = (token, queryMethod) => {
        User.findOne(queryMethod)
            .exec( err, user => {
                if (err) {
                    // handle error but unlikely
                    return false
                }
                this.tokens[token] = user
                return true
        })
    }
    query = (q, findToken=false) => {
        if (findToken) {
            // if want to query out the token of a user
            let value = q;
            return Object.keys(object).find(key => object[key] === value);
        } else {
            return this.tokens[q]
        }
    }
    delete = (q, findWithToken=true) => {
        if (findWithToken) {
            delete this.tokens[q]
            return true
        } else {
            let token = this.query(q,true)
            delete this.tokens[token]
            return true
        }
    }
}