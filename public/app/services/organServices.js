angular.module('organServices',[])
.factory('Organization',function($http){
    organFactory = {};
//    User.create(regData);
    organFactory.create = function(registerData,pic){
        return $http.post('/api/organizations/'+pic,registerData);
    };


    organFactory.createben = function(benData,org_no,pic){
        return $http.post('/api/benefit/'+org_no+'/'+pic,benData);
    };
     organFactory.createsub = function(subData,org_no,pic){
        return $http.post('/api/subscription/'+org_no+'/'+pic,subData);
    };

    organFactory.createbill = function(billData,org_no){
        return $http.post('/api/billing/'+org_no,billData);
    };

 organFactory.getOrgans = function(){
        return $http.get('/api/browseone');
    };
    organFactory.getSub=function(){
            return $http.get('/api/browsesub');
    };
    organFactory.billDelete = function(bill_id){
        return $http.delete('/api/deletebill/'+bill_id);
    };
    organFactory.benDelete=function(benid,org_no){
        return $http.delete('/api/deletebenefit/'+benid+'/'+org_no);
    };
    organFactory.subDelete=function(sub_id,orgno){
        return $http.delete('/api/deleteorgsub/'+sub_id+'/'+orgno);
    };
    organFactory.updateProfile= function(org_no,orgname,address){
        return $http.put('/api/profileupdation/'+org_no+'/'+orgname+'/'+address);
    };
    organFactory.getPermission = function(){
        return $http.get('/api/permission');
    };
    return organFactory;
});