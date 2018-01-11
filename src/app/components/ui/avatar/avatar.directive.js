'use strict';
var cfoAvatarHtml = require('./avatar.html');

module.exports = function cfoButton(roleConstant) {
    var directive = {
        restrict: 'EA',
        template: cfoAvatarHtml,
        replace: true,
        scope: {
            user:'='
        },
        link: link
    };
    return directive;

    function link(scope){
        scope.roleName = '';
        scope.userName = scope.user.name;
        if(scope.user.role){
            for(var role in roleConstant){
                if(roleConstant[role].key==scope.user.role[0]){
                    scope.roleName = roleConstant[role].name;
                }
            }
        }
    }
};
