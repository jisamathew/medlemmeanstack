var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('simple-mongoose-autoincrement');

var SubscriptionSchema = new Schema({
    sub_id:{type:Number},
    subscriptionname:{type:String,lowercase:true,required:true},
    image:{type:String,lowercase:true,required:true},
    timeinterval:{type:String,lowercase:true,required:true},
    organizationnumber:{type:Number,required:true}
});
SubscriptionSchema.plugin(autoIncrement,{field:'sub_id'});
module.exports = mongoose.model('Subscription',SubscriptionSchema);