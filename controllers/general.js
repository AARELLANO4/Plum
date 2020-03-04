
const express = require('express')
const router = express.Router();


const categoryModel = require("../models/category");
const bestSellModel = require("../models/bestsellers");
const productsModel = require("../models/products");

// home route
router.get("/",(req,res) =>{
    // home page

    res.render("home",{

        // main.handleBars
        title: "Home",
        headerInfo: "Plum",
        category: categoryModel.getAllCategories(),
        bestSellers: bestSellModel.getBestSell()
    });

});

// products route
router.get("/products",(req,res) =>{
    // products page
    res.render("products",{

        // main.handleBars
        title: "Products",
        headerInfo: "Products",
        products: productsModel.getAllProducts()

    });


});

// registration route
router.get("/registration",(req,res)=>{
    // registration page
    res.render("registration",{

        // main.handleBars
        title: "Registration",
        headerInfo: ""
    });

});

// process registration form when user submits
router.post("/registration", (req,res)=> {

   const {firstName,lastName,email,password,rePassword} = req.body;

    const passwordErr = [];
    let fnErr = [];
    let lnErr = [];
    let emailErr = [];
    let count = 0;

    if (firstName == "") {
        fnErr += "You must enter your first name."; 
        count += 1;
    }
    
    if (lastName == "") {
        lnErr += "You must enter your last name.";
        count += 1;
    }

    if (email == "") {
        emailErr += "You must enter your email."; 
        count += 1;
    }

    if (password == "") {
        passwordErr.push("You must enter your password.");
        count += 1;
    }
    
    if (rePassword == "") {
        passwordErr.push("You must re-enter your password."); 
        count += 1;
    }

    
    if (rePassword != password) {
        passwordErr.push("Your passwords must match.");
        count += 1;
    }

    if (password.length < 6) {
        passwordErr.push("Your password must be at least 6-12 characters long.");
        count += 1;
    }

    if (password.match(/^[A-Za-z]+$/) == null || rePassword.match(/^[0-9]+$/ == null)) {
        passwordErr.push("Password should only contain numbers and letters.");
    }

    if (count > 0) {
        res.render("registration", {
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
        const {firstName,lastName,email} = req.body;

        /* === TO TEST DASHBOARD WITHOUT EMAILS ===

       res.render("dashboard", {
            title: "Dashboard",
            headerInfo: "Dashboard",
            firstName: firstName,
            lastName: lastName,
            email: email,
            success: `Thank you ${firstName} ${lastName}, for joining Plum! We will send you an email shortly to validate your email address.`
        }); */

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
    }
    

    
});

// login route
router.get("/login",(req,res)=>{
    // login page
    res.render("login",{

        // main.handleBars
        title: "Log-in",
        headerInfo: ""
    });


});

router.post("/login",(req,res)=> {

    const {email,password} = req.body;
 
    let emailErr = [];
    let count = 0;
 
    // VALIDATE EMAIL AND PASSWORD FOR LOG IN
    if (email == "") {
        emailErr += "Email required to log in.";
        count++;
    }

    let passwordErr = [];

    if (password == "") {
        passwordErr += "Password required to log in.";
        count++;
    }

    // ERRORS FOR VALIDATION
     if (count > 0) {
         res.render("login", {
             email: email,
             emailErr: emailErr,
             passwordErr: passwordErr
         });
     }
     else {
         const {email,password} = req.body;
         res.render("dashboard", {
             success: `Welcome back!`
         });
     }
 });

module.exports = router;