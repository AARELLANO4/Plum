
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

   // const {firstName,lastName,email,password,rePassword} = req.body;

    const errorMessages = [];

    if (req.body.firstName == "") {
        errorMessages.push("You must enter your first name."); 
    }
    
    if (req.body.lastName == "") {
        errorMessages.push("You must enter your last name.");
    }

    if (req.body.email == "") {
        errorMessages.push("You must enter your email."); 
    }

    if (req.body.password == "") {
        errorMessages.push("You must enter your password.");
    }
    
    if (req.body.rePassword == "") {
        errorMessages.push("You must re-enter your password."); 
    }

    
    if (req.body.rePassword != req.body.password) {
        errorMessages.push("Your passwords must match.");
    }

    if (req.body.password.length < 8) {
        errorMessages.push("Your password must be at least 8 characters");
    }

    if (errorMessages.length > 0) {
        res.render("registration", {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            errors: errorMessages
        });
    }
    else {
        const {firstName,lastName,email} = req.body;
        res.render("dashboard", {
            title: "Dashboard",
            headerInfo: "Dashboard",
            firstName: firstName,
            lastName: lastName,
            email: email,
            success: `Thank you ${firstName} ${lastName}, for joining Plum! We will send you an email shortly to validate your email address.`
        });
    }
    /*
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    
    const msg = {
    to: `aarellano596@gmail.com`,
    from: `${email}`,
    subject: `Registration Confirmation`,
    html: 
    `
        Hi ${firstName} ${lastName}!
        Thank you for choosing <b>Plum!</b>
    `,
    };

    // asynchronous operation 
    sgMail.send(msg)
    .then(()=> {
        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    })
    */
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
 
    const errorMessages = [];
 
    if (email == "") {
        errorMessages.push("Email required to log in.")
    }

    if (password == "") {
        errorMessages.push("Password required to log in.")
    }

 
     if (errorMessages.length > 0) {
         res.render("login", {
             email: email,
             errors: errorMessages
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