const express = require('express');
const router = express.Router();

//Student Response Model
const StudentResponse = require('../Models/StudentResponse');
//Teacher Reponse Model
const TeacherResponse = require('../Models/TeacherResponse');

//Render Home Page
router.get('/', (req, resp) => {
    resp.render('home');
});

//Render Stats Page
router.get('/stats', (req, resp) => {
    resp.render('stats');
});

//Get Student Response
router.post('/studentresponse', (req, resp) => {
    const { fullname, email, number, college, admission_no, product, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8 } = req.body;

    StudentResponse.findOne({ email: email, product: product })
    .then(response => {
        if(response) {
            console.log("Response already submitted");
            resp.redirect('/');
        }
        else {
            var average = (parseInt(answer1) + parseInt(answer2) + parseInt(answer3) + parseInt(answer4) + parseInt(answer5) + parseInt(answer6) + parseInt(answer7) + parseInt(answer8)) / 8;
            console.log(average);
            const newResponse = new StudentResponse({
                name: fullname,
                email: email,
                contact: number,
                college: college,
                admission_no: admission_no,
                product: product,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                answer5: answer5,
                answer6: answer6,
                answer7: answer7,
                answer8: answer8,
                average: average
            });
            newResponse.save();
            console.log(newResponse);
            resp.redirect('/');
        }
    })
    .catch(err => console.log(err));
});

//Get Teacher Response
router.post('/teacherresponse', (req, resp) => {
    const { fullname, email, number, college, employee_id, product, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8 } = req.body;

    TeacherResponse.findOne({ email: email, product: product })
    .then(response => {
        if(response) {
            console.log("Response already submitted");
            resp.redirect('/');
        }
        else {
            var average = (parseInt(answer1) + parseInt(answer2) + parseInt(answer3) + parseInt(answer4) + parseInt(answer5) + parseInt(answer6) + parseInt(answer7) + parseInt(answer8)) / 8;
            average = parseFloat(average).toFixed(2);
            console.log(average);
            const newResponse = new TeacherResponse({
                name: fullname,
                email: email,
                contact: number,
                college: college,
                employee_id: employee_id,
                product: product,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
                answer4: answer4,
                answer5: answer5,
                answer6: answer6,
                answer7: answer7,
                answer8: answer8,
                average: average
            });
            newResponse.save();
            console.log(newResponse);
            resp.redirect('/');
        }
    })
    .catch(err => console.log(err));
});

//Get Student Stats
router.post('/getstudentstats', (req, resp) => {
    const { product } = req.body;
    StudentResponse.find({ product: product })
    .then(response => {
        if(!response) {
            console.log("No responses found");
            resp.send('No responses found');
        }
        else {
            console.log('Success');
            resp.send(response);
        }
    })
    .catch(err => console.log(err));
});

//Get Teacher Stats
router.post('/getteacherstats', (req, resp) => {
    const { product } = req.body;
    TeacherResponse.find({ product: product })
    .then(response => {
        if(!response) {
            console.log("No responses found");
            resp.send('No responses found');
        }
        else {
            console.log('Success');
            resp.send(response);
        }
    })
    .catch(err => console.log(err));
});

module.exports = router;