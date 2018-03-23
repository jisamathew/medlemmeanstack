var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('simple-mongoose-autoincrement');


var BenefitSchema = new Schema({
    ben_id:{type:Number},
    benefitname:{type:String,lowercase:true,required:true},
    benefitdesc:{type:String,lowercase:true,required:true},
    image:{type:String,lowercase:true,required:true},
    timeinterval:{type:String,lowercase:true,required:true},
    organizationnumber:{type:Number,required:true},
    orgimage:{type:String,lowercase:true}
});

BenefitSchema.plugin(autoIncrement, {field: 'ben_id' });

module.exports = mongoose.model('Benefit',BenefitSchema);