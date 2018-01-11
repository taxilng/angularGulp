'use strict';

var headerHtml = require('./header.html');

module.exports = function header($state,$rootScope,$ngBootbox,toastr,UserService,CONFIG) {
    var directive = {
        restrict: 'E',
        replace: true,
        template: headerHtml,
        link:function(scope){
           scope.userLogout = function(){
              $ngBootbox.confirm('确定退出么？').then(function() {
                    var currentUser = JSON.parse(sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER));
                    $rootScope.hasLogin = false;
                    if(sessionStorage.getItem(CONFIG.SESSION.CURRENT_USER)){
                        var parse = {
                            userId:currentUser.userId
                        };
                        var promise = UserService.userLogout(parse);
                        promise.then(function() {
                            $rootScope.userName = null;
                            sessionStorage.removeItem(CONFIG.SESSION.CURRENT_USER);
                            $state.go('login');
                        }).catch(function(error){
                            toastr.error(error.message);
                        });
                    }

                }, function() {});
           }
        }
    };

    return directive;
};
