angular.module('userControllers',['userServices'])
.controller('regCtrl',function($http,$location,$timeout,User)
{
    var app =this;
   this.regUser = function(regData){
       
       app.loading=true;
       app.errorMsg = false;

        
    User.create(app.regData).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                $timeout(function(){    
                       $location.path('/');
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
})
.controller('searchCtrl',function($http,$location,$timeout,User){

var app = this;
app.loading=true;
app.errorMsg = false;
 
User.getOrgans().then(function(data){

    console.log('get backed value in crtller'+data);

        if(data.data.success){ 
                //Create success message
                app.orgn=data.data.orgname;
                console.log('inside search success'+app.orgn);
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

})  ;



})
.controller('viewProfileCtrl',function($http,$location,$timeout,User){

var app = this;

app.loading=true;
app.errorMsg = false;
 
User.getMems().then(function(data){

    console.log('get backed value in crtller'+data.data.userdetail);

        if(data.data.success){ 
                //Create success message
                app.userdet=data.data.userdetail;
                console.log('inside search success'+app.userdet);
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                 
            // $location.path('/profile');
            
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }

});
  })
 .controller('updateCtrl2',function($http,$location,$timeout,User){
   var app =this;
console.log('inside user updatectrl');
       // var timeinterval = document.getElementById("time").value;
app.loading=true;
app.errorMsg = false;
 
User.getMems().then(function(data){

    console.log('get backed value in crtller'+data.data.userdetail);

        if(data.data.success){ 
                //Create success message
                app.userdet=data.data.userdetail;
                console.log('inside search success'+app.userdet);
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
              /*  $timeout(function(){    
                       $location.path('/editprofile1');
            },2000);
            */}
            else
                {
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