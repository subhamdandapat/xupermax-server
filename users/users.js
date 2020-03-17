const users = require('./users.model');
const express = require('express');
const router = express.Router();
// const sms = require('./../../helpers/sendsms')
const nodemailer = require("nodemailer");

//send OTP

router.post('/registeruser', (req, res) => {
    let email = req.body.email;
    console.log(email)
    users.findOne({ email: email }, function (error, success) {
        console.log(error, success)
        if (!error && success != null) {
            res.status(200).json({
                error: true,
                message: 'This email is already registered',
                data: error
            })
        } else {

            let users_collection = new users(req.body);
            users_collection.save(function (error, success) {
                console.log(error, success)
                if (!error & success != null) {
                    let _id = success._id;
                    let link = 'https://api.xupermax.com/apis/users/verifyuser?_id=' + _id;
                    sendEmail('Xupermax', email, 'Verification Link', link, null);
                    res.status(200).json({
                        error: true,
                        message: 'User has been registered. Verification email has been sent to ' + email,
                        data: success
                    })
                } else {
                    res.status(200).json({
                        error: true,
                        message: 'This email is already registered',
                        data: error
                    })
                }
            })

        }
    })
});


router.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    users.findOne({ email: email, password: password }, function (error, success) {
        if (!error && success != null) {
            if (success.verified == false) {
                res.status(200).json({
                    error: true,
                    message: 'User not verified. Please check your email to verify',
                    data: success
                })
            } else {
                if (success.status == 'accepted') {
                    res.status(200).json({
                        error: false,
                        message: 'User logged in successfully',
                        data: success
                    })
                } else if (success.status == 'rejected') {
                    res.status(200).json({
                        error: true,
                        message: 'Your account request has been rejected by admin',
                        data: success
                    })
                } else {
                    res.status(200).json({
                        error: false,
                        message: 'Your account is pending approval.',
                        data: success
                    })
                }
            }
        } else {
            res.status(200).json({
                error: true,
                message: 'No user found with this credential',
                data: error
            })
        }
    })
})


router.post('/sendverificationlink', function (req, res) {
    let user_id = req.body.email;
    users.findOne({ email: user_id }, function (error, success) {
        if (!error & success != null) {
            let _id = success._id;
            let link = 'https://api.xupermax.com/apis/users/verifyuser?_id=' + _id;
            sendEmail('Xupermax', user_id, 'Verification Link', link, null)
            res.status(200).json({
                error: false,
                message: 'Verification link has been sent',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'No user found with this email',
                data: error
            })
        }
    })
})

router.get('/verifyuser', function (req, res) {
    let user_id = req.query._id;
    users.findOneAndUpdate({ _id: user_id }, { $set: { verified: true } }, function (error, success) {
        console.log(error, success)
        if (!error & success != null) {
            res.status(200).json({
                error: false
            })
        } else {
            res.status(200).json({
                error: true
            })
        }
    })
})


router.get('/requests', function (req, res) {
    users.find({ status: 'pending', verified: true }, function (error, success) {
        if (!error && success != null) {
            res.status(200).json({
                error: false,
                message: 'Users requests list got successful',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Can not get users request list',
                data: error
            })
        }
    })
})


router.post('/accept', function (req, res) {
    let user_id = req.query._id;
    users.findOneAndUpdate({ _id: user_id }, { $set: { status: 'accepted' } }, function (error, success) {
        if (!error & success != null) {
            let email = success.email;
            sendEmail('Xupermax', email, 'Request Accepted', 'Your request has been accepted. Please login', null);
            res.status(200).json({
                error: false,
                message: 'Request has been accepted',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Error accepting the request',
                data: error
            })
        }
    })
})

router.post('/reject', function (req, res) {
    let user_id = req.query._id;
    users.findOneAndUpdate({ _id: user_id }, { $set: { status: 'rejected' } }, function (error, success) {
        if (!error & success != null) {
            let email = success.email;
            sendEmail('Xupermax-Admin', email, 'Request Rejected', 'Your request has been rejected. Please contact admin', null);
            res.status(200).json({
                error: false,
                message: 'Request has been rejected',
                data: success
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Error accepting the request',
                data: error
            })
        }
    })
})

function sendEmail(from, to, subject, text, html) {
    return new Promise(function (resolve, reject) {
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'bot.brainless@gmail.com', // generated ethereal user
                pass: 'Brainless@333' // generated ethereal password
            }
        });

        let mailOptions = {
            from: from ? from + '<bot.brainless@gmail.com>' : '"Brainless 👻" <bot.brainless@gmail.com>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html
        }

        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                reject(error)
            } else {
                resolve(response)
            }
        });
    });
}

module.exports = router;

