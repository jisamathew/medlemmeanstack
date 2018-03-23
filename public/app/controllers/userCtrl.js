angular.module('userControllers',['userServices'])
.controller('regCtrl',function($http,$location,$timeout,$scope,User)
{
    var app =this;
     $scope.file = {};
   this.regUser = function(regData){    
       app.loading=true;
       app.errorMsg = false;
       var imgfile=document.getElementById("fileinput");   
       var pic=imgfile.files.item(0).name;
       $scope.uploading=true;
       var file = $scope.file;
       var fd= new FormData();
       fd.append('myfile',file.upload);
       $http.post('/api/upload/'+pic,fd,{
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
       });
      app.loading=true;
      app.errorMsg = false;
    User.create(app.regData,pic).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                $timeout(function(){    
                       $location.path('/login');
            },500);
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }
        });
    };
})
.controller('searchCtrl',function($http,$rootScope,$scope,$location,$timeout,User){

var app = this;
app.loading=true;
app.errorMsg = false;
 
User.getOrgans().then(function(data){
 
        if(data.data.success){
                //Create success message
                app.orgn=data.data.orgname;
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                               $location.path('/browse');
                       }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }
});

})


//get details of one org to user

.controller('userViewOneOrgCtrl',function($http,$location,$timeout,$scope,User,$routeParams){
app.loading=true;
app.errorMsg = false;
var org_no = $routeParams.organizationnumber;
 User.getviewOrgans(org_no).then(function(data){
   
     if(data.data.success){ 

        $scope.orgnnew=data.data.orgn;
         $scope.mem=data.data.memb;
         $scope.sub = data.data.subsc;
        $scope.subscr = data.data.subscri;
         $scope.billin=data.data.bills;
         $scope.benefit=data.data.bene;
        app.loading=false;
        app.successMsg = data.data.message + '....Redirecting';
       
     }
     else if(!$scope.sub){
          console.log('Not getting Subscription');    
     }
         else{
                console.log('Not getting');    
           }
 }); 
 
this.Subscribe = function(subid){
    User.subscriptionSsn(subid,org_no).then(function(data){
         if(data.data.success){ 
             app.su = data.data.sud;
             app.loading=false;
             app.successMsg = data.data.message + '....Redirecting';
            app.errorMsg = false;
             $timeout(function(){    
                       $location.path('/profile');
            },100);
                //Redirect to home              
     }
         else{
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;      
         }
    });
};
this.deleteMember = function(org_no){
 User.memDelete(org_no).then(function(data){
if(data.data.success){ 
             app.loading=false;
             app.successMsg = data.data.message + '....Redirecting';
            app.errorMsg = false;
            $location.path('/browse');  
     }
         else{
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;      
         }

});
};
    this.deleteSubscribe = function(subid){
    User.subDelete(subid,org_no).then(function(data){
         if(data.data.success){ 
             $scope.subscri = data.data.subscribed;
             app.loading=false;
             app.successMsg = data.data.message + '....Redirecting';
            app.errorMsg = false;
             $timeout(function(){    
                       $location.path('/profile');
            },100);
                //Redirect to home              
     }
         else{
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;      
         }
    });
};
})
.controller('memCtrl',function($http,$location,$timeout,$scope,User,$routeParams){
app.loading=true;
app.errorMsg = false;
var org_no = $routeParams.organizationnumber;
 User.getvieOrgans(org_no).then(function(data){

     if(data.data.success){ 
        $scope.org=data.data.organ.organizationnumber;
        app.loading=false;
        app.successMsg = data.data.message + '....Redirecting';
         }
     else
                {
                console.log('Not getting');    
                }
 });
  this.Membership = function(){
    app.loading=true;
    app.errorMsg = false;
    var ssn=document.getElementById("ssn").value;
    var fullname=document.getElementById("fname").value;
    var age=document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var orgno=document.getElementById("organization").value;
  User.postMember(ssn,fullname,gender,age,orgno).then(function(data){
    if(data.data.success){ 
                //Create success message              
                app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                     $location.path('/browse');
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }
        });
    };
})
//View USER PROFILE
.controller('viewProfileCtrl',function($http,$location,$timeout,User,$scope,$log){

var app = this;

app.loading=true;
app.errorMsg = false;
 
User.getMems().then(function(data){
        if(data.data.success){ 
                //Create success message
               app.userdet=data.data.userdetail;
               $scope.organiz = data.data.organ;
               $scope.bill = data.data.billin;
               $scope.company = data.data.comp;
              $scope.ben = data.data.benefit;
              $scope.history = data.data.log;
              $scope.sub = data.data.subs;
             app.loading=false;                
            $location.path('/profile');
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }

});
this.deleteSubscribe = function(subid,org_no){
    User.subDelete(subid,org_no).then(function(data){
         if(data.data.success){             
               app.loading=false;
             app.successMsg = data.data.message ;
            app.errorMsg = false;
            $location.path('/profile');
     }
         else{
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;      
         }
    });

};

  })
 .controller('updateCtrl2',function($http,$location,$timeout,User){
   var app =this;
app.loading=true;
app.errorMsg = false; 
User.getMems().then(function(data){
        if(data.data.success){ 
                //Create success message
             app.userdet=data.data.userdetail;
             app.loading=false;
             app.successMsg = data.data.message + '....Redirecting';
        }
        else{
              app.loading=false; 
              app.errorMsg = data.data.message;
              app.successMsg = false;
             }

});

this.putProfile2 = function(){
       console.log('update done'+app.upData);
       app.loading=true;
       app.errorMsg = false;
        var ssn=document.getElementById("ssn").value;
        var firstname=document.getElementById("firstname").value;
        var lastname=document.getElementById("lastname").value;
        var username=document.getElementById("username").value;
        var email=document.getElementById("email").value;
        var age=document.getElementById("age").value;
        var phno=document.getElementById("phno").value;

  User.updateProfile(ssn,firstname,lastname,username,email,age,phno).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                $timeout(function(){    
                       $location.path('/profile');
            },2000);
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }
        });
    };
});
