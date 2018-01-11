'use strict';

var queryErrorCheckingResultRouter = {
    url: '/uniformMayment/reconciliation/queryErrorCheckingResult',
    template: require('./queryErrorCheckingResult.html'),
    controller: 'QueryErrorCheckingResultController',
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
        }, 'queryErrorCheckingResult');

        return deferred.promise;
    }]
};

module.exports = queryErrorCheckingResultRouter;
