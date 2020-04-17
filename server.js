const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const mongoStore = require('connect-mongo')(session);

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

// session middleware
app.use(session({
    secret: `${process.env.SECRET}`,
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 180 * 60 * 1000 } // 3hrs
}));


// load controllers
const generalController = require("./controllers/general");
const userRoutes = require("./controllers/user");
const productRoutes = require("./controllers/product")

app.use((req,res,next)=>{
    // create global template variable
    res.locals.session = req.session;
    res.locals.user = req.session.userInfo;
    
    next();
})

app.use((req,res,next)=>{
    if(req.query.method=="PUT")
    {
        req.method="PUT";
    }
    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})

app.use(fileUpload());


// MAPs router objects
app.use("/",generalController);
app.use("/user",userRoutes);
app.use("/product",productRoutes); 

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