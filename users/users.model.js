const mongoose = require('mongoose');

const users = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    profile_pic: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    company: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipcode: {
        type: String
    },
    comment: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    status:{
        type:String,
        default: 'pending',
        enum:['pending','accepted','rejected']
    }
});

module.exports = mongoose.model('users', users);