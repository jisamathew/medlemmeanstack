var User = require('../models/user');
var Organ = require('../models/organization');
var Subscription = require('../models/subscription');
var Billing = require('../models/billing');
var Benefit = require('../models/benefit');
var Membership = require('../models/membership');
var Log = require('../models/log');
var MemberSubscriptions = require('../models/membersubscription');
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';
var mongoose = require("mongoose");
 
//2. Connect to MongoDB and its database
mongoose.connect('mongodb://localhost/medlem');
//3. The Connection Object
var connection = mongoose.connection;
var path = require('path');
var mongoose = require('mongoose');


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
    router.post('/users/:pic',function(req,res){
    var imgname=req.params.pic;
    var user = new User();
 
     user.username = req.body.username;
     user.password = req.body.password;
     user.email = req.body.email;
     user.firstname = req.body.firstname;
     user.lastname = req.body.lastname;
     user.age=req.body.age;
     user.gender = req.body.gender;
     user.phno=req.body.phno;
     user.image = imgname;
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
    router.post('/organizations/:pic',function(req,res){
        var imgname=req.params.pic;
        console.log('testing organization route');
        var user2 = new Organ();
             user2.organizationname = req.body.organizationname;
            user2.address = req.body.address;
            user2.username = req.body.username;
            user2.password = req.body.password;
            user2.image = imgname;
            if(req.body.username==null || req.body.username == '' || req.body.password ==''||req.body.password==null)
            {
                console.log('null val');
                res.json({success: false,message:'Ensure username,image and password were provided'});
                
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
    //CREATING BILLING BY SAVING IT IN DB
    router.post('/billing/:no',function(req,res){
    var org_no = req.params.no;
    var bill = new Billing();
    Subscription.findOne({subscriptionname:req.body.billingname,organizationnumber:org_no}).select('sub_id').exec(function(err,s){
       if (err) throw err;
       if(s){
       Organ.findOne({organizationnumber:org_no}).select('image').exec(function(err,ima){
            bill.billingname =req.body.billingname;
            bill.amount = req.body.amount;
            bill.timeinterval = req.body.timeinterval;
            bill.sub_id=s.sub_id;
            bill.organizationnumber =org_no;
            bill.image = ima.image;
            Billing.find({sub_id:s.sub_id}).exec(function(err,bil)  {
              
                    if(req.body.amount== null||req.body.amount==''||req.body.timeinterval==''||req.body.timeinterval == null){
                    res.json({success: false,message:'Ensure amount and timeinterval were provided'});
                    }
                     if(!bil){
                         res.json({success: false,message:'Billing already exist'});                    
                    }
                    else{
                            bill.save(function(){
                             res.json({success: true,message:'billing created!!'}); 
                        });
                         
                }
                    });
          });
         }
   else{ 
        res.json({success: false,message:'Billing not created,no such subscription exist'});               
        }
    });
    });
//Image being uploaded to upload/image folder
router.post('/upload/:pic', function (req, res) {
    var pic1=req.params.pic;
    console.log('inside upload function at server.js'+req+'czx'+pic1);
   
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
             var filesrc = path.join(__dirname, "../../public/uploads/images/"+pic1);
           
        }
    }
  });
});
//Create New Subscription by Organization
router.post('/subscription/:no/:pic',function(req,res){
       var org_no = req.params.no;
       var imgname=req.params.pic;
       var sub = new Subscription();
       sub.organizationnumber = org_no;
       sub.subscriptionname = req.body.subscriptionname;
       sub.image = imgname;
       sub.timeinterval = req.body.timeinterval;
     if(req.body.subscriptionname==null || req.body.subscriptionname == '' ||req.body.timeinterval==''||req.body.timeinterval == null){
          res.json({success: false,message:'Ensure subscriptionname and timeinterval were provided'});
     }
     else{
       sub.save(function(err){
            if(err)
            {
                 res.json({success: false,message:'subscription already exist'});
            }
            else{
                  res.json({success: true,message:'subscription created!!'});
            }
         });
       }
    });
//Creating new billing by Organization
router.post('/benefit/:no/:pic',function(req,res){
    var org_no = req.params.no;
     var imgname=req.params.pic;
     var ben = new Benefit();
    Organ.findOne({organizationnumber:org_no}).select('image').exec(function(err,imag){  
            ben.organizationnumber = org_no;
            ben.benefitname = req.body.benefitname;
            ben.benefitdesc = req.body.benefitdesc;
            ben.image = imgname;
            ben.timeinterval = req.body.timeinterval;
            ben.orgimage=imag.image;
            if(req.body.benefitname==null || req.body.benefitname == '' ||req.body.timeinterval==''||req.body.timeinterval == null){
                res.json({success: false,message:'Ensure benefitname and timeinterval were provided'});
            }
            else{
            ben.save(function(err){
                    if(err)
                    {
                        res.json({success: false,message:'benefit already exist'});
                    }
                    else{
                        res.json({success: true,message:'benefit created!!'});
                    }
                });
            }
            });
            });


    //USER LOGIN ROUTE
    //http://localhost:port/api/authenticate
    router.post('/authenticate',function(req,res){
       var role = req.body.role;
        if(role == "member" )
        {
            User.findOne({ username:req.body.username}).select('username password firstname lastname ssn gender phno age email image permission').exec(function(err,user)  {
                    if(err) {
                    console.log(err);
                    throw err;
                }

                if(!user){
                    res.json({success:false,message:'Could not authenticate user' });
                }
                else if(user){
                 if(req.body.password){
                         var validP =  user.comparePassword(req.body.password);
                         if(!validP){
                            res.json({success:false,message:'Could not authenticate passsword' });
                    }
                    else{
                        var token=jwt.sign({ username:user.username,firstname:user.firstname,lastname:user.lastname,ssn:user.ssn,email:user.email,age:user.age,gender:user.gender,phno:user.phno,image:user.image,permission:user.permission},secret,{expiresIn : '24h'});
                         res.json({success:true,message:'User Authenticated',token:token,permission:user.permission});      
                    }
                    }
                    else{
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
                        var validPass =  organ.comparePassword(req.body.password);
                          if(!validPass){
                                 res.json({success:false,message:'Could not authenticate passsword' });
                          }
                    else{
                        var token=jwt.sign({ username:organ.username,organizationname:organ.organizationname,organizationnumber:organ.organizationnumber,address:organ.address,noofmember:organ.noofmember,permission:organ.permission},secret,{expiresIn : '24h'});
                         res.json({success:true,message:'User Authenticated',token:token,permission:organ.permission});
            
                    }
                    }
                    else{
                        res.json({success:false,message:'No Password Provided' });
            
                    }
                   
                }
        });


        }
        else{
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
    Organ.find({}).select('organizationname organizationnumber address image').exec(function(err,orgn) {
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
 //User views single organ details (subscriptions,billings and benefits )and can become member of a particular organization
  router.get('/viewoneorg/:no',function(req,res)
{
    var no = req.params.no;
    var ssn = req.decoded.ssn;
    var i=0;
    console.log(' decoded '+no+'SSN ksjfds :'+ssn);
    Organ.find({organizationnumber:no}).select('organizationname organizationnumber address noofmember image').exec(function(err,orgn) {
     Subscription.find({organizationnumber:no}).select('sub_id subscriptionname timeinterval').exec(function(err,subscriptions){
   var sub = []; 
   if(!subscriptions)
   {
         res.json({success:true,orgn:orgn,memb:mem,subsc:subscriptions});
   }
   else{
       for( i = 0; i<subscriptions.length; i++)
            {
            sub.push(subscriptions[i].sub_id);
            }
        Billing.find({sub_id:sub}).exec(function(err,bill){
            Benefit.find({organizationnumber:no}).exec(function(err,ben){ 
                Membership.findOne({organizationnumber:no,ssn:ssn}).select('mem_id').exec(function(err,mem){       
                if(!orgn){
                    console.log('No Organ');
                        res.json({success:false,message:'No Organizations'});  

                }
                else if(!subscriptions){
                    console.log('No subscriptions')
                } 
                else{
                    if(!mem){
                    
                    console.log("Not Member");
                        res.json({success:true,orgn:orgn,memb:mem,subsc:subscriptions,bills:bill,bene:ben});
                    
                    }
                    else{
                    MemberSubscriptions.findOne({memid:mem.mem_id,sub_id:sub}).exec(function(err,subscribe){
                    res.json({success:true,orgn:orgn,memb:mem,subsc:subscriptions,bills:bill,bene:ben,subscri:subscribe});
                    });
                    }
                        
                   }  
    
                });
       });//Benefit
 });      //Billing
   }
     });    
        });    
    });

//member access one organization details
router.get('/oneorg/:no',function(req,res)
{
    var no = req.params.no;
    var ssn = req.decoded.ssn;
    console.log('Org decoded '+no+'SSN grtting :'+ssn);
    Organ.findOne({organizationnumber:no}).select('organizationname organizationnumber address noofmember image').exec(function(err,orgn) {
    if(err)
    {
         console.log('no org');
        res.json({success:false,message:'No Organizations'});  

    }
    else{

            res.json({success:true,organ:orgn});
        }
    });

 });
//when a member click subscribe option  
router.post('/subscribe/:subid/:orgno',function(req,res){
    var org = req.params.orgno;
    var subid = req.params.subid;
    var newsub = new MemberSubscriptions();
    var log =new Log();
    Membership.findOne({organizationnumber:org,ssn:req.decoded.ssn}).select('mem_id').exec(function(err,members){
       
            MemberSubscriptions.findOne({memid:members.mem_id,sub_id:subid}).exec(function(err,subscribed){
                if(err) throw err;
                if(!subscribed){
                    newsub.memid = members.mem_id;
                    newsub.sub_id = subid;
                    Subscription.findOne({sub_id:subid}).select('subscriptionname').exec(function(err,subname){

                    log.ssn = req.decoded.ssn;
                    log.company = org;
                    log.action = 'Added '+subname.subscriptionname;
                    Organ.findOne({organizationnumber:org}).exec(function(err,or){
                        log.companyname =or.organizationname;
                    newsub.save(function(err){
                    if(err){
                         res.json({success:false,message:' Error Occured!!!'});
                    }
                    else{
                        log.save();
                        console.log('Entered into membersubscription collection'+subscribed);
                        res.json({success:true,message:'Member done Subscription with organization!!!',sname:subname,sud:subscribed});
                    }
                    }); 
                    
                    });
                    });
            }
            else{
                console.log('Already Subscribed ');
                res.json({success:false,message:'Already Subscribed!'});
            }
            });
    });      
});
//benefit deleted by organization
router.delete('/deletebenefit/:benid/:orgno',function(req,res){
    var org = req.params.orgno;
    var benid = req.params.benid;
    console.log("in api del ben "+org+'ben id '+benid);
    Benefit.findOne({organizationnumber:org,ben_id:benid}).exec(function(err,bene){
        if(err) throw err;
        if(!bene)
        {
            res.json({success:false,message:'No Benefit deleted !!!'});
                    
        }
        else{
            bene.remove(function(){
                    console.log('deleted');
                     res.json({success:true,message:'Benefit deleted !!!'});
            });
        }
});
});
//bill deleted by organization
router.delete('/deletebill/:billid',function(req,res){
var bill_id = req.params.billid;
Billing.findOne({bill_id:bill_id}).exec(function(err,bil){
        if(err) throw err;
        if(!bil)
        {
            res.json({success:false,message:'No Billing deleted !!!'});
                    
        }
        else{
            bil.remove(function(){
                    console.log('deleted');
                     res.json({success:true,message:'Benefit deleted !!!'});
            });
        }
});
   
});
//Subscription deleted by organiztion
router.delete('/deleteorgsub/:sub_id/:org_no',function(req,res){
    var orgno = req.params.org_no;
    var subid = req.params.sub_id;

    console.log('in api del sub id '+subid+' orgno '+orgno);
    Subscription.findOne({organizationnumber:orgno,sub_id:subid}).exec(function(err,subsc){
          if(err) throw err;
        if(!subsc)
        {
            res.json({success:false,message:'No Subscriptions deleted !!!'});
                    
        }
        else{
            Billing.findOne({billingname:subsc.sub_id}).exec(function(err,bil){
                if(!bil)
                {
                    console.log('No Bills');
                    subsc.remove(function(){
                            
                                res.json({success:true,message:'Subscription deleted !!!'});
                    });
                }
                
                 else{
                            subsc.remove(function(){
                            bil.remove(function(){
                            res.json({success:true,message:'Subscription deleted !!!'});
                            });
                            });
                        }
                    });//Bill
                }
    });
});
//Delete membership  with organization by member
router.delete('/deletemembership/:org_no',function(req,res){

var orgo = req.params.org_no;
console.log('In api'+orgo);
var log =new Log();
Membership.findOne({organizationnumber:orgo,ssn:req.decoded.ssn}).select('mem_id').exec(function(err,memb){
if(err) throw err;
        if(!memb)
        {
            console.log('Not getting membership details');
        }
        else{
            memb.remove(function(){
               
                log.ssn = req.decoded.ssn;
                    log.company = orgo;
                    log.action = 'Canceled Membership';
                     Organ.findOne({organizationnumber:orgo}).exec(function(err,or){
                          //updates noofmembers
                            var total=or.noofmember - 1;
                            console.log('Total - 1 ' +total);
                            or.noofmember = total;
                            or.save(or.noofmember);
                            //create logs
                        log.companyname =or.organizationname;
                        log.save();
                        console.log('deleted');
                        res.json({success:true,message:'Membership Cancelled !!!'});
                     });         
            });
        }

});
});
//subscription deleted by user
router.delete('/deletesubscribe/:subid/:orgno',function(req,res){
    var org = req.params.orgno;
    var subid = req.params.subid;
    var log =new Log();
    Membership.findOne({organizationnumber:org,ssn:req.decoded.ssn}).select('mem_id').exec(function(err,members){
        if(err) throw err;
        if(!members)
        {
            console.log('Not getting membership details');
        }
        else{
            MemberSubscriptions.findOne({memid:members.mem_id,sub_id:subid}).exec(function(err,subscribed){
                if(err) throw err;
                if(!subscribed){
                    console.log('No subscriptions');
                    res.json({success:false,message:'No Subscription deleted !!!'});
                     
                }
                else{
                    Subscription.findOne({sub_id:subid}).select('subscriptionname').exec(function(err,subname){
                    log.ssn = req.decoded.ssn;
                    log.company = org;
                    log.action = 'Removed '+subname.subscriptionname;
                    subscribed.remove(function(){
                        Organ.findOne({organizationnumber:org}).exec(function(err,or){
                           
                        log.companyname =or.organizationname;
                        log.save();
                        console.log('deleted');
                        res.json({success:true,message:'Subscription deleted !!!',sd:subscribed});
                        }); //org close  
                     });                
                    });
                }
                }); 
            }

            });     
    });
    //Added to membership collection when user becomes member
router.post('/membership/:ssn/:fullname/:gender/:age/:orgno',function(req,res){
          var ssn1 = req.params.ssn;
          var fname=req.params.fullname;
          var gender1= req.params.gender;
          var age1 = req.params.age;
          var orgno1=req.params.orgno;
          var member = new Membership();
             member.ssn=ssn1;
             member.fullname=fname;
             member.gender = gender1;
             member.age=age1;
             member.organizationnumber=orgno1;
             console.log('dsfwdsaf'+member.ssn);
             var organ = new Organ();
             var log =new Log();
                member.save(function(err){
                log.ssn = req.decoded.ssn;
                log.company = orgno1;
                log.action = 'Become a member';

                if(err){
                     console.log('error occured'+err);
                    }else{
                       Organ.findOne({organizationnumber:orgno1}).exec(function(err,or){
                        log.companyname =or.organizationname;
                        log.save();
                       // console.log('Enteredinto membershipcollection');
                           Organ.findOne({organizationnumber:orgno1}).select('noofmember').exec(function(err,findm){
                            if(err){
                                throw err;
                            }
                            else{
                            
                            var total=findm.noofmember + 1;
                            findm.noofmember = total;
                            findm.save(findm.noofmember);
                            }
                            }); 
                         res.json({success:true,message:' Member with organization!!!'});
                       });    
                    }
                 }); 
   });

//VIEW GET FROM DB FOR ORGAN PROFILE
 router.get('/browseone',function(req,res)
{
    var no = req.decoded.organizationnumber;
    Organ.find({organizationnumber:req.decoded.organizationnumber}).select('organizationname organizationnumber address noofmember image').exec(function(err,view) {
     if(err) throw err;
      if(!view){
                console.log('no org');
                res.json({success:false,message:'No Organizations'});  
                }
    else{
     Subscription.find({organizationnumber:no}).exec(function(err,subscriptions){
     var sub = []; 
     if(!subscriptions)
        {
         res.json({success:true,orgname:view});
        }
    else if(view && subscriptions){
       for( i = 0; i<subscriptions.length; i++)
            {
            console.log('sfdfewergv'+subscriptions[i].sub_id);
            sub.push(subscriptions[i].sub_id);
            }
            console.log('Sub array'+sub);

        Billing.find({sub_id:sub}).exec(function(err,bill){
             if(!bill)
             {
                  console.log('No Billings');
                res.json({success:true,orgname:view,subsc:subscriptions});
                    
             }
             else{
                    
                Benefit.find({organizationnumber:no}).exec(function(err,ben){
                    Membership.find({organizationnumber:no}).select('ssn').exec(function(err,memb){
                        var newssn = [];
                       
                        for( i = 0; i<memb.length; i++)
                        {
                            newssn.push(memb[i].ssn);
                        }                  
                        User.find({ssn:newssn}).exec(function(err,mem){
                            if(!memb){
                                console.log('No Members');
                             res.json({success:true,message:'Benefits avail',orgname:view,subsc:subscriptions,billin:bill});
                    
                            }
                         if(!ben)
                         {

                         console.log('No Benefits');
                             res.json({success:true,message:'Benefits avail',orgname:view,subsc:subscriptions,billin:bill,member:mem});
                    }
                    else{
                     res.json({success:true,message:'Benefits avail',orgname:view,subsc:subscriptions,billin:bill,benefi:ben,member:mem});               
                    }
                        });
                    });
            });
             }
     });//billing find
   }         
     });  //<sub>
    }//else
    });//organ find
                
 });
 //ORGAN VIEWED GET FROM DB FOR USER PROFILE
 router.get('/browsemem',function(req,res)
{
    console.log('inside browsemem');

    User.find({username:req.decoded.username}).select('firstname lastname ssn email age username gender phno image').exec(function(err,userd) {
        if(err) throw err;
        if(!userd)
        {         res.json({success:false,message:'No User'});  
        }
        else{
            Membership.find({ssn:req.decoded.ssn}).select('organizationnumber mem_id').exec(function(err,membership){
            var orgno = [];
            var memb = [];
                if(!membership){
                       res.json({success:false,message:'No Membership'});
                        
                }
                else
                {       
                    for( i = 0; i < membership.length; i++){
                    orgno.push(membership[i].organizationnumber);
                    memb.push(membership[i].mem_id);
                    }     if(err) throw err;
                         MemberSubscriptions.find({memid:memb}).select('sub_id').exec(function(err,memsub){
                                    var subscrip = [];
                                    for( i = 0; i < memsub.length; i++){
                                        subscrip.push(memsub[i].sub_id);
                                                    }
                                  if(!memsub){
                                       console.log('No member subscriptions');
                                   }
                                   else{
                                       var subid = [];
                                       var org = [];
                                         Subscription.find({sub_id:subscrip}).exec(function(err,sub){  
                                                  for( i = 0; i < sub.length; i++){
                                                   
                                                    subid.push(sub[i].sub_id);
                                                    org.push(sub[i].organizationnumber);
                                                    }      
                                                Billing.find({sub_id:subid}).exec(function(err,billi){
                                                Benefit.find({organizationnumber:org}).exec(function(err,ben){
                                                Membership.find({ssn:req.decoded.ssn}).select('organizationnumber').exec(function(err,me){
                                                    if(!me)
                                                    {
                                                        console.log("not member with any organization");
                                                    }

                                                    else if(!sub)
                                                    {
                                                         res.json({success:true,message:'No subs',userdetail:userd});
                                                    }
                                                    else if(!ben){
                                                         res.json({success:true,message:'No subs',userdetail:userd});
                                                    }
                                                    else{
                                                        var or_no =[];
                                                        for( i = 0; i < me.length; i++){
                                                        or_no.push(me[i].organizationnumber);
                                                    }    
                                                        Organ.find({organizationnumber:or_no}).exec(function(err,company){
                                                        Log.find({ssn:req.decoded.ssn}).exec(function(err,hist){
                                                         res.json({success:true,message:'Data found',userdetail:userd,subs:sub,billin:billi,comp:company,benefit:ben,log:hist});
                                          
                                                        });
                                                    
                                                        });
                                                    }
                                                });
                                                });
                                                   
                                                });                                           
                                     });
                                   }
                                    });//sub2
                         }
            });//mm                      
        }        
   });//user find
 });

//GET SUBSCRIPTION FOR ORGANIZATION
 router.get('/browsesub',function(req,res)
{
    
    Subscription.find({organizationnumber:req.decoded.organizationnumber}).select('sub_id subscriptionname').exec(function(err,view) {
     
       if(!view){
                res.json({success:false,message:'No Subscriptions'});  
                }
        else{
                    res.json({success:true,message:'Here is the list',subscript:view});
                }
   });
 });
 //organization permission
router.get('/permission',function(req,res){
    Organ.findOne({username:req.decoded.username},function(err,user2){
          if(err) throw err;
                if(!user2){
                    res.json({success:false,message:'No user was found'});  
                }
                else{               
                    res.json({success:true,permission:user2.permission});
                }
    });
});
//Organization update profile
router.put('/profileupdation/:org_no/:orgname/:address',function(req,res){
          var orgno = req.params.org_no;
          var orgname = req.params.orgname;
          var address=req.params.address;
    Organ.findOne({organizationnumber:orgno},function(err,org){
    if(err) throw err;
    console.log(org);
                            if(!org){
                                res.json({success:false,message:'No user found'})
                            }else{
                               org.organizationnumber=orgno;
                                org.organizationname =orgname;
                                org.address=address;
   
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
//User update profile 
router.put('/profileupdation2/:ssn/:firstname/:lastname/:username/:email/:age/:phno',function(req,res){
          var ssn1 = req.params.ssn;
          var fname=req.params.firstname;
          var lname=req.params.lastname;
          var username=req.params.username;
          var email1=req.params.email;
          var age1 = req.params.age;
          var phno1=req.params.phno;
    User.findOne({ssn:ssn1},function(err,user){
    if(err) throw err;
    if(!user){
            res.json({success:false,message:'No user found'})
            }else{
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
