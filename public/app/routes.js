var app = angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider,$locationProvider){
        $routeProvider.when('/',{
            templateUrl: 'app/views/pages/users/register.html',
             
        }) 
        
        .when('/about',{
            templateUrl: 'app/views/pages/about.html',
           
        })
        .when('/register',{
        templateUrl: 'app/views/pages/users/register.html',
        controller:'regCtrl',
        controllerAs:'register',
        authenticated:false
        })
        
        .when('/editprofile1',{
             templateUrl:'app/views/pages/users/editprofile1.html',
            controller:'updateCtrl2',
            controllerAs:'updation2',
             authenticated:true,
         
        })
        
        .when('/browse',{
            templateUrl:'app/views/pages/users/browse.html',
            controller:'searchCtrl',
            controllerAs:'searchin',
            authenticated:true
        

        })

        .when('/login',{
            templateUrl:'app/views/pages/users/login.html',
            
            authenticated:false
        })
        .when('/logout',{
            templateUrl:'app/views/pages/users/logout.html',
             authenticated:true
        })
        .when('/profile',{
            templateUrl:'app/views/pages/users/profile.html',
            controller:'viewProfileCtrl',
            controllerAs:'ctrlview2',
             authenticated:true
        })
        .when('/viewoneorg/:organizationnumber',{
            templateUrl:'app/views/pages/users/viewoneorg.html',
            controller:'userViewOneOrgCtrl',
            controllerAs:'organview',
            authenticated:true
        })
        .when('/bemember/:ssn/:organizationnumber',{
            templateUrl:'app/views/pages/users/access.html',
            controller:'memCtrl',
            controllerAs:'getorg',
            authenticated:true
        })
      .when('/deletesub/:sub_id',{
          
      })
        /*
        .when('/sub/:organizationnumber',{
            templateUrl:'app/views/pages/users/vieworgsub.html',
            controller:'suborgCtrl',
            controllerAs:'getsub',
            authenticated:true
        })*/
        

//ORGANIZATION
      .when('/organizations',{
        templateUrl: 'app/views/pages/organizations/register.html',
        controller:'registerCtrl',
        controllerAs:'register1',
        authenticated:false
        })
        .when('/organprofile',{
            templateUrl: 'app/views/pages/organizations/profile.html',
            controller:'viewCtrl',
            controllerAs:'ctrlview',
            authenticated:true
            })

            .when('/editprofile',{
            templateUrl: 'app/views/pages/organizations/editprofile.html',
            controller:'updateCtrl',
            controllerAs:'updation',
            authenticated:true
            })
           
        .when('/billing',{
            templateUrl: 'app/views/pages/organizations/billing.html',
            controller:'billCtrl',
            controllerAs:'obilling',
            authenticated:true
            })
            
        .when('/subscription',{
                templateUrl: 'app/views/pages/organizations/subscription.html',
                controller:'subCtrl',
                controllerAs:'subscript',
                authenticated:true
                })
                
        .when('/benefit',{
                templateUrl: 'app/views/pages/organizations/benefit.html',
                controller:'benCtrl',
                controllerAs:'obenefit',
                authenticated:true
                })
        /*
         .when('/management',{
            templateUrl:'app/views/pages/management/management.html',
             controller:'managementCtrl',
             controllerAs:'management',
            authenticated:true,
            permission:['organization','member']   
        })
        .when('/edit/:id',{
            templateUrl:'app/views/pages/management/edit.html',
             controller:'editCtrl',
             controllerAs:'edit',
            authenticated:true,
            permission:['organization','member']   
        })


*/
       .otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
        });

 });
 app.run(['$rootScope','Auth','$location','User',function($rootScope,Auth,$location,User){
     //Check each time route changes
$rootScope.$on('$routeChangeStart',function(event,next,current){

//Only perform if user visited a route listed above
if(next.$$route != undefined){
        if(next.$$route.authenticated == true){
       //if authenticated is required,make sure is logged in
            if(!Auth.isLoggedIn()){
                
                console.log('prevent1');
                event.preventDefault();
                $location.path('/');
            }
            else if(next.$$route.permission){
                User.getPermission().then(function(data){
                    if(next.$$route.permission[0] != data.data.permission){
                        if(next.$$route.permission[1] !== data.data.permission){
                            
                console.log('prevent2');
                            event.preventDefault();
                            $location.path('/');
                        }
                    }
            });
            }
        }
        else if(next.$$route.authenticated == false)
        {
            //if authenticated is not required,make sure is not logged in
            if (Auth.isLoggedIn()){
                console.log('prevent3');
                //event.preventDefault();
                $location.path('/profile');
            }
        }
    }
    });
}]);