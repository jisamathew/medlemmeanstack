angular.module('organServices',[])
.factory('Organization',function($http){
    organFactory = {};
//    User.create(regData);
    organFactory.create = function(registerData){
        console.log('creation'+ registerData);
        return $http.post('/api/organizations',registerData);
    };


    organFactory.createben = function(benData,org_no,pic){
    console.log('benefit created'+org_no);
        return $http.post('/api/benefit/'+org_no+'/'+pic,benData);
    };
     organFactory.createsub = function(subData,org_no,pic){
         
    console.log('sub created'+subData+'image being selected passed at services : '+pic);
        return $http.post('/api/subscription/'+org_no+'/'+pic,subData);
    };

    organFactory.createbill = function(billData,sub_id){
    console.log('bill created'+billData);

        return $http.post('/api/billing/'+sub_id,billData);
    };

 organFactory.getOrgans = function(){
        return $http.get('/api/browseone');
    };
organFactory.getSub=function(){
        return $http.get('/api/browsesub');
    
}
//organFactory.searchSub = function(){
  //return $http.get('/api/getsubname');  
//};
organFactory.updateProfile= function(org_no,orgname,address){
    console.log('inside update service*******************************');
    return $http.put('/api/profileupdation/'+org_no+'/'+orgname+'/'+address);
};

   
    
    organFactory.getPermission = function(){
          return $http.get('/api/permission');
    };

    
    /*organFactory.getUsers = function(){
        return $http.get('/api/management/');
    };
    organFactory.getUser = function(id){
        return $http.get('/api/edit/'+id); 
    }; 
     organFactory.deleteUser = function(username){
        return $http.delete('/api/management/'+username);
    };
organFactory.editUser= function(id){
    return $http.put('/api/edit',id);
};*/
    return organFactory;
});