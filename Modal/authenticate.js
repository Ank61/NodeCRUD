const { Token } = require('graphql')
const mongoose = require('mongoose')
const schema = mongoose.Schema

const authenticationUser = new schema({
    email : {
        type : String
    },
    password : {
        type:String
    },
    token : {
        type :String
    }
}) 
const fetchAuth = mongoose.model("auth", authenticationUser);
module.exports =fetchAuth ; 