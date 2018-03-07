var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var Subscription = require('../models/subscription');
var autoIncrement = require('simple-mongoose-autoincrement');

var BillingSchema = new Schema({
     bill_id:{type:Number},
    billingname:{type:String,lowercase:true,required:true},
    amount:{type:Number,lowercase:true,required:true},
    timeinterval:{type:String,lowercase:true,required:true},
    sub_id:{type:Number}
    
});
BillingSchema.plugin(autoIncrement, {field: 'bill_id' });

module.exports = mongoose.model('Billing',BillingSchema);
