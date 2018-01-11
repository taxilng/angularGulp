'use strict';
module.exports = function($rootScope) {
    return {
        newTab: function(tab) {
            var wizardTabs = $rootScope.wizardTabs;
            var isNewTab = true;
            wizardTabs.forEach(function(wizardItem) {
                wizardItem.isActive = false;
                if (wizardItem.state == tab.state) {
                    wizardItem.isActive = true;
                    isNewTab = false;
                }
            });
            if (isNewTab) {
                wizardTabs.push(tab);
                wizardTabs[wizardTabs.length - 1].isActive = true;
            }
            console.log($rootScope.wizardTabs);
            $rootScope.wizardTabs = wizardTabs;
        },
        closeTab: function() {

        },
        closeAll: function() {

        }
    };
};
