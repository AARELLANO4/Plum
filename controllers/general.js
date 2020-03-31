
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





module.exports = router;