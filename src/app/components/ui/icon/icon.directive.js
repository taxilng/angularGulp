'use strict';

var iconHtml = require('./icon.html');

module.exports = function icon() {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            name: '=',
            src: '=',
            active : '=',
            click:'&'
        },
        template: iconHtml,
        link:function(scope){
            scope.img = scope.src;
            if(scope.active){
                scope.mouseOver = function(){
                    scope.img  = scope.active;
                };
                scope.mouseOut = function(){
                    scope.img  = scope.src;
                };
            }
        }
    };

    return directive;
};
