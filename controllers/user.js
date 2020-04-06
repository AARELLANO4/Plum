const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userModel = require("../models/user");
const isAuthenticated = require("../middleware/auth");
const generateDB = require("../middleware/authorization")

// registration route
router.get("/registration",(req,res)=>{
    // registration page
    res.render("user/registration",{

        // main.handleBars
        title: "Registration",
        headerInfo: ""
    });

});

// process registration form when user submits
router.post("/registration", (req,res)=> {

    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password:req.body.password,
        cpassword: req.body.cpassword
    }
    //const {firstName,lastName,email,password,rePassword} = req.body;
 
     const passwordErr = [];
     let fnErr = [];
     let lnErr = [];
     let emailErr = [];
     let count = 0;
 
     if (newUser.firstName == "") {
         fnErr += "You must enter your first name."; 
         count += 1;
     }
     
     if (newUser.lastName == "") {
         lnErr += "You must enter your last name.";
         count += 1;
     }
 
     if (newUser.email == "") {
         emailErr += "You must enter your email."; 
         count += 1;
     }
 
     if (newUser.password == "") {
         passwordErr.push("You must enter your password.");
         count += 1;
     }
     
     if (newUser.cpassword == "") {
         passwordErr.push("You must re-enter your password."); 
         count += 1;
     }
 
     
     if (newUser.cpassword != newUser.password) {
         passwordErr.push("Your passwords must match.");
         count += 1;
     }
 
     if (newUser.password.length < 6) {
         passwordErr.push("Your password must be at least 6-12 characters long.");
         count += 1;
     }
 
     if (newUser.password.match(/^[A-Za-z]+$/) == null || newUser.cpassword.match(/^[0-9]+$/ == null)) {
         passwordErr.push("Password should only contain numbers and letters.");
     }
 
     if (count > 0) {
         res.render("user/registration", {
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             email: req.body.email,
             fnErr: fnErr,
             lnErr: lnErr,
             emailErr: emailErr,
             passwordErr: passwordErr
         });
     }
     else {
         //const {firstName,lastName,email} = req.body;
 
         const newUser = {
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password
        }
    
        const user = new userModel(newUser);
    
        const regError = [];
        userModel.findOne({email:req.body.email})
        .then((dbuser)=>{
            if (dbuser == null){
                user.save()
                .then(()=>{
                    req.session.userInfo = user;
                    res.redirect("/user/dashboard");
                })
                .catch(err=>console.log(`Error when registering new user: ${err}`));
            }
            else {
                emailErr.push("This email has already been registered.")
                res.render("user/registration",{
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    fnErr: fnErr,
                    lnErr: lnErr,
                    emailErr: emailErr,
                    passwordErr: passwordErr,
                    emailErr
                })
            }
        })
        .catch(err=>console.log(`Error when registering new user: ${err}`));
       
         /*
             // using Twilio SendGrid's v3 Node.js Library
             // https://github.com/sendgrid/sendgrid-nodejs
             const sgMail = require('@sendgrid/mail');
             sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
             
             const msg = {
             to: `${email}`,
             from: `aarellano4@myseneca.ca`,
             subject: `Registration Confirmation`,
             html: 
             `
                 Hi ${firstName} ${lastName}! <br>
                 Thank you for choosing <b>Plum!</b> <br>
                 <a href="http://aarellano4web322a2.herokuapp.com/">Click here to validate your email address!</a>
             `,
             };
 
             // asynchronous operation 
             sgMail.send(msg)
             .then(()=> {
                 res.render("dashboard", {
                     title: "Dashboard",
                     headerInfo: "Dashboard",
                     firstName: firstName,
                     lastName: lastName,
                     email: email,
                     success: `Thank you ${firstName} ${lastName}, for joining Plum! We will send you an email shortly to validate your email address.`
                 });
             })
             .catch(err=>{
                 console.log(`Error ${err}`);
             })
             */
     }
          
 });




 // login route
router.get("/login",(req,res)=>{
    // login page
    res.render("user/login",{

        // main.handleBars
        title: "Log-in",
        headerInfo: ""
    });
});

router.post("/login",(req,res)=> {

    const errors =[];

    userModel.findOne({email: req.body.email})
    .then((user)=>{

        if (user == null) {
            errors.push("Your email and/or password is incorrect.");
            res.render("user/login",{
                errors
            })
        }
        else {
            bcrypt.compare(req.body.password, user.password)
            .then((isMatched)=>{
                if (isMatched == true) {
                    req.session.userInfo = user;
                    res.redirect("/user/dashboard");
                }
                else{
                    errors.push("Your email and/or password is incorrect.");
                    res.render("user/login",{
                        email: req.body.email,
                        errors
                    })
                }

            })
            .catch(err=>console.log(`Error: ${err}`));
        }

    })
    .catch(err=>console.log(`Error: ${err}`));

 });

 // PROTECTED PAGES:

 router.get("/dashboard",isAuthenticated,generateDB);

 router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/user/login");

 });

 module.exports = router;