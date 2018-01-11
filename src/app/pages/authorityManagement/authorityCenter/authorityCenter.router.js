'use strict';

var authorityCenterRouter = {
    url: '/authorityManagement/authorityCenter',
    template: require('./authorityCenter.html'),
    controller: 'AuthorityCenterController',
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
        }, 'authorityCenter');

        return deferred.promise;
    }]
};

module.exports = authorityCenterRouter;
