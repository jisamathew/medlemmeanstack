angular.module('userServices',[])
.factory('User',function($http){
    userFactory = {};
//    User.create(regData);
    userFactory.create = function(regData){
        return $http.post('/api/users',regData);
    };
    
  userFactory.getOrgans = function(){
        return $http.get('/api/browse');
    };


userFactory.getPermission = function(){         
        return $http.get('/api/permission');
    };
   userFactory.getMems = function(){
        return $http.get('/api/browsemem');
    };

userFactory.updateProfile= function(ssn,firstname,lastname,username,email,age,phno){
    console.log('inside update service'+ssn);
    return $http.put('/api/profileupdation2/'+ssn+'/'+firstname+'/'+lastname+'/'+username+'/'+email+'/'+age+'/'+phno);
};
    /*
    userFactory.getUsers = function(){
        return $http.get('/api/management/');
    };
      userFactory.getUser = function(id){
        return $http.get('/api/edit/'+id); 
    };
     userFactory.deleteUser = function(username){
        return $http.delete('/api/management/'+username);
    };
userFactory.editUser= function(id){
    return $http.put('/api/edit',id);
}*/

    return userFactory;
});