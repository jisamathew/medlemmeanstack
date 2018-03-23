var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MemberSubscriptionSchema = new Schema({
    memid:{type:Number,ref:'Membership'},
    sub_id:{type:Number,ref:'Subscription'}
    
});
module.exports = mongoose.model('Membersubscription',MemberSubscriptionSchema);