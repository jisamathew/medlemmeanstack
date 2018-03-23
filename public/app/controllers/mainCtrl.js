angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$timeout,$location,$rootScope,User,Organization){
 var app =this;
 app.loadme = false;
 $rootScope.$on('$routeChangeStart',function(){
if(Auth.isLoggedIn()){
     app.isLoggedIn = true;
     Auth.getUser().then(function(data){
         if(data.data.permission == 'member'){
            app.ssn=data.data.ssn;
            app.username = data.data.username;
            app.firstname = data.data.firstname;
            app.lastname = data.data.lastname;
            app.email = data.data.email;
            app.gender = data.data.gender;
            app.phno = data.data.phno;
            app.age = data.data.age;
            User.getPermission().then(function(data){
                    app.authorized = false;                   
                    app.loadme = true;
             });
         }
         else if(data.data.permission === 'organization'){

            app.username = data.data.username;
            app.organizationname = data.data.organizationname;
           app.organizationnumber = data.data.organizationnumber;
           app.address = data.data.address;
           app.noofmember= data.data.noofmember;
            Organization.getPermission().then(function(data){
                  app.authorized = true;
                  app.loadme = true;
                  app.errorMsg =false;
             });
        }
                 
  });
     }
        else{
             app.isLoggedIn = false;
            app.username = '';
            app.firstname ='';
            app.lastname = '';
            app.loadme = true;
        }

 });

   this.doLogin = function(loginData){  
   app.loading=true;
   app.errorMsg = false;  
   Auth.login(app.loginData).then(function(data){
            if(data.data.success){ 
                //Create success message
               if(data.data.permission == "member")
               { 
                app.loading=false;
                app.successMsg = data.data.message + '....Redirecting';
                //Redirect to member profile
                $timeout(function(){    
                       $location.path('/profile');
                       app.loginData = {};
                       app.successMsg = false;
                       app.errorMsg =false;
                       
                 },2000);
               }
               else if(data.data.permission == "organization"){
                   app.loading=false;
                    app.successMsg = data.data.message + '....Redirecting';
                //Redirect to organization profile
                    $timeout(function(){    
                       $location.path('/organprofile');
                       app.loginData = {};
                       app.successMsg = false;
                       app.errorMsg =false;                       
                 },2000);
               }
            }
            else
                {
                    app.loading=false; 
                    app.errorMsg = data.data.message;
                    $timeout(function(){
                        app.successMsg = false;
                        app.errorMsg =false;
                        $location.path('/');
            
                     },2000);

                   
                }
        });
    };
    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
       
       $location.path('/login');
            
        
    };
});


