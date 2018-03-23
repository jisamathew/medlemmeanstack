var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('simple-mongoose-autoincrement');


var MembershipSchema = new Schema({
    mem_id:{type:Number},
    ssn:{type:Number,ref:'User'},
    fullname:{type:String,lowercase:true,required:true},
    gender:{type:String,lowercase:true,required:true},
    age:{type:Number,lowercase:true,required:true},
     organizationnumber:{type:Number,ref:'Organization'}

});

MembershipSchema.plugin(autoIncrement,{field:'mem_id'});
module.exports = mongoose.model('Membership',MembershipSchema);