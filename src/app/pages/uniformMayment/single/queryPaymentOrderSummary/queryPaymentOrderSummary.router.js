'use strict';

var queryPaymentOrderSummaryRouter = {
    url: '/uniformMayment/single/queryPaymentOrderSummary',
    template: require('./queryPaymentOrderSummary.html'),
    controller: 'QueryPaymentOrderSummaryController',
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
        }, 'queryPaymentOrderSummary');

        return deferred.promise;
    }]
};

module.exports = queryPaymentOrderSummaryRouter;
