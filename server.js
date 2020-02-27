const express = require("express");
const exphbs = require("express-handlebars");

// models
const categoryModel = require("./models/category");
const bestSellModel = require("./models/bestsellers")
const productsModel = require("./models/products")

const app = express();

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

app.use(express.static("public"));

app.get("/",(req,res) =>{
    // home page
    res.render("home",{

        // main.handleBars
        title: "Home",
        headerInfo: "Plum",
        category: categoryModel.getAllCategories(),
        bestSellers: bestSellModel.getBestSell()
    });

});

app.get("/products",(req,res) =>{
    // products page
    res.render("products",{

        // main.handleBars
        title: "Products",
        headerInfo: "Products",
        products: productsModel.getAllProducts()

    });


});

app.get("/registration",(req,res)=>{
    // registration page
    res.render("registration",{

        // main.handleBars
        title: "Registration",
        headerInfo: ""
    });

});

app.get("/login",(req,res)=>{
    // login page
    res.render("login",{

        // main.handleBars
        title: "Log-in",
        headerInfo: ""
    });


});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("Connected.")
});