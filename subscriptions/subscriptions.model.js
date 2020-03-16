const mongoose = require('mongoose');

const subscriptions = mongoose.Schema({
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    recurring: {
        type: Boolean,
        default: true
    },
    userId:{
        type:String,
        ref:'users'
    }
});

module.exports = mongoose.model('users', subscriptions);