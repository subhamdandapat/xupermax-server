const mongoose = require('mongoose');

const paymentmethods = mongoose.Schema({
    name: {
        type: String
    },
    cardno: {
        type: String
    },
    cvv: {
        type: Boolean,
        default: true
    },
    expmonth: {
        type: String
    },
    expyear: {
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
    zip: {
        type: String
    },
    automatic: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        ref: 'users'
    }
});

module.exports = mongoose.model('paymentmethods', paymentmethods);