angular.module('userServices',[])
.factory('User',function($http){
    userFactory = {};
//    User.create(regData);
    userFactory.create = function(regData,pic){
        return $http.post('/api/users/'+pic,regData);
    };
    
  userFactory.getOrgans = function(){
        return $http.get('/api/browse');
    };

  userFactory.getviewOrgans = function(no){
     return $http.get('/api/viewoneorg/'+no);    
    };

  userFactory.getvieOrgans = function(no){
     return $http.get('/api/oneorg/'+no);    
    };

    userFactory.getPermission = function(){         
        return $http.get('/api/permission');
    };
   userFactory.getMems = function(){
        return $http.get('/api/browsemem');
    };
    userFactory.subscriptionSsn = function(subid,org_no){
        return $http.post('/api/subscribe/'+subid+'/'+org_no);
    };
    userFactory.subDelete = function(subid,org_no){
        return $http.delete('/api/deletesubscribe/'+subid+'/'+org_no);
    };
    userFactory.memDelete = function(org_no){
        return $http.delete('/api/deletemembership/'+org_no);
    };
    userFactory.postMember= function(ssn,fullname,gender,age,orgno){
        return $http.post('/api/membership/'+ssn+'/'+fullname+'/'+gender+'/'+age+'/'+orgno);
    };
    userFactory.getSubOrg = function(org_no){
         return $http.get('/api/viewsuborg/'+org_no);
    };

    userFactory.updateProfile= function(ssn,firstname,lastname,username,email,age,phno){
        return $http.put('/api/profileupdation2/'+ssn+'/'+firstname+'/'+lastname+'/'+username+'/'+email+'/'+age+'/'+phno);
    };
    return userFactory;
});
