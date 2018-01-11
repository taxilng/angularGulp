'use strict';

var roleManagementRouter = {
    url: '/authorityManagement/roleManagement',
    template: require('./roleManagement.html'),
    controller: 'RoleManagementController',
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
        }, 'roleManagement');

        return deferred.promise;
    }]
};

module.exports = roleManagementRouter;
