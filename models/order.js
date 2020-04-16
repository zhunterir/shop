const mongoose = require('mongoose');


let orderSchema = new mongoose.Schema({
    id: String,
    orderDate: Date,
    deliveryPrice: Number,
    totlaPrice: Number,
    status: String,
    items : Array, 
    
})

const Order =   mongoose.model('order', orderSchema);

exports.Model = Order;