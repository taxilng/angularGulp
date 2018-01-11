'use strict';

var supplierPaymentRouter = {
    url: '/financingProxy/supplierPayment',
    template: require('./supplierPayment.html'),
    controller: 'SupplierPaymentController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'supplierPayment');

        return deferred.promise;
    }]
};

module.exports = supplierPaymentRouter;
