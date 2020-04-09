const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({

    prodName: {
        type: String,
        required: true
    },

    prodPrice: {
        type: Number,
        required: true
    },

    prodDetails: {
        type: String,
        required: true
    },

    prodCategory: {
        type: String,
        required: true
    },

    prodQuantity: {
        type: Number,
        required: true
    },

    prodBestSeller: {
        type: Boolean,
        required: true
    },

    prodPic: {
        type: String
    },

    dateCreated:{
        type: Date,
        default: Date.now()
    }

});


const productModel = mongoose.model('product',productSchema);
module.exports = productModel;