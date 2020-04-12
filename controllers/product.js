const express = require('express');
const router = express.Router();
//const isAuthenticated = require("../middleware/auth");
const isIC = require("../middleware/ICauth");
const path = require("path");


const productsModel = require("../models/products");
const productModel = require("../models/productDB");


// products route
router.get("/products",(req,res) =>{
    // products page

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
                prodPic: product.prodPic
            }

        });

        res.render("inventory/products",{
            products: filteredProduct
        });
    })
    .catch(err=>console.log(`Error when fetching data: ${err}`));

    // res.render("inventory/products",{
    //     title:"Products",
    //     headerInfo: "Products",
    //     products: productsModel.getAllProducts()
    // })

});

router.post("/products",(req,res)=>{
    const prodCategory = req.body.prodCategory;
    productModel.find({prodCategory: prodCategory})
    .then((products)=>{
        const filteredProduct = products.map(product=>{
            return {
                id: product._id,
                prodName: product.prodName,
                prodPrice: product.prodPrice,
                prodDetails: product.prodDetails,
                prodCategory: product.prodCategory,
                prodQuantity: product.prodQuantity,
                prodPic: product.prodPic
            }

        });

        res.render("inventory/products",{
            products: filteredProduct
        });
    })
    .catch(err=>console.log(`Error when fetching data: ${err}`));
})

router.get("/addInventory",isIC,(req,res)=>{
    res.render("inventory/inventoryForm")
})

router.post("/addInventory",(req,res)=>{

    let picErr = [];
    let nameErr = [];
    let priceErr = [];
    let detailErr = [];
    let quantityErr = [];

    let count = 0;

    const newProduct = {
        prodName: req.body.prodName,
        prodPrice: req.body.prodPrice,
        prodDetails: req.body.prodDetails,
        prodCategory: req.body.prodCategory,
        prodQuantity: req.body.prodQuantity,
        prodBestSeller: req.body.prodBestSeller
    }

    console.log(req.files.prodPic.mimetype);
    if (req.files.prodPic.mimetype != "image/png") {
        picErr += "File MUST be an image format.";
        count += 1;
    }

    if (newProduct.prodName == "") {
        nameErr += "Product Name must be entered.";
        count += 1;
    }

    if (newProduct.prodPrice <= 0) {
        priceErr += "Product Price cannot be zero.";
        count += 1;
    }

    if (newProduct.prodDetails == "") {
        detailErr += "Product Details must be entered.";
        count += 1;
    }

    if (newProduct.prodQuantity < 0) {
        quantityErr += "Product Quantity cannot be less than zero.";
        count += 1;
    }

    if (count > 0) {
        res.render("inventory/inventoryForm",{
            prodName: req.body.prodName,
            prodDetails: req.body.prodDetails,
            prodCategory: req.body.prodCategory,
            picErr: picErr,
            nameErr: nameErr,
            priceErr: priceErr,
            detailErr: detailErr,
            quantityErr: quantityErr
        })
    }

    else {
        const newProduct = {
            prodName: req.body.prodName,
            prodPrice: req.body.prodPrice,
            prodDetails: req.body.prodDetails,
            prodCategory: req.body.prodCategory,
            prodQuantity: req.body.prodQuantity,
            prodBestSeller: req.body.prodBestSeller
        }

        const product = new productModel(newProduct);
    
        product.save()
        .then((product)=>{
            req.files.prodPic.name = `prodPic_${product._id}${path.parse(req.files.prodPic.name).ext}`;
                req.files.prodPic.mv(`public/uploads/${req.files.prodPic.name}`)

                .then(()=>{
                    productModel.updateOne({_id:product._id},{
                        prodPic: req.files.prodPic.name
                    })
                    .then(()=>{
                        res.redirect(`/product/inventoryList`)
                    })
                })

        })
        .catch(err=>console.log(`Error on inserting into database: ${err}`));

    }
});

router.get("/inventoryList",isIC,(req,res)=>{

    productModel.find()
    .then((products)=>{
        const filteredProduct = products.map(product=>{
            return {
                id: product._id,
                prodName: product.prodName,
                prodPrice: product.prodPrice,
                prodDetails: product.prodDetails,
                prodCategory: product.prodCategory,
                prodQuantity: product.prodQuantity
            }

        });

        res.render("inventory/inventoryList",{
            data: filteredProduct
        });
    })
    .catch(err=>console.log(`Error when fetching data: ${err}`));

});

router.get("/edit/:id",(req,res)=>{
    productModel.findById(req.params.id)
    .then((product)=>{
        const {_id,prodName,prodPrice,prodDetails,prodCategory,prodQuantity} = product;

        res.render("inventory/editInventory",{
            _id,
            prodName,
            prodPrice,
            prodDetails,
            prodCategory,
            prodQuantity
        })
    })
    .catch(err=>console.log(`Error when finding document id: ${err}`))
});

router.put("/update/:id",(req,res)=>{
    const product = {
        prodName: req.body.prodName,
        prodPrice: req.body.prodPrice,
        prodDetails: req.body.prodDetails,
        prodQuantity: req.body.prodQuantity
    }

    productModel.updateOne({_id:req.params.id},product)
    .then(()=>{
        res.redirect("/product/inventoryList")
    })
    .catch(err=>console.log(`Error when updating data from database: ${err}`))
});

router.delete("/delete/:id",(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/product/inventoryList");
    })
    .catch(err=>console.log(`Error when deleting data from database: ${err}`))

})

module.exports = router;