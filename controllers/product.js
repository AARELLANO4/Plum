const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const isIC = require("../middleware/ICauth");
const path = require("path");

const productModel = require("../models/productDB");
const cartModel = require("../models/cart")

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
        picErr += "File MUST be .png format.";
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

router.get("/list/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
        const {_id,prodName,prodPrice,prodDetails,prodCategory,prodQuantity,prodPic} = product;

        res.render("inventory/prodDesc",{
            _id,
            prodName,
            prodPrice,
            prodDetails,
            prodCategory,
            prodQuantity,
            prodPic
        })
    })
    .catch(err=>console.log(`Error when finding document id: ${err}`))

}) 

router.get("/add-to-cart/:id",isAuthenticated, (req,res)=>{
    //const product_id = req.params.id;
    let cart = new cartModel (req.session.cart ? req.session.cart : {});

    productModel.findById(req.params.id)
    .then((product)=>{
        cart.add(product,product.id);
        req.session.cart = cart;
        res.redirect('/product/products');
    })
    .catch(err=>console.log(`Error when adding to cart: ${err}`));
})

router.get("/shopping-cart",(req,res)=>{
    if (!req.session.cart) {
        return res.render('inventory/shopping-cart', {products: null});
    }
    let cart = new cartModel(req.session.cart);

    let st = cart.totalPrice;
    let subTotal = st.toFixed(2);
    let h = (subTotal * 0.13);
    let HST = h.toFixed(2);
    let t = st + h;
    let total = t.toFixed(2);

    res.render('inventory/shopping-cart',{
        products: cart.generateArray(),
        subTotal: subTotal,
        HST: HST,
        total: total
    })
})

router.get("/check-out",(req,res)=>{

             // using Twilio SendGrid's v3 Node.js Library
             // https://github.com/sendgrid/sendgrid-nodejs

             const sgMail = require('@sendgrid/mail');
             sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
             
             const msg = {
             to: `${req.session.userInfo.email}`,
             from: `aarellano4@myseneca.ca`,
             subject: `Order Confirmation`,
             HTML: 
             `
                Thank you for ordering with Plum!
             `,
             };
 
             // asynchronous operation 
             sgMail.send(msg)
             .then(()=> {
                 req.session.cart = null;
                 sucess = `Order placed! An email has been sent for confirmation.`
                 res.render("user/dashboard", {
                     sucess: sucess
                 });
             })
             .catch(err=>{
                 console.log(`Error ${err}`);
             })

    req.session.cart = null;
    success = `Order placed! An email has been sent for confirmation.`
    res.render("user/dashboard", {
        success: success
    });
 });

module.exports = router;