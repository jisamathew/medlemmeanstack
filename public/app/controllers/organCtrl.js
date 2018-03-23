angular.module('organControllers',['organServices','fileModelDirective'])
.controller('registerCtrl',function($http,$location,$timeout,Organization,$scope)
{
   var app =this;
   $scope.file = {};
   this.regOrgan = function(registerData){
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

       Organization.create(app.registerData,pic).then(function(data){
            if(data.data.success){
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to home
                $timeout(function(){    
                       $location.path('/login');
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
.controller('billCtrl',function($http,$scope,$location,$timeout,Organization){
    var app =this;
    Organization.getSub().then(function(data){
    $scope.subscript=data.data.subscript;
    });
    this.billOrgan = function(billData){
     var org_no=document.getElementById("organizationnumber").value;
     app.loading=true;
        app.errorMsg = false;
        Organization.createbill(app.billData,org_no).then(function(data){
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
})

.controller('subCtrl',function($http,$scope,$location,$timeout,Organization){
    var app =this;
       $scope.file = {};
       this.subOrgan = function(subData){
        app.loading = true;
        app.errorMsg = false;
        var org_no=document.getElementById("organizationnumber").value;
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
        Organization.createsub(app.subData,org_no,pic).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
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

.controller('benCtrl',function($http,$scope,$location,$timeout,Organization){
   var app =this;
    $scope.file = {};
    this.benOrgan = function(benData){
       var org_no=document.getElementById("organizationnumber").value;
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
   Organization.createben(app.benData,org_no,pic).then(function(data){
            if(data.data.success){ 
                //Create success message
                 app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
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
.controller('updateCtrl',function($http,$location,$timeout,Organization){
   var app =this;
     app.loading=true;
     app.errorMsg = false;
    Organization.getOrgans().then(function(data){
    if(data.data.success){ 
                //Create success message
                app.orgn=data.data.orgname;
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
       app.loading=true;
       app.errorMsg = false;
       var org_no=document.getElementById("organizationnumber").value;
       var orgname=document.getElementById("organizationname").value;
       var address = document.getElementById("address").value;
     Organization.updateProfile(org_no,orgname,address).then(function(data){
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
 
Organization.getOrgans().then(function(data,$scope,$location,$timeout){
      if(data.data.success){ 
                //Create success message
                app.orgn=data.data.orgname;
                app.subs = data.data.subsc;
               app.bill = data.data.billin;
               app.ben = data.data.benefi;
               app.memb = data.data.member;
                 app.loading=false;
            }
            else
                {
                     app.loading=false; 
                    app.errorMsg = data.data.message;
                    app.successMsg = false;
                }

});
this.deleteOrgBill = function(bill_id){
Organization.billDelete(bill_id).then(function(data){
if(data.data.success){ 
              app.loading=false;
              app.successMsg = data.data.message + '....Redirecting';
             app.errorMsg = false;
              $timeout(function(){    
                 app.loading=true;
                 $location.path('/organprofile');
            },2000);
          }
      else{
                    app.loading=false; 
                     app.errorMsg = data.data.message;
                     app.successMsg = false;      
          }
});   
};
this.deleteBenefits = function(ben_id,organizationnumber){
    Organization.benDelete(ben_id,organizationnumber).then(function(data){
          if(data.data.success){ 
              app.loading=false;
              app.successMsg = data.data.message + '....Redirecting';
             app.errorMsg = false;
              $timeout(function(){    
                   $location.path('/organprofile');
            },2000);
          }
      else{
                    app.loading=false; 
                     app.errorMsg = data.data.message;
                     app.successMsg = false;      
          }
     });
};
this.deleteOrgSubs = function(sub_id,organizationnumber){
    Organization.subDelete(sub_id,organizationnumber).then(function(data){
         if(data.data.success){ 
              app.loading=false;
              app.successMsg = data.data.message + '....Redirecting';
             app.errorMsg = false;
              $timeout(function(){    
                  $location.path('/organprofile');
            },2000);
          }
      else{
                    app.loading=false; 
                     app.errorMsg = data.data.message;
                     app.successMsg = false;      
          }
    });
};

});
