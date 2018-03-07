var User = require('../models/user');
var Organ = require('../models/organization');
var Subscription = require('../models/subscription');
var Billing = require('../models/billing');
var Benefit = require('../models/benefit');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/images/');
    },
    filename: function (req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
   
        }
        else{
//            cb(null,Date.now()+'_'+file.originalname);
              cb(null,file.originalname);

            console.log(file.orginalname);
        }
        

       }
       
 
 });
  
  var upload = multer({ 
      storage: storage,
      limits:{fileSize:10000000}
 }).single('myfile');
  
    module.exports = function(router){
    //http://localhost:8080/api/users
    //USER REGISTRATION ROUTE
    router.post('/users',function(req,res){

     //res.send('testing users route');
     var user = new User();
     
     user.username = req.body.username;
     user.password = req.body.password;
     user.email = req.body.email;
     user.firstname = req.body.firstname;
     user.lastname = req.body.lastname;
    // user.ssn=req.body.ssn;
     user.age=req.body.age;
     user.gender = req.body.gender;
     user.phno=req.body.phno;
     if(req.body.username==null || req.body.username == '' ||req.body.password== null||req.body.password==''||req.body.email==''||req.body.email == null){
          res.json({success: false,message:'Ensure username,email and password were provided'});
     }
     else{
         user.save(function(err){
            if(err)
            {
                 res.json({success: false,message:'Username or email already exist'});
                 console.log(err);
            }
            else{
                  res.json({success: true,message:'user created!!'});

 
            }
         });
     }
    });
    //NEW ORGANIZATION BEING ADDED

    router.post('/organizations',function(req,res){

    console.log('testing organization route');
     
     var user2 = new Organ();

    // user2.organizationnumber=req.body.organizationnumber;
     user2.organizationname = req.body.organizationname;
    user2.address = req.body.address;
    // user2.noofmember = req.body.noofmember;
     user2.username = req.body.username;
     user2.password = req.body.password;
     
 //console.log('user ='+req.body.username+ 'org number = '+req.body.organizationnumber+'password = '+req.body.password);

    if(req.body.username==null || req.body.username == '' || req.body.password ==''||req.body.password==null)
    {
         console.log('null val');
          res.json({success: false,message:'Ensure username and password were provided'});
          
     }
     else{
         user2.save(function(err){
            if(err)
            {
                console.log(err);
                 res.json({success: false,message:'Username or organizationname already exist'});
                 
            }
            else{

                console.log('sucess');
                  res.json({success: true,message:'user created!!'});

 
            }
         });
     }
    });
    /////CREATING BILLING BY SAVING IT IN DB

    router.post('/billing/:sub_id',function(req,res){
    var sub_id = req.params.sub_id;
    
    console.log('testing billingroute');
    var bill = new Billing();
    bill.billingname = req.body.billingname;
    bill.amount = req.body.amount;
    bill.timeinterval = req.body.timeinterval;
    bill.sub_id=sub_id;
   
     if(req.body.billingname==null || req.body.billingname == '' ||req.body.amount== null||req.body.amount==''||req.body.timeinterval==''||req.body.timeinterval == null){
     console.log('no billing detail');
      res.json({success: false,message:'Ensure billingname,amount and timeinterval were provided'});
     }
     else{
         console.log('Saved values'+bill+'billing name:'+bill.billingname+'bill amount'+bill.amount +','+bill.timeinterval+','+bill.sub_id);
        bill.save(function(err){
            if(err)
            {
                 res.json({success: false,message:'Billing already exist'});
                 console.log(err);
            }
            else{
                  res.json({success: true,message:'billing created!!'});

 
            }
         });
     }
    });






router.post('/upload', function (req, res) {
    console.log('inside upload function at server.js'+req);
  upload(req, res, function (err) {
    if (err) {
    
         if(err.code === 'LIMIT_FILE_SIZE'){
            res.json({success:false,message:'file size is too large.Max size is 10MB'});
         }
         else if(err.code === 'filetype'){
             res.json({success:false,message:'file type is invalid.Must be .png .jpg .jpeg'});
         }else{
            console.log(err);
            res.json({success:false,message:'File was not able to be uploaded'});
         }
     
    }else{
        if(!req.file){
            res.json({success:false,message:'No file was selected'});

        }
        else{
            res.json({success:true,message:'File was uploadded!'});
        }
    }


    // Everything went fine
  });
});

router.post('/subscription/:no/:pic',function(req,res){
         var org_no = req.params.no;
         var imgname=req.params.pic;

        console.log('testing subscriptionroute'+org_no+'image name @ api :'+imgname);
     var sub = new Subscription();

     sub.organizationnumber = org_no;
     sub.subscriptionname = req.body.subscriptionname;
     sub.image = imgname;
    console.log('Name:'+req.body.subscriptionname);
    //sub.image = req.body.image;
    //console.log('Image file'+req.body.image);
    sub.timeinterval = req.body.timeinterval;
     if(req.body.subscriptionname==null || req.body.subscriptionname == '' ||imgname== null||imgname==''||req.body.timeinterval==''||req.body.timeinterval == null){
          res.json({success: false,message:'Ensure subscriptionname,image and timeinterval were provided'});
     }
     else{
       sub.save(function(err){
            if(err)
            {
                 res.json({success: false,message:'subscription already exist'});
                 console.log(err);
            }
            else{
                  res.json({success: true,message:'subscription created!!'});

 
            }
         });
     }
    });

router.post('/benefit/:no/:pic',function(req,res){
    var org_no = req.params.no;
     var imgname=req.params.pic;
        console.log('testing benefitroute'+org_no);
     var ben = new Benefit();
     ben.organizationnumber = org_no;
     ben.benefitname = req.body.benefitname;
   ben.benefitdesc = req.body.benefitdesc;

    ben.image = imgname;
    ben.timeinterval = req.body.timeinterval;

     if(req.body.benefitname==null || req.body.benefitname == '' ||imgname== null||imgname==''||req.body.timeinterval==''||req.body.timeinterval == null){
          res.json({success: false,message:'Ensure benefitname,image and timeinterval were provided'});
     }
     else{
       ben.save(function(err){
            if(err)
            {
                 res.json({success: false,message:'benefit already exist'});
                 console.log(err);
            }
            else{
                  res.json({success: true,message:'benefit created!!'});

 
            }
         });
     }
    });


    //router.get('home');
    //USER LOGIN ROUTE
    //http://localhost:port/api/authenticate
    router.post('/authenticate',function(req,res){
       var role = req.body.role;
        if(role == "member" )
        {
            User.findOne({ username:req.body.username}).select('username password firstname lastname ssn gender phno age email permission').exec(function(err,user)  {
                    if(err) {
                    console.log(err);
                    throw err;
                }

                if(!user){
                    res.json({success:false,message:'Could not authenticate user' });
                }
                else if(user){
                 if(req.body.password){
                        console.log('Inside password');
                        var validP =  user.comparePassword(req.body.password);
                       // console.log('password'+validP);
                         if(!validP){
                            console.log('password authentication failed');
                          res.json({success:false,message:'Could not authenticate passsword' });
            
                    }
                    else{
                        var token=jwt.sign({ username:user.username,firstname:user.firstname,lastname:user.lastname,ss:user.ssn,email:user.email,age:user.age,permission:user.permission},secret,{expiresIn : '24h'});
                        console.log('OK');
                        res.json({success:true,message:'User Authenticated',token:token,permission:user.permission});
            
                    }
                    }
                    else{
                        console.log(' no password');
                        res.json({success:false,message:'No Password Provided' });
            
                    }
                   
                }
        });
        }//Ends member role check
        else if (role == "organization"){
            console.log('organization check');
                Organ.findOne({ username:req.body.username}).select('username password organizationname organizationnumber noofmember address permission').exec(function(err,organ)  {
                    if(err) {
                    console.log(err);
                    throw err;
                }

                if(!organ){
                    res.json({success:false,message:'Could not authenticate organization username' });
                }
                else if(organ){
                 if(req.body.password){
                        console.log('Inside password'+req.body.password);
                        var validPass =  organ.comparePassword(req.body.password);
                        console.log('password'+validPass);
                         if(!validPass){
                            console.log('password authentication failed');
                          res.json({success:false,message:'Could not authenticate passsword' });
            
                    }
                    else{
                        var token=jwt.sign({ username:organ.username,organizationname:organ.organizationname,organizationnumber:organ.organizationnumber,address:organ.address,noofmember:organ.noofmember,permission:organ.permission},secret,{expiresIn : '24h'});
                        console.log('OK');
                        res.json({success:true,message:'User Authenticated',token:token,permission:organ.permission});
            
                    }
                    }
                    else{
                        console.log(' no password');
                        res.json({success:false,message:'No Password Provided' });
            
                    }
                   
                }
        });


        }
        else{
            console.log('Please select role');
              res.json({success:false,message:'No Role Provided' });
            
        }
    });
router.use(function(req,res,next){
    var token = req.body.token || req.body.query || req.headers['x-access-token'];
    if(token)
    {
        //verify token
        jwt.verify(token,secret,function(err,decoded)
            {
                if(err){
                    res.json({success:false,message:'Token invalid'});                    
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            });
    } else{
        res.json({success:false,message:'No token provied'});
    }
});

router.post('/me',function(req,res){
    res.send(req.decoded);
});






router.get('/permission',function(req,res){
    User.findOne({username:req.decoded.username},function(err,user){
                if(err) throw err;
                if(!user){
                    
                    res.json({success:false,message:'No user was found'});  
                }
                else{               
                    res.json({success:true,permission:user.permission});
                }
        });
    });

///USER BROWSE ALL ORGANIZATIONS

router.get('/browse',function(req,res)
{
   /* Organ.find({}).select('organizationname organizationnumber address image').exec(function(err,orgn) {
        if(err) throw err;
        if(!orgn){
                console.log('no org');
                res.json({success:false,message:'No Organizations'});  
                }
        else{
                    console.log('Organisations are available'+orgn);               
                res.json({success:true,message:'Here is the list',orgname:orgn});
                }
            });
            */
var orgno = 1;
Subscription.find({organizationnumber:orgno}).select('subscriptionname image').exec(function(err,orgn){

if(err) throw err;
        if(!orgn){
                console.log('no org');
                res.json({success:false,message:'No Organizations'});  
                }
        else{
                    console.log('Organisations are available'+orgn);               
                res.json({success:true,message:'Here is the list',orgname:orgn});
                }


});
 });
//VIEW GET FROM DB FOR ORGAN PROFILE
 router.get('/browseone',function(req,res)
{
    console.log('Org decoded '+req.decoded.organizationnumber);
    Organ.find({organizationnumber:req.decoded.organizationnumber}).select('organizationname organizationnumber address noofmember').exec(function(err,view) {
        
        if(err) throw err;
        if(!view){
                console.log('no org');
                res.json({success:false,message:'No Organizations'});  
                }
        else{

                
                res.json({success:true,message:'Here is the list',orgname:view});
                }
            });


 });
 //ORGAN VIEWED GET FROM DB FOR USER PROFILE
 router.get('/browsemem',function(req,res)
{
    console.log('inside browsemem');

    User.find({username:req.decoded.username}).select('firstname lastname ssn email age username gender phno').exec(function(err,userd) {
        
    console.log('inside b note'+req.decoded.ssn);

        if(err) throw err;
        if(!userd){
                console.log('no org');
                res.json({success:false,message:'No User'});  
                }
        else{

                
                res.json({success:true,message:'Here is the list',userdetail:userd});
                }
            });


 });
//GET SUBSCRIPTION FOR ORGANIZATION

 router.get('/browsesub',function(req,res)
{
    Subscription.find({organizationnumber:req.decoded.organizationnumber}).select('sub_id subscriptionname').exec(function(err,view) {
        
        if(err) throw err;
        if(!view){
                console.log('no org');
                res.json({success:false,message:'No Subscriptions'});  
                }
        else{

                
                res.json({success:true,message:'Here is the list',subscript:view});
                }
            });


 });
router.get('/permission',function(req,res){
    Organ.findOne({username:req.decoded.username},function(err,user2){
          if(err) throw err;
                if(!user2){
                    console.log('organiza');
                    res.json({success:false,message:'No user was found'});  
                }
                else{               

                    console.log('organization permitted');
                    res.json({success:true,permission:user2.permission});
                }
    });
});


router.put('/profileupdation/:org_no/:orgname/:address',function(req,res){
          var orgno = req.params.org_no;
          var orgname = req.params.orgname;
          var address=req.params.address;
          //var username=req.params.uname;
    console.log('testing updationroute////////'+req.params.org_no);
    Organ.findOne({organizationnumber:orgno},function(err,org){
    if(err) throw err;
    console.log(org);
                            if(!org){
                                res.json({success:false,message:'No user found'})
                            }else{
                               org.organizationnumber=orgno;
                                org.organizationname =orgname;
                                org.address=address;
                                //org.username=username;
                                
                              //  console.log(orgname);
                                //user.address = address;
                                 //console.log(orgadd);

                                org.save(function(err){
                                    if(err){
                                         res.json({success:false,message:'Err found'})
                           
                                        console.log(err);
                                    }else{

                                        res.json({success:true,message:' updated!!!'});
                                    }


                                });
                            }
    });
});

router.put('/profileupdation2/:ssn/:firstname/:lastname/:username/:email/:age/:phno',function(req,res){
          var ssn1 = req.params.ssn;
          var fname=req.params.firstname;
          var lname=req.params.lastname;
          var username=req.params.username;
          var email1=req.params.email;
          var age1 = req.params.age;
          var phno1=req.params.phno;
console.log('org_no : '+ssn1);
                 // console.log('testing updationroute'+ousername);
    User.findOne({ssn:ssn1},function(err,user){
    if(err) throw err;
    console.log(user);                           if(!user){
                                res.json({success:false,message:'No user found'})
                            }else{
                               // user.organizationname = orgname;
                                //console.log(orgname);
                                //user.address = orgadd;
                                 //console.log(orgadd);
                                 user.ssn=ssn1;
                                user.firstname=fname;
                                user.lastname=lname;
                                user.username = username;
                                user.email=email1;
                                user.age=age1;
                                user.phno=phno1;

                                user.save(function(err){
                                    if(err){
                                        console.log(err);
                                    }else{

                                        res.json({success:true,message:' updated!!!'});
                                    }


                                });
                            }
    });
});

       return router;//returns the router object to server
};
