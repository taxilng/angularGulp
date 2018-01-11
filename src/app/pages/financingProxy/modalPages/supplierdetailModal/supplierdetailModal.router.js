'use strict';

var supplierdetailModalRouter = {
    url: '/financingProxy/modalPages/supplierdetailModal',
    template: require('./supplierdetailModal.html'),
    controller: 'SupplierdetailModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'supplierdetailModal');

        return deferred.promise;
    }]
};

module.exports = supplierdetailModalRouter;
