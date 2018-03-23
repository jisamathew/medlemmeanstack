var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var autoIncrement = require('simple-mongoose-autoincrement');
var OrganizationSchema = new Schema({
     organizationnumber:{type:Number},
     organizationname:{type:String,lowercase:true,unique:true},
     address:{type:String,lowercase:true},
     noofmember:{type:Number,lowercase:true,default:0},
     username:{type:String,lowercase:true},
     password:{type:String},
     image:{type:String,lowercase:true},
     permission:{type:String,required:true,default:'organization'}
});
//for autoincrementing
OrganizationSchema.plugin(autoIncrement, {field: 'organizationnumber' });

//Bcrypts before saving
OrganizationSchema.pre('save',function(next){
  var organ = this;
   if (!organ.isModified('password')) return next();

  bcrypt.hash(organ.password,null,null,function(err,hash)
  {
      console.log('bcrypted');
       if(err) return next(err);
        organ.password = hash;
        console.log('fse'+hash);
        next();

    });
  });
  //Compares Password
OrganizationSchema.methods.comparePassword = function(password){
    console.log('pass'+password);
    console.log('saved pass'+this.password);
    return bcrypt.compareSync(password,this.password);

};
module.exports = mongoose.model('Organization',OrganizationSchema);


















