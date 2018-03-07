angular.module('userApp',['appRoutes','userControllers','userServices','organControllers','organServices','ngAnimate','mainController','authServices','managementController'])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');

});
