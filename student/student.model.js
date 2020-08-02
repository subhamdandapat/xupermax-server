const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const studentSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    parents_email:{
        type: String
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    parents_Number: {
        type: String,
        unique: true,
        // required: true
    },
    role:{
        type: String
    },
    gardiansName: {
        type: String
    },
    other_gardiansName: {
        type: String
    },
  
    paid: {
        type: String,
        enum: ['yes', 'no']
    },
    admissionDate:{
        type: String
    },
    profile_pic: {
        type: Schema.ObjectId,
        ref: 'image'
    },
    InstituteId: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    createdBy: {
        type: Schema.ObjectId,
    },
    updatedBy:{
        type: Schema.ObjectId,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    enabled: {
        type: Number,
        default: 1
    }
});
studentSchema.pre('find', function (next) {
    this.populate('InstituteId');
    next();
});
studentSchema.pre('findOne', function (next) {
    this.populate('InstituteId');
    next();
});
const student = module.exports = mongoose.model('student', studentSchema);