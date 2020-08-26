const mongoose = require('mongoose');


let orderSchema = new mongoose.Schema({
    orderNo: String,
    orderDate: Date,
    deliveryCost: Number,
    // preferedDate : String,
    checked: {type:Boolean, default:false},
    totalCost: {type:Number, required:true},
    payable: {type: Number, default: 0},
    deliveryStat: String, //delivered, cancelled, pending
    deliveryDate: Date,
    preferredDate: String,
    receiver: {
        mobile: String, postalCode: String, name:String, melli:String, address:String 
    },
    items : Array    
})

const Order =   mongoose.model('order', orderSchema);

module.exports= Order;