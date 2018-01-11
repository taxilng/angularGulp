'use strict';

var uniformMaymentCenterRouter = {
    url: '/uniformMayment/uniformMaymentCenter',
    template: require('./uniformMaymentCenter.html'),
    controller: 'UniformMaymentCenterController',
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
        }, 'uniformMaymentCenter');

        return deferred.promise;
    }]
};

module.exports = uniformMaymentCenterRouter;
