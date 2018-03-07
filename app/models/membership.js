var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('simple-mongoose-autoincrement');


var MembershipSchema = new Schema({
    mem_id:{type:Number},
    ssn:{type:Number,ref:'User'},
    organizationnumber:{type:Number,ref:'Organization'}

});
MembershipSchema.plugin(autoIncrement,{field:'mem_id'});
module.exports = mongoose.model('Membership',MembershipSchema);