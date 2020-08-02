const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const teacherSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
   assignDate:{
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
    role:{
        type: String
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
teacherSchema.pre('find', function (next) {
    this.populate('InstituteId');
    next();
});
teacherSchema.pre('findOne', function (next) {
    this.populate('InstituteId');
    next();
});
const teacher = module.exports = mongoose.model('teacher', teacherSchema);