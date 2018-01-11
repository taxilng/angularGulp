/**
 * Created by ShaunJ on 16/5/16.
 */
'use strict';
var tabHtml = require('./tab.html');

module.exports = function() {
    var directive = {
        restrict: 'E',
        template:tabHtml,
        scope: {
            itemheight:'='
        },
        transclude:true,
        replace:true,
        bindToController: true,
        controller: tabController,
        controllerAs:'tabWrap'
    };

    function tabController() {
        var self = this;
        self.tabitems = [];

        self.addTab = addTab;
        self.select = select;

        function addTab(newTab) {
            self.tabitems.push(newTab);
            //console.log(newTab);
        }

        function select(selectedTab) {
            angular.forEach(self.tabitems, function(tab){
                if( tab.active && tab!== selectedTab ) {
                    tab.active = false;
                }
            });
            selectedTab.active = true;

        }
    }

    return directive;
};
