var express = require('express');
var router = express.Router();
const student = require('./student.model');
const Institute = require('../users/users.model');



/* Api to create student */
router.post('/create', (request, response) => {
    let createResponse = {}
    let data = new student({
        name: request.body.name,
        email: (request.body.email).toLowerCase(),
        parents_email: request.body.parents_email,
        phoneNumber: request.body.phoneNumber,
        parents_Number: request.body.parents_Number,
        gardiansName: request.body.gardiansName,
        other_gardiansName: request.body.other_gardiansName,
        paid: request.body.paid,
        admissionDate: request.body.admissionDate,
        profile_pic: request.body.profile_pic,
        role:'student',
        InstituteId: request.body.InstituteId

    });
    Institute.findById({ _id: data.InstituteId }, (error, result) => {
        if (!error && result != null) {
            data.save((stuerr, stures) => {
                console.log('stures', stures);
                console.log('stuerr', stuerr);
                if (stuerr) {
                    createResponse.error = true;
                    createResponse.message = `Error :` + error.message;
                    response.status(200).json(createResponse);
                } else if (stures) {
                    createResponse.error = false;
                    createResponse.data = stures;
                    createResponse.message = ` Student Registered successfully.`;
                    response.status(200).json(createResponse);

                }
            })
        }
        else {
            createResponse.error = true;
            createResponse.message = `Error :` + error.message + 'Institute not Found';
            response.status(200).json(createResponse);
        }
    })


});

/* Api to Get list of student*/
router.get('/list', (request, response) => {
    let getResponse = {};
    console.log('listt')
    student.find({}, (error, result) => {
        console.log('enter')
        console.log('error...', error);
        console.log('result...', result)

        if (!error && result != null) {
            getResponse.error = false;
            getResponse.data = result;
            getResponse.count = result.length;
            getResponse.message = ` List get successfully.`;
            response.status(200).json(getResponse);
        } else {
            getResponse.error = true;
            getResponse.data = [];
            getResponse.message = `Error :` + error.message;
            response.status(200).json(getResponse);
        }
    })
})
/* Api to Get list of student by instituteId*/
router.get('/studentByInstitute',async (request, response) => {
    let getResponse = {};
    let page = request.query.page ? parseInt(request.query.page) : 1;
    let resPerPage = request.query.perpage ? parseInt(request.query.perpage) : 10;
    let studentList = await Institute.count({ _id: request.query.InstituteId });
    let numOfPages = Math.ceil(studentList / resPerPage);
    student.find({ InstituteId: request.query.InstituteId }).skip((resPerPage * page) - resPerPage)
        .limit(resPerPage).exec((error, result) => {
                console.log('error...', error);
                console.log('result...', result)
                if (!error && result != null) {
                    getResponse.error = false;
                    getResponse.data = result;
                    getResponse.count = result.length;
                    getResponse.numOfPages = numOfPages;
                    getResponse.page = page;
                    getResponse.message = ` List get successfully.`;
                    response.status(200).json(getResponse);
                } else {
                    getResponse.error = true;
                    getResponse.data = [];
                    getResponse.message = `Error :` + error.message;
                    response.status(200).json(getResponse);
                }
            
        })
})

//update student
router.put('/update', (request, response) => {
    console.log('request.body', request.body)
    let _id = request.body._id
    let assistantResponse = {}
    student.findById({ _id: _id }, (error, result) => {
        if (error && result == null) {
            assistantResponse.error = true;
            assistantResponse.message = `Error :` + error.message;
            response.status(200).json(assistantResponse);
        }
        else {
            result.profile_pic = (request.body.profile_pic ? (request.body.profileImage) : result.profileImage);
            result.other_gardiansName = (request.body.other_gardiansName ? (request.body.other_gardiansName) : result.other_gardiansName);
            result.save((error, result) => {
                if (error) {
                    assistantResponse.error = true;
                    assistantResponse.message = `Error :` + error.message;
                    response.status(200).json(assistantResponse);
                }
                else {
                    assistantResponse.error = false;
                    assistantResponse.data = result;
                    assistantResponse.message = `profile updated successfully.`;
                    response.status(200).json(assistantResponse);
                }
            })
        }
    });

})

router.delete('/delete', (request, response) => {
    console.log('fashion delete by id');
    let sentresponse = {};
    let id = request.query.id;      // id is query name varaible name
    student.findOneAndRemove({ _id: id }, (error, result) => {
        //send an empty object to find all thing from whole collection
        console.log('delete error',error)
        console.log(result)
        if (error) {
            sentresponse.error = true;
            sentresponse.message = 'Error:' + error.message;
            response.status(200).json(sentresponse);                // 500 to show error status

        }
        else if (result) {
            sentresponse.error = false;
            sentresponse.message = "Student deleted successfully";
            sentresponse.data = result;
            response.status(200).json(sentresponse);         //200 sent if error not present
        }
        else if (error == null && result == null) {
            sentresponse.error = true;
            sentresponse.message = 'Error::' + "Id doesn't exists";
            response.status(200).json(sentresponse);
        }
    })
})






module.exports = router;