const contacts = require('./contacts.model');
const express = require('express');
const router = express.Router();

router.post('/save', function (req, res) {
    let contact = req.body;
    let contact_collection = new contacts(contact);
    contact_collection.save(function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'Contact saved successfully',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Contact not  saved',
                data: error
            })
        }
    })
})

router.get('/single', function (req, res) {
    let contact_id = req.query.contactId;
    contacts.findOne({
        _id: contact_id
    }, function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'Contact got successfully',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Contact could not be found',
                data: error
            })
        }
    })
})

router.get('/list', function (req, res) {
    let type = req.query.type;
    let query = {};
    if (type) {
        query.type = type;
    }
    contacts.find(query, function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'list of contacts',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'list of contacts',
                data: error
            })
        }
    })
})

router.post('/update', function (req, res) {
    let contact = req.body;
    let contact_id = req.query.contactId;
    contacts.findOneAndUpdate({
        _id: contact_id
    }, {
        $set: contact
    }, function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'contact updated',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'contact could not be updated',
                data: error
            })
        }
    })
})

module.exports = router;

