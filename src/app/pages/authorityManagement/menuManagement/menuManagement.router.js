'use strict';

var menuManagementRouter = {
    url: '/authorityManagement/menuManagement',
    template: require('./menuManagement.html'),
    controller: 'MenuManagementController',
    controllerAs: 'vm',
    loginState: false,
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'menuManagement');

        return deferred.promise;
    }]
};

module.exports = menuManagementRouter;
