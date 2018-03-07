angular.module('organControllers',['organServices','fileModelDirective'])
.controller('registerCtrl',function($http,$location,$timeout,Organization)
{
    var app =this;
    console.log('inside organcontrol');
   this.regOrgan = function(registerData){
       
    console.log(this.registerData);
       app.loading=true;
       app.errorMsg = false;

        
    Organization.create(app.registerData).then(function(data){
console.log('inside create ctrl'+app.registerData);
            if(data.data.success){
                 console.log('success');
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
                    console.log('fails');
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }
        });
    };
})
.controller('billCtrl',function($http,$location,$timeout,Organization){
    var app =this;
    console.log('inside billctrl');
    Organization.getSub().then(function(data){
    app.subscript=data.data.subscript;
    console.log(app.subscript);
    });
    this.billOrgan = function(billData){
        var sub_id=document.getElementById("sub_id").value;
        console.log('saffs'+app.billData);
        app.loading=true;
        app.errorMsg = false;
        Organization.createbill(app.billData,sub_id).then(function(data){
                if(data.data.success){ 
                    //Create success message
                    app.loading=false;
                    app.successMsg = data.data.message + '....Redirecting';
                    //Redirect to home
                  //  $timeout(function(){    
                      $location.path('/organprofile');
                    //},2000);
                       
                }
                else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }
        });
    };
  // var timeinterval = document.getElementById("time").value;
 
})

.controller('subCtrl',function($http,$location,$timeout,Organization,$scope){
    var app =this;
         console.log('Subscriptionctrl');
       // var timeinterval = document.getElementById("time").value;
     $scope.file = {};
     this.subOrgan = function(subData){


//for uploading to folder
    var org_no=document.getElementById("organizationnumber").value;
   
    var imgfile=document.getElementById("fileinput");   
    var pic=imgfile.files.item(0).name;
     
     console.log('afsdfdgds'+$scope.file);
     console.log('inside Submit : '+imgfile);
    $scope.uploading=true;
    var file = $scope.file;
   // this.upload = function(file){
    //console.log('inside upload'+file);
    var fd= new FormData();
    fd.append('myfile',file.upload);
    console.log(' File data'+fd);
     $http.post('/api/upload',fd,{
        transformRequest:angular.identity,
        headers:{'Content-Type':undefined}
    });
//};

            console.log("my image name : "+imgfile.files.item(0).name);
            app.loading=true;
            app.errorMsg = false;
            Organization.createsub(app.subData,org_no,pic).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                 //$timeout(function(){    
                       $location.path('/organprofile');
                        
           // },2000);
                      
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

.controller('benCtrl',function($http,$location,$timeout,Organization){
   var app =this;
console.log('inside benctrl');
       // var timeinterval = document.getElementById("time").value;
  this.benOrgan = function(benData){
       console.log('saffs'+app.benData);
       
       var org_no=document.getElementById("organizationnumber").value;
       console.log(org_no+'sfdhgfskjdkj');
        var imgfile=document.getElementById("fileinput");
        var pic=imgfile.files.item(0).name;
        console.log("my image name : "+imgfile.files.item(0).name);
       

       app.loading=true;
       app.errorMsg = false;
   Organization.createben(app.benData,org_no,pic).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                //$timeout(function(){    
                       $location.path('/organprofile');
                       
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
.controller('updateCtrl',function($http,$location,$timeout,Organization){
   var app =this;
     app.loading=true;
app.errorMsg = false;
 
console.log('inside updatectrl');
       // var timeinterval = document.getElementById("time").value;
Organization.getOrgans().then(function(data){

    console.log('get backed value in crtller'+data.data.orgname);

        if(data.data.success){ 
                //Create success message
                app.orgn=data.data.orgname;
                console.log('inside search success'+app.orgn);
                 app.loading=false;
               // app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
               /* $timeout(function(){    
                       $location.path('/editprofile');
                       app.loading=false;
            },2000);*/
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }

});
//////////EDIT ORGAN PROFILE
   this.putProfile = function(){
       console.log('update done ###############################');
       app.loading=true;
       app.errorMsg = false;
       var org_no=document.getElementById("organizationnumber").value;
       var orgname=document.getElementById("organizationname").value;
       var address = document.getElementById("address").value;
      // var username =document.getElementById("username").value;

        console.log(org_no+'scaf'+orgname+'dslk'+address+'dswewe');
   Organization.updateProfile(org_no,orgname,address).then(function(data){
       console.log(data.data.success);
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
              //  app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                $timeout(function(){    
                       $location.path('/organprofile');
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

////////GET ALL ORGANIZATION DETAILS IN ORGAN PROFILE

.controller('viewCtrl',function($http,$location,$timeout,Organization){

var app = this;

//app.loading=true;
//app.errorMsg = false;
 
Organization.getOrgans().then(function(data){

    console.log('get backed value in crtller'+data.data.orgname);

        if(data.data.success){ 
                //Create success message
                app.orgn=data.data.orgname;
                console.log('inside search success'+app.orgn);
                 app.loading=false;
              //  app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                    
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }

});
  });
