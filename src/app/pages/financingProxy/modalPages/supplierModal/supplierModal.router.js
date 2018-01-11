'use strict';

var supplierModalRouter = {
    url: '/financingProxy/modalPages/supplierModal',
    template: require('./supplierModal.html'),
    controller: 'SupplierModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'supplierModal');

        return deferred.promise;
    }]
};

module.exports = supplierModalRouter;
