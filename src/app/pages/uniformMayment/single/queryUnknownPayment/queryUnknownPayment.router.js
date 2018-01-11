'use strict';

var queryUnknownPaymentRouter = {
    url: '/uniformMayment/single/queryUnknownPayment',
    template: require('./queryUnknownPayment.html'),
    controller: 'QueryUnknownPaymentController',
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
        }, 'queryUnknownPayment');

        return deferred.promise;
    }]
};

module.exports = queryUnknownPaymentRouter;
