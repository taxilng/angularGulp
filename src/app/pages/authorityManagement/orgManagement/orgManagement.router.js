'use strict';

var orgManagementRouter = {
    url: '/authorityManagement/orgManagement',
    template: require('./orgManagement.html'),
    controller: 'OrgManagementController',
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
        }, 'orgManagement');

        return deferred.promise;
    }]
};

module.exports = orgManagementRouter;
