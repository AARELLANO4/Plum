const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// load env variable file
require('dotenv').config({path:"./config/keys.env"})

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
const userRoutes = require("./controllers/user");


// MAPs router objects
app.use("/",generalController);
app.use("/user",userRoutes);

// set up server
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("Connected.")
});

// connect to database
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to DB`)
})
.catch((err)=>{
    console.log(`Error code when connecting to database ${err}`)
});