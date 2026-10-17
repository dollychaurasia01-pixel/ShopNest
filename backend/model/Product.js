const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description:{type:String, required:true},
    price:{type:String, required:true},
    category:{type:String, required:true},
    stock:{type:String, required:true},
    imageUrl:{type:String},
    createdAt: {type:String, required:true,default:Date.now},
    rating: {type:String},
    numReviews: {type:String},
});

const Product = mongoose.model('Product',productSchema);

module.exports=Product;