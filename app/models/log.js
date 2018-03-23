var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LogSchema = new Schema({
    ssn:{type:Number},
    company:{type:String,lowercase:true},
     action:{type:String,lowercase:true},
    companyname:{type:String}
    
});
module.exports = mongoose.model('Log',LogSchema);
