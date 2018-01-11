'use strict';

var supplierManagementRouter = {
    url: '/financingProxy/supplierManagement',
    template: require('./supplierManagement.html'),
    controller: 'SupplierManagementController',
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
        }, 'supplierManagement');

        return deferred.promise;
    }]
};

module.exports = supplierManagementRouter;
