var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var autoIncrement = require('simple-mongoose-autoincrement');

var UserSchema = new Schema({     
    ssn:{type:Number},
    firstname:{type:String,lowercase:true},
    lastname:{type:String,lowercase:true},
    email:{type:String,lowercase:true},
    username:{type:String,lowercase:true,required:true},
    password:{type:String,required:true},
    gender:{type:String,lowercase:true},
    age:{type:Number,lowercase:true},
    phno:{type:Number,lowercase:true},     
    image:{type:String,lowercase:true},
    permission:{type:String,required:true,default:'member'}
  });

UserSchema.plugin(autoIncrement,{field:'ssn'});

UserSchema.pre('save',function(next){
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password,null,null,function(err,hash)
  {
      console.log('bcrypted');
       if(err) return next(err);
        user.password = hash;
        console.log('fse'+hash);
        next();

    });
});

UserSchema.methods.comparePassword = function(password){
    console.log('pass'+password);
    console.log('saved pass'+this.password);
    return bcrypt.compareSync(password,this.password);

};
module.exports = mongoose.model('User',UserSchema);