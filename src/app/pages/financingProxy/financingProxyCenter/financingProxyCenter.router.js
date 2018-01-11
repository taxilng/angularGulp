'use strict';

var financingProxyCenterRouter = {
    url: '/financingProxy/financingProxyCenter',
    template: require('./financingProxyCenter.html'),
    controller: 'FinancingProxyCenterController',
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
        }, 'financingProxyCenter');

        return deferred.promise;
    }]
};

module.exports = financingProxyCenterRouter;
