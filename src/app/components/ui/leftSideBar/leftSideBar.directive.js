'use strict';

var sideBarMenuController = require('./leftSideBar.controller');
var leftSideBarHtml = require('./leftSideBar.html');

module.exports = function leftSideBar() {
    var directive = {
        restrict: 'AE',
        template: leftSideBarHtml,
        scope:{
        	menu:'='
        },
        controller: ['$scope', 'MenuTreeService', '$state','$rootScope','CONFIG','toastr', 'EventBusService',sideBarMenuController],
        controllerAs: 'vm'
    };

    return directive;
};
