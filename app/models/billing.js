var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autoIncrement = require('simple-mongoose-autoincrement');

var BillingSchema = new Schema({
     bill_id:{type:Number},
    billingname:{type:String,lowercase:true,required:true},
    amount:{type:Number,lowercase:true,required:true},
    timeinterval:{type:String,lowercase:true,required:true},
    sub_id:{type:Number},
    organizationnumber:{type:Number},
     image:{type:String,lowercase:true},
   
    
});
BillingSchema.plugin(autoIncrement, {field: 'bill_id' });

module.exports = mongoose.model('Billing',BillingSchema);
