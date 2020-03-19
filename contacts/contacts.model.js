const mongoose = require('mongoose');

const contacts = mongoose.Schema({
    type: {
        type: String
    },
    name: {
        type: String
    },
    display_picture: {
        type: String,
        ref: 'image'
    },
    organization_id: {
        type: String,
        ref: 'users'
    },
    appointment: {
        type: String,
        ref: 'appointments'
    },
    phoneNumbers: [
        {
            type: String
        }
    ],
    emails: [
        {
            type: String
        }
    ],
    created_at: {
        type: String,
        default: new Date()
    },
    updated_at: {
        type: String
    },
    connected_contacts: [
        {
            type: String,
            ref: 'contacts'
        }
    ],
    about_me: {
        type: String
    },
    father: {
        type: String
    },
    mother: {
        type: String
    },
    address: {
        type: String
    },
    website: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    medical_concern: {
        type: String
    },
    birthdate: {
        type: String
    },
    marketing_source: {
        type: String
    },
    referred_by: {
        type: String,
        ref: 'contacts'
    },
    payment_method: {
        type: String,
        ref: 'paymentmethods'
    },
    emergency_contact: {
        type: String
    },
    auto_payment: {
        type: Boolean,
        default: false
    },
    rank_size: {
        type: String
    },
    rank: {
        type: String
    },
    assigned_tags: [
        {
            type: String
        }
    ],
    vacation: {
        start_date: {
            type: String
        },
        end_date: {
            type: String
        }
    }
});

module.exports = mongoose.model('contacts', contacts);