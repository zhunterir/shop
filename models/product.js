const mongoose = require('mongoose');

let productSchema =  new mongoose.Schema({
    id: {type:String, default:'', required:true},
    imgUrl: {type:String, default:''},
    title: {type:String, default:''},
    price: {type:Number, default:0},
    sale: {type:Number, default:0},
    count: {type:Number ,default:0},
    about: {type: String, default:''},
    moreInfo:{type:Object, default:{}},
    category: {type:String, default:''}

});
const Product = mongoose.model('product', productSchema);
Product.find()
module.exports = Product

