/**
 * Created by Piyu on 4/13/2017.
 */
/*var connect = require('connect');
var port = 3000;
connect.createServer
*/
//unregister_student
//
const express = require('express')
const bodyParser= require('body-parser')
var validator = require('express-validator');

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

var mongojs = require('mongojs');
var db = mongojs('placements', ['placements']);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(validator());

           ///For index.html*/
    app.post('/student_reg', (req, res) =>{
        console.log("Student reg page");
        console.log(req.body);
        //console.log(req.body.email);
        req.checkBody('student_department', 'student_department is required in alphabets').isAlpha();
        req.checkBody('student_name', 'student_name is required in alphabets').isAlpha();
        req.checkBody('rollno', 'student roll number is required in integer format').isInt();
        req.checkBody('cgpa', 'CGPA is required in integer format').isInt();

        db.tblstudent.insert(req.body, function(err, doc)
            {
           // console.log(this.req.body.student_name);
                res.redirect('/');
            });
    });
    app.post('/company_reg', (req, res) =>{
        console.log("Company reg page");
        console.log(req.body);//company_name

        req.checkBody('company_name', 'Company_name is required in alphabets').isAlpha();
        req.checkBody('department', 'Department is required in alphabets').isAlpha();
        req.checkBody('ctc', 'CTC is required in number').isInt();
        req.checkBody('type', 'TYPE is required in alphabets').isAlpha();
        req.checkBody('estabYear', 'Establishment Year is required in alphabets').isAlpha();
        req.checkBody('country', 'Country is required in alphabets').isAlpha();
        req.checkBody('natureOfBusiness', 'Nature of Business is required in alphabets').isAlpha();
        req.checkBody('cgpaCutOff', 'CGPA cutoff is required in number').isInt();
        req.checkBody('contact', 'Contact is required in number').isMobilePhone();
        db.tblcompany.insert(req.body, function(err, doc)
            {
           // console.log(this.req.body.student_name);
                res.redirect('/');
            });
    });

    app.get('/student_details', (req, res) => {
        console.log("Student_name");
        db.tblstudent.find().toArray((err, result) => {
         if (err) return console.log(err)
        // renders index.ejs
         res.render('index.ejs', {quotes: result})
        });
    });
    app.get('/company_details', (req, res) => {
        console.log("Company names");
        db.tblcompany.find().toArray((err, result) => {
         if (err) return console.log(err)
        // renders index.ejs
         res.render('company_index.ejs', {quotes: result})
        });
    });
    app.get('/unregister_company', (req, res) => {
        console.log("unregistering Company_name");
        res.render('unregister_company.ejs');
        
    });
//////////to do here
    app.post('/company_unreg', (req, res) => {
        console.log("Unregistered Company_name");
        console.log(req.body.company_name);
        res.render('company_unregistered.ejs');
        //res.render('company_unregistered.ejs');  
        db.tblcompany.remove({'company_name': req.body.company_name})
            
        
    });

/////start here pyush
 app.get('/unregister_student', (req, res) => {
        console.log("unregistering student_name");
        res.render('unregister_student.ejs');
        
    });
/*student_name
student_department
rollno*/
app.post('/student_unreg', (req, res) => {
        console.log("Unregistered Student_name");
        console.log(req.body.student_name);
        res.render('student_unregistered.ejs');
        //res.render('company_unregistered.ejs');  
    db.tblstudent.remove({'student_name': req.body.student_name, 'student_department': req.body.student_department,'rollno': req.body.rollno})
            
        
    });

///student_update
app.get('/update_student', (req, res) => {
        console.log("updatng student_name");
        res.render('update_student.ejs');
        
    });
app.post('/student_upd', (req, res) => {
        console.log("Updated Student");
        console.log(req.body.student_name);
     db.tblstudent.update({rollno: req.body.rollno},{'student_name': req.body.student_name, 'student_department': req.body.student_department,'cgpa':req.body.cgpa,'rollno': req.body.rollno},{upsert: true})
        res.render('update_student.ejs');
    });


app.listen(3000);
console.log("Server running on port 3000")
