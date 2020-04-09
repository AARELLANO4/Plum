
const express = require('express')
const router = express.Router();
const productModel = require("../models/productDB");

const categoryModel = require("../models/category");
const bestSellModel = require("../models/bestsellers");


// home route
router.get("/",(req,res) =>{
    // home page

    productModel.find()
    .then((products)=>{
        const filteredProduct = products.map(product=>{
            return {
                id: product._id,
                prodName: product.prodName,
                prodPrice: product.prodPrice,
                prodDetails: product.prodDetails,
                prodCategory: product.prodCategory,
                prodQuantity: product.prodQuantity,
                prodBestSeller: product.prodBestSeller,
                prodPic: product.prodPic
    
            }

        });

        res.render("home",{
            title: "Home",
            headerInfo: "Plum",
            category: categoryModel.getAllCategories(),
            bestSellers: filteredProduct
        });
    })
    .catch(err=>console.log(`Error when fetching data: ${err}`));
    // res.render("home",{

    //     // main.handleBars
    //     title: "Home",
    //     headerInfo: "Plum",
    //     category: categoryModel.getAllCategories(),
    //     bestSellers: bestSellModel.getBestSell()
    // });

});

module.exports = router;