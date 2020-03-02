const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')

// models


const app = express();

// set handlebars as the template engine
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

// static assets
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// load controllers
const generalController = require("./controllers/general");
app.use("/",generalController);


// set up server
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Connected.")
});